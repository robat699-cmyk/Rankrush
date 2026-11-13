import React, { useState, useEffect } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Radio, Users, ShieldAlert, Globe, MessageSquare, AlertTriangle, Zap, ArrowUpRight, Shield, Cpu, Activity, Info, ChevronRight, Sparkles, Terminal, Target } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import PredictiveAnalytics from "./PredictiveAnalytics";

const C = { bg:'var(--bg)', surf:'var(--surf)', card:'var(--card)', border:'var(--border)', borderHov:'var(--borderHov)', cyan:'var(--cyan)', green:'var(--green)', red:'var(--red)', amber:'var(--amber)', purple:'var(--purple)', blue:'var(--blue)', text:'var(--text)', textSec:'var(--textSec)', textMuted:'var(--textMuted)' };

const Card = ({ children, style = {}, onClick }: any) => (
  <motion.div 
    whileHover={onClick ? { y: -4, borderColor: C.purple, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' } : {}}
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

const radarData = [
  { subject: 'Innovation', A: 85, B: 65, fullMark: 100 },
  { subject: 'Trust', A: 90, B: 80, fullMark: 100 },
  { subject: 'Performance', A: 78, B: 85, fullMark: 100 },
  { subject: 'Value', A: 65, B: 75, fullMark: 100 },
  { subject: 'Customer Service', A: 88, B: 70, fullMark: 100 },
  { subject: 'Reliability', A: 95, B: 82, fullMark: 100 },
];

export default function AIPR({ domain, onTriggerInsight }: any) {
  const [topic, setTopic] = useState("All Brand Mentions");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/domain/aipr?domain=${encodeURIComponent(domain || 'yourdomain.com')}`);
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
      {/* Narrative Control Header */}
      <div style={{ marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
             <div style={{ width: 40, height: 40, borderRadius: 12, background: `${C.purple}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={22} color={C.purple} />
             </div>
             <span style={{ fontSize: 13, fontWeight: 900, color: C.purple, letterSpacing: '0.1em', textTransform: 'uppercase' }}>AI Reputation Governance</span>
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 950, color: C.text, letterSpacing: '-0.05em' }}>Narrative Dashboard</h1>
          <p style={{ color: C.textSec, fontSize: 16, marginTop: 8 }}>Governing brand perception across AI LLM knowledge models and digital media vectors for <strong>{domain}</strong>.</p>
        </div>
        <div style={{ display: "flex", background: C.card, padding: 6, borderRadius: 16, border: `1px solid ${C.border}` }}>
          {["All Mentions", "Executives", "Product"].map(p => (
            <button key={p} onClick={() => setTopic(p)} style={{ background: topic === p ? C.purple : "transparent", color: topic === p ? "#fff" : C.textSec, border: "none", padding: '10px 20px', borderRadius: 12, fontSize: 13, cursor: "pointer", fontWeight: 800, transition: '0.2s' }}>
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Narrative Vitality Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 40 }}>
        {[
          { label: "LLM Citations", val: data?.metrics?.mentions || '1,280', delta: "+12%", color: C.cyan, icon: <Cpu size={18} /> },
          { label: "Sentient Index", val: data?.metrics?.sentiment || 'Strategic', delta: "Positive", color: C.purple, icon: <Activity size={18} /> },
          { label: "Entity Density", val: data?.metrics?.sources || '842', delta: "84 High Auth", color: C.amber, icon: <Radio size={18} /> },
          { label: "Knowledge Reach", val: data?.metrics?.reach || '4.2M', delta: "↑ 8.4%", color: C.blue, icon: <Globe size={18} /> },
        ].map(item => (
          <Card key={item.label} onClick={() => onTriggerInsight(item.label)} style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
               <div style={{ color: item.color }}>{item.icon}</div>
               <span style={{ fontSize: 11, fontWeight: 900, color: C.textMuted, textTransform: "uppercase", letterSpacing: '0.05em' }}>{item.label}</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 950, color: item.color, letterSpacing: '-0.02em' }}>{item.val}</div>
            <div style={{ fontSize: 10, color: C.green, marginTop: 12, fontWeight: 900 }}>{item.delta.toUpperCase()} VELOCITY</div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)", gap: 32, marginBottom: 40 }}>
        <Card onClick={() => onTriggerInsight("Knowledge Base Propagation")} style={{ padding: 0 }}>
            <div style={{ padding: 32, borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Activity size={20} color={C.cyan} />
                    <h2 style={{ fontSize: 18, fontWeight: 900 }}>Propagation Matrix</h2>
                </div>
                {loading && <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 800 }}>SYNCING...</div>}
            </div>
            <div style={{ padding: 32 }}>
                <div style={{ height: 380 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data?.trendData || []}>
                            <CartesianGrid strokeDasharray="3 3" stroke={`${C.border}20`} vertical={false} />
                            <XAxis dataKey="month" hide />
                            <YAxis hide />
                            <Tooltip contentStyle={{ backgroundColor: C.card, borderColor: C.border, borderRadius: 12 }} />
                            <Line type="monotone" dataKey="mentions" stroke={C.cyan} strokeWidth={4} dot={false} activeDot={{ r: 8, fill: C.cyan }} />
                            <Line type="monotone" dataKey="positive" stroke={C.green} strokeWidth={2} dot={false} strokeDasharray="8 8" />
                            <Line type="monotone" dataKey="negative" stroke={C.red} strokeWidth={2} dot={false} strokeDasharray="8 8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Card>

        <Card onClick={() => onTriggerInsight("Entity Radar")} style={{ background: `linear-gradient(135deg, ${C.card}, ${C.purple}05)` }}>
            <h2 style={{ fontSize: 16, fontWeight: 950, marginBottom: 32, letterSpacing: '0.05em' }}>ENTITY TOPOLOGY</h2>
            <div style={{ height: 380 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                        <PolarGrid stroke={C.border} />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: C.textMuted, fontSize: 11, fontWeight: 800 }} />
                        <Radar name={domain} dataKey="A" stroke={C.cyan} fill={C.cyan} fillOpacity={0.2} />
                        <Radar name="Competitor" dataKey="B" stroke={C.purple} fill={C.purple} fillOpacity={0.2} />
                        <Tooltip contentStyle={{ background: C.card, borderRadius: 12 }} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <h2 style={{ fontSize: 13, fontWeight: 900, color: C.textMuted, letterSpacing: '0.2em' }}>INFLUENCE & MEDIA VECTORS</h2>
            {data?.ops?.map((m, i) => (
                <Card key={i} onClick={() => onTriggerInsight("Pitch Optimization")} style={{ padding: 32 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: `${C.purple}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ArrowUpRight size={20} color={C.purple} />
                            </div>
                            <div>
                                <div style={{ fontSize: 15, fontWeight: 900 }}>{m.publication}</div>
                                <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 800 }}>RESONANCE VECTOR • {m.topic.toUpperCase()}</div>
                            </div>
                        </div>
                        <div style={{ background: `${C.cyan}10`, color: C.cyan, padding: '6px 14px', borderRadius: 10, fontSize: 11, fontWeight: 900 }}>
                            {m.impact.toUpperCase()} IMPACT
                        </div>
                    </div>
                    <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.7, padding: '20px 24px', background: `${C.purple}02`, borderLeft: `4px solid ${C.purple}`, borderRadius: '0 16px 16px 0' }}>
                        "{m.desc}"
                    </p>
                    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                        <a 
                            href={`https://google.com/search?q=${encodeURIComponent(m.publication + " " + m.topic)}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ fontSize: 12, color: C.purple, fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
                            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                        >
                            ACCESS MEDIA NODE <ChevronRight size={14} />
                        </a>
                    </div>
                </Card>
            ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <h2 style={{ fontSize: 13, fontWeight: 900, color: C.textMuted, letterSpacing: '0.2em' }}>RISK WATCH & NEURAL PATCHES</h2>
            <Card style={{ padding: 0 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ textAlign: "left", background: `${C.surf}40`, borderBottom: `1px solid ${C.border}`, color: C.textMuted, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            <th style={{ padding: "20px 24px", fontWeight: 950 }}>CLAIM NODE</th>
                            <th style={{ padding: "20px 24px", fontWeight: 950 }}>LLM</th>
                            <th style={{ padding: "20px 24px", fontWeight: 950, textAlign: 'right' }}>VECTOR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { claim: `Claims ${domain} was recently acquired.`, model: 'Perplexity', risk: 'High', action: 'Draft Patch' },
                            { claim: 'Outdated API documentation cached.', model: 'ChatGPT-4o', risk: 'Medium', action: 'Update Knowledge' },
                            { claim: 'Wrong leadership assignment.', model: 'Claude 3.5 Opus', risk: 'Low', action: 'Submit Feedback' },
                        ].map((c, i) => (
                            <tr key={i} style={{ borderBottom: `1px solid ${C.border}40` }}>
                                <td style={{ padding: "20px 24px" }}>
                                    <div style={{ display: 'flex', gap: 12 }}>
                                        <ShieldAlert size={16} color={c.risk === 'High' ? C.red : C.amber} style={{ marginTop: 2 }} />
                                        <div style={{ fontSize: 13, fontWeight: 800, color: C.text, lineHeight: 1.4 }}>{c.claim}</div>
                                    </div>
                                </td>
                                <td style={{ padding: "20px 24px", fontSize: 13, fontWeight: 900, color: C.purple }}>{c.model}</td>
                                <td style={{ padding: "20px 24px", textAlign: 'right' }}>
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => onTriggerInsight("Correction Sequence")}
                                        style={{ background: C.surf, border: `1px solid ${C.border}`, color: C.text, padding: "8px 16px", borderRadius: 12, cursor: "pointer", fontSize: 11, fontWeight: 900 }}
                                    >
                                        {c.action.toUpperCase()}
                                    </motion.button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            <Card style={{ background: `linear-gradient(135deg, ${C.red}15, ${C.card})`, border: `1px solid ${C.red}30` }}>
                <div style={{ display: 'flex', gap: 20 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 16, background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <AlertTriangle size={24} color="#fff" />
                    </div>
                    <div>
                        <div style={{ fontSize: 15, fontWeight: 950, color: C.text }}>NEURAL VULNERABILITY DETECTED</div>
                        <p style={{ fontSize: 13, color: C.textSec, marginTop: 4, lineHeight: 1.6 }}>Detecting 3 independent hallucination vectors regarding financial instability. AI Narrative Patch required to prevent SEO integrity loss.</p>
                        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                            <button onClick={() => onTriggerInsight("Neural Vulnerability Patch", "Deploying high-priority logic patch to neutralize halluncination vectors.")} style={{ background: '#fff', color: '#000', border: 'none', padding: '8px 16px', borderRadius: 8, fontSize: 11, fontWeight: 900, cursor: 'pointer' }}>DEPLOY PATCH</button>
                            <button onClick={() => onTriggerInsight("Alert Management", "Silencing the neural anomaly alert. Monitoring background vectors.")} style={{ background: 'transparent', color: C.text, border: `1px solid ${C.border}`, padding: '8px 16px', borderRadius: 8, fontSize: 11, fontWeight: 900, cursor: 'pointer' }}>SILENCE ALERT</button>
                        </div>
                    </div>
                </div>
            </Card>

            <Card style={{ padding: 24, background: `${C.surf}40` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <Terminal size={18} color={C.cyan} />
                    <span style={{ fontSize: 11, fontWeight: 900, color: C.textMuted, letterSpacing: '0.1em' }}>REPUTATION LOGS</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {['Narrative Sync Completed', 'LLM Crawler Blocked', 'Entity Map Updated'].map((log, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 800 }}>
                            <span style={{ color: C.textSec }}>{log}</span>
                            <span style={{ color: C.cyan }}>SUCCESS</span>
                        </div>
                    ))}
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
              description: "AI PR campaigns are projecting a 22% increase in brand authority citations across major LLM clusters.",
              metric: "+22%",
              trend: [12, 14, 15, 16, 18, 20, 19, 22, 23, 24, 26],
              type: "forecast",
              color: C.cyan,
              icon: Target
            },
            {
              title: "Authority Consistency",
              description: "Media mention nodes maintain an 88% authority rating across high-tier publication databases.",
              metric: 88,
              type: "integrity",
              color: C.purple,
              icon: Shield
            }
          ]}
        />
    </div>
  );
} 