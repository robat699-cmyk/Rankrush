import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Treemap, Cell } from "recharts";
import { Target, TrendingUp, DollarSign, Eye, PieChart as PieIcon, ExternalLink, Zap, Shield, Search, Layout, MousePointer2, BarChart3, Globe, Sparkles, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import PredictiveAnalytics from "./PredictiveAnalytics";

const C = { bg:'var(--bg)', surf:'var(--surf)', card:'var(--card)', border:'var(--border)', borderHov:'var(--borderHov)', cyan:'var(--cyan)', green:'var(--green)', red:'var(--red)', amber:'var(--amber)', purple:'var(--purple)', blue:'var(--blue)', text:'var(--text)', textSec:'var(--textSec)', textMuted:'var(--textMuted)' };

const Card = ({ children, style = {}, onClick }: any) => (
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

const treeMapData = [
  { name: "Google Search", size: 400, color: C.cyan },
  { name: "YouTube", size: 300, color: C.purple },
  { name: "Meta App", size: 300, color: C.blue },
  { name: "Google Display", size: 200, color: C.amber },
  { name: "TikTok", size: 150, color: C.green },
];

export default function AdIntel({ domain, onTriggerInsight }: any) {
  const [platform, setPlatform] = useState("All");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/domain/adintel?domain=${encodeURIComponent(domain || 'yourdomain.com')}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [domain]);

  return (
    <div className="fade-in" style={{ padding: "40px 48px", background: C.bg, minHeight: '100%' }}>
      {/* Header Evolution */}
      <div style={{ marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
             <div style={{ width: 40, height: 40, borderRadius: 12, background: `${C.purple}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={22} color={C.purple} />
             </div>
             <span style={{ fontSize: 13, fontWeight: 900, color: C.purple, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Adversarial Acquisition Intel</span>
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 950, color: C.text, letterSpacing: '-0.05em' }}>Neural Ad Command</h1>
          <p style={{ color: C.textSec, fontSize: 16, marginTop: 8 }}>Deconstructing paid vectors and competitor budget topology for <strong>{domain}</strong>.</p>
        </div>
        <div style={{ display: "flex", background: C.card, padding: 6, borderRadius: 16, border: `1px solid ${C.border}` }}>
          {["All", "Google", "Meta", "TikTok"].map(p => (
            <button key={p} onClick={() => setPlatform(p)} style={{ background: platform === p ? C.purple : "transparent", color: platform === p ? "#fff" : C.textSec, border: "none", padding: '10px 20px', borderRadius: 12, fontSize: 13, cursor: "pointer", fontWeight: 800, transition: '0.2s' }}>
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Global Meta-Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 40 }}>
        {[
          { label: "Est. Ad Intensity", val: data?.metrics?.spend || '$4.2M', delta: "↑ 22%", color: C.purple, icon: <DollarSign size={18} /> },
          { label: "PPC Vector Nodes", val: data?.metrics?.keywords?.toLocaleString() || '12,482', delta: "+482 New", color: C.cyan, icon: <Target size={18} /> },
          { label: "Bid Velocity (CPC)", val: data?.metrics?.cpc || '$2.42', delta: "↓ 4.1%", color: C.amber, icon: <MousePointer2 size={18} /> },
          { label: "Live Deployment", val: data?.metrics?.activeAds || '114', delta: "5 Regions", color: C.blue, icon: <Globe size={18} /> },
        ].map(item => (
          <Card key={item.label} onClick={() => onTriggerInsight(item.label)} style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
               <div style={{ color: item.color }}>{item.icon}</div>
               <span style={{ fontSize: 11, fontWeight: 900, color: C.textMuted, textTransform: "uppercase", letterSpacing: '0.05em' }}>{item.label}</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 950, color: item.color, letterSpacing: '-0.02em' }}>{item.val}</div>
            <div style={{ fontSize: 10, color: C.green, marginTop: 12, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 4 }}>
                <ArrowUpRight size={12} /> {item.delta} VS 30D EPOCH
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)", gap: 32, marginBottom: 40 }}>
        <Card onClick={() => onTriggerInsight("Temporal Flux Analysis")} style={{ padding: 0 }}>
            <div style={{ padding: 32, borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <BarChart3 size={20} color={C.cyan} />
                    <h2 style={{ fontSize: 18, fontWeight: 900 }}>Global PPC Visibility Map</h2>
                </div>
                {loading && <Loader2 className="animate-spin" size={18} color={C.cyan} />}
            </div>
            <div style={{ padding: 32 }}>
                <div style={{ height: 380, width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data?.trendData || []}>
                            <defs>
                                <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.cyan} stopOpacity={0.3}/><stop offset="95%" stopColor={C.cyan} stopOpacity={0}/></linearGradient>
                                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.purple} stopOpacity={0.3}/><stop offset="95%" stopColor={C.purple} stopOpacity={0}/></linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={`${C.border}20`} vertical={false} />
                            <XAxis dataKey="month" stroke={C.textMuted} fontSize={11} fontWeight={700} tickLine={false} axisLine={false} dy={10} />
                            <YAxis stroke={C.textMuted} fontSize={11} fontWeight={700} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: C.card, borderColor: C.border, borderRadius: 12 }} />
                            <Area type="monotone" dataKey="visibility" stroke={C.cyan} strokeWidth={4} fillOpacity={1} fill="url(#colorVis)" />
                            <Area type="monotone" dataKey="clicks" stroke={C.purple} strokeWidth={4} fillOpacity={1} fill="url(#colorClicks)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Card>

        <Card onClick={() => onTriggerInsight("Allocation Topology")} style={{ background: `linear-gradient(135deg, ${C.card}, ${C.purple}05)` }}>
            <h2 style={{ fontSize: 16, fontWeight: 950, marginBottom: 32, letterSpacing: '0.05em' }}>BUDGET TOPOLOGY</h2>
            <div style={{ height: 380 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <Treemap data={treeMapData} dataKey="size" aspectRatio={1} stroke={C.card}>
                        {treeMapData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <Tooltip contentStyle={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}` }} />
                    </Treemap>
                </ResponsiveContainer>
            </div>
            <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {treeMapData.map(t => (
                    <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: `${C.surf}60`, borderRadius: 10 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.color }} />
                        <span style={{ fontSize: 11, fontWeight: 800 }}>{t.name}</span>
                    </div>
                ))}
            </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <h2 style={{ fontSize: 13, fontWeight: 900, color: C.textMuted, letterSpacing: '0.2em' }}>HIGH-RESONANCE CREATIVE NODES</h2>
            {data?.copies?.map((ad: any, i: number) => (
                <Card key={i} onClick={() => onTriggerInsight("Ad Copy Analysis")} style={{ padding: 32 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <div style={{ background: `${C.cyan}10`, color: C.cyan, padding: '4px 12px', borderRadius: 8, fontSize: 11, fontWeight: 900 }}>{ad.kw.toUpperCase()}</div>
                            <div style={{ background: `${C.green}10`, color: C.green, padding: '4px 12px', borderRadius: 8, fontSize: 11, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Sparkles size={12} /> AI SCORE: {ad.score}
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.textMuted }}>
                            <span style={{ fontSize: 11, fontWeight: 800 }}>{ad.emotion.toUpperCase()}</span>
                            <MoreHorizontal size={16} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 24 }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: 20, fontWeight: 950, color: C.text, lineHeight: 1.3, marginBottom: 12 }}>{ad.title}</h3>
                            <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.6 }}>{ad.desc}</p>
                        </div>
                        <div style={{ width: 1, minHeight: '100%', background: C.border }} />
                        <div style={{ width: 140, display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ fontSize: 10, fontWeight: 900, color: C.textMuted }}>PERFORMANCE VECTOR</div>
                            <div style={{ height: 60, width: '100%', background: `${C.surf}40`, borderRadius: 12, position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${C.purple}20, transparent)`, width: '70%' }} />
                                <div style={{ position: 'absolute', left: 16, top: 12, fontSize: 18, fontWeight: 950, color: C.purple }}>84%</div>
                                <div style={{ position: 'absolute', left: 16, bottom: 12, fontSize: 9, fontWeight: 800 }}>CTR INTENSITY</div>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <h2 style={{ fontSize: 13, fontWeight: 900, color: C.textMuted, letterSpacing: '0.2em' }}>DESTINATION VITALITY NODES</h2>
            <Card style={{ padding: 0 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ textAlign: "left", background: `${C.surf}40`, borderBottom: `1px solid ${C.border}`, color: C.textMuted, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            <th style={{ padding: "20px 24px", fontWeight: 950 }}>ASSET PATH</th>
                            <th style={{ padding: "20px 24px", fontWeight: 950 }}>FLOW</th>
                            <th style={{ padding: "20px 24px", fontWeight: 950, textAlign: 'right' }}>VITALITY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.pages?.map((p: any, i: number) => (
                            <tr key={i} style={{ borderBottom: `1px solid ${C.border}40`, transition: '0.2s' }}>
                                <td style={{ padding: "20px 24px" }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${C.cyan}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Layout size={18} color={C.cyan} />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 850, color: C.text }}>{p.page}</div>
                                            <div style={{ fontSize: 11, color: C.textMuted }}>/dest/node_vital_{i}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: "20px 24px" }}>
                                    <div style={{ fontSize: 13, fontWeight: 900, color: C.text }}>{p.traffic}</div>
                                    <div style={{ width: 80, height: 4, background: C.surf, borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
                                        <motion.div initial={{ width: 0 }} animate={{ width: p.traffic }} style={{ height: '100%', background: C.purple }} />
                                    </div>
                                </td>
                                <td style={{ padding: "20px 24px", textAlign: 'right' }}>
                                    <div style={{ fontSize: 13, fontWeight: 950, color: p.speed?.includes('Fast') ? C.green : C.amber }}>{p.ux}</div>
                                    <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 800 }}>{p.speed?.toUpperCase()}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            <Card style={{ background: `linear-gradient(135deg, ${C.cyan}20, ${C.card})`, border: `1px solid ${C.cyan}30` }}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: C.cyan, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Zap size={28} color="#fff" />
                    </div>
                    <div>
                        <div style={{ fontSize: 16, fontWeight: 950, color: C.text }}>PROACTIVE INTERVENTION</div>
                        <p style={{ fontSize: 13, color: C.textSec, marginTop: 6, lineHeight: 1.5 }}>AI detects a "Blind Spot" in current {platform} allocation. Diverting 15% budget to "High-Intent Micro-Clusters" could yield 2.5x higher resonance.</p>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            style={{ marginTop: 16, background: '#fff', color: '#000', border: 'none', padding: '10px 20px', borderRadius: 12, fontSize: 12, fontWeight: 900, cursor: 'pointer' }}
                        >
                            DEPLOY CLUSTER REPOSITION
                        </motion.button>
                    </div>
                </div>
            </Card>
        </div>
      </div>

        {/* ADDED NEW ELEMENTS */}
        <PredictiveAnalytics 
          onTriggerInsight={onTriggerInsight} 
          data={[
            {
              title: "Traffic Market Analysis",
              description: "Advertising spend efficiency is optimized, yielding a 14.5% lift in market-relative CTR.",
              metric: "+14.5%",
              trend: [12, 13, 14, 13.5, 14, 14.5, 14.2, 15, 15.5, 16, 16.5],
              type: "forecast",
              color: C.cyan,
              icon: Target
            },
            {
              title: "Authority Consistency",
              description: "Ad creative authority nodes across major platforms maintain an 86% resonance score.",
              metric: 86,
              type: "integrity",
              color: C.purple,
              icon: Shield
            }
          ]}
        />
    </div>
  );
} 