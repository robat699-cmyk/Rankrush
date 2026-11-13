import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import axios from 'axios';
import * as cheerio from 'cheerio';
import pRetry from 'p-retry';
import pQueue from 'p-queue';

puppeteer.use(StealthPlugin());

export class WebCrawler {
  constructor(options = {}) {
    this.timeout = options.timeout || 30000;
    this.headless = options.headless !== false;
    this.userAgent = options.userAgent || process.env.CRAWLER_USER_AGENT;
    this.concurrency = options.concurrency || 3;
    this.queue = new pQueue({ concurrency: this.concurrency });
    this.browser = null;
    this.pages = [];
  }

  async initialize() {
    try {
      this.browser = await puppeteer.launch({
        headless: this.headless,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-blink-features=AutomationControlled',
        ],
      });
      console.log('Browser initialized successfully');
    } catch (error) {
      console.error('Failed to initialize browser:', error);
      throw error;
    }
  }

  async crawlSite(domain, options = {}) {
    const {
      maxPages = 1000,
      maxDepth = 3,
      followExternal = false,
      includeImages = false,
      respectRobots = true,
    } = options;

    const visited = new Set();
    const queue = [`https://${domain}`];
    const results = [];
    let depth = 0;

    while (queue.length > 0 && visited.size < maxPages && depth <= maxDepth) {
      const url = queue.shift();

      if (visited.has(url)) continue;
      visited.add(url);

      try {
        const page = await this.crawlPage(url);
        results.push(page);

        // Extract links
        const links = page.links || [];
        for (const link of links) {
          const linkUrl = new URL(link, url).toString();
          const linkDomain = new URL(linkUrl).hostname;

          if (
            !visited.has(linkUrl) &&
            linkDomain === domain &&
            results.length < maxPages
          ) {
            queue.push(linkUrl);
          }
        }
        depth++;
      } catch (error) {
        console.error(`Error crawling ${url}:`, error.message);
      }
    }

    return {
      domain,
      totalPages: results.length,
      pages: results,
      crawledAt: new Date(),
    };
  }

  async crawlPage(url, options = {}) {
    const { extractContent = true, waitForNetworkIdle = true } = options;

    try {
      // Try using axios first (faster)
      const response = await pRetry(
        () => axios.get(url, { timeout: this.timeout, headers: { 'User-Agent': this.userAgent } }),
        { retries: 2, maxTimeout: 5000 }
      );

      const $ = cheerio.load(response.data);
      const pageData = this.extractPageData(url, $, response.headers);

      return pageData;
    } catch (error) {
      // Fallback to Puppeteer for JavaScript-heavy sites
      return await this.crawlPageWithPuppeteer(url, options);
    }
  }

  async crawlPageWithPuppeteer(url, options = {}) {
    const { waitForNetworkIdle = true } = options;

    if (!this.browser) await this.initialize();

    let page;
    try {
      page = await this.browser.newPage();
      await page.setUserAgent(this.userAgent);
      await page.setViewport({ width: 1920, height: 1080 });

      const waitCondition = waitForNetworkIdle ? 'networkidle2' : 'domcontentloaded';

      await page.goto(url, {
        waitUntil: waitCondition,
        timeout: this.timeout,
      });

      const html = await page.content();
      const $ = cheerio.load(html);

      const pageData = this.extractPageData(url, $, {});

      return pageData;
    } catch (error) {
      console.error(`Error crawling with Puppeteer ${url}:`, error.message);
      throw error;
    } finally {
      if (page) {
        await page.close();
      }
    }
  }

  extractPageData(url, $, headers = {}) {
    const title = $('title').text().trim() || $('meta[property="og:title"]').attr('content') || '';
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    const h1 = $('h1').first().text().trim() || '';
    const h2Array = $('h2').map((_, el) => $(el).text().trim()).get();
    const h2 = h2Array.join(' | ');

    const bodyText = $('body').text();
    const wordCount = bodyText.split(/\s+/).length;
    const contentLength = bodyText.length;

    const links = $('a[href]')
      .map((_, el) => $(el).attr('href'))
      .get()
      .filter((h) => h && !h.startsWith('#'));

    const images = $('img')
      .map((_, el) => ({
        src: $(el).attr('src'),
        alt: $(el).attr('alt') || '',
      }))
      .get();

    const canonical = $('link[rel="canonical"]').attr('href') || url;
    const robots = $('meta[name="robots"]').attr('content') || '';
    const ogImage = $('meta[property="og:image"]').attr('content') || '';
    const ogUrl = $('meta[property="og:url"]').attr('content') || '';

    // Check SSL
    const isSSL = url.startsWith('https');

    // Mobile friendly check - check viewport meta tag
    const viewportMeta = $('meta[name="viewport"]').attr('content');
    const isMobileFriendly = !!viewportMeta;

    // Calculate readability score (basic implementation)
    const sentences = bodyText.match(/[.!?]+/g)?.length || 0;
    const averageWordsPerSentence = sentences > 0 ? wordCount / sentences : 0;
    const readabilityScore = Math.min(100, Math.max(0, 100 - averageWordsPerSentence));

    return {
      url,
      title,
      metaDescription,
      h1,
      h2,
      contentLength,
      wordCount,
      readabilityScore: parseFloat(readabilityScore.toFixed(2)),
      mobileFriendly: isMobileFriendly,
      sslCertificate: isSSL,
      canonicalUrl: canonical,
      robots,
      ogImage,
      ogUrl,
      links,
      images,
      httpStatus: 200,
      crawlStatus: 'success',
      crawledAt: new Date(),
    };
  }

  async extractBacklinksFromPage(url) {
    // This would require external backlink data sources
    // For now, we'll use a placeholder that can be connected to Ahrefs or similar APIs
    return {
      url,
      backlinks: [],
      referringDomains: [],
      note: 'Requires integration with Ahrefs or similar service',
    };
  }

  async getPageMetrics(url) {
    // Calculate basic metrics using field theory
    const page = await this.crawlPage(url);

    return {
      url,
      loadTime: 0, // Would require actual timing
      domSize: 0, // Would require Puppeteer metrics
      resourcesLoaded: 0, // Would require network timing
      metrics: {
        performance: {
          firstContentfulPaint: null,
          largestContentfulPaint: null,
          cumulativeLayoutShift: null,
        },
      },
    };
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Rate-limited crawler
export class RateLimitedCrawler extends WebCrawler {
  constructor(options = {}) {
    super(options);
    this.requestsPerSecond = options.requestsPerSecond || 5;
    this.lastRequestTime = 0;
  }

  async crawlPage(url, options = {}) {
    // Rate limiting
    const timeSinceLastRequest = Date.now() - this.lastRequestTime;
    const minDelay = 1000 / this.requestsPerSecond;
    if (timeSinceLastRequest < minDelay) {
      await new Promise((resolve) => setTimeout(resolve, minDelay - timeSinceLastRequest));
    }

    this.lastRequestTime = Date.now();
    return super.crawlPage(url, options);
  }
}

export default WebCrawler;
