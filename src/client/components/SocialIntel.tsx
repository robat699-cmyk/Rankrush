import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ScatterChart, Scatter, ZAxis, Cell } from "recharts";
import { Share2, Zap, TrendingUp, Users, Hash, Clock, MessageCircle, BarChart2, Radio, Globe, Sparkles, Filter, ChevronRight, Activity, Bell, Target, Shield } from "lucide-react";
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

const bubbleData = [
  { x: 10, y: 30, z: 200, name: '#SEO' },
  { x: 30, y: 60, z: 400, name: '#Marketing' },
  { x: 50, y: 40, z: 300, name: '#Growth' },
  { x: 70, y: 80, z: 600, name: '#AI' },
  { x: 90, y: 50, z: 350, name: '#Tech' },
];

export default function SocialIntel({ domain, onTriggerInsight }: any) {
  const [platform, platformSet] = useState("All");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/domain/social?domain=${encodeURIComponent(domain || 'yourdomain.com')}`);
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
             <div style={{ width: 40, height: 40, borderRadius: 12, background: `${C.cyan}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Radio size={22} color={C.cyan} />
             </div>
             <span style={{ fontSize: 13, fontWeight: 900, color: C.cyan, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Influence Propagation Sensor</span>
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 950, color: C.text, letterSpacing: '-0.05em' }}>Edge Social Intelligence</h1>
          <p style={{ color: C.textSec, fontSize: 16, marginTop: 8 }}>Deconstructing high-velocity engagement vectors and neural sentiment for <strong>{domain}</strong>.</p>
        </div>
        <div style={{ display: "flex", background: C.card, padding: 6, borderRadius: 16, border: `1px solid ${C.border}` }}>
          {["All", "LinkedIn", "X (Twitter)", "Reddit"].map(p => (
            <button key={p} onClick={() => platformSet(p)} style={{ background: platform === p ? C.cyan : "transparent", color: platform === p ? "#000" : C.textSec, border: "none", padding: '10px 20px', borderRadius: 12, fontSize: 13, cursor: "pointer", fontWeight: 800, transition: '0.2s' }}>
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Propagation Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 40 }}>
        {[
          { label: "Neural Audience", val: data?.metrics?.audience || '42.8K', delta: "↑ 4.2%", color: C.cyan, icon: <Users size={18} /> },
          { label: "Engagement Ratio", val: data?.metrics?.engagement || '6.4%', delta: "Stable", color: C.purple, icon: <Activity size={18} /> },
          { label: "Viral Momentum", val: data?.metrics?.viralIndex || 'High', delta: "↑ 22%", color: C.amber, icon: <Zap size={18} /> },
          { label: "Global Presence", val: data?.metrics?.sov || '18.4%', delta: "+2.1%", color: C.green, icon: <Globe size={18} /> },
        ].map(item => (
          <Card key={item.label} onClick={() => onTriggerInsight(item.label)} style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
               <div style={{ color: item.color }}>{item.icon}</div>
               <span style={{ fontSize: 11, fontWeight: 900, color: C.textMuted, textTransform: "uppercase", letterSpacing: '0.05em' }}>{item.label}</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 950, color: item.color, letterSpacing: '-0.02em' }}>{item.val}</div>
            <div style={{ fontSize: 10, color: C.textSec, marginTop: 12, fontWeight: 800 }}>{item.delta} PROPAGATION VELOCITY</div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)", gap: 32, marginBottom: 40 }}>
        <Card onClick={() => onTriggerInsight("Trend Spectrum")} style={{ padding: 0 }}>
            <div style={{ padding: 32, borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <TrendingUp size={20} color={C.cyan} />
                    <h2 style={{ fontSize: 18, fontWeight: 900 }}>Viral Propagation Spectrum</h2>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: C.cyan }} />
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: C.purple }} />
                </div>
            </div>
            <div style={{ padding: 32 }}>
                <div style={{ height: 380 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data?.trendData || []}>
                            <defs>
                                <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.cyan} stopOpacity={0.3}/><stop offset="95%" stopColor={C.cyan} stopOpacity={0}/></linearGradient>
                                <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.purple} stopOpacity={0.3}/><stop offset="95%" stopColor={C.purple} stopOpacity={0}/></linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={`${C.border}20`} vertical={false} />
                            <XAxis dataKey="day" hide />
                            <YAxis hide />
                            <Tooltip contentStyle={{ backgroundColor: C.card, borderColor: C.border, borderRadius: 12 }} />
                            <Area type="monotone" dataKey="reach" stroke={C.cyan} strokeWidth={4} fillOpacity={1} fill="url(#colorReach)" stackId="1" />
                            <Area type="monotone" dataKey="engagement" stroke={C.purple} strokeWidth={4} fillOpacity={1} fill="url(#colorEngage)" stackId="1" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Card>

        <Card onClick={() => onTriggerInsight("Semantic Cloud")} style={{ background: `radial-gradient(circle at 100% 100%, ${C.cyan}10 0%, transparent 50%), ${C.card}` }}>
            <h2 style={{ fontSize: 16, fontWeight: 950, marginBottom: 32, letterSpacing: '0.05em' }}>SEMANTIC CLOUD</h2>
            <div style={{ height: 380, width: '100%', background: `${C.surf}40`, borderRadius: 24, border: `1px solid ${C.border}`, position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 40, right: 40, bottom: 40, left: 40 }}>
                        <XAxis type="number" dataKey="x" hide />
                        <YAxis type="number" dataKey="y" hide />
                        <ZAxis type="number" dataKey="z" range={[100, 800]} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="Hashtags" data={bubbleData}>
                            {bubbleData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`${C.cyan}${Math.floor(entry.z/8).toString(16)}`} stroke={C.cyan} strokeWidth={2} />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
                {bubbleData.map((b, i) => (
                    <motion.div key={i} style={{ position: 'absolute', left: `${b.x}%`, top: `${b.y}%`, transform: 'translate(-50%, -50%)', fontSize: 11, fontWeight: 900, color: C.text, pointerEvents: 'none', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        {b.name}
                    </motion.div>
                ))}
            </div>
        </Card>
      </div>

      {/* Engagement Flow */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)", gap: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <h2 style={{ fontSize: 13, fontWeight: 900, color: C.textMuted, letterSpacing: '0.2em' }}>HIGH-FIDELITY SIGNAL FEED</h2>
            {data?.posts?.map((p, i) => (
                <Card key={i} onClick={() => onTriggerInsight("Signal Analysis")} style={{ padding: 32 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: `${C.cyan}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Share2 size={20} color={C.cyan} />
                            </div>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 900 }}>{p.network.toUpperCase()}</div>
                                <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 800 }}>{p.impact.toUpperCase()} VECTOR</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: `${C.purple}10`, borderRadius: 10 }}>
                            <Sparkles size={14} color={C.purple} />
                            <span style={{ fontSize: 13, color: C.purple, fontWeight: 900 }}>{p.engagement}</span>
                        </div>
                    </div>
                    <div style={{ padding: '24px 28px', background: `${C.surf}80`, borderRadius: 20, border: `1px solid ${C.border}`, position: 'relative' }}>
                        <MessageCircle size={28} color={C.border} style={{ position: 'absolute', top: -14, left: 24 }} />
                        <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.7, fontStyle: 'italic' }}>"{p.text}"</p>
                        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
                            <a 
                                href={`https://${p.network.toLowerCase()}.com/post/123456`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                style={{ fontSize: 12, color: C.cyan, fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
                                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                            >
                                VIEW ORIGINAL SIGNAL <ChevronRight size={14} />
                            </a>
                        </div>
                    </div>
                </Card>
            ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <h2 style={{ fontSize: 13, fontWeight: 900, color: C.textMuted, letterSpacing: '0.2em' }}>TEMPORAL SYNC GRID</h2>
            <Card style={{ padding: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Clock size={18} color={C.amber} />
                        <span style={{ fontSize: 14, fontWeight: 900 }}>NEURAL RESPONSE HEATMAP</span>
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                        {[0,1,2,3].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: 2, background: C.cyan, opacity: 0.2 + i*0.25 }} />)}
                    </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "40px repeat(7, 1fr)", gap: 10 }}>
                    <div />
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => <div key={d} style={{ fontSize: 11, fontWeight: 900, color: C.textMuted, textAlign: "center" }}>{d}</div>)}
                    
                    {['09:00', '12:00', '15:00', '18:00'].map((t, rowIdx) => (
                        <React.Fragment key={t}>
                            <div style={{ fontSize: 10, fontWeight: 900, color: C.textMuted, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>{t}</div>
                            {[...Array(7)].map((_, colIdx) => {
                                const level = Math.floor(Math.random() * 4);
                                return (
                                    <motion.div 
                                        key={colIdx} 
                                        initial={{ opacity: 0, scale: 0.8 }} 
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: (rowIdx * 7 + colIdx) * 0.01 }}
                                        style={{ background: C.cyan, opacity: level * 0.3, height: 38, borderRadius: 10, border: `1px solid ${C.border}40` }} 
                                    />
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
                
                <div onClick={() => onTriggerInsight("Neural Sync")} style={{ cursor: "pointer", marginTop: 32, padding: 24, background: `${C.purple}05`, border: `1px solid ${C.purple}20`, borderRadius: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 10, background: C.purple, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Bell size={18} color="#fff" />
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 950, color: C.purple, letterSpacing: '0.05em' }}>CRITICAL SYNC WINDOW</span>
                    </div>
                    <p style={{ fontSize: 13, color: C.textSec, lineHeight: 1.6 }}>AI detects a synchronized wake-cycle among your {data?.demographics?.age2534 || '38'}% core demographic. Deploy high-authority insights within the next <strong>45 minutes</strong> for maximum viral resonance.</p>
                </div>
            </Card>

            <Card style={{ background: `linear-gradient(135deg, ${C.amber}15, ${C.card})`, border: `1px solid ${C.amber}30` }}>
                <div style={{ display: 'flex', gap: 20 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 16, background: C.amber, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Zap size={24} color="#000" />
                    </div>
                    <div>
                        <div style={{ fontSize: 15, fontWeight: 950 }}>CULTURAL VELOCITY ALERT</div>
                        <p style={{ fontSize: 13, color: C.textSec, marginTop: 4, lineHeight: 1.5 }}>A topical clustering spike detected in X (Twitter). Your infrastructure is perfectly aligned to capture this inflow via "#FutureOfSEO" vector.</p>
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
              description: `Social signals for ${domain} are projected to drive 12.8% of aggregate traffic within the next 60 days.`,
              metric: "12.8%",
              trend: [8, 9, 10, 11, 12, 12.8, 13, 14, 15, 16, 18],
              type: "forecast",
              color: C.cyan,
              icon: Target
            },
            {
              title: "Authority Consistency",
              description: "Social authority nodes maintain a 76% consistency score across primary engagement vectors.",
              metric: 76,
              type: "integrity",
              color: C.purple,
              icon: Shield
            }
          ]}
        />
    </div>
  );
} 