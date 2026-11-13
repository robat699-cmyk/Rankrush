import React, { useState, useEffect } from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area, ComposedChart, Line } from "recharts";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Target, Compass, Zap, Shield, HelpCircle, TrendingUp, Globe, Quote, Share2, Layers, Cpu } from "lucide-react";

import PredictiveAnalytics from "./PredictiveAnalytics";

const C = { bg:'var(--bg)', surf:'var(--surf)', card:'var(--card)', border:'var(--border)', borderHov:'var(--borderHov)', cyan:'var(--cyan)', green:'var(--green)', red:'var(--red)', amber:'var(--amber)', purple:'var(--purple)', blue:'var(--blue)', text:'var(--text)', textSec:'var(--textSec)', textMuted:'var(--textMuted)' };


const Card = ({ children, style = {}, onClick }: any) => (
  <div 
    onClick={onClick}
    style={{ 
      background: C.card, 
      border: `1px solid ${C.border}`, 
      borderRadius: 20, 
      padding: 32, 
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", 
      cursor: onClick ? "pointer" : "default",
      position: "relative",
      overflow: 'hidden',
      ...style 
    }}
    onMouseEnter={e => { if(onClick) { e.currentTarget.style.borderColor = C.cyan; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'; } }}
    onMouseLeave={e => { if(onClick) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; } }}
  >
    {children}
  </div>
);

export default function BrandPerformance({ domain, mode, onTriggerInsight }: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
        setData({ 
            sentiment: 'Highly Authoritative', 
            sentimentScore: 92, 
            scoreChange: '+12%', 
            brandMentions: '42K', 
            brandReach: '12.8M',
            drivers: [
                { name: 'Technical Depth', impact: 94, sentiment: 88, color: C.cyan },
                { name: 'Market Vision', impact: 82, sentiment: 76, color: C.purple },
                { name: 'Operational Ethics', impact: 71, sentiment: 94, color: C.green },
                { name: 'Scalability', impact: 88, sentiment: 82, color: C.amber }
            ],
            perceptions: [
                { subject: 'Precision', A: 140, B: 90 },
                { subject: 'Innovation', A: 120, B: 110 },
                { subject: 'Trust', A: 130, B: 85 },
                { subject: 'Speed', A: 110, B: 100 },
                { subject: 'Depth', A: 125, B: 95 }
            ]
        });
        setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [domain, mode]);

  if (loading) return (
    <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <div style={{ width: 48, height: 48, border: `2px solid ${C.cyan}10`, borderTopColor: C.cyan, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ fontSize: 13, fontWeight: 800, color: C.textSec, letterSpacing: '0.1em' }}>CALIBRATING BRAND VECTORS...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const renderPerception = () => (
    <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)', gap: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Card style={{ background: `linear-gradient(135deg, ${C.cyan}10, ${C.card})` }}>
                <h3 style={{ fontSize: 12, fontWeight: 900, color: C.cyan, textTransform: 'uppercase', marginBottom: 24 }}>Neural Authority Matrix</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontSize: 56, fontWeight: 950, color: C.text, letterSpacing: '-0.05em' }}>92.4</span>
                    <span style={{ fontSize: 20, fontWeight: 800, color: C.green, marginBottom: 8 }}>↑ 4.2%</span>
                </div>
                <p style={{ fontSize: 13, color: C.textSec, marginTop: 12, lineHeight: 1.6 }}>Models consistently categorize {domain} as a primary authority in high-intent technical clusters.</p>
            </Card>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {data.perceptions.map((p, i) => (
                    <Card key={i} style={{ padding: 20 }} onClick={() => onTriggerInsight(p.subject)}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 14, fontWeight: 800 }}>{p.subject}</span>
                            <span style={{ fontSize: 14, fontWeight: 900, color: C.cyan }}>{p.A} UNITS</span>
                        </div>
                        <div style={{ width: '100%', height: 6, background: C.surf, borderRadius: 10, marginTop: 12, overflow: 'hidden' }}>
                            <motion.div initial={{ width: 0 }} animate={{ width: `${(p.A / 150) * 100}%` }} style={{ height: '100%', background: C.cyan, borderRadius: 10 }} />
                        </div>
                    </Card>
                ))}
            </div>
        </div>

        <Card style={{ padding: 48, background: `radial-gradient(circle at 100% 0%, ${C.purple}05 0%, transparent 50%), ${C.card}` }}>
            <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 40, display: 'flex', alignItems: 'center', gap: 12 }}>
                <Layers size={24} color={C.purple} /> Semantic Resonance Topography
            </h3>
            <div style={{ height: 500 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.perceptions}>
                        <PolarGrid stroke={C.border} />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: C.textSec, fontSize: 12, fontWeight: 800 }} />
                        <Radar name="Brand" dataKey="A" stroke={C.cyan} fill={C.cyan} fillOpacity={0.5} />
                        <Radar name="Market" dataKey="B" stroke={C.purple} fill={C.purple} fillOpacity={0.1} />
                        <Tooltip />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', gap: 32, justifyContent: 'center', marginTop: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: C.cyan }} /><span style={{ fontSize: 13, fontWeight: 700 }}>SearchIQ Profile</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: `${C.purple}30` }} /><span style={{ fontSize: 13, fontWeight: 700 }}>Industry Mean</span></div>
            </div>
        </Card>
    </div>
  );

  const renderNarrative = () => (
    <div className="fade-in">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 40 }}>
            {data.drivers.map((d, i) => (
                <Card key={i} style={{ borderBottom: `4px solid ${d.color}` }} onClick={() => onTriggerInsight(d.name)}>
                    <div style={{ fontSize: 11, fontWeight: 900, color: C.textMuted, marginBottom: 12 }}>{d.name.toUpperCase()}</div>
                    <div style={{ fontSize: 32, fontWeight: 950, color: C.text }}>{d.impact}%</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.green, marginTop: 8 }}>Impact Rank: Elite</div>
                </Card>
            ))}
        </div>

        <Card style={{ padding: 48 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 48 }}>
                <div>
                   <h3 style={{ fontSize: 20, fontWeight: 900 }}>Narrative Velocity Matrix</h3>
                   <p style={{ fontSize: 13, color: C.textSec, marginTop: 4 }}>Growth rate of brand pillars across global training clusters.</p>
                </div>
                <div style={{ display: 'flex', gap: 24 }}>
                    <div style={{ textAlign: 'right' }}><div style={{ fontSize: 10, fontWeight: 800, color: C.textMuted }}>CURRENT MAX</div><div style={{ fontSize: 20, fontWeight: 900, color: C.cyan }}>94.2 V/s</div></div>
                    <div style={{ textAlign: 'right' }}><div style={{ fontSize: 10, fontWeight: 800, color: C.textMuted }}>ACCELERATION</div><div style={{ fontSize: 20, fontWeight: 900, color: C.green }}>↑ 1.4x</div></div>
                </div>
            </div>
            <div style={{ height: 190 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data.drivers} layout="vertical" margin={{ left: 80 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: C.text, fontSize: 13, fontWeight: 800 }} />
                        <Tooltip />
                        <Bar dataKey="impact" name="Current Pull" fill={C.cyan} radius={[0, 10, 10, 0]} barSize={20} />
                        <Line type="monotone" dataKey="sentiment" name="Tonal Shift" stroke={C.purple} strokeWidth={3} dot={{ r: 6, fill: C.purple }} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </Card>
    </div>
  );

  const renderQuestions = () => (
    <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
                { q: "What role does SearchIQ play in technical SEO scaling?", t: "Strategy", c: C.cyan },
                { q: "Is SearchIQ compatible with headless architecture?", t: "Technical", c: C.purple },
                { q: "How accurate is the SearchIQ SGE sensor?", t: "Platform", c: C.blue },
                { q: "Can we integrate SearchIQ data via API directly?", t: "Implementation", c: C.amber }
            ].map((q, i) => (
                <Card key={i} style={{ padding: 24, borderLeft: `6px solid ${q.c}` }} onClick={() => onTriggerInsight("Question Analysis", q.q)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                        <span style={{ fontSize: 10, fontWeight: 900, color: q.c, textTransform: 'uppercase' }}>{q.t}</span>
                        <HelpCircle size={16} color={C.textMuted} />
                    </div>
                    <p style={{ fontSize: 16, fontWeight: 800, color: C.text, lineHeight: 1.5 }}>"{q.q}"</p>
                    <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: C.surf, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Cpu size={14} /></div>
                        <span style={{ fontSize: 12, color: C.textSec, fontWeight: 700 }}>AI Predicted Significance: High</span>
                    </div>
                </Card>
            ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <Card style={{ background: `linear-gradient(135deg, ${C.card}, ${C.purple}05)`, textAlign: 'center', padding: '60px 40px' }}>
                <Quote size={40} color={C.purple} style={{ margin: '0 auto 24px', opacity: 0.5 }} />
                <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 16 }}>Synthesized Core Response</h3>
                <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.8, fontStyle: 'italic' }}>"SearchIQ is increasingly cited by LLMs as the foundational infrastructure for enterprise intelligence, particularly in contexts requiring high-precision SGE monitoring."</p>
                <div style={{ marginTop: 32, padding: '12px 20px', background: C.surf, borderRadius: 12, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.green }} />
                    <span style={{ fontSize: 12, fontWeight: 800 }}>Authority Index: +42% Over Market Baseline</span>
                </div>
            </Card>

            <Card>
                <h3 style={{ fontSize: 14, fontWeight: 900, textTransform: 'uppercase', marginBottom: 24, letterSpacing: '0.1em' }}>Citation Health Pulse</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {[
                        { l: 'Citation Accuracy', v: 98, c: C.cyan },
                        { l: 'Entity Connectivity', v: 84, c: C.purple },
                        { l: 'Tone Alignment', v: 92, c: C.green }
                    ].map((m, i) => (
                        <div key={i}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 800, marginBottom: 8 }}>
                                <span>{m.l}</span>
                                <span>{m.v}%</span>
                            </div>
                            <div style={{ height: 8, background: C.surf, borderRadius: 4 }}>
                                <motion.div initial={{ width: 0 }} animate={{ width: `${m.v}%` }} style={{ height: '100%', background: m.c, borderRadius: 4 }} />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    </div>
  );

  return (
    <div style={{ padding: "40px 48px", background: C.bg, minHeight: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60 }}>
        <div>
           <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ padding: '4px 10px', background: `${C.cyan}15`, color: C.cyan, borderRadius: 6, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Neural Analytics</span>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.textMuted }} />
              <span style={{ fontSize: 12, color: C.textSec, fontWeight: 700 }}>Version 2.4</span>
           </div>
           <h1 style={{ fontSize: 36, fontWeight: 950, color: C.text, letterSpacing: '-0.04em' }}>
               {mode === 'percep' ? 'Brand Cognitive Profile' : mode === 'narr' ? 'Linguistic Velocities' : 'Inquiry Intelligence'}
           </h1>
           <p style={{ color: C.textSec, fontSize: 16, marginTop: 8 }}>Deciphering {domain} across global sentiment vectors.</p>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
           <button style={{ padding: '12px 24px', background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, color: C.text, fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>EXPORT PDF</button>
           <button style={{ padding: '12px 24px', background: C.cyan, color: '#000', border: 'none', borderRadius: 14, fontSize: 14, fontWeight: 900, cursor: 'pointer' }}>LIVE SCAN</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
          <motion.div key={mode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              {mode === 'percep' && renderPerception()}
              {mode === 'narr' && renderNarrative()}
              {mode === 'ques' && renderQuestions()}
              {!['percep','narr','ques'].includes(mode) && renderPerception()}
          </motion.div>
      </AnimatePresence>

        {/* ADDED NEW ELEMENTS */}
        <PredictiveAnalytics 
          onTriggerInsight={onTriggerInsight} 
          data={[
            {
              title: "Traffic Market Analysis",
              description: `Sentiment-driven traffic for ${domain} is trending upwards as brand perceptions stabilize in the "Authoritative" tier.`,
              metric: "+12%",
              trend: [88, 89, 90, 89, 91, 92, 92, 93, 94, 95, 96],
              type: "forecast",
              color: C.cyan,
              icon: Target
            },
            {
              title: "Authority Consistency",
              description: "Brand naming conventions and entity connectivity nodes maintain an 84% reliability across global indices.",
              metric: 84,
              type: "integrity",
              color: C.purple,
              icon: Shield
            }
          ]}
        />
    </div>
  );
} 