import axios from 'axios';
import { Models } from '../db/database.js';

export class KeywordTracker {
  constructor(options = {}) {
    this.serpApiKey = options.serpApiKey || process.env.SERPAPI_KEY;
    this.googleApiKey = options.googleApiKey || process.env.GOOGLE_API_KEY;
    this.bingApiKey = options.bingApiKey || process.env.BING_API_KEY;
    this.mockData = options.mockData || false;
  }

  // Track keyword position for a domain
  async trackKeywordPosition(keyword, domain, country = 'US', device = 'desktop') {
    try {
      // Using SerpAPI for real Google rankings
      if (this.serpApiKey && !this.mockData) {
        return await this.trackWithSerpAPI(keyword, domain, country, device);
      } else {
        return this.generateMockRankingData(keyword, domain);
      }
    } catch (error) {
      console.error(`Error tracking keyword ${keyword}:`, error);
      return this.generateMockRankingData(keyword, domain);
    }
  }

  async trackWithSerpAPI(keyword, domain, country = 'US', device = 'desktop') {
    const params = {
      q: keyword,
      location: this.getLocationFromCountry(country),
      device,
      api_key: this.serpApiKey,
    };

    try {
      const response = await axios.get('https://serpapi.com/search', { params });

      const organicResults = response.data.organic_results || [];
      const position = organicResults.findIndex((r) => r.domain === domain) + 1;
      const result = organicResults[position - 1];

      return {
        keyword,
        domain,
        position: position > 0 ? position : 0,
        url: result?.link || null,
        title: result?.title || null,
        snippet: result?.snippet || null,
        featured_snippet: !!response.data.answer_box,
        search_volume: 0, // Would need keyword research API
        traffic_estimate: this.estimateTraffic(position),
        country,
        device,
        tracked_at: new Date(),
      };
    } catch (error) {
      console.error('SerpAPI error:', error);
      throw error;
    }
  }

  async trackBatchKeywords(projectId, keywords, domain, country = 'US', device = 'desktop') {
    const results = [];

    for (const keyword of keywords) {
      const ranking = await this.trackKeywordPosition(keyword, domain, country, device);
      results.push(ranking);

      // Small delay to avoid rate limiting
      await new Promise((r) => setTimeout(r, 500));
    }

    return results;
  }

  async saveRankingData(projectId, keywordId, rankingData) {
    return Models.ranking.create(
      projectId,
      keywordId,
      rankingData.url,
      rankingData.position,
      rankingData.traffic_estimate
    );
  }

  async getHistoricalRankings(keywordId, days = 30) {
    return Models.ranking.findHistoryByKeyword(keywordId, days);
  }

  async analyzePositionChanges(projectId, keyword, lookbackDays = 30) {
    const keyword_id = await Models.keyword.findByProjectAndKeyword(projectId, keyword);
    if (!keyword_id) return null;

    const history = await this.getHistoricalRankings(keyword_id.id, lookbackDays);

    if (history.length < 2) return null;

    const latest = history[history.length - 1];
    const previous = history[0];
    const change = previous.position - latest.position;

    return {
      keyword,
      current_position: latest.position,
      previous_position: previous.position,
      change_7_days: this.calculateMovement(history, 7),
      change_30_days: change,
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
      volatility: this.calculateVolatility(history),
      history,
    };
  }

  calculateMovement(history, days) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - days);

    let startEntry = history[0];
    for (const entry of history) {
      if (new Date(entry.tracked_date) >= targetDate) {
        startEntry = entry;
        break;
      }
    }

    const latest = history[history.length - 1];
    return startEntry.position - latest.position;
  }

  calculateVolatility(history) {
    if (history.length < 2) return 0;
    const positions = history.map((h) => h.position);
    const avg = positions.reduce((a, b) => a + b, 0) / positions.length;
    const variance = positions.reduce((sum, p) => sum + Math.pow(p - avg, 2), 0) / positions.length;
    return Math.sqrt(variance);
  }

  estimateTraffic(position) {
    // CTR estimates based on position
    const ctrByPosition = {
      1: 0.283,
      2: 0.156,
      3: 0.102,
      4: 0.073,
      5: 0.056,
      6: 0.045,
      7: 0.037,
      8: 0.032,
      9: 0.028,
      10: 0.025,
    };

    return ctrByPosition[position] || (position > 10 ? 0.015 : 0);
  }

  getLocationFromCountry(country) {
    const locations = {
      US: 'United States',
      GB: 'United Kingdom',
      CA: 'Canada',
      AU: 'Australia',
      IN: 'India',
      BD: 'Bangladesh',
      // Add more as needed
    };
    return locations[country] || country;
  }

  generateMockRankingData(keyword, domain) {
    const positions = [1, 3, 5, 7, 12, 15, 28, 45, 67, 0];
    const randomPosition = positions[Math.floor(Math.random() * positions.length)];

    return {
      keyword,
      domain,
      position: randomPosition,
      url: randomPosition > 0 ? `${domain}/page-${Math.floor(Math.random() * 100)}` : null,
      title: `${keyword} - Best practices and guide`,
      snippet: `Learn about ${keyword} and how to optimize your website...`,
      featured_snippet: Math.random() > 0.8,
      traffic_estimate: this.estimateTraffic(randomPosition) * 1000,
      tracked_at: new Date(),
    };
  }

  async getKeywordGap(projectId, competitorDomain) {
    // Get keywords ranking for competitor
    const competitorKeywords = await this.getCompetitorKeywords(competitorDomain);

    // Get own keywords
    const ownKeywords = await Models.keyword.findAllByProject(projectId, 10000);
    const ownKeywordTexts = ownKeywords.map((k) => k.keyword.toLowerCase());

    const gap = {
      missing: [],
      shared: [],
      unique: [],
    };

    for (const ckw of competitorKeywords) {
      if (ownKeywordTexts.includes(ckw.keyword.toLowerCase())) {
        gap.shared.push(ckw);
      } else {
        gap.missing.push(ckw);
      }
    }

    gap.unique = ownKeywords.filter((k) => !competitorKeywords.some((ck) => ck.keyword.toLowerCase() === k.keyword.toLowerCase()));

    return gap;
  }

  async getCompetitorKeywords(domain) {
    // This would require integration with APIs like Ahrefs or SEMrush
    // For now, returning mock data
    return [
      { keyword: 'best seo tools', search_volume: 12100 },
      { keyword: 'seo software', search_volume: 8900 },
      { keyword: 'seo analytics', search_volume: 6200 },
    ];
  }

  async analyzeKeywordMetrics(keyword) {
    // Would integrate with keyword research APIs
    return {
      keyword,
      search_volume: Math.floor(Math.random() * 50000),
      keyword_difficulty: Math.random() * 100,
      cpc: (Math.random() * 10).toFixed(2),
      competition: Math.random(),
      intent: ['commercial', 'informational', 'navigational'][Math.floor(Math.random() * 3)],
    };
  }
}

export default KeywordTracker;
