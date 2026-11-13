import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Legend, Cell } from "recharts";
import { Globe, TrendingUp, Users, MousePointer2, Zap, ArrowUpRight, ArrowDownRight, Search, Share2, Target, Filter, MoreHorizontal, Layout, Activity, Command, Shield } from "lucide-react";
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


const trafficData = [
  { month: "Jan", direct: 4000, organic: 2400, paid: 2400, referral: 1200, social: 800 },
  { month: "Feb", direct: 3000, organic: 1398, paid: 2210, referral: 1100, social: 900 },
  { month: "Mar", direct: 2000, organic: 9800, paid: 2290, referral: 1300, social: 1200 },
  { month: "Apr", direct: 2780, organic: 3908, paid: 2000, referral: 1500, social: 1100 },
  { month: "May", direct: 1890, organic: 4800, paid: 2181, referral: 1700, social: 1300 },
  { month: "Jun", direct: 2390, organic: 3800, paid: 2500, referral: 1800, social: 1500 },
  { month: "Jul", direct: 3490, organic: 4300, paid: 2100, referral: 1600, social: 1400 },
];

export default function TrafficMarket({ domain, onTriggerInsight }: any) {
  const [data, setData] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData({ visits: '1.2M', uniqueVisitors: '850K', pagesPerVisit: 4.2, bounceRate: '42%' });
      setLoading(false);
    }, 1000);
  }, [domain]);

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: C.bg }}>
      <Command className="animate-pulse" size={48} color={C.cyan} />
      <span style={{ marginTop: 24, fontSize: 13, fontWeight: 900, color: C.textMuted, letterSpacing: '0.2em' }}>SYNCHRONIZING TOPOLOGY...</span>
    </div>
  );

  return (
    <div className="fade-in" style={{ padding: "40px 48px", background: C.bg, minHeight: '100%' }}>
      {/* Topology Header */}
      <div style={{ marginBottom: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
             <div style={{ width: 40, height: 40, borderRadius: 12, background: `${C.cyan}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Globe size={22} color={C.cyan} />
             </div>
             <span style={{ fontSize: 13, fontWeight: 900, color: C.cyan, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Global Ingress Intelligence</span>
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 950, color: C.text, letterSpacing: '-0.05em' }}>Market Topology</h1>
          <p style={{ color: C.textSec, fontSize: 16, marginTop: 8 }}>Deep deconstruction of <strong>{domain}</strong> traffic vectors and behavioral travelogues.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
            <button style={{ background: C.surf, color: C.text, border: `1px solid ${C.border}`, padding: '12px 24px', borderRadius: 16, fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Filter size={16} /> 30D EPOCH
            </button>
            <button style={{ background: C.cyan, color: '#000', border: 'none', padding: '12px 24px', borderRadius: 16, fontSize: 13, fontWeight: 900, cursor: 'pointer' }}>
                EXPORT VECTOR MAP
            </button>
        </div>
      </div>

      {/* Primary Pulse Indices */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 40 }}>
        {[
          { label: "Aggregate Visits", val: data.visits, delta: "↑ 12.5%", color: C.cyan, icon: <Activity size={18} /> },
          { label: "Unique Entities", val: data.uniqueVisitors, delta: "↑ 8.2%", color: C.purple, icon: <Users size={18} /> },
          { label: "Depth Per Visit", val: data.pagesPerVisit, delta: "↓ 1.1%", color: C.blue, icon: <Layout size={18} /> },
          { label: "Bail Rate (Bounce)", val: data.bounceRate, delta: "↓ 2.4%", color: C.green, icon: <MousePointer2 size={18} /> },
        ].map(item => (
          <Card key={item.label} onClick={() => onTriggerInsight(item.label)} style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
               <div style={{ color: item.color }}>{item.icon}</div>
               <span style={{ fontSize: 11, fontWeight: 900, color: C.textMuted, textTransform: "uppercase", letterSpacing: '0.05em' }}>{item.label}</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 950, color: item.color, letterSpacing: '-0.02em' }}>{item.val}</div>
            <div style={{ fontSize: 10, color: C.textSec, marginTop: 12, fontWeight: 800 }}>{item.delta.toUpperCase()} VS BASELINE</div>
          </Card>
        ))}
      </div>

      <Card style={{ marginBottom: 40, padding: 0 }}>
        <div style={{ padding: 32, borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <TrendingUp size={20} color={C.cyan} />
            <h2 style={{ fontSize: 18, fontWeight: 900 }}>Temporal Ingress Flow</h2>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
             {['Organic', 'Paid', 'Direct'].map(l => (
               <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 800, color: C.textSec }}>
                 <div style={{ width: 10, height: 10, borderRadius: '50%', background: l === 'Organic' ? C.purple : l === 'Paid' ? C.amber : C.cyan }} /> {l.toUpperCase()}
               </div>
             ))}
          </div>
        </div>
        <div style={{ height: 420, padding: 32 }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                    <defs>
                        <linearGradient id="colorDirect" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.cyan} stopOpacity={0.3}/><stop offset="95%" stopColor={C.cyan} stopOpacity={0}/></linearGradient>
                        <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.purple} stopOpacity={0.3}/><stop offset="95%" stopColor={C.purple} stopOpacity={0}/></linearGradient>
                        <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.amber} stopOpacity={0.3}/><stop offset="95%" stopColor={C.amber} stopOpacity={0}/></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={`${C.border}20`} />
                    <XAxis dataKey="month" hide />
                    <YAxis hide />
                    <Tooltip contentStyle={{ backgroundColor: C.card, borderColor: C.border, borderRadius: 12 }} />
                    <Area type="monotone" dataKey="direct" stroke={C.cyan} strokeWidth={4} fillOpacity={1} fill="url(#colorDirect)" />
                    <Area type="monotone" dataKey="organic" stroke={C.purple} strokeWidth={4} fillOpacity={1} fill="url(#colorOrganic)" />
                    <Area type="monotone" dataKey="paid" stroke={C.amber} strokeWidth={4} fillOpacity={1} fill="url(#colorPaid)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)", gap: 32 }}>
        <Card onClick={() => onTriggerInsight("Journey Analysis")} style={{ padding: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Share2 size={20} color={C.purple} />
                    <h2 style={{ fontSize: 18, fontWeight: 900 }}>Behavioral Ingress Nodes</h2>
                </div>
                <MoreHorizontal size={20} color={C.textMuted} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[{ s: 'google.com', d: '/search', v: '450K', p: 80, c: C.cyan }, { s: 'Direct Access', d: '/dashboard', v: '320K', p: 60, c: C.purple }, { s: 'linkedin.com', d: '/social/ref', v: '120K', p: 30, c: C.blue }].map((item, i) => (
                    <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
                            <div>
                                <a 
                                    href={item.s === 'Direct Access' ? '#' : `https://${item.s}${item.d}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ fontSize: 14, fontWeight: 900, color: C.text, textDecoration: 'none' }}
                                    onMouseEnter={e => e.currentTarget.style.color = C.cyan}
                                    onMouseLeave={e => e.currentTarget.style.color = C.text}
                                >
                                    {item.s}
                                </a>
                                <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 800 }}>DEST: {item.d}</div>
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 950, color: item.c }}>{item.v} FLOW</div>
                        </div>
                        <div style={{ height: 6, background: `${C.surf}80`, borderRadius: 3, overflow: 'hidden' }}>
                            <motion.div initial={{ width: 0 }} animate={{ width: `${item.p}%` }} style={{ height: '100%', background: item.c }} />
                        </div>
                    </div>
                ))}
            </div>
        </Card>

        <Card onClick={() => onTriggerInsight("Geopolitical Distribution")} style={{ padding: 0 }}>
            <div style={{ padding: 32, borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Target size={20} color={C.amber} />
                    <h2 style={{ fontSize: 18, fontWeight: 900 }}>Regional Density Map</h2>
                </div>
                <div style={{ fontSize: 11, fontWeight: 900, color: C.textMuted }}>ACTIVE GEO-NODES: 114</div>
            </div>
            <div style={{ padding: "0 32px 32px 32px" }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ color: C.textMuted, fontSize: 10, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            <th style={{ padding: "20px 0", fontWeight: 950 }}>GEOGRAPHY</th>
                            <th style={{ padding: "20px 0", fontWeight: 950 }}>DENSITY</th>
                            <th style={{ padding: "20px 0", fontWeight: 950, textAlign: 'right' }}>VOLUME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[{ c: 'United States', code: 'US', s: '45%', t: '540K' }, { c: 'India', code: 'IN', s: '22%', t: '264K' }, { c: 'United Kingdom', code: 'UK', s: '12%', t: '144K' }, { c: 'Germany', code: 'DE', s: '8%', t: '96K' }].map((row, i) => (
                            <tr key={i} style={{ borderTop: `1px solid ${C.border}40` }}>
                                <td style={{ padding: '16px 0', fontSize: 14, display: 'flex', alignItems: 'center', gap: 12, fontWeight: 850 }}>
                                    <div style={{ width: 32, height: 24, borderRadius: 4, overflow: 'hidden', border: `1px solid ${C.border}` }}>
                                        <img src={`https://flagcdn.com/w40/${row.code.toLowerCase()}.png`} width="100%" height="100%" alt={row.code} style={{ objectFit: 'cover' }} />
                                    </div>
                                    {row.c}
                                </td>
                                <td style={{ padding: '16px 0' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{ width: 80, height: 4, background: `${C.surf}80`, borderRadius: 2, overflow: 'hidden' }}>
                                            <div style={{ width: row.s, height: '100%', background: C.purple }}></div>
                                        </div>
                                        <span style={{ fontSize: 12, fontWeight: 900 }}>{row.s}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '16px 0', fontSize: 14, fontWeight: 950, textAlign: 'right', color: C.cyan }}>{row.t}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
      </div>

      <Card style={{ marginTop: 40, background: `linear-gradient(135deg, ${C.purple}15, ${C.card})`, border: `1px solid ${C.purple}30` }}>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: C.purple, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 24px ${C.purple}40` }}>
                    <Zap size={32} color="#fff" />
                </div>
                <div>
                    <div style={{ fontSize: 18, fontWeight: 950 }}>NEURAL GROWTH VECTOR</div>
                    <p style={{ fontSize: 15, color: C.textSec, marginTop: 6, lineHeight: 1.6 }}>Market parity suggests a <strong>20.4%</strong> under-indexed exposure in Western European knowledge nodes. Strategic entity injection in these regions could yield 400K+ new ingress entities within 180 days.</p>
                </div>
                <div style={{ flex: 1 }} />
                <button style={{ background: '#fff', color: '#000', border: 'none', padding: '14px 28px', borderRadius: 16, fontSize: 13, fontWeight: 950, cursor: 'pointer', transition: '0.2s', whiteSpace: 'nowrap' }}>
                    EXECUTE REGIONAL EXPANSION
                </button>
            </div>
      </Card>

        {/* ADDED NEW ELEMENTS */}
        <PredictiveAnalytics 
          onTriggerInsight={onTriggerInsight} 
          data={[
            {
              title: "Traffic Market Analysis",
              description: `Our deconstruction of ${domain} ingress suggests a highly resilient market topology with 60% direct traffic retention.`,
              metric: "60%",
              trend: [55, 56, 58, 57, 59, 60, 60, 61, 62, 63, 65],
              type: "forecast",
              color: C.cyan,
              icon: Target
            },
            {
              title: "Authority Node Integrity",
              description: "Global ingress nodes maintain a 95% stability rating across primary geographic regional buffers.",
              metric: 95,
              type: "integrity",
              color: C.purple,
              icon: Shield
            }
          ]}
        />
    </div>
  );
} 