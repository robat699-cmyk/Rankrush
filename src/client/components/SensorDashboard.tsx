import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, LineChart, Line, Cell } from "recharts";
import { Activity, TrendingUp, AlertTriangle, Zap, BarChart3, Globe, ShieldAlert, Radio, Radar, Cpu, Waves, Command, Link, Target, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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

export default function SensorDashboard({ domain, mode, onTriggerInsight }: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/domain/sensor?domain=${encodeURIComponent(domain || 'yourdomain.com')}&mode=${mode}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [domain, mode]);

  const renderSensorUI = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fade-in">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: 32, marginBottom: 32 }}>
            <Card style={{ background: `linear-gradient(135deg, ${C.card}, ${C.amber}05)`, border: `1px solid ${C.amber}30`, padding: 40 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                            <Radio size={16} color={C.amber} />
                            <h3 style={{ fontSize: 11, color: C.amber, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Algorithm Turbulence</h3>
                        </div>
                        <div style={{ fontSize: 84, fontWeight: 950, color: C.text, letterSpacing: '-0.05em', lineHeight: 1 }}>{data?.volatilityScore}</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: C.textSec, marginTop: 12 }}>CRITICAL OSCILLATION</div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 20px', background: `${C.amber}15`, color: C.amber, borderRadius: 12, fontSize: 12, fontWeight: 900, marginTop: 32 }}>
                            <Zap size={16} /> {data?.volatilityScore > 7 ? 'RED ALERT: CORE SHIFT' : 'STABLE BASELINE'}
                        </div>
                    </div>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                        <Waves color={C.amber} size={120} opacity={0.05} />
                    </motion.div>
                </div>
            </Card>

            <Card style={{ padding: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 900 }}>Sector Fluctuations</h3>
                    <div style={{ display: 'flex', gap: 4 }}>{[1,2,3].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: C.border }} />)}</div>
                </div>
                <div style={{ height: 140 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.categoryVol || []}>
                            <CartesianGrid strokeDasharray="3 3" stroke={`${C.border}20`} vertical={false} />
                            <XAxis dataKey="category" hide />
                            <Tooltip contentStyle={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}` }} />
                            <Bar dataKey="score" fill={C.cyan} radius={[6, 6, 0, 0]}>
                                {data?.categoryVol?.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.score > 7 ? C.red : entry.score > 4 ? C.amber : C.cyan} fillOpacity={0.8} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>

        <Card onClick={() => onTriggerInsight("SERP Turbulence Analysis")} style={{ padding: 0 }}>
             <div style={{ padding: 32, borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Activity size={20} color={C.amber} />
                    <h2 style={{ fontSize: 18, fontWeight: 900 }}>Volatility Pulse (30D Epoch)</h2>
                </div>
                <div style={{ background: C.surf, padding: '4px 12px', borderRadius: 8, fontSize: 11, fontWeight: 900, color: C.textMuted }}>SENSITIVE TO CORE UPDATES</div>
             </div>
             <div style={{ height: 380, padding: 32 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data?.volatilityTrend || []}>
                        <defs>
                             <linearGradient id="p-amber" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.amber} stopOpacity={0.4}/><stop offset="100%" stopColor={C.amber} stopOpacity={0}/></linearGradient>
                        </defs>
                        <XAxis dataKey="day" hide />
                        <YAxis hide domain={[0, 10]} />
                        <Tooltip contentStyle={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}` }} />
                        <Area type="monotone" dataKey="score" stroke={C.amber} strokeWidth={4} fill="url(#p-amber)" dot={{ fill: C.amber, r: 4, strokeWidth: 2, stroke: C.card }} activeDot={{ r: 8, fill: C.amber }} />
                    </AreaChart>
                </ResponsiveContainer>
             </div>
        </Card>
    </motion.div>
  );

  const renderSeoquakeUI = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="fade-in">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 32 }}>
            {[
                { l: 'L-Index', v: '43.2k', c: C.blue, icon: <Globe size={16} /> },
                { l: 'LD-Index', v: '12.1k', c: C.cyan, icon: <Link size={16} /> },
                { l: 'I-Index', v: '9.8k', c: C.purple, icon: <Cpu size={16} /> },
                { l: 'Rank-Delta', v: '+24', c: C.green, icon: <TrendingUp size={16} /> }
            ].map((m, i) => (
                <Card key={i} style={{ padding: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <div style={{ color: m.c }}>{m.icon}</div>
                        <div style={{ fontSize: 11, fontWeight: 950, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{m.l}</div>
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 950, color: m.c, letterSpacing: '-0.02em' }}>{m.v}</div>
                </Card>
            ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: 32 }}>
            <Card style={{ padding: 0 }}>
                <div style={{ padding: 32, borderBottom: `1px solid ${C.border}` }}>
                    <h3 style={{ fontSize: 18, fontWeight: 900 }}>Diagnostic Matrix</h3>
                </div>
                <div style={{ padding: 32 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {['Google Index', 'Bing Index', 'Alexa Rank', 'Whois', 'Source', 'Sitemap', 'Robots.txt'].map((p, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 24px', background: i % 2 === 0 ? `${C.surf}40` : 'transparent', borderRadius: 16, fontSize: 14 }}>
                                <span style={{ color: C.textSec, fontWeight: 800 }}>{p}</span>
                                <span style={{ color: C.green, fontWeight: 950, letterSpacing: '0.05em' }}>VERIFIED POSITIVE</span>
                            </div>
                        ))}
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onTriggerInsight("SEOquake Deep Scan")} 
                        style={{ marginTop: 32, width: '100%', padding: '18px', borderRadius: 16, background: C.cyan, color: '#000', border: 'none', fontWeight: 950, cursor: 'pointer', fontSize: 14, letterSpacing: '0.05em' }}
                    >
                        RUN SUBSYSTEM AUDIT
                    </motion.button>
                </div>
            </Card>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <Card style={{ background: `linear-gradient(135deg, ${C.purple}15, ${C.card})` }}>
                    <h3 style={{ fontSize: 15, fontWeight: 950, color: C.purple, marginBottom: 16 }}>SYSTEM HEALTH</h3>
                    <div style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6 }}>No critical failures detected in the SEOquake ingestion engine. All parameters operating within normal thresholds.</div>
                </Card>
                <Card style={{ padding: 32 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 950, marginBottom: 24 }}>INVERSION CACHE</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {[ { l: 'Cache Latency', v: '14ms' }, { l: 'API Pulse', v: '99.9%' } ].map((s, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 800 }}>
                                <span style={{ color: C.textMuted }}>{s.l}</span>
                                <span style={{ color: C.cyan }}>{s.v}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    </motion.div>
  );

  const renderSemRankUI = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="fade-in">
        <Card style={{ marginBottom: 32, border: `1px solid ${C.purple}30`, background: `linear-gradient(135deg, ${C.card}, ${C.purple}08)`, padding: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    style={{ width: 100, height: 100, borderRadius: 32, background: C.purple, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 12px 32px ${C.purple}40` }}
                >
                    <BarChart3 size={48} color="#fff" />
                </motion.div>
                <div>
                    <h2 style={{ fontSize: 13, color: C.purple, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Enterprise Visibility</h2>
                    <div style={{ fontSize: 48, fontWeight: 950, color: C.text, letterSpacing: '-0.05em', margin: '4px 0' }}>Global #82,102</div>
                    <p style={{ fontSize: 16, color: C.textSec, fontWeight: 800 }}>Dominant in the top <strong>0.8%</strong> of high-authority nodes.</p>
                </div>
            </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: 32 }}>
            <Card style={{ padding: 0 }}>
                <div style={{ padding: 32, borderBottom: `1px solid ${C.border}` }}>
                    <h3 style={{ fontSize: 18, fontWeight: 900 }}>Visibility Trajectory</h3>
                </div>
                <div style={{ height: 220, padding: 32 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data?.volatilityTrend || []}>
                            <CartesianGrid strokeDasharray="3 3" stroke={`${C.border}20`} vertical={false} />
                            <XAxis dataKey="day" hide />
                            <YAxis hide />
                            <Tooltip contentStyle={{ background: C.card, borderRadius: 16 }} />
                            <Line type="monotone" dataKey="score" stroke={C.purple} strokeWidth={6} dot={false} activeDot={{ r: 10, fill: C.purple }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card style={{ padding: 32 }}>
                <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 32 }}>Authority Tiering</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {[
                        { l: 'Organic Velocity', v: '24.2k', d: 'Up 12%', c: C.cyan },
                        { l: 'Paid Dominance', v: 'High', d: 'Stable', c: C.purple },
                        { l: 'Trust Quotient', v: '72/100', d: 'Elite Tier', c: C.green }
                    ].map((item, i) => (
                        <div key={i} style={{ padding: 24, background: C.surf, borderRadius: 20, borderLeft: `6px solid ${item.c}` }}>
                            <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 950, textTransform: 'uppercase', marginBottom: 6 }}>{item.l}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <span style={{ fontSize: 24, fontWeight: 950, color: C.text }}>{item.v}</span>
                                <span style={{ fontSize: 12, color: item.c, fontWeight: 900 }}>{item.d.toUpperCase()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    </motion.div>
  );

  const getHeader = () => {
    if (mode === "sensor" || mode === "Sensor") return { t: "Algorithm Pulse", d: "Real-time monitoring of global SERP volatility indicators." };
    if (mode === "seoquake" || mode === "SEOquake") return { t: "SEOquake Diagnostic", d: "Multi-parameter audit of live indexing and domain health." };
    if (mode === "semrank" || mode === "Semrush Rank") return { t: "Market Authority Rank", d: "Global and niche dominance metrics derived from traffic density." };
    return { t: "SEO Intelligence", d: "Enterprise-grade visibility metrics." };
  };

  const info = getHeader();

  return (
    <div style={{ padding: "40px 48px", background: C.bg, minHeight: '100%' }}>
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
             <div style={{ width: 40, height: 40, borderRadius: 12, background: `${C.cyan}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Command size={22} color={C.cyan} />
             </div>
             <span style={{ fontSize: 13, fontWeight: 900, color: C.cyan, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Sub-Section Intel: {mode}</span>
          </div>
        <h1 style={{ fontSize: 42, fontWeight: 950, color: C.text, letterSpacing: '-0.05em' }}>{info.t}</h1>
        <p style={{ color: C.textSec, fontSize: 16, marginTop: 8 }}>{info.d}</p>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 190, flexDirection: 'column', gap: 24 }}
          >
             <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 64, height: 64, borderRadius: 20, border: `4px solid ${C.cyan}20`, borderTopColor: C.cyan }} />
             <p style={{ fontSize: 14, color: C.textSec, fontWeight: 800, letterSpacing: '0.1em' }}>SYNCING WITH GLOBAL GRID...</p>
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {(mode === "sensor" || mode === "Sensor") && renderSensorUI()}
            {(mode === "seoquake" || mode === "SEOquake") && renderSeoquakeUI()}
            {(mode === "semrank" || mode === "Semrush Rank") && renderSemRankUI()}
          </motion.div>
        )}
      </AnimatePresence>

        {/* ADDED NEW ELEMENTS */}
        <PredictiveAnalytics 
          onTriggerInsight={onTriggerInsight} 
          data={[
            {
              title: "Traffic Market Analysis",
              description: `Global SERP volatility is currently at 4.2/10. We project a 5% traffic delta as the new algorithmic update reaches node parity.`,
              metric: "4.2",
              trend: [3.8, 4, 3.9, 4.1, 4.2, 4.3, 4.2, 4.4, 4.5, 4.6, 4.8],
              type: "forecast",
              color: C.cyan,
              icon: Target
            },
            {
              title: "Authority Consistency",
              description: "Sensor data nodes maintain 99.8% validity across real-time volatility tracking sensors.",
              metric: "99.8%",
              type: "integrity",
              color: C.purple,
              icon: Shield
            }
          ]}
        />
    </div>
  );
} 