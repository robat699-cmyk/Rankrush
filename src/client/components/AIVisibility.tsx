import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from "recharts";
import { motion, AnimatePresence } from "motion/react";
import { Search, Brain, Target, Compass, Zap, MessageSquare, ShieldCheck, Globe, Activity, Fingerprint, Network, Terminal, Cpu, Lightbulb, Box, Shield } from "lucide-react";

import PredictiveAnalytics from "./PredictiveAnalytics";

const C = { bg:'var(--bg)', surf:'var(--surf)', card:'var(--card)', border:'var(--border)', borderHov:'var(--borderHov)', cyan:'var(--cyan)', green:'var(--green)', red:'var(--red)', amber:'var(--amber)', purple:'var(--purple)', blue:'var(--blue)', text:'var(--text)', textSec:'var(--textSec)', textMuted:'var(--textMuted)' };


const Card = ({ children, style = {}, onClick }: any) => (
  <div 
    onClick={onClick}
    style={{ 
      background: C.card, 
      border: `1px solid ${C.border}`, 
      borderRadius: 16, 
      padding: 24, 
      transition: "all 0.2s", 
      cursor: onClick ? "pointer" : "default",
      position: 'relative',
      overflow: 'hidden',
      ...style 
    }}
    onMouseEnter={e => { if(onClick) { e.currentTarget.style.borderColor = C.cyan; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
    onMouseLeave={e => { if(onClick) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = 'none'; } }}
  >
    {children}
  </div>
);

export default function AIVisibility({ domain, mode, onTriggerInsight }: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
        setData({
          visibility: 45, mentions: 820, citedPages: 140,
          platforms: [
            { name: "ChatGPT", mentions: 320, cited: 60, res: 94 },
            { name: "Claude", mentions: 250, cited: 40, res: 88 },
            { name: "Gemini", mentions: 150, cited: 25, res: 76 },
            { name: "Perplexity", mentions: 100, cited: 15, res: 82 }
          ]
        });
        setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [domain, mode]);

  if (loading) return (
    <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <div style={{ width: 80, height: 80, border: `3px solid ${C.cyan}20`, borderTopColor: C.cyan, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ fontSize: 13, fontWeight: 900, color: C.text, letterSpacing: '0.2em' }}>SYNCHRONIZING NEURAL LAYERS...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const renderAIVisibility = () => (
    <div className="fade-in">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
            {[
                { l: 'AI Exposure Index', v: '72.4', c: C.cyan, i: Activity },
                { l: 'Citation Velocity', v: '↑ 12%', c: C.green, i: Zap },
                { l: 'Platform Reach', v: '8 Platforms', c: C.purple, i: Globe },
                { l: 'Strategic Risk', v: 'Low', c: C.blue, i: ShieldCheck }
            ].map((stat, i) => (
                <Card key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                        <div style={{ padding: 10, background: `${stat.c}15`, borderRadius: 10 }}><stat.i size={20} color={stat.c} /></div>
                        <span style={{ fontSize: 10, fontWeight: 900, color: C.textMuted }}>REAL-TIME</span>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: C.textSec, textTransform: 'uppercase' }}>{stat.l}</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: C.text, marginTop: 4 }}>{stat.v}</div>
                </Card>
            ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 800 }}>Visibility Propagation</h3>
                    <div style={{ display: 'flex', gap: 8 }}>
                         <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.cyan }} />
                         <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.purple }} />
                    </div>
                </div>
                <div style={{ height: 240 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[{n:'May 1', v:40, m:30},{n:'May 3', v:55, m:35},{n:'May 5', v:48, m:40},{n:'May 7', v:62, m:45},{n:'May 9', v:78, m:42},{n:'May 11', v:70, m:55},{n:'May 13', v:85, m:60}]}>
                            <defs>
                                <linearGradient id="vis-cyan" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.cyan} stopOpacity={0.4}/><stop offset="100%" stopColor={C.cyan} stopOpacity={0}/></linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
                            <XAxis dataKey="n" stroke={C.textMuted} fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis hide />
                            <Tooltip contentStyle={{ background: C.card, borderColor: C.border }} />
                            <Area type="monotone" dataKey="v" stroke={C.cyan} strokeWidth={3} fill="url(#vis-cyan)" />
                            <Area type="monotone" dataKey="m" stroke={C.purple} strokeWidth={2} fill="transparent" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Card style={{ background: `linear-gradient(135deg, ${C.card}, ${C.cyan}05)` }}>
                    <h4 style={{ fontSize: 14, fontWeight: 800, marginBottom: 20 }}>Neural Confidence Score</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div style={{ position: 'relative', width: 80, height: 80 }}>
                            <svg width="80" height="80">
                                <circle cx="40" cy="40" r="35" fill="none" stroke={C.border} strokeWidth="6" />
                                <circle cx="40" cy="40" r="35" fill="none" stroke={C.cyan} strokeWidth="6" strokeDasharray={`${3.14 * 70 * 0.88} 1000`} strokeLinecap="round" transform="rotate(-90 40 40)" />
                            </svg>
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900 }}>88%</div>
                        </div>
                        <p style={{ fontSize: 12, color: C.textSec, lineHeight: 1.6 }}>Models show high alignment in associating your brand with core technical hubs.</p>
                    </div>
                </Card>
                <Card style={{ flex: 1 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 800, marginBottom: 16 }}>Detected Entity Nodes</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {['Search Intelligence', 'Data Architecture', 'Neural Analysis', 'SGE Hub', 'Contextual Radar', 'Schema Vector'].map(tag => (
                            <span key={tag} style={{ padding: '6px 10px', background: C.surf, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11, fontWeight: 700, color: C.textSec }}>{tag}</span>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    </div>
  );

  const renderAIAnalysis = () => (
    <div className="fade-in">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: 32 }}>
            <Card style={{ background: `linear-gradient(135deg, ${C.bg}, ${C.card})` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: `${C.purple}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Fingerprint color={C.purple} /></div>
                    <div>
                        <h3 style={{ fontSize: 18, fontWeight: 900 }}>Brand Semantic Signature</h3>
                        <p style={{ fontSize: 12, color: C.textSec }}>Comparative analysis against industry authority matrix.</p>
                    </div>
                </div>
                <div style={{ height: 140 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                            { s: 'Trust', a: 110, b: 80 }, { s: 'Tech', a: 140, b: 90 }, { s: 'Rec', a: 90, b: 100 }, { s: 'Depth', a: 120, b: 110 }, { s: 'Intent', a: 130, b: 85 }
                        ]}>
                            <PolarGrid stroke={C.border} />
                            <PolarAngleAxis dataKey="s" tick={{ fill: C.textMuted, fontSize: 11, fontWeight: 800 }} />
                            <Radar name="Active Profile" dataKey="a" stroke={C.cyan} fill={C.cyan} fillOpacity={0.5} />
                            <Radar name="Market Mean" dataKey="b" stroke={C.purple} fill={C.purple} fillOpacity={0.1} />
                            <Tooltip contentStyle={{ background: C.card, borderColor: C.border }} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <Card onClick={() => onTriggerInsight("Linguistic Balance Matrix")} style={{ border: `1px solid ${C.purple}40`, background: `${C.purple}05` }}>
                     <h3 style={{ fontSize: 14, fontWeight: 900, marginBottom: 20, color: C.textMuted, textTransform: 'uppercase' }}>Linguistic Harmonic Spectrum</h3>
                     <div style={{ display: 'flex', height: 48, borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.border}` }}>
                        <div style={{ width: '65%', background: C.cyan, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#000' }}>PRECISION 65%</div>
                        <div style={{ width: '25%', background: C.purple, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#fff' }}>EMPATHY 25%</div>
                        <div style={{ width: '10%', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#fff' }}>BIAS 10%</div>
                     </div>
                     <p style={{ fontSize: 12, color: C.textSec, marginTop: 20, lineHeight: 1.6 }}>The neural weighting favors "Analytical Precision", aligning with executive decision-making prompt structures.</p>
                </Card>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {[
                        { l: 'Trust Index', v: '9.2', c: C.cyan },
                        { l: 'Bias Offset', v: '-0.2', c: C.red }
                    ].map((k, i) => (
                        <div key={i} style={{ padding: 24, background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, textAlign: 'center' }}>
                            <div style={{ fontSize: 10, fontWeight: 900, color: C.textMuted, marginBottom: 8 }}>{k.l}</div>
                            <div style={{ fontSize: 32, fontWeight: 900, color: k.c }}>{k.v}</div>
                        </div>
                    ))}
                </div>

                <Card style={{ flex: 1 }}>
                     <h4 style={{ fontSize: 14, fontWeight: 800, marginBottom: 16, borderBottom: `1px solid ${C.border}`, paddingBottom: 12 }}>Entity Relationships</h4>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                            { from: 'SearchIQ', to: 'Authority', val: '0.98' },
                            { from: 'SearchIQ', to: 'Innovation', val: '0.84' },
                            { from: 'SearchIQ', to: 'Reliability', val: '0.92' }
                        ].map((rel, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ color: C.cyan }}>{rel.from}</span>
                                    <span style={{ color: C.textMuted }}>→</span>
                                    <span style={{ color: C.text }}>{rel.to}</span>
                                </div>
                                <div style={{ fontWeight: 800, color: C.textMuted }}>{rel.val}</div>
                            </div>
                        ))}
                     </div>
                </Card>
            </div>
        </div>
    </div>
  );

  const renderVisibilityOverview = () => (
    <div className="fade-in">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 24, marginBottom: 32 }}>
            <Card style={{ background: `linear-gradient(135deg, ${C.cyan}10, ${C.card})`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ fontSize: 12, fontWeight: 900, color: C.cyan, marginBottom: 8 }}>PLATFORM DOMINATION</h3>
                    <div style={{ fontSize: 40, fontWeight: 950, color: C.text }}>Rank #1</div>
                    <div style={{ fontSize: 12, color: C.textSec, marginTop: 4 }}>Top 0.01% of all monitored tech nodes.</div>
                </div>
                <div style={{ width: 64, height: 64, borderRadius: '50%', border: `4px solid ${C.cyan}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Network color={C.cyan} size={32} />
                </div>
            </Card>

            <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: C.textMuted, marginBottom: 8 }}>ACTIVE CITATIONS</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: C.text }}>14,204</div>
                <div style={{ color: C.green, fontSize: 11, fontWeight: 800, marginTop: 4 }}>+2,400 this week</div>
            </Card>

            <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                 <div style={{ fontSize: 11, fontWeight: 800, color: C.textMuted, marginBottom: 8 }}>GEOGRAPHIC COVERAGE</div>
                 <div style={{ fontSize: 32, fontWeight: 900, color: C.text }}>92.4%</div>
                 <div style={{ color: C.cyan, fontSize: 11, fontWeight: 800, marginTop: 4 }}>Global SGE Nodes Sync</div>
            </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.3fr)', gap: 32 }}>
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800 }}>Search Engine Share</h3>
                    <button style={{ padding: '4px 12px', background: C.surf, border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 11 }}>COMPARE</button>
                </div>
                <div style={{ height: 220 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={[{n:'Google', v:45}, {n:'OpenAI', v:30}, {n:'Ant', v:15}, {n:'Perp', v:10}]} innerRadius={80} outerRadius={110} paddingAngle={10} dataKey="v" stroke="none">
                                <Cell fill={C.cyan} /><Cell fill={C.purple} /><Cell fill={C.amber} /><Cell fill={C.blue} />
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
                    {['Google: 45%', 'OpenAI: 30%', 'Anthropic: 15%', 'Perplexity: 10%'].map((l, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: C.textSec }}>
                            <div style={{ width: 8, height: 8, borderRadius: 2, background: [C.cyan, C.purple, C.amber, C.blue][i] }} />
                            {l}
                        </div>
                    ))}
                </div>
            </Card>

            <Card style={{ padding: 0 }}>
                <div style={{ padding: 24, borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800 }}>Live Discovery Pulse</h3>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: C.red, animation: 'pulse 1.5s infinite' }} />
                </div>
                <div style={{ padding: 24 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {[
                            { h: 'ChatGPT', m: 'Cited in technical stack guide', t: '2s ago' },
                            { h: 'Gemini', m: 'Ranked #1 for enterprise SEO queries', t: '15s ago' },
                            { h: 'SGE', m: 'Embedded in broad market overview', t: '1m ago' },
                            { h: 'Claude', m: 'Analysis focus on API efficiency', t: '5m ago' }
                        ].map((pulse, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: C.surf, borderRadius: 12 }}>
                                <div>
                                    <span style={{ fontSize: 12, fontWeight: 900, color: C.cyan }}>{pulse.h}</span>
                                    <p style={{ fontSize: 13, color: C.text, marginTop: 2 }}>{pulse.m}</p>
                                </div>
                                <span style={{ fontSize: 10, color: C.textMuted }}>{pulse.t}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
        <style>{`@keyframes pulse { 0% { opacity: 1 } 50% { opacity: 0.3 } 100% { opacity: 1 } }`}</style>
    </div>
  );

  const renderPromptResearch = () => (
    <div className="fade-in">
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 24, padding: 40, marginBottom: 32, display: 'flex', gap: 40, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <Terminal size={24} color={C.cyan} />
                    <span style={{ fontSize: 11, fontWeight: 900, color: C.textMuted, letterSpacing: '0.1em' }}>NEURAL PROMPT LAB v4.0</span>
                </div>
                <h2 style={{ fontSize: 32, fontWeight: 950, marginBottom: 16 }}>Simulate Neural Resonance</h2>
                <div style={{ position: 'relative' }}>
                    <input 
                        placeholder="Enter simulated prompt cluster..." 
                        style={{ width: '100%', background: C.surf, border: `1px solid ${C.border}`, padding: '18px 24px', borderRadius: 16, color: C.text, fontSize: 16, outline: 'none' }} 
                    />
                    <button style={{ position: 'absolute', right: 8, top: 8, bottom: 8, background: C.cyan, color: '#000', border: 'none', padding: '0 24px', borderRadius: 12, fontWeight: 900, cursor: 'pointer' }}>RUN SIM</button>
                </div>
            </div>
            <div style={{ width: 300, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                    { l: 'Accuracy', v: '98%', c: C.green },
                    { l: 'Bias', v: 'Low', c: C.cyan },
                    { l: 'Latency', v: '42ms', c: C.purple },
                    { l: 'Entropy', v: '0.4', c: C.blue }
                ].map((m, i) => (
                    <div key={i} style={{ padding: 16, background: C.surf, borderRadius: 16, border: `1px solid ${C.border}` }}>
                        <div style={{ fontSize: 10, fontWeight: 900, color: C.textMuted, marginBottom: 4 }}>{m.l}</div>
                        <div style={{ fontSize: 18, fontWeight: 900, color: m.c }}>{m.v}</div>
                    </div>
                ))}
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
                { title: 'Semantic Matching', score: 94, icon: Lightbulb, color: C.amber },
                { title: 'Zero-Shot Clarity', score: 82, icon: Cpu, iconColor: C.purple, color: C.purple },
                { title: 'Logical Cohesion', score: 76, icon: Box, color: C.blue },
                { title: 'Brand Extraction', score: 91, icon: Target, color: C.cyan }
            ].map((card, i) => (
                <Card key={i} onClick={() => onTriggerInsight(card.title)}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `${card.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                        <card.icon size={20} color={card.color} />
                    </div>
                    <h4 style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{card.title}</h4>
                    <div style={{ marginTop: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 6 }}>
                            <span style={{ color: C.textMuted }}>SIMULATION INDEX</span>
                            <span style={{ color: card.color, fontWeight: 900 }}>{card.score}%</span>
                        </div>
                        <div style={{ height: 4, background: C.surf, borderRadius: 2 }}>
                            <div style={{ width: `${card.score}%`, height: '100%', background: card.color, borderRadius: 2 }} />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    </div>
  );

  return (
    <div style={{ padding: "32px 40px", background: C.bg, minHeight: '100%' }}>
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ fontSize: 32, fontWeight: 950, color: C.text, letterSpacing: '-0.04em' }}>
            {mode === 'aiana' ? 'AI Semantic Analysis' : mode === 'visover' ? 'Visibility Nexus Overview' : mode === 'promptres' ? 'Neural Prompt Laboratory' : 'AI Visibility Intelligence'}
        </h1>
        <p style={{ color: C.textSec, fontSize: 15, marginTop: 8 }}>Operational intelligence for {domain} across global LLM clusters.</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={mode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
           {mode === 'aiana' && renderAIAnalysis()}
           {mode === 'visover' && renderVisibilityOverview()}
           {mode === 'promptres' && renderPromptResearch()}
           {mode === 'aivis' && renderAIVisibility()}
        </motion.div>
      </AnimatePresence>

        {/* ADDED NEW ELEMENTS */}
        <PredictiveAnalytics 
          onTriggerInsight={onTriggerInsight} 
          data={[
            {
              title: "AI Traffic Projection",
              description: `LLM-driven referral traffic is projected to grow by 28% as brand mentions become more authoritative in ChatGPT clusters.`,
              metric: "+28%",
              trend: [15, 18, 20, 19, 22, 25, 28, 27, 30, 32, 35],
              type: "forecast",
              color: C.purple,
              icon: Globe
            },
            {
              title: "Semantic Authority Score",
              description: "The brand's semantic weight in key AI responses is 84%, indicating core dominance in technical topic domains.",
              metric: 84,
              type: "integrity",
              color: C.cyan,
              icon: Shield
            }
          ]}
        />
    </div>
  );
} 