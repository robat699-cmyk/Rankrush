import React, { useState, useEffect } from "react";
import { Search, ArrowUpRight, ArrowDownRight, Globe, Filter, ExternalLink, Activity, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import PredictiveAnalytics from "./PredictiveAnalytics";

const C = { bg:'var(--bg)', surf:'var(--surf)', card:'var(--card)', border:'var(--border)', borderHov:'var(--borderHov)', cyan:'var(--cyan)', green:'var(--green)', red:'var(--red)', amber:'var(--amber)', purple:'var(--purple)', blue:'var(--blue)', text:'var(--text)', textSec:'var(--textSec)', textMuted:'var(--textMuted)' };

const Card = ({ children, style = {}, onClick, onAIInteraction }: any) => (
  <motion.div 
    whileHover={onClick ? { y: -4, borderColor: C.cyan, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' } : {}}
    onClick={onClick}
    onMouseEnter={() => onAIInteraction?.("hover")}
    style={{ 
      background: C.card, 
      border: `1px solid ${C.border}`, 
      borderRadius: 24, 
      padding: 32, 
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", 
      cursor: onClick ? "pointer" : "default",
      position: "relative",
      overflow: 'hidden',
      ...style 
    }}
  >
    {children}
  </motion.div>
);

export default function OrganicRankings({ domain, onTriggerInsight }: any) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/domain/organic?domain=${encodeURIComponent(domain || 'yourdomain.com')}`);
        const result = await res.json();
        setData(Array.isArray(result) ? result : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [domain]);

  const filteredData = data.filter(r => 
    (r.kw || r.margin || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade-in" style={{ padding: "40px 48px", background: C.bg, minHeight: '100%' }}>
      <div style={{ marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
             <div style={{ width: 40, height: 40, borderRadius: 12, background: `${C.cyan}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Globe size={22} color={C.cyan} />
             </div>
             <span style={{ fontSize: 13, fontWeight: 900, color: C.cyan, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Organic Search Intelligence</span>
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 950, color: C.text, letterSpacing: '-0.05em' }}>Organic Rankings</h1>
          <p style={{ color: C.textSec, fontSize: 16, marginTop: 8 }}>Top 100 keywords ranking for <strong>{domain}</strong> in global search vectors.</p>
        </div>
        <div style={{ position: "relative" }}>
           <Search size={18} color={C.textMuted} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
           <input 
             placeholder="Filter keywords..." 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text, padding: "14px 16px 14px 44px", borderRadius: 12, outline: "none", fontSize: 14, fontWeight: 600, width: 300 }} 
           />
        </div>
      </div>

      <Card style={{ padding: 0 }}>
        <div style={{ padding: 32, borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Activity size={20} color={C.cyan} />
                <h2 style={{ fontSize: 18, fontWeight: 900 }}>Keyword Registry</h2>
            </div>
            {loading && <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 800 }}>SYNCHRONIZING...</div>}
        </div>
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", background: `${C.surf}40`, borderBottom: `1px solid ${C.border}`, color: C.textMuted, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  <th style={{ padding: "20px 24px", fontWeight: 950 }}>KEYWORD</th>
                  <th style={{ padding: "20px 24px", fontWeight: 950, textAlign: "center" }}>POS</th>
                  <th style={{ padding: "20px 24px", fontWeight: 950, textAlign: "center" }}>DIFF</th>
                  <th style={{ padding: "20px 24px", fontWeight: 950, textAlign: "right" }}>VOLUME</th>
                  <th style={{ padding: "20px 24px", fontWeight: 950, textAlign: "right" }}>KD%</th>
                  <th style={{ padding: "20px 24px", fontWeight: 950, textAlign: "right" }}>TARGET URL</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((r, i) => {
                  const diff = (r.prev || 0) - (r.pos || 0);
                  return (
                    <motion.tr 
                        key={i} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.01 }}
                        style={{ borderBottom: `1px solid ${C.border}40`, transition: '0.2s' }}
                    >
                      <td style={{ padding: "20px 24px", fontSize: 14, color: C.cyan, fontWeight: 800 }}>{r.kw || r.margin}</td>
                      <td style={{ padding: "20px 24px", fontSize: 15, fontWeight: 950, textAlign: "center", color: r.pos <= 3 ? C.amber : C.text }}>{r.pos}</td>
                      <td style={{ padding: "20px 24px", fontSize: 12, textAlign: "center", fontWeight: 900 }}>
                        {diff > 0 ? (
                            <div style={{ color: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}><ArrowUpRight size={14} /> +{diff}</div>
                        ) : diff < 0 ? (
                            <div style={{ color: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}><ArrowDownRight size={14} /> {diff}</div>
                        ) : (
                            <span style={{ color: C.textMuted }}>-</span>
                        )}
                      </td>
                      <td style={{ padding: "20px 24px", fontSize: 14, textAlign: "right", fontWeight: 800, color: C.textSec }}>{r.vol?.toLocaleString?.() || '0'}</td>
                      <td style={{ padding: "20px 24px", textAlign: "right" }}>
                        <div style={{ 
                            display: "inline-block", 
                            background: r.kd > 70 ? `${C.red}15` : r.kd > 40 ? `${C.amber}15` : `${C.green}15`, 
                            color: r.kd > 70 ? C.red : r.kd > 40 ? C.amber : C.green, 
                            border: `1px solid ${r.kd > 70 ? C.red : r.kd > 40 ? C.amber : C.green}30`,
                            padding: "4px 10px", 
                            borderRadius: 8, 
                            fontWeight: 900,
                            fontSize: 11
                        }}>
                            {r.kd} KD
                        </div>
                      </td>
                      <td style={{ padding: "20px 24px", textAlign: "right" }}>
                         <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: C.textMuted, transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.color = C.cyan} onMouseOut={e => e.currentTarget.style.color = C.textMuted}>
                            <ExternalLink size={16} />
                         </a>
                      </td>
                    </motion.tr>
                  )
                })}
                {loading && data.length === 0 && <tr><td colSpan={6} style={{ padding: 40, textAlign: "center", color: C.textSec, fontWeight: 800 }}>SYNCHRONIZING NEURAL MAP...</td></tr>}
                {!loading && filteredData.length === 0 && <tr><td colSpan={6} style={{ padding: 40, textAlign: "center", color: C.textSec, fontWeight: 800 }}>NO NODES FOUND IN THIS SECTOR</td></tr>}
              </tbody>
            </table>
        </div>
      </Card>

      <div style={{ marginTop: 40 }}>
        <PredictiveAnalytics 
          onTriggerInsight={onTriggerInsight} 
          data={[
            {
              title: "Traffic Market Analysis",
              description: `Organic ranking distribution for ${domain} shows a 32% capture of high-intent keywords in the SERP market.`,
              metric: "32%",
              trend: [28, 29, 31, 30, 32, 33, 32, 34, 35, 36, 38],
              type: "forecast",
              color: C.cyan,
              icon: Globe
            },
            {
              title: "Authority Consistency",
              description: "Ranking nodes maintain a 89% stability rate across the last 3 major algorithmic volatility windows.",
              metric: 89,
              type: "integrity",
              color: C.purple,
              icon: Shield
            }
          ]}
        />
      </div>
    </div>
  );
} 
