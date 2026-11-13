import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell } from "recharts";
import { Search, TrendingUp, TrendingDown, Minus, Target, Shield } from "lucide-react";

import PredictiveAnalytics from "./PredictiveAnalytics";

const C = { bg:'var(--bg)', surf:'var(--surf)', card:'var(--card)', border:'var(--border)', borderHov:'var(--borderHov)', cyan:'var(--cyan)', green:'var(--green)', red:'var(--red)', amber:'var(--amber)', purple:'var(--purple)', blue:'var(--blue)', text:'var(--text)', textSec:'var(--textSec)', textMuted:'var(--textMuted)' };


const Card = ({ children, style = {}, onClick }: any) => (
  <div onClick={onClick} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 22px", cursor: onClick ? 'pointer' : 'default', transition: '0.2s border-color', ...style }}>
    {children}
  </div>
);

export default function PositionTracking({ domain, onTriggerInsight }: any) {
  const [keyword, setKeyword] = useState("enterprise seo software");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  
  const fetchRankings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/rankings/search?query=${encodeURIComponent(keyword)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchRankings();
  }, []);

  return (
    <div className="fade-in" style={{ padding: "20px 24px", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text }}>Position Tracking</h1>
          <p style={{ color: C.textSec, fontSize: 13, marginTop: 4 }}>Realtime Google SERP tracker.</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <input
             value={keyword}
             onChange={e => setKeyword(e.target.value)}
             placeholder="Enter keyword..."
             style={{ background: C.surf, border: `1px solid ${C.border}`, color: C.text, padding: "8px 16px", borderRadius: 8, outline: "none", width: 240, fontSize: 13 }}
          />
          <button onClick={fetchRankings} disabled={loading} style={{ background: C.cyan, color: C.bg, border: "none", padding: '8px 16px', borderRadius: 8, fontSize: 13, cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 8, opacity: loading ? 0.5 : 1 }}>
            <Search size={16} /> {loading ? "Scanning..." : "Check Rank"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
        <Card>
           <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Live SERP Results for "{keyword}"</h2>
           <table style={{ width: "100%", borderCollapse: "collapse" }}>
             <thead>
               <tr style={{ textAlign: "left", borderBottom: `1px solid ${C.border}`, color: C.textSec, fontSize: 12 }}>
                 <th style={{ padding: "12px 8px", fontWeight: 500, width: 60 }}>Pos</th>
                 <th style={{ padding: "12px 8px", fontWeight: 500 }}>Title & URL</th>
                 <th style={{ padding: "12px 8px", fontWeight: 500 }}>Highlights</th>
               </tr>
             </thead>
             <tbody>
               {results.map((r, i) => (
                 <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: r.url.includes(domain) ? `${C.cyan}10` : 'transparent' }}>
                   <td style={{ padding: "16px 8px", fontSize: 16, fontWeight: 700, color: C.text }}>#{r.position}</td>
                   <td style={{ padding: "16px 8px", fontSize: 13 }}>
                     <div style={{ color: C.cyan, fontWeight: 600, marginBottom: 4 }}>{r.title}</div>
                     <div style={{ color: C.textSec, fontSize: 11 }}>{r.url}</div>
                   </td>
                   <td style={{ padding: "16px 8px", fontSize: 12, color: C.textSec, lineHeight: 1.4 }}>
                      {r.snippet}
                   </td>
                 </tr>
               ))}
               {!results.length && !loading && (
                 <tr>
                   <td colSpan={3} style={{ padding: 24, textAlign: 'center', color: C.textSec }}>
                     No results found.
                   </td>
                 </tr>
               )}
               {loading && (
                 <tr>
                   <td colSpan={3} style={{ padding: 24, textAlign: 'center', color: C.textSec }}>
                     Scraping Search Engine results...
                   </td>
                 </tr>
               )}
             </tbody>
           </table>
        </Card>
      </div>

        {/* ADDED NEW ELEMENTS */}
        <PredictiveAnalytics 
          onTriggerInsight={onTriggerInsight} 
          data={[
            {
              title: "Traffic Market Analysis",
              description: `Position tracking data suggests a 24% volatility in target market clusters. Maintaining top 3 positions will stabilize traffic share.`,
              metric: "24%",
              trend: [20, 22, 21, 23, 25, 24, 26, 25, 28, 27, 30],
              type: "forecast",
              color: C.cyan,
              icon: Target
            },
            {
              title: "Authority Consistency",
              description: "Ranking integrity remains at 90% despite recent algorithmic shifts in the Bangladesh search vector.",
              metric: 90,
              type: "integrity",
              color: C.purple,
              icon: Shield
            }
          ]}
        />
    </div>
  );
} 