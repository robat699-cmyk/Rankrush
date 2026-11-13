import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, ZAxis, Cell } from "recharts";
import { motion, AnimatePresence } from "motion/react";
import { Search, Sparkles, Wand2, Target, Layers, TrendingUp, BarChart3, Filter, MoreHorizontal, Download, Globe, Cpu, Activity, Zap, Command, Menu, MessageSquare, Shield } from "lucide-react";
import AIChatModal from "./AIChatModal";

import PredictiveAnalytics from "./PredictiveAnalytics";

const C = { bg:'var(--bg)', surf:'var(--surf)', card:'var(--card)', border:'var(--border)', borderHov:'var(--borderHov)', cyan:'var(--cyan)', green:'var(--green)', red:'var(--red)', amber:'var(--amber)', purple:'var(--purple)', blue:'var(--blue)', text:'var(--text)', textSec:'var(--textSec)', textMuted:'var(--textMuted)' };


const Card = ({ children, onClick, style = {} }: any) => (
  <motion.div 
    whileHover={onClick ? { y: -4, borderColor: C.cyan, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' } : {}}
    onClick={onClick}
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

const AnalysisResultsModal = ({ data, onClose }: any) => {
  if (!data) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Card style={{ width: 400, maxWidth: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
           <h3 style={{ fontSize: 18, fontWeight: 950 }}>Analysis Results</h3>
           <button onClick={onClose} style={{ background: C.surf, border: `1px solid ${C.border}`, borderRadius: 8, padding: '4px 12px', cursor: 'pointer', color: C.text }}>Close</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: C.surf, padding: 12, borderRadius: 8 }}><strong>Volume:</strong> {data.volume || 'N/A'}</div>
            <div style={{ background: C.surf, padding: 12, borderRadius: 8 }}><strong>Difficulty:</strong> {data.difficulty || 'N/A'}</div>
            <div style={{ background: C.surf, padding: 12, borderRadius: 8 }}><strong>CPC:</strong> {data.cpc || 'N/A'}</div>
        </div>
      </Card>
    </div>
  )
}

export default function KeywordResearch({ domain, mode, onTriggerInsight }: any) {
  const [keyword, setKeyword] = useState("marketing engine");
  const [analyzing, setAnalyzing] = useState(false);
  const [data, setData] = useState<any>(null);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  const handleAnalyze = async () => {
    if (!keyword) return;
    setAnalyzing(true);
    try {
      const res = await fetch("/api/keywords/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, mode })
      });
      const result = await res.json();
      setData(result);
      setShowAnalysisModal(true);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  const renderOverview = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fade-in">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <button onClick={() => setIsAIChatOpen(true)} style={{ padding: '8px 16px', background: C.surf, border: `1px solid ${C.border}`, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 900, cursor: 'pointer' }}><MessageSquare size={14} color={C.cyan} /> AI ANALYST</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
            {[
                { l: 'Global Volume', v: data?.volume || '128K', c: C.cyan, i: Globe },
                { l: 'Difficulty', v: `${data?.difficulty || '42'}%`, c: (data?.difficulty > 60 ? C.red : C.green), i: Target },
                { l: 'Avg CPC', v: data?.cpc || '$2.45', c: C.amber, i: TrendingUp },
                { l: 'Search Intent', v: data?.intent || 'Commercial', c: C.purple, i: Sparkles }
            ].map((s, i) => (
                <Card key={i} onClick={() => onTriggerInsight(s.l)} style={{ padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: `${s.c}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <s.i size={14} color={s.c} />
                        </div>
                    </div>
                    <div style={{ fontSize: 9, fontWeight: 900, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.l}</div>
                    <div style={{ fontSize: 20, fontWeight: 950, color: C.text, marginTop: 2, letterSpacing: '-0.02em', fontFamily: 'monospace' }}>{s.v}</div>
                </Card>
            ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 16 }}>
            <Card style={{ padding: 0 }}>
                <div style={{ padding: 16, borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: 13, fontWeight: 900 }}>Volume Trajectory</h3>
                </div>
                <div style={{ height: 140, padding: 16 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[{v:100}, {v:120}, {v:180}, {v:150}, {v:210}, {v:250}].map((d, i) => ({...d, date: i}))}>
                            <defs>
                                <linearGradient id="k-cyan" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.cyan} stopOpacity={0.3}/><stop offset="100%" stopColor={C.cyan} stopOpacity={0}/></linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={`${C.border}20`} vertical={false} />
                            <XAxis hide />
                            <YAxis hide />
                            <Tooltip contentStyle={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}` }} />
                            <Area type="monotone" dataKey="v" stroke={C.cyan} strokeWidth={4} fill="url(#k-cyan)" dot={{ fill: C.cyan, r: 4, stroke: C.card, strokeWidth: 2 }} activeDot={{ r: 8, fill: C.cyan }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card style={{ padding: 0 }}>
                 <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}` }}>
                    <h3 style={{ fontSize: 13, fontWeight: 900 }}>SERP Competitors</h3>
                 </div>
                 <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {['Wikipedia', 'Semrush', 'Forbes', 'Moz', 'Reddit', 'Hubspot', 'Ahrefs', 'SearchEngineLand', 'Backlinko', 'NeilPatel', 'SEOJournal', 'Google', 'Bing', 'Yahoo'].map((comp, i) => (
                        <div key={i} style={{ padding: '6px 10px', background: i === 0 ? `${C.cyan}10` : `${C.surf}40`, borderRadius: 6, border: `1px solid ${i === 0 ? `${C.cyan}40` : C.border}40`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: i === 0 ? C.cyan : C.textMuted }} />
                                <span style={{ fontSize: 10, fontWeight: 850, color: i === 0 ? C.cyan : C.text }}>{comp}.com</span>
                            </div>
                            <span style={{ fontSize: 9, color: C.textMuted, fontWeight: 900 }}>RANK {i+1}</span>
                        </div>
                    ))}
                 </div>
                 <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}` }}>
                    <button onClick={() => onTriggerInsight("Competitor Landscape Scan")} style={{ width: '100%', padding: '8px', borderRadius: 6, background: C.surf, border: `1px solid ${C.border}`, color: C.text, fontWeight: 900, cursor: 'pointer', fontSize: 10 }}>PROBE ENTIRE SERP</button>
                 </div>
            </Card>
        </div>
    </motion.div>
  );

  const renderMagicUI = () => (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="fade-in">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <button onClick={() => setIsAIChatOpen(true)} style={{ padding: '8px 16px', background: C.surf, border: `1px solid ${C.border}`, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 900, cursor: 'pointer' }}><MessageSquare size={14} color={C.cyan} /> AI ANALYST</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 250px', gap: 16 }}>
            <Card style={{ padding: 0 }}>
                <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: 13, fontWeight: 900 }}>Key Variant Oscillations</h3>
                    <div style={{ display: 'flex', gap: 8 }}>
                         <button style={{ padding: '6px 12px', background: C.surf, border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 9, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 6 }}><Filter size={12} /> FILTER</button>
                         <button style={{ padding: '6px 12px', background: C.surf, border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 9, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 6 }}><Download size={12} /> EXPORT</button>
                    </div>
                </div>
                <div style={{ padding: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {['seo best practices', 'marketing strategy', 'adwords guide', 'search console tips', 'backlink strategy', 'content audit', 'local seo strategies', 'technical seo audit', 'link building techniques', 'keyword density analysis', 'on-page seo checklist', 'off-page seo tactics', 'semantic search optimization', 'voice search seo', 'mobile first indexing', 'core web vitals guide', 'seo reporting metrics', 'competitor gap analysis', 'structured data syntax', 'international seo setup'].map((k, i) => (
                            <motion.div 
                                key={i} 
                                whileHover={{ background: `${C.cyan}05`, x: 4 }}
                                style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) 1fr 1fr 1fr 30px', padding: '8px 12px', borderRadius: 6, fontSize: 10, cursor: 'pointer', borderBottom: i === 19 ? 'none' : `1px solid ${C.border}40` }}
                            >
                                <span style={{ fontWeight: 900, color: C.text }}>{k}</span>
                                <span style={{ color: C.textSec, fontWeight: 800 }}>{(12.4 - i * 0.5).toFixed(1)}k vol</span>
                                <span style={{ color: i % 3 === 0 ? C.red : i % 3 === 1 ? C.amber : C.green, fontWeight: 900 }}>{i % 3 === 0 ? 'DIFF 84' : i % 3 === 1 ? 'DIFF 42' : 'DIFF 12'}</span>
                                <span style={{ color: C.textMuted, fontWeight: 700 }}>${(2.45 - i * 0.05).toFixed(2)} CPV</span>
                                <MoreHorizontal size={14} color={C.textMuted} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Card>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <Card style={{ padding: 32 }}>
                    <h4 style={{ fontSize: 11, fontWeight: 950, color: C.textMuted, textTransform: 'uppercase', marginBottom: 24, letterSpacing: '0.1em' }}>INTENT TOPOLOGY</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {[
                            { l: 'Informational', p: '62%', c: C.cyan },
                            { l: 'Navigational', p: '12%', c: C.purple },
                            { l: 'Commercial', p: '26%', c: C.amber }
                        ].map((int, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 10 }}>
                                    <span style={{ color: C.text, fontWeight: 850 }}>{int.l}</span>
                                    <span style={{ color: C.textMuted, fontWeight: 900 }}>{int.p}</span>
                                </div>
                                <div style={{ height: 6, background: `${C.surf}80`, borderRadius: 3, overflow: 'hidden' }}>
                                    <motion.div initial={{ width: 0 }} animate={{ width: int.p }} style={{ height: '100%', background: int.c, borderRadius: 3 }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card style={{ background: `linear-gradient(135deg, ${C.cyan}10, ${C.card})` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <Zap size={18} color={C.cyan} />
                        <span style={{ fontSize: 12, fontWeight: 950, color: C.text }}>VULNERABILITY DETECTED</span>
                    </div>
                    <div style={{ fontSize: 13, color: C.textSec, lineHeight: 1.6 }}>"SEO strategy" has experienced a 40% difficulty drop in the last 24h. High opportunity point.</div>
                </Card>
            </div>
        </div>
    </motion.div>
  );

  const renderStrategyUI = () => (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="fade-in">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <button onClick={() => setIsAIChatOpen(true)} style={{ padding: '8px 16px', background: C.surf, border: `1px solid ${C.border}`, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 900, cursor: 'pointer' }}><MessageSquare size={14} color={C.cyan} /> AI ANALYST</button>
        </div>
        <Card style={{ marginBottom: 32, padding: 40, background: `linear-gradient(135deg, ${C.purple}10, ${C.card})`, border: `1px solid ${C.purple}30` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                     <h3 style={{ fontSize: 24, fontWeight: 950, color: C.text, letterSpacing: '-0.03em' }}>Semantic Cluster Mapping</h3>
                     <p style={{ fontSize: 16, color: C.textSec, marginTop: 4 }}>AI-driven deconstruction of keywords into high-authority topical islands.</p>
                </div>
                <button onClick={() => onTriggerInsight("Cluster Logic Builder")} style={{ padding: '16px 32px', background: C.purple, color: '#fff', border: 'none', borderRadius: 16, fontWeight: 950, cursor: 'pointer', boxShadow: `0 8px 32px ${C.purple}40` }}>PROJECT CLUSTERS</button>
            </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
                { title: 'Core Authority Node', count: 12, traffic: '1.2k', tags: ['SEO', 'Core'], c: C.cyan },
                { title: 'Growth Expansion', count: 8, traffic: '500', tags: ['Ads', 'PPC'], c: C.amber },
                { title: 'Niche Dominance', count: 24, traffic: '3.4k', tags: ['Expert', 'Dev'], c: C.purple }
            ].map((node, i) => (
                <Card key={i} style={{ padding: 32 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 16, background: `${node.c}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                        <Layers size={24} color={node.c} />
                    </div>
                    <h4 style={{ fontSize: 20, fontWeight: 950, color: C.text }}>{node.title}</h4>
                    <div style={{ display: 'flex', gap: 20, marginTop: 12, marginBottom: 32 }}>
                        <div>
                            <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 900, textTransform: 'uppercase' }}>Nodes</div>
                            <div style={{ fontSize: 18, fontWeight: 950, color: C.text }}>{node.count}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 900, textTransform: 'uppercase' }}>Volume</div>
                            <div style={{ fontSize: 18, fontWeight: 950, color: C.text }}>{node.traffic}</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        {node.tags.map((t, idx) => (
                            <span key={idx} style={{ padding: '6px 14px', background: `${node.c}05`, border: `1px solid ${node.c}20`, borderRadius: 10, fontSize: 11, fontWeight: 900, color: node.c }}>{t}</span>
                        ))}
                    </div>
                    <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 6, color: C.textMuted, cursor: 'pointer' }} onClick={() => onTriggerInsight("Node Detailed Scan")}>
                        <span style={{ fontSize: 12, fontWeight: 900 }}>EXPLORE NODE</span>
                        <MoreHorizontal size={14} />
                    </div>
                </Card>
            ))}
        </div>
    </motion.div>
  );

  const getHeader = () => {
    if (mode === "kwover") return { t: "Keyword Topology", d: "High-resolution metric analysis of search query mechanics." };
    if (mode === "kwmagic") return { t: "Magic Grid Tool", d: "Automated search volume and difficulty matrix for semantic variants." };
    if (mode === "kwstrat") return { t: "Strategy Blueprint", d: "Intelligent cluster mapping for topical authority building." };
    return { t: "Keyword Engineering", d: "Data-driven research environment." };
  };

  const info = getHeader();

  return (
    <div style={{ padding: "40px 48px", background: C.bg, minHeight: '100%' }}>
      <div style={{ marginBottom: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
           <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
             <div style={{ width: 40, height: 40, borderRadius: 12, background: `${C.cyan}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Command size={22} color={C.cyan} />
             </div>
             <span style={{ fontSize: 13, fontWeight: 900, color: C.cyan, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Neural Keyword Search</span>
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 950, color: C.text, letterSpacing: '-0.05em' }}>{info.t}</h1>
          <p style={{ color: C.textSec, fontSize: 16, marginTop: 8 }}>{info.d}</p>
        </div>

        <div style={{ display: 'flex', gap: 12, width: '100%', maxWidth: 500 }}>
            <div style={{ flex: 1, position: 'relative' }}>
                <Search size={20} color={C.textMuted} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Enter seed keyword..."
                    style={{ width: '100%', background: C.card, border: `1px solid ${C.border}`, padding: '18px 24px 18px 56px', borderRadius: 20, color: C.text, fontSize: 16, outline: 'none', fontWeight: 700, transition: '0.3s' }}
                />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAnalyze}
              disabled={analyzing}
              style={{ background: C.cyan, color: '#000', border: 'none', padding: '0 32px', borderRadius: 20, fontWeight: 950, cursor: analyzing ? 'not-allowed' : 'pointer', fontSize: 14, letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 10 }}
            >
              {analyzing ? 'SYNCING...' : <><Wand2 size={18} /> RESEARCH</>}
            </motion.button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {analyzing ? (
          <motion.div 
            key="analyzing"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ height: 190, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24 }}
          >
              <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 64, height: 64, border: `4px solid ${C.cyan}20`, borderTopColor: C.cyan, borderRadius: 20 }} />
              <p style={{ fontWeight: 900, color: C.textMuted, letterSpacing: '0.2em', fontSize: 13 }}>REFINING TOPOLOGY MAP...</p>
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {mode === "kwover" && renderOverview()}
            {mode === "kwmagic" && renderMagicUI()}
            {mode === "kwstrat" && renderStrategyUI()}
            {!data && mode === "kwover" && (
                <Card style={{ padding: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', textAlign: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: 24, background: `${C.cyan}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                        <Search size={40} color={C.cyan} />
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 950 }}>Initialize Topology Scan</h3>
                    <p style={{ fontSize: 16, color: C.textMuted, marginTop: 8, maxWidth: 400 }}>Enter a strategic seed term above to deconstruct market density and semantic networks.</p>
                </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {showAnalysisModal && <AnalysisResultsModal data={data} onClose={() => setShowAnalysisModal(false)} />}
      <AIChatModal isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} context={info.t} />
      
      <PredictiveAnalytics 
        onTriggerInsight={onTriggerInsight} 
        data={[
          {
            title: "Traffic Market Analysis",
            description: "Keyword volume trends are projecting a 12% increase in high-intent keyword availability for the next cycle.",
            metric: "+12%",
            trend: [10, 11, 13, 12, 14, 15, 14, 16, 17, 18, 20],
            type: "forecast",
            color: C.cyan,
            icon: Target
          },
          {
            title: "Authority Consistency",
            description: "Topic cluster authority remains strong with a 92% semantic connectivity score across target keywords.",
            metric: 92,
            type: "integrity",
            color: C.purple,
            icon: Shield
          }
        ]}
      />
    </div>
  );
}
 