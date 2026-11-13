import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import dotenv from "dotenv";
import * as cheerio from "cheerio";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});


const domainCache = new Map<string, string>();
async function getRealContext(domain: string) {
    if (!domain) return "";
    if (domainCache.has(domain)) return domainCache.get(domain);
    try {
        const searchUrl = `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent("site:" + domain)}`;
        const response = await fetch(searchUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        const html = await response.text();
        const $ = cheerio.load(html);
        const results: string[] = [];
        $('.result-snippet').each((i, el) => {
            const title = $(el).prev().find('a').text().trim();
            const snippet = $(el).text().trim();
            results.push(title + ": " + snippet);
        });
        const textContext = results.slice(0, 5).join("\n");
        domainCache.set(domain, textContext);
        return textContext;
    } catch(e) {
        return "";
    }
}

function extractJSON(raw: string, fallback: string) {
  let content = (raw || fallback).trim();
  if (content.startsWith("```")) {
    content = content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  }
  return content;
}

async function generateJSON(prompt: string, domain?: string) {
  let finalPrompt = prompt;
  if (domain) {
    const real = await getRealContext(domain);
    if (real) finalPrompt += " \nREAL DATA CONTEXT to inform your output: " + real;
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-4-hydrogen",
      contents: finalPrompt,
      config: {
        systemInstruction: "You are an enterprise SEO, competitive intelligence, and digital analytics engine. Output ONLY valid raw JSON matching the exact schema requested. No markdown fences or commentary.",
        responseMimeType: "application/json",
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    });

    let content = extractJSON(response.text || "{}", "{}");
    const start = content.indexOf('{');
    const end = content.lastIndexOf('}');
    if (start !== -1 && end !== -1) {
      content = content.substring(start, end + 1);
    }
    return JSON.parse(content);
  } catch (error: any) {
    console.error("Gemini JSON generation error:", error);
    return { error: "API_ERROR", message: error.message, isFallback: true };
  }
}

async function generateJSONArray(prompt: string, domain?: string) {
  let finalPrompt = prompt;
  if (domain) {
    const real = await getRealContext(domain);
    if (real) finalPrompt += " \nREAL DATA CONTEXT to inform your output: " + real;
  }
  try {
    const wrappedPrompt = `${finalPrompt}
    IMPORTANT: You must return a JSON object with a key "items" that contains the array.
    Format: {"items": [...]}
    Output 15 to 25 items for this array so the UI has a rich dataset to display.`;

    const response = await ai.models.generateContent({
      model: "gemini-4-hydrogen",
      contents: wrappedPrompt,
      config: {
        systemInstruction: "You are an enterprise SEO and technical data architect. Output ONLY valid raw JSON.",
        responseMimeType: "application/json",
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    });

    const text = extractJSON(response.text || '{"items": []}', '{"items": []}');
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
    return parsed.items || [];
  } catch (error: any) {
    console.error("Gemini Array generation error:", error);
    return [];
  }
}

async function generateInsight(element: string, context: string) {
  try {
    const prompt = `STRATEGIC INTELLIGENCE REPORT.
    Target Vector: "${element}"
    Operational Context: ${context}.

    Provide an ultra-detailed, high-density strategic SEO & growth report matching the depth of enterprise platforms like Semrush or Ahrefs.
    Focus on:
    1. Predictive analytics for market dominance with exact growth forecasts.
    2. Semantic optimization in search neural networks via high-fidelity content mapping.
    3. AI-visibility growth tactics and structural LLM optimization.
    4. Surgical teardown of current weaknesses with ROI-based remediation paths.

    Formatting Requirement:
    - Use advanced Markdown.
    - MANDATORY: Include a "DIAGRAM" section using Markdown tables or ASCII boxes to represent technical architecture or user journeys.
    - Use sophisticated TABLES for data comparisons and risk matrices.
    - Use structured LISTS for actionable recommendations.
    - BOLD critical points and use CODE BLOCKS for technical specifications.
    - Your tone must be authoritative, analytical, and high-impact. Zero filler.

    Output ONLY raw JSON format: {
      "title": "Surgical Analysis: [Element Name]",
      "strategicSummary": "Detailed strategic summary (min 300 words) using Markdown tables, diagrams, and deep analysis...",
      "status": "VULNERABILITY DETECTED" | "OPTIMIZED NODE" | "CRITICAL FAILURE" | "INTEGRITY NOMINAL",
      "question": "Primary Strategic Objective?",
      "explanation": "Deep dive technical explanation in Markdown with multi-column tables/lists and diagrams...",
      "currentEffect": "Blast radius and impact analysis in Markdown...",
      "nextSteps": [
        "Priority Alpha: Strategic action 1...",
        "Priority Beta: Strategic pivot 2...",
        "Priority Gamma: Defensive fortification 3..."
      ]
    }`;
    return await generateJSON(prompt);
  } catch (err) {
    return {
      title: "CONNECTION TERMINATED",
      strategicSummary: "Failed to reach the intelligence engine.",
      explanation: "Signal synchronization interrupted. Please retry."
    };
  }
}

// Derive __filename and __dirname safely if needed
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // REAL API ROUTES

  // Site Audit Crawler
  app.post("/api/audit/start", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) return res.status(400).json({ error: "URL is required" });
      
      const targetUrl = url.startsWith('http') ? url : `https://${url}`;
      
      // Perform real basic crawl for some real data points
      let realData = { title: '', metaDescription: '', h1Count: 0, linksCount: 0, imagesCount: 0 };
      try {
        const response = await fetch(targetUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 SEOAuditBot/1.0' },
          signal: AbortSignal.timeout(5000)
        });
        const html = await response.text();
        const $ = cheerio.load(html);
        realData.title = $('title').text();
        realData.metaDescription = $('meta[name="description"]').attr('content') || '';
        realData.h1Count = $('h1').length;
        realData.linksCount = $('a').length;
        realData.imagesCount = $('img').length;
      } catch (err) {
        console.warn("Basic crawl failed, falling back to AI exclusively", err);
      }

      const prompt = `Act as an enterprise Site Audit engine (like Semrush). Analyze the site ${targetUrl}.
      Provide a hyper-detailed JSON report matching this EXACT structure:
      {
        "siteHealth": 72,
        "crawledPages": { "total": 85, "healthy": 1, "broken": 3, "haveIssues": 81, "redirects": 0, "blocked": 0 },
        "aiSearchHealth": 86,
        "blockedFromAI": [
          { "name": "Googlebot", "count": 2, "status": "Warning" },
          { "name": "ChatGPT-User", "count": 0, "status": "All good" },
          { "name": "OAI-SearchBot", "count": 0, "status": "All good" },
          { "name": "Gemini-Bot", "count": 0, "status": "All good" }
        ],
        "issues": [
          { "type": "error", "text": "Certificate registered to incorrect name", "cat": "Security", "why": "The SSL certificate domain handles do not match the site domain, causing browser warnings.", "priority": "Critical" },
          { "type": "error", "text": "Duplicate title tags", "cat": "SEO", "why": "Multiple pages share the same title, creating keyword cannibalization and index confusion.", "priority": "High", "count": 80 },
          { "type": "warning", "text": "Duplicate content", "cat": "Content", "why": "Substantial blocks of content appear identical across 80 pages, diluting page authority.", "priority": "Medium", "count": 80 },
          { "type": "notice", "text": "llms.txt not found", "cat": "AI Search", "why": "The emerging standard file for AI crawlers is missing, hindering LLM context optimization.", "priority": "Medium", "count": 1 }
        ],
        "stats": { "errors": 245, "warnings": 2101, "notices": 450 }
      }
      Inform the AI using these real crawl stats if available: ${JSON.stringify(realData)}.`;
      
      const data = await generateJSON(prompt);
      res.json({ ...data, url: targetUrl });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Domain Overview powered by Gemini (since we can't scrape ahrefs directly here)
  app.get("/api/domain/overview/:domain", async (req, res) => {
    try {
      const { domain } = req.params;
      
      const prompt = `Act as an enterprise SEO engine dashboard. I am looking up the domain: ${domain}.
      Provide a realistic, high-fidelity JSON report including:
      - authorityScore (0-100)
      - organicTraffic (monthly estimate)
      - organicKeywords (count)
      - backlinks (total count)
      - refDomains (referring domains count)
      - paidKeywords (count)
      - paidTraffic (monthly estimate)
      - aiVisibilityScore (0-100, how visible the brand is in AI results)
      - aiMentions (total count across LLMs)
      - citedPages (count of pages cited by LLMs)
      - trafficTrend (array of 12 months with value and date)
      - topKeywords (array of 5 objects with kw, pos, searchVol)
      - positionTracking (visibility%, keywords count in top 3, 10, 20, 100)
      
      Output ONLY raw JSON.`;
      
      const data = await generateJSON(prompt, domain);
      if (data?.error === "API_ERROR") {
        return res.status(502).json({ domain, ...data });
      }
      res.json({ domain, ...data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  // SERP Fetcher (for Position Tracking & Competitors)
  app.get("/api/rankings/search", async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) return res.status(400).json({ error: "Query is required" });
      
      // Using DuckDuckGo Lite to avoid strict bans from Google in cloud environments
      const searchUrl = `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}`;
      const response = await fetch(searchUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      
      const html = await response.text();
      const $ = cheerio.load(html);
      
      const results = [];
      $('.result-snippet').each((i, el) => {
        const title = $(el).prev().find('a').text().trim();
        const url = $(el).prev().find('a').attr('href');
        const snippet = $(el).text().trim();
        if (title && url) {
          results.push({ position: i + 1, title, url, snippet });
        }
      });
      
      res.json({ query, results });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  // Competitor Analysis powered by Gemini
  app.get("/api/domain/compare", async (req, res) => {
    try {
      const { domain1, domain2, domain3, mode } = req.query;
      const prompt = `Act as an enterprise SEO engine. Compare these domains: ${domain1}, ${domain2}, and ${domain3} under mode: ${mode}.
      Provide realistic SEO metrics comparing them. Output raw JSON format:
      {
        "stats": {
          "${domain1}": { "sov": "42.5%", "mentions": 1204, "sentiment": "Positive" },
          "${domain2}": { "sov": "35.0%", "mentions": 890, "sentiment": "Neutral" },
          "${domain3}": { "sov": "22.5%", "mentions": 520, "sentiment": "Positive" }
        },
        "trendData": [
          { "month": "Jan", "domain1": 45, "domain2": 60, "domain3": 30 },
          { "month": "Feb", "domain1": 50, "domain2": 58, "domain3": 35 }
        ]
      }
      Trend data should have 6 months.`;
      
      const realData = await getRealContext(domain1 as string);
      const data = await generateJSON(prompt + (realData ? " \nREAL DATA CONTEXT: " + realData : ""));
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  // Organic Rankings powered by Gemini
  app.get("/api/domain/organic", async (req, res) => {
    try {
      const { domain } = req.query;
      const prompt = `Act as an enterprise SEO engine (like Semrush). Give me realistic organic rankings data for the domain ${domain}. 
      Give me 15 keywords. Output raw JSON format:
      [
        { "kw": "example query", "pos": 3, "prev": 5, "vol": 135000, "kd": 82, "url": "/example-url", "intent": "Transactional", "traffic": 14000, "cpc": 3.45 }
      ]`;
      
      const data = await generateJSONArray(prompt, domain as string);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Top Pages powered by Gemini
  app.get("/api/domain/toppages", async (req, res) => {
    try {
      const { domain } = req.query;
      const prompt = `Act as an enterprise SEO engine (like Ahrefs). Give me realistic top performing pages data for the domain ${domain}. 
      Give me 8 pages. Output raw JSON format:
      [
        { "url": "/example", "traffic": 45000, "share": 45, "kwCount": 1200, "links": 4500, "adsCount": 4, "value": "$14k" }
      ]`;
      
      const data = await generateJSONArray(prompt, domain as string);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Ad Intel powered by Gemini
  app.get("/api/domain/adintel", async (req, res) => {
    try {
      const { domain } = req.query;
      const prompt = `Act as an enterprise SEO/PPC engine. Give me realistic ad intelligence data for the domain ${domain}.
      Give me trend data (5 months of clicks, cpc, visibility), topline metrics (spend, keywords, cpc, active), top 3 ad copies, and 4 landing pages.
      Output raw clear JSON format EXACTLY matching this structure:
      {
        "metrics": { "spend": "$42.5K", "spendGrowth": "+12.4%", "keywords": 3402, "keywordsGrowth": "+152", "cpc": "$3.10", "cpcGrowth": "+$0.20", "activeAds": 148, "networks": 5 },
        "trendData": [ { "month": "Jan", "clicks": 4000, "cpc": 2.4, "visibility": 2400 } ],
        "copies": [ { "kw": "seo tools", "title": "The #1 Platform", "desc": "Boost rankings", "emotion": "High Urgency", "score": 92 } ],
        "pages": [ { "page": "/seo-platform", "traffic": "45%", "speed": "Fast (0.8s)", "ux": "A" } ]
      }`;
      
      const realData = await getRealContext(domain as string);
      const data = await generateJSON(prompt + (realData ? " \nREAL DATA CONTEXT: " + realData : ""));
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // AI PR powered by Gemini
  app.get("/api/domain/aipr", async (req, res) => {
    try {
      const { domain } = req.query;
      const prompt = `Act as an enterprise AI digital PR engine. Give me realistic AI PR data for the domain ${domain}.
      Give me sentiment trend data (5 months of positive, neutral, negative), topline metrics (mentions, sentiment, trusted sources, est reach), and 3 PR opportunities.
      Output raw clear JSON format EXACTLY matching this structure:
      {
        "metrics": { "mentions": 1405, "mentionsGrowth": "+210", "sentiment": "78%", "sentimentGrowth": "+5%", "sources": 45, "sourcesGrowth": "+3", "reach": "2.4M", "reachGrowth": "+100K" },
        "trendData": [ { "month": "Jan", "positive": 40, "neutral": 50, "negative": 10 } ],
        "ops": [ { "topic": "AI implementation", "publication": "TechCrunch", "difficulty": "Hard", "impact": "High", "desc": "Pitch a story about how your platform is using AI." } ]
      }`;
      
      const data = await generateJSON(prompt, domain);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Link Building endpoints
  app.get("/api/domain/linkbuilding", async (req, res) => {
    try {
      const { domain, mode } = req.query;
      const prompt = `Act as an enterprise SEO link building tool like Ahrefs. I am querying the tool for ${domain} under the mode ${mode}.
      Give me realistic backlink profile data.
      Output raw JSON format EXACTLY matching this structure:
      {
        "metrics": { "total": "250K", "domains": "14.2K", "authority": "82/100", "toxic": "4.5%" },
        "velocity": [ { "month": "Jan", "newLinks": 1200, "lostLinks": 400 } ],
        "anchors": [ { "text": "seo software", "domains": 450, "percent": "12%" }, { "text": "empty", "domains": 200, "percent": "5%" } ]
      }`;
      const data = await generateJSON(prompt, domain);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Sensor Dashboard endpoints
  app.get("/api/domain/sensor", async (req, res) => {
    try {
      const { domain, mode } = req.query;
      const prompt = `Act as an enterprise SEO search engine sensor tracking algorithm volatility. Querying for ${domain} under mode ${mode}.
      Give me realistic SERP volatility data and SEMRush global rank estimates.
      Output raw JSON EXACTLY matching this structure:
      {
        "volatilityScore": 6.4,
        "volatilityTrend": [ { "day": "1st", "score": 4.2 }, { "day": "2nd", "score": 8.4 } ],
        "categoryVol": [ { "category": "News", "score": 8 }, { "category": "Sports", "score": 5 } ],
        "rankData": { "global": "4,204", "country": "1,202", "category": "42" }
      }`;
      const data = await generateJSON(prompt, domain);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Social Intel powered by Gemini
  app.get("/api/domain/social", async (req, res) => {
    try {
      const { domain } = req.query;
      const prompt = `Act as an enterprise Social Media Analytics engine. Give me realistic social data for the domain ${domain}.
      trend data (5 days of reach & engagement), topline metrics (audience, engagement, viral index, share of voice), 3 trending posts, and 1 demographic set.
      Output raw clear JSON format EXACTLY matching this structure:
      {
        "metrics": { "audience": "4.2M", "audienceGrowth": "+112K", "engagement": "8.5%", "engagementGrowth": "+1.2%", "viralIndex": "64/100", "viralGrowth": "Trending Up", "sov": "22%", "sovGrowth": "Leader" },
        "trendData": [ { "day": "Mon", "reach": 120000, "engagement": 45000 } ],
        "posts": [ { "network": "LinkedIn", "text": "Excited to launch our new AI feature today...", "engagement": "12.4K likes", "impact": "High" } ],
        "demographics": { "age1824": 15, "age2534": 45, "age3544": 25, "age45plus": 15 }
      }`;
      
      const data = await generateJSON(prompt, domain);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Reports Intel powered by Gemini
  app.get("/api/domain/reports", async (req, res) => {
    try {
      const { domain } = req.query;
      const prompt = `Act as an enterprise Reporting engine for SEO. Give me realistic report generation metadata for the domain ${domain}.
      trend data (6 months of manual vs automated report generation), template breakdown, and latest 5 reports generated.
      Output raw clear JSON format EXACTLY matching this structure:
      {
        "trendData": [ { "month": "Jan", "manual": 12, "automated": 45 } ],
        "usage": [ { "name": "Monthly SEO", "value": 40, "color": "var(--cyan)" }, { "name": "Competitor Intel", "value": 30, "color": "var(--purple)" } ],
        "reports": [ { "name": "Acme Corp Monthly SEO Growth", "type": "SEO Overview", "date": "Oct 24, 2026", "status": "Delivered" } ],
        "totals": { "generated": 4208, "scheduled": 42, "views": 1840, "saved": "140h" }
      }`;
      
      const data = await generateJSON(prompt, domain);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // App Center Intel powered by Gemini
  app.get("/api/domain/appcenter", async (req, res) => {
    try {
      const prompt = `Act as an enterprise SEO App Marketplace. Give me realistic integrations that a user can install. 
      Give me 6 highly detailed apps.
      Output raw clear JSON format EXACTLY matching this structure:
      [ { "id": 1, "name": "AI Content Optimizer", "dev": "SearchIQ Labs", "rating": 4.9, "users": "12k", "category": "Content", "installed": true, "desc": "Real-time NLP scoring..." } ]`;
      
      const data = await generateJSONArray(prompt);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // System Global Settings (Admin Only)
  let systemConfig = {
    siteName: "SearchIQ Intelligence",
    maintenanceMode: false,
    supportEmail: "nexus@searchiq.com",
    apiLimit: 1000000,
    registrationEnabled: true
  };

  app.get("/api/admin/settings", (req, res) => {
    res.json({...systemConfig, hasKey: !!process.env.GEMINI_API_KEY, keyLength: process.env.GEMINI_API_KEY?.length});
  });

  app.post("/api/admin/settings", (req, res) => {
    systemConfig = { ...systemConfig, ...req.body };
    res.json({ status: "success", config: systemConfig });
  });

  app.post("/api/admin/users/action", (req, res) => {
    const { userId, action } = req.body;
    res.json({ status: "success", message: `Action ${action} performed on user ${userId}` });
  });

  // Auth & Insight Endpoints
  const users = [
    { id: '1', email: 'admin@searchiq.com', password: 'admin', role: 'admin', name: 'Admin User' },
    { id: '2', email: 'user@searchiq.com', password: 'user', role: 'user', name: 'Regular User' }
  ];

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password, ...userWithoutPass } = user;
      res.json(userWithoutPass);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.post("/api/generate-insight", async (req, res) => {
    try {
      const { element, context } = req.body;
      const data = await generateInsight(element, context);
      if (data?.error === "API_ERROR") {
        return res.status(502).json(data);
      }
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Insight generation failed" });
    }
  });

  // Notifications API
  // AI Visibility Analysis
  app.get("/api/ai/visibility/:domain", async (req, res) => {
    try {
      const { domain } = req.params;
      const prompt = `Act as an enterprise AI Visibility engine. I am looking up how LLMs (ChatGPT, Gemini, Claude, Perplexity) perceive and cite the domain: ${domain}.
      Provide a realistic JSON report.
      Output ONLY raw JSON like: {
        "visibility": 45, 
        "mentions": 820, 
        "citedPages": 140,
        "platforms": [
          { "name": "ChatGPT", "mentions": 320, "cited": 60 },
          { "name": "Claude", "mentions": 250, "cited": 40 },
          { "name": "Gemini", "mentions": 150, "cited": 25 },
          { "name": "Perplexity", "mentions": 100, "cited": 15 }
        ]
      }`;
      const data = await generateJSON(prompt, domain);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Brand Sentiment & Perception
  app.get("/api/ai/sentiment/:domain", async (req, res) => {
    try {
      const { domain } = req.params;
      const prompt = `Act as a Brand Perception Analyst. Analyze the digital sentiment and brand narrative for: ${domain}.
      Return metrics on sentiment, reach, and mentions.
      Output ONLY raw JSON like: {
        "sentiment": "Positive",
        "sentimentScore": 78,
        "scoreChange": "+4",
        "brandMentions": "12K",
        "brandReach": "4.5M",
        "perceptions": [
          { "subject": "Innovation", "A": 120, "B": 110, "fullMark": 150 },
          { "subject": "Pricing", "A": 98, "B": 130, "fullMark": 150 }
        ]
      }`;
      const data = await generateJSON(prompt, domain);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  
async function getKeywordContext(query: string) {
    if (!query) return "";
    try {
        const searchUrl = `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}`;
        const response = await fetch(searchUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });
        const html = await response.text();
        const $ = cheerio.load(html);
        const results: string[] = [];
        $('.result-snippet').each((i, el) => {
            const title = $(el).prev().find('a').text().trim();
            const snippet = $(el).text().trim();
            results.push(title + ": " + snippet);
        });
        return results.slice(0, 5).join("\n");
    } catch(e) {
        return "";
    }
}
// Keyword Analysis Engine
  app.post("/api/keywords/analyze", async (req, res) => {
    try {
      const { keyword } = req.body;
      const prompt = `Act as an advanced Keyword Research tool. Analyze the keyword: "${keyword}".
      Provide volume, difficulty, CPC, and intent.
      Output ONLY raw JSON like: {
        "volume": "45.0K",
        "difficulty": 68,
        "cpc": "$2.45",
        "intent": "Commercial",
        "trend": [ { "day": "1", "pos": 5 }, { "day": "30", "pos": 2 } ]
      }`;
      const realData = await getKeywordContext(keyword);
      const data = await generateJSON(prompt + (realData ? " \nREAL SERP CONTEXT: " + realData : ""));
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Content Generation Engine
  app.post("/api/content/generate", async (req, res) => {
    try {
      const { topic, mode } = req.body;
      const prompt = `Act as an expert SEO writer. Generate content for the topic: "${topic}" in mode: ${mode}.
      Provide a title and the full article content in HTML format.
      Output ONLY raw JSON like: {
        "title": "...",
        "content": "..."
      }`;
      const realData = await getKeywordContext(topic);
      const data = await generateJSON(prompt + (realData ? " \nREAL SERP CONTEXT: " + realData : ""));
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/notifications", (req, res) => {
    // Simulated realtime alerts/events
    res.json([
      { id: 1, title: "SERP Volatility Spike", desc: "Enterprise sensor detected massive algorithm flux in US Desktop.", time: "2m ago", icon: "ti-alert-triangle", color: "var(--red)", read: false },
      { id: 2, title: "Audit Complete", desc: "Site audit for the tracked domain finished with 18 critical errors.", time: "15m ago", icon: "ti-shield-check", color: "var(--amber)", read: false },
      { id: 3, title: "Weekly Report Ready", desc: "Automated SEO insights generated and sent to stakeholders.", time: "2h ago", icon: "ti-file-text", color: "var(--cyan)", read: false },
      { id: 4, title: "Keyword Moved to #1", desc: "'diu attendance' is now ranking #1 globally.", time: "4h ago", icon: "ti-trending-up", color: "var(--green)", read: false },
      { id: 5, title: "Competitor Alert", desc: "A key competitor launched 50+ new pages targeting your keywords.", time: "1d ago", icon: "ti-eye", color: "var(--purple)", read: true }
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
