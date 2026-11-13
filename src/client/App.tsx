import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";
import AdminDashboard from "./components/AdminDashboard";
import AIVisibility from "./components/AIVisibility";
import BrandPerformance from "./components/BrandPerformance";
import TrafficMarket from "./components/TrafficMarket";
import KeywordResearch from "./components/KeywordResearch";
import CompetitorResearch from "./components/CompetitorResearch";
import ContentCreation from "./components/ContentCreation";
import PlaceholderModule from "./components/PlaceholderModule";
import AdIntel from "./components/AdIntel";
import SocialIntel from "./components/SocialIntel";
import AIPR from "./components/AIPR";
import Reports from "./components/Reports";
import AppCenter from "./components/AppCenter";
import Pricing from "./components/Pricing";
import LocalSEO from "./components/LocalSEO";
import GrowthActions from "./components/GrowthActions";
import SiteAudit from "./components/SiteAudit";
import PositionTracking from "./components/PositionTracking";
import OrganicRankings from "./components/OrganicRankings";
import TopPages from "./components/TopPages";
import LinkBuilding from "./components/LinkBuilding";
import SensorDashboard from "./components/SensorDashboard";
import InsightModal from "./components/InsightModal";
import PredictiveAnalytics from "./components/PredictiveAnalytics";
import AIChatModal from "./components/AIChatModal";
import Login from "./components/Login";
import Logo from "./components/Logo";
import { User as UserIcon, LogOut, Shield, ChevronRight, Target, Plus, Share2 } from "lucide-react";

const visData = [
  { d: "May 7", v: 55.4 }, { d: "May 8", v: 54.8 }, { d: "May 9", v: 54.2 },
  { d: "May 10", v: 53.9 }, { d: "May 11", v: 53.4 }, { d: "May 12", v: 53.0 }, { d: "May 13", v: 52.8 },
];
const trafficData = [
  { d: "Nov", v: 1800 }, { d: "Dec", v: 2100 }, { d: "Jan", v: 2300 }, { d: "Feb", v: 2450 },
  { d: "Mar", v: 2500 }, { d: "Apr", v: 2360 }, { d: "May", v: 2300 },
];
const auditScoreData = [
  { d: "Jan", score: 62 }, { d: "Feb", score: 67 }, { d: "Mar", score: 71 },
  { d: "Apr", score: 74 }, { d: "May", score: 78 },
];
const topKeywords = [
  { kw: "attendance diu", pos: 1, prev: 1, vis: 12.5 },
  { kw: "diu", pos: 1, prev: 1, vis: 12.5 },
  { kw: "diu attendance", pos: 1, prev: 1, vis: 12.5 },
  { kw: "diu tuition fee", pos: 1, prev: 1, vis: 12.5 },
  { kw: "daffodil", pos: 6, prev: 4, vis: 1.41 },
  { kw: "mcw login", pos: 9, prev: 5, vis: 1.03 },
];
const aiPlatforms = [
  { name: "ChatGPT", mentions: 10, cited: 44, color: "#10b981" },
  { name: "AI Overview", mentions: 17, cited: 28, color: "#60a5fa" },
  { name: "AI Mode", mentions: 15, cited: 35, color: "#a78bfa" },
  { name: "Gemini", mentions: 10, cited: 13, color: "#f59e0b" },
];
const navItems = [
  { id: "home", icon: "ti-home", label: "Home" },
  {
    id: "seo", icon: "ti-search", label: "SEO", active: true,
    groups: [
      { title: "Site Performance", items: [{ id: "audit", label: "Site Audit" }, { id: "pos", label: "Position Tracking" }] },
      { title: "Competitive Analysis", items: [
        { id: "domain", label: "Domain Overview" }, { id: "organic", label: "Organic Rankings" },
        { id: "toppages", label: "Top Pages" }, { id: "compare", label: "Compare Domains" },
        { id: "kwgap", label: "Keyword Gap" }, { id: "blgap", label: "Backlink Gap" },
      ]},
      { title: "Keyword Research", items: [
        { id: "kwover", label: "Keyword Overview" }, { id: "kwmagic", label: "Keyword Magic Tool" },
        { id: "kwstrat", label: "Keyword Strategy Builder" },
      ]},
      { title: "Content Ideas", items: [
        { id: "seowrite", label: "SEO Writing Assistant" }, { id: "topic", label: "Topic Research" },
        { id: "seotempl", label: "SEO Content Template" },
      ]},
      { title: "Link Building", items: [
        { id: "backlinks", label: "Backlinks" }, { id: "refdoms", label: "Referring Domains" },
        { id: "blaudit", label: "Backlink Audit" },
      ]},
      { title: "Extras", items: [
        { id: "sensor", label: "Sensor" }, { id: "seoquake", label: "SEOquake" }, { id: "semrank", label: "Semrush Rank" },
      ]},
    ],
  },
  {
    id: "ai", icon: "ti-sparkles", label: "AI",
    groups: [
      { title: "AI Visibility", items: [
        { id: "aivis", label: "AI Visibility" }, { id: "aiana", label: "AI Analysis" },
        { id: "visover", label: "Visibility Overview" }, { id: "aicomp", label: "Competitor Research" },
        { id: "promptres", label: "Prompt Research" },
      ]},
      { title: "Brand Performance", items: [
        { id: "brand", label: "Brand Performance" }, { id: "percep", label: "Perception" },
        { id: "narr", label: "Narrative Drivers" }, { id: "ques", label: "Questions" },
      ]},
      { title: "Boost & Monitor", items: [
        { id: "growth", label: "Growth Actions", badge: "Soon" }, { id: "audit2", label: "Site Audit" },
        { id: "prompttrack", label: "Prompt Tracking" }, { id: "ccreate", label: "Content Creation" },
      ]},
    ],
  },
  { id: "traffic", icon: "ti-trending-up", label: "Traffic & Market" },
  { id: "local", icon: "ti-map-pin", label: "Local" },
  { id: "content", icon: "ti-file-text", label: "Content" },
  { id: "ad", icon: "ti-speakerphone", label: "Ad" },
  { id: "aipr", icon: "ti-stars", label: "AI PR" },
  { id: "social", icon: "ti-share", label: "Social" },
  { id: "reports", icon: "ti-chart-bar", label: "Reports" },
  { id: "apps", icon: "ti-apps", label: "App Center" },
  { id: "admin", icon: "ti-settings", label: "Admin Dashboard", isAdmin: true },
];

const C = { bg:'var(--bg)', surf:'var(--surf)', card:'var(--card)', border:'var(--border)', borderHov:'var(--borderHov)', cyan:'var(--cyan)', green:'var(--green)', red:'var(--red)', amber:'var(--amber)', purple:'var(--purple)', blue:'var(--blue)', text:'var(--text)', textSec:'var(--textSec)', textMuted:'var(--textMuted)' };

const Pill = ({ children, color = C.cyan }) => (
  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", padding: "2px 7px", borderRadius: 99, background: color + "18", color, border: "1px solid " + color + "30" }}>
    {children}
  </span>
);

const Delta = ({ val }) => {
  const up = val > 0;
  return (
    <span style={{ fontSize: 11, fontWeight: 500, color: up ? C.green : C.red, display: "flex", alignItems: "center", gap: 2 }}>
      <i className={`ti ${up ? "ti-trending-up" : "ti-trending-down"}`} style={{ fontSize: 11 }} />
      {Math.abs(val).toFixed(2)}%
    </span>
  );
};

const Card = ({ children, onClick, style = {}, onAIInteraction }: any) => (
  <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: "12px 14px", transition: "border-color 0.2s, transform 0.1s", cursor: onClick ? "pointer" : "default", position: 'relative', ...style }}
    onClick={onClick}
    onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderHov; if(onClick) e.currentTarget.style.transform = "translateY(-1px)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "none"; }}>
    {children}
    {onAIInteraction && (
       <div onClick={(e) => { e.stopPropagation(); onAIInteraction(); }} style={{ position: 'absolute', top: 8, right: 8, cursor: 'pointer', color: C.purple, opacity: 0.7 }}>
          <i className="ti ti-sparkles" />
       </div>
    )}
  </div>
);

const CardHeader = ({ title, subtitle, action, onAction }: any) => (
  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
    <div>
      <p style={{ fontSize: 11, fontWeight: 700, color: C.text, letterSpacing: "-0.01em" }}>{title}</p>
      {subtitle && <p style={{ fontSize: 9, color: C.textSec, marginTop: 1 }}>{subtitle}</p>}
    </div>
    {action && (
      <button 
        onClick={(e) => { e.stopPropagation(); onAction?.(); }}
        style={{ fontSize: 9, color: C.cyan, background: C.cyan + "10", border: "1px solid " + C.cyan + "20", borderRadius: 6, padding: "2px 6px", cursor: "pointer", fontWeight: 500 }}
      >
        {action}
      </button>
    )}
  </div>
);

const MetricBox = ({ label, value, delta, color, onClick }: any) => (
  <div 
    onClick={onClick} 
    className="metric-box"
    style={{ background: C.surf, borderRadius: 8, padding: "8px 10px", border: `1px solid ${C.border}`, cursor: onClick ? "pointer" : "default", transition: 'all 0.2s' }}
  >
    <p style={{ fontSize: 8.5, color: C.textSec, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 2 }}>{label}</p>
    <p style={{ fontSize: 16, fontWeight: 700, color: color || C.text, fontVariantNumeric: "tabular-nums" }}>{value}</p>
    {delta !== undefined && <div style={{ marginTop: 2, scale: 0.85, transformOrigin: 'left' }}><Delta val={delta} /></div>}
  </div>
);

const CircleProgress = ({ value, max, color, size = 64, stroke = 5 }) => {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / max) * circ;
  return (
    <svg width={size} height={size}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color + "20"} strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        transform={"rotate(-90 " + (size / 2) + " " + (size / 2) + ")" } />
      <text x={size / 2} y={size / 2 + 5} textAnchor="middle" fill={C.text} fontSize={13} fontWeight={700}>{value}</text>
    </svg>
  );
};

const DEFAULT_METRICS = {
  authorityScore: 0,
  organicTraffic: 0,
  organicKeywords: 0,
  refDomains: 0,
  backlinks: 0,
  paidKeywords: 0,
  paidTraffic: 0,
  aiVisibilityScore: 0,
  aiMentions: 0,
  citedPages: 0
};

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [activeNav, setActiveNav] = useState("seo");
  const [expandedNav, setExpandedNav] = useState(["seo"]);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [domain, setDomain] = useState("daffodilvarsity.edu.bd");
  const [metrics, setMetrics] = useState(DEFAULT_METRICS);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  // Insight State
  const [insight, setInsight] = useState<any>(null);
  const [showInsight, setShowInsight] = useState(false);
  const [insightLoading, setInsightLoading] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [chatContext, setChatContext] = useState<any>(null);
  const [showAIChat, setShowAIChat] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("searchiq_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setAuthChecked(true);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("searchiq_user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("searchiq_user");
    setActiveItem('dashboard');
    setShowProfileMenu(false);
  };

  const triggerInsight = async (element, customContext = "") => {
    setChatContext({ title: element, detail: customContext });
    setShowInsight(true);
    setInsightLoading(true);
    try {
      const res = await fetch("/api/generate-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          element, 
          context: customContext || `The user is looking at ${element} for the domain ${domain}. The current value is being analyzed for its business impact.`
        })
      });
      const data = await res.json();
      if (!res.ok || data?.error === "API_ERROR") {
        setInsight({
          title: `Insight Error: ${element}`,
          status: "CRITICAL FAILURE",
          strategicSummary: "Unable to generate AI insight because the Gemini API request failed.",
          explanation: data?.message || `Server returned status ${res.status}.`,
          currentEffect: "Live AI strategic insights are temporarily unavailable.",
          nextSteps: [
            "Verify your GEMINI_API_KEY in Settings > Secrets.",
            "Retry generating the insight once the API key is configured."
          ]
        });
      } else {
        setInsight(data);
      }
    } catch (err) {
      console.error(err);
      setInsight({ title: "Error", status: "CRITICAL FAILURE", explanation: "Failed to fetch insight." });
    } finally {
      setInsightLoading(false);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (activeItem === "dashboard" && user) {
      fetchDomainData();
    }
  }, [activeItem, domain, user]);

  useEffect(() => {
    if (user) {
      fetch('/api/notifications')
        .then(res => res.json())
        .then(data => setNotifications(data))
        .catch(err => console.error("Could not fetch notifications", err));
    }
  }, [user]);

  const fetchDomainData = async () => {
    try {
      const res = await fetch(`/api/domain/overview/${domain}`);
      const data = await res.json();
      if (!res.ok || data?.error === "API_ERROR") {
        console.warn("AI API error:", data?.message || res.status);
        return;
      }
      setMetrics({ ...DEFAULT_METRICS, ...data });
    } catch (err) {
      console.error("Failed to fetch domain data", err);
    }
  };

  const toggleNav = (id) => {
    setExpandedNav(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    if (id === 'admin') {
       setActiveItem('admin');
    } else if (id === 'seo' || id === 'home') {
       setActiveNav(id);
       setActiveItem('dashboard');
    } else if (!navItems.find(n => n.id === id)?.groups) {
       setActiveItem(id);
    }
    setActiveNav(id);
  };

  if (!authChecked) return null;
  if (!user) return <Login onLogin={handleLogin} />;

  const renderContent = () => {
    if (activeItem === 'admin') return <AdminDashboard currentUser={user} onLogout={handleLogout} onTriggerInsight={triggerInsight} />;
    
    if (activeItem === 'aivis' || activeItem === 'promptres' || activeItem === 'aiana' || activeItem === 'visover') return <AIVisibility domain={domain} mode={activeItem} onTriggerInsight={triggerInsight} />;
    if (activeItem === 'brand' || activeItem === 'percep' || activeItem === 'narr' || activeItem === 'ques') return <BrandPerformance domain={domain} mode={activeItem} onTriggerInsight={triggerInsight}  />;
    if (activeItem === 'traffic') return <TrafficMarket domain={domain} onTriggerInsight={triggerInsight} />;
    if (activeItem === 'kwover' || activeItem === 'kwmagic' || activeItem === 'kwstrat') return <KeywordResearch domain={domain} mode={activeItem} onTriggerInsight={triggerInsight} />;
    if (activeItem === 'aicomp' || activeItem === 'compare' || activeItem === 'kwgap' || activeItem === 'blgap') return <CompetitorResearch domain={domain} mode={activeItem} onTriggerInsight={triggerInsight} />;
    if (activeItem === 'ccreate' || activeItem === 'seowrite' || activeItem === 'content' || activeItem === 'topic' || activeItem === 'seotempl') return <ContentCreation domain={domain} mode={activeItem} onTriggerInsight={triggerInsight} />;
    if (activeItem === 'backlinks' || activeItem === 'refdoms' || activeItem === 'blaudit') return <LinkBuilding domain={domain} mode={activeItem} onTriggerInsight={triggerInsight} />;
    if (activeItem === 'sensor' || activeItem === 'seoquake' || activeItem === 'semrank') return <SensorDashboard domain={domain} mode={activeItem} onTriggerInsight={triggerInsight} />;
    if (activeItem === 'ad') return <AdIntel domain={domain} onTriggerInsight={triggerInsight} />;
    if (activeItem === 'social') return <SocialIntel domain={domain} onTriggerInsight={triggerInsight} />;
    if (activeItem === 'aipr') return <AIPR domain={domain} onTriggerInsight={triggerInsight} />;
    if (activeItem === 'reports') return <Reports domain={domain} onTriggerInsight={triggerInsight} />;
    if (activeItem === 'apps') return <AppCenter onTriggerInsight={triggerInsight} />;
    if (activeItem === 'pricing') return <Pricing onTriggerInsight={triggerInsight} />;
    if (activeItem === 'local') return <LocalSEO domain={domain} onTriggerInsight={triggerInsight} />;
    if (activeItem === 'growth' || activeItem === 'prompttrack') return <GrowthActions domain={domain} onTriggerInsight={triggerInsight} />;
    if (activeItem === 'audit' || activeItem === 'audit2') return <SiteAudit domain={domain} onTriggerInsight={triggerInsight} />;
    if (activeItem === 'pos') return <PositionTracking domain={domain} onTriggerInsight={triggerInsight} />;
    if (activeItem === 'organic') return <OrganicRankings domain={domain} onTriggerInsight={triggerInsight} />;
    if (activeItem === 'toppages') return <TopPages domain={domain} onTriggerInsight={triggerInsight} />;
    
    if (activeItem !== 'dashboard' && activeItem !== 'domain' && activeItem !== 'admin' && activeItem !== 'seo') {
      const activeNavDef = navItems.find(n => n.id === activeNav);
      let foundSubLabel = activeItem;
      let foundIcon = activeNavDef?.icon || "ti-sparkles";
      
      navItems.forEach(nav => {
        if (nav.groups) {
          nav.groups.forEach(g => {
            const match = g.items.find(i => i.id === activeItem);
            if (match) {
              foundSubLabel = match.label;
              foundIcon = activeNavDef?.icon || "ti-sparkles";
            }
          })
        } else if (nav.id === activeItem) {
           foundSubLabel = nav.label;
           foundIcon = nav.icon;
        }
      });

      return (
        <PlaceholderModule 
          title={foundSubLabel.charAt(0).toUpperCase() + foundSubLabel.slice(1)}
          description="This service module is currently being provisioned. Once active, it will provide high-fidelity data and advanced metrics for your domain."
          icon={foundIcon}
        />
      );
    }

    return (
      <div className="fade-in" style={{ padding: "20px 24px" }}>
        {/* Domain Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: C.textMuted }}>Home</span>
              <i className="ti ti-chevron-right" style={{ fontSize: 10, color: C.textMuted }} />
              <span style={{ fontSize: 11, color: C.textSec }}>SEO</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h1 style={{ fontSize: 19, fontWeight: 700, color: C.text, letterSpacing: "-0.03em" }}>
                SEO Dashboard:&nbsp;
                <span onClick={() => triggerInsight("Domain", `Domain: ${domain}`)} style={{ color: C.cyan, textDecoration: "none", cursor: "pointer" }}>{domain}</span>
              </h1>
              <i className="ti ti-external-link" style={{ fontSize: 14, color: C.textSec, cursor: "pointer" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ 
              fontSize: 12, 
              fontWeight: 700, 
              color: "#fff", 
              background: "linear-gradient(135deg, " + C.cyan + ", " + C.blue + ")", 
              border: "none", 
              borderRadius: 10, 
              padding: "10px 18px", 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              gap: 8,
              boxShadow: `0 4px 15px ${C.cyan}30`,
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${C.cyan}40`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 15px ${C.cyan}30`; }}
            >
              <Plus size={14} strokeWidth={3} />Create SEO Project
            </button>
            <button style={{ 
              fontSize: 12, 
              fontWeight: 600,
              color: C.text, 
              background: C.surf, 
              border: "1px solid " + C.border, 
              borderRadius: 10, 
              padding: "10px 16px", 
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.cyan; e.currentTarget.style.background = C.card; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.surf; }}
            >
              <Share2 size={14} />Share
            </button>
          </div>
        </div>

        {/* Row 1: AI Search + SEO Overview */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

          {/* AI Search Card */}
          <Card onClick={() => triggerInsight("AI Search Visibility", JSON.stringify(metrics))}>
            <CardHeader 
              title="✦ AI Visibility Dashboard" 
              subtitle="United States · Real-time Signal" 
              action="Drill down" 
              onAction={() => setActiveItem('aivis')}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 18 }}>
              <MetricBox label="AI Health" value={`${metrics.aiVisibilityScore || 30}%`} color={C.green} />
              <MetricBox label="LLM Mentions" value={metrics.aiMentions || 52} color={C.purple} />
              <MetricBox label="Citations" value={metrics.citedPages || 107} color={C.cyan} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { name: "ChatGPT Core", mentions: Math.round((metrics.aiMentions || 52) * 0.4), color: "#10b981" },
                { name: "Google-Search-L", mentions: Math.round((metrics.aiMentions || 52) * 0.35), color: "#60a5fa" },
                { name: "Claude-User-V", mentions: Math.round((metrics.aiMentions || 52) * 0.15), color: "#a78bfa" },
                { name: "Perplexity-Eng", mentions: Math.round((metrics.aiMentions || 52) * 0.1), color: "#f43f5e" },
              ].map(p => (
                <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11, color: C.textSec, width: 100, flexShrink: 0, fontWeight: 600 }}>{p.name}</span>
                  <div style={{ flex: 1, height: 6, background: p.color + "12", borderRadius: 99, overflow: 'hidden' }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(p.mentions / (metrics.aiMentions || 60)) * 100}%` }}
                      style={{ height: "100%", background: p.color, borderRadius: 99 }} 
                    />
                  </div>
                  <span style={{ fontSize: 11, color: p.color, fontWeight: 800, width: 24, textAlign: "right" }}>{p.mentions}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* SEO Metrics Card */}
          <Card onClick={() => triggerInsight("SEO Metrics Overview", JSON.stringify(metrics))}>
            <CardHeader title="Search Engine Intelligence" subtitle="Root Domain · Comprehensive Analytics" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              <MetricBox onClick={(e) => { e.stopPropagation(); triggerInsight("Authority Score", `Score: ${metrics.authorityScore}`); }} label="Authority Score" value={metrics.authorityScore} color={C.cyan} />
              <MetricBox onClick={(e) => { e.stopPropagation(); triggerInsight("Organic Traffic", `Monthly Traffic: ${metrics.organicTraffic}`); }} label="Organic Traffic" value={metrics?.organicTraffic?.toLocaleString() || "0"} delta={-2.37} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              <MetricBox onClick={(e) => { e.stopPropagation(); triggerInsight("Organic Keywords", `Keywords found: ${metrics.organicKeywords}`); }} label="Organic Keywords" value={metrics?.organicKeywords?.toLocaleString() || "0"} delta={8.97} />
              <MetricBox label="Paid Performance" value={`${metrics.paidKeywords || 0} (${((metrics.paidTraffic || 0)/1000).toFixed(1)}k)`} color={C.amber} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <MetricBox label="Ref. Domains" value={metrics?.refDomains?.toLocaleString() || "0"} delta={-5.57} />
              <MetricBox label="Backlinks" value={metrics.backlinks > 1000000 ? (metrics.backlinks / 1000000).toFixed(1) + "M" : (metrics.backlinks / 1000).toFixed(1) + "K"} delta={-4.1} />
            </div>
          </Card>
        </div>

        {/* Row 2: Position Tracking */}
        <Card onClick={() => triggerInsight("Position Tracking Tool")} style={{ marginBottom: 16 }}>
          <CardHeader title="Position Tracking" subtitle="Bangladesh (Google) · Bengali · May 7 – May 13, 2026" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {/* Visibility Chart */}
            <div style={{ borderRight: `1px solid ${C.border}`, paddingRight: 20 }}>
              <p style={{ fontSize: 13, color: C.textSec, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Visibility Impact</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
                <p style={{ fontSize: 28, fontWeight: 800, color: C.cyan, letterSpacing: "-0.04em" }}>52.8%</p>
                <Delta val={-2.64} />
              </div>
              <div style={{ height: 60 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visData}>
                    <Area type="monotone" dataKey="v" stroke={C.cyan} fill={C.cyan + "10"} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Keywords Distribution */}
            <div style={{ borderRight: `1px solid ${C.border}`, paddingRight: 20 }}>
              <p style={{ fontSize: 13, color: C.textSec, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Keyword Distribution</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[{ label: "Top 3", val: 4, c: C.green }, { label: "Top 10", val: 6, c: C.cyan }].map(k => (
                  <div key={k.label} style={{ background: C.surf, padding: 10, borderRadius: 8, border: `1px solid ${C.border}` }}>
                    <p style={{ fontSize: 10, color: C.textSec }}>{k.label}</p>
                    <p style={{ fontSize: 18, fontWeight: 700, color: k.c }}>{k.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Keywords Table */}
            <div>
              <p style={{ fontSize: 13, color: C.textSec, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Top Keywords</p>
              {topKeywords.slice(0, 3).map((k, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 11, color: C.text }}>{k.kw}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.cyan }}>#{k.pos}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* site audit etc */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
           <Card onClick={() => triggerInsight("Site Audit Scan")}>
              <CardHeader title="Site Audit" subtitle="Health score trends" />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <CircleProgress value={78} max={100} color={C.green} />
                <div style={{ fontSize: 11, color: C.textSec }}>7 errors found.</div>
              </div>
           </Card>
           <Card onClick={() => triggerInsight("On-Page SEO Ideas")}>
              <CardHeader title="On-Page Support" subtitle="60+ Optimization ideas" />
              <div style={{ height: 4, background: C.border, borderRadius: 2, marginBottom: 12 }}>
                <div style={{ height: "100%", width: "70%", background: C.purple, borderRadius: 2 }} />
              </div>
              <p style={{ fontSize: 11, color: C.textSec }}>Boost potential: High</p>
           </Card>
           <Card onClick={() => triggerInsight("Backlink Integrity")}>
              <CardHeader title="Backlink Audit" subtitle="Toxic score analysis" />
              <div style={{ padding: "8px 12px", background: `${C.green}10`, color: C.green, borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                 Toxicity Score: Low
              </div>
           </Card>
        </div>
         {/* ADDED NEW ELEMENTS */}
         <PredictiveAnalytics 
          onTriggerInsight={triggerInsight} 
          data={[
            {
              title: "Traffic Market Analysis",
              description: `Domain ${domain} holds a 14.2% share of voice in its primary niche. Traffic acquisition cost (CAC) is estimated at $2.40 per session.`,
              metric: "14.2%",
              trend: [12, 13, 15, 14, 14.2, 14.2, 14.5, 14.8, 15.2, 15.5, 16],
              type: "forecast",
              color: C.cyan,
              icon: Target
            },
            {
              title: "Authority Analysis",
              description: `Backlink profiles exhibit high quality with an 88% Trust Flow. Authority is anchored by ${metrics.refDomains} referring domains.`,
              metric: 88,
              type: "integrity",
              color: C.purple,
              icon: Shield
            }
          ]}
         />
      </div>
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: C.bg, fontFamily: "-apple-system, 'SF Pro Display', BlinkMacSystemFont, 'Segoe UI', sans-serif", color: C.text, overflow: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; scrollbar-width: thin; scrollbar-color: #1e3a5f #08101f; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #08101f; } ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 2px; }
        .nav-item:hover { background: rgba(255,255,255,0.04) !important; }
        .nav-sub:hover { background: rgba(34,211,238,0.06) !important; color: var(--cyan) !important; }
        .nav-sub.active { background: rgba(34,211,238,0.08) !important; color: var(--cyan) !important; }
        .metric-box { transition: all 0.2s ease; }
        .metric-box:hover { border-color: var(--cyan) !important; background: var(--card) !important; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        @keyframes fadeIn { from { opacity:0; transform: translateY(4px); } to { opacity:1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.3s ease forwards; }

        /* AI Markdown Styles */
        .markdown-body table { border-collapse: collapse; width: 100%; margin: 12px 0; font-size: 11px; }
        .markdown-body th, .markdown-body td { border: 1px solid var(--border); padding: 8px; text-align: left; }
        .markdown-body th { background: var(--surf); color: var(--cyan); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 900; }
        .markdown-body ul, .markdown-body ol { padding-left: 20px; margin: 8px 0; }
        .markdown-body li { margin-bottom: 4px; }
        .markdown-body code { background: rgba(255,255,255,0.05); padding: 2px 4px; borderRadius: 4px; font-family: monospace; }
      `}</style>

      {/* ── SIDEBAR ── */}
      <aside style={{ width: 180, background: C.surf, borderRight: "1px solid " + C.border, display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto" }}>
        <div style={{ padding: "12px 14px", borderBottom: "1px solid " + C.border }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Logo theme={theme} />
          </div>
        </div>

        <nav style={{ flex: 1, padding: "8px 6px" }}>
          {navItems.map(item => {
            if (item.isAdmin && user?.role !== 'admin') return null;
            const isExpanded = expandedNav.includes(item.id);
            const isActive = activeNav === item.id;
            return (
              <div key={item.id}>
                <div className="nav-item" onClick={() => item.groups ? toggleNav(item.id) : (setActiveNav(item.id), setActiveItem(item.id === 'home' ? 'dashboard' : item.id))}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 8px", borderRadius: 6, cursor: "pointer", marginBottom: 1, background: isActive ? "rgba(34,211,238,0.08)" : "transparent", transition: "background 0.15s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <i className={"ti " + item.icon} style={{ fontSize: 15, color: isActive ? C.cyan : C.textSec }} />
                    <span style={{ fontSize: 13, fontWeight: 500, color: isActive ? C.text : C.textSec }}>{item.label}</span>
                  </div>
                  {item.groups && <i className={"ti " + (isExpanded ? "ti-chevron-up" : "ti-chevron-down")} style={{ fontSize: 9, color: C.textMuted }} />}
                </div>

                {item.groups && isExpanded && (
                  <div style={{ marginBottom: 2 }}>
                    {item.groups.map(group => (
                      <div key={group.title} style={{ marginBottom: 4 }}>
                        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.textMuted, padding: "4px 8px 2px 22px" }}>{group.title}</p>
                        {group.items.map(sub => (
                          <div key={sub.id} className={"nav-sub " + (activeItem === sub.id ? "active" : "")}
                            onClick={() => setActiveItem(sub.id)}
                            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "3px 8px 3px 22px", borderRadius: 5, cursor: "pointer", fontSize: 12, color: activeItem === sub.id ? C.cyan : C.textSec, transition: "all 0.15s" }}>
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub.label}</span>
                            <div style={{ display: "flex", gap: 3 }}>
                              {sub.badge && <Pill color={C.amber}>{sub.badge}</Pill>}
                              {sub.external && <i className="ti ti-external-link" style={{ fontSize: 9, color: C.textMuted }} />}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, display: "flex", flexDirection: "row", overflow: "hidden", minHeight: 0, minWidth: 0 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
          
          {/* Top Bar */}
          <header style={{ height: 48, background: C.surf, borderBottom: "1px solid " + C.border, display: "flex", alignItems: "center", padding: "0 8px 0 20px", gap: 10, flexShrink: 0 }}>
            {/* Search/User Actions */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.03)", border: "1px solid " + C.border, borderRadius: 8, padding: "4px 10px", maxWidth: 350 }}>
              <i className="ti ti-search" style={{ fontSize: 13, color: C.textSec }} />
              <input 
                placeholder="Search domain, keyword, or topic…" 
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                style={{ background: "transparent", border: "none", outline: "none", fontSize: 12, color: C.text, flex: 1 }} 
              />
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 'auto' }}>
            <button 
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              style={{ background: C.surf, color: C.text, border: "1px solid " + C.border, borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "0.2s" }}
            >
              <i className={theme === 'dark' ? "ti ti-sun" : "ti ti-moon"} style={{ fontSize: 16 }} />
            </button>
            <div style={{ position: "relative" }}>
              <button 
                onClick={() => setShowNotifications(v => !v)}
                style={{ background: C.surf, color: C.text, border: "1px solid " + C.border, borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}
              >
                <i className="ti ti-bell-ringing" style={{ fontSize: 16 }} />
                {notifications.some(n => !n.read) && (
                  <span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, background: C.red, borderRadius: "50%", border: "2px solid " + C.surf }} />
                )}
              </button>

              {showNotifications && (
                <div style={{ position: "absolute", top: 40, right: 0, width: 320, background: C.card, border: "1px solid " + C.border, borderRadius: 12, padding: "16px 0", zIndex: 100, boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>
                   <div style={{ padding: "0 16px 12px", borderBottom: "1px solid " + C.border, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>Notifications</span>
                  </div>
                  <div style={{ maxHeight: 300, overflowY: "auto" }}>
                     {notifications.map(n => (
                        <div key={n.id} style={{ padding: "12px 16px", borderBottom: "1px solid " + C.border, fontSize: 12, display: 'flex', gap: 10 }}>
                           <div style={{ marginTop: 2, flexShrink: 0 }}><i className={"ti " + (n.type === 'error' ? 'ti-alert-triangle' : 'ti-info-circle')} style={{ color: n.type === 'error' ? C.red : C.blue, fontSize: 14 }} /></div>
                           <div>
                             <p style={{ fontWeight: 600, color: C.text, marginBottom: 2 }}>{n.title}</p>
                             <p style={{ color: C.textSec }}>{n.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
                </div>
              )}
            </div>
            </div>
            
            <div style={{ position: "relative" }}>
              <div 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                style={{ display: "flex", alignItems: "center", gap: 10, background: C.surf, border: "1px solid " + C.border, borderRadius: 12, padding: "4px 12px 4px 6px", cursor: "pointer" }}
              >
                 <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, " + C.cyan + ", " + C.blue + ")", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>
                   {user.name.charAt(0)}
                 </div>
                 <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>{user.name}</span>
                    <span style={{ fontSize: 9, color: C.textMuted }}>{user.role}</span>
                 </div>
              </div>

              {showProfileMenu && (
                <div style={{ position: "absolute", top: 44, right: 0, width: 180, background: C.card, border: "1px solid " + C.border, borderRadius: 12, padding: 8, zIndex: 100, boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
                   {user.role === 'admin' && (
                     <button onClick={() => { setActiveItem('admin'); setShowProfileMenu(false); }} style={{ width: "100%", padding: "8px 10px", background: "transparent", border: "none", borderRadius: 8, color: C.text, fontSize: 12, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                       <Shield size={14} /> Admin Dash
                     </button>
                   )}
                   <button onClick={() => { setActiveItem('admin'); setShowProfileMenu(false); }} style={{ width: "100%", padding: "8px 10px", background: "transparent", border: "none", borderRadius: 8, color: C.text, fontSize: 12, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                     <UserIcon size={14} /> Profile
                   </button>
                   <div style={{ height: 1, background: C.border, margin: "4px 0" }} />
                   <button onClick={handleLogout} style={{ width: "100%", padding: "8px 10px", background: "transparent", border: "none", borderRadius: 8, color: C.red, fontSize: 12, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                     <LogOut size={14} /> Logout
                   </button>
                </div>
              )}
            </div>
          </header>

          <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
            {renderContent()}
          </div>
        </div>
      </main>

      {/* FAB */}
      <button 
        onClick={() => setShowAIChat(prev => !prev)}
        style={{ position: 'fixed', bottom: 20, right: 20, margin: '16px', background: 'transparent', color: C.red, border: 'none', cursor: 'pointer', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', filter: `drop-shadow(0 0 12px rgba(244,63,94,0.6))`, transition: 'transform 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Target size={36} />
      </button>

      <AIChatModal 
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        context={chatContext}
      />

      <InsightModal 
        isOpen={showInsight} 
        onClose={() => setShowInsight(false)} 
        loading={insightLoading} 
        data={insight} 
      />
    </div>
  );
}
