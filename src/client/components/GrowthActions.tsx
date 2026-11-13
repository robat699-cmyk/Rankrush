import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ScatterChart, Scatter, Cell, LineChart, Line } from "recharts";
import { Zap, TrendingUp, CheckCircle, Target, ArrowRight, Lightbulb, Rocket, Layout, Link as LinkIcon, Code, Brain, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const C = { bg:'var(--bg)', surf:'var(--surf)', card:'var(--card)', border:'var(--border)', borderHov:'var(--borderHov)', cyan:'var(--cyan)', green:'var(--green)', red:'var(--red)', amber:'var(--amber)', purple:'var(--purple)', blue:'var(--blue)', text:'var(--text)', textSec:'var(--textSec)', textMuted:'var(--textMuted)' };

const Card = ({ children, style = {}, onClick }) => (
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

const opportunityData = [
  { name: 'Core Web Vitals', impact: 85, effort: 60 },
  { name: 'Rewrite /pricing', impact: 95, effort: 30 },
  { name: 'Fix 404s', impact: 40, effort: 10 },
  { name: 'Add FAQs to /seo', impact: 75, effort: 20 },
  { name: 'Disavow toxic links', impact: 65, effort: 40 },
  { name: 'Create Topic Cluster', impact: 90, effort: 95 },
];

const impactTimeline = [
  { week: 'W1', estTraffic: 1000 },
  { week: 'W2', estTraffic: 1200 },
  { week: 'W3', estTraffic: 1600 },
  { week: 'W4', estTraffic: 2400 },
];

export default function GrowthActions({ domain, onTriggerInsight }) {
  const [filter, setFilter] = useState("All");

  return (
    <div className="fade-in" style={{ padding: "40px 48px", background: C.bg, minHeight: '100%' }}>
      {/* Header Evolution */}
      <div style={{ marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
             <div style={{ width: 40, height: 40, borderRadius: 12, background: `${C.amber}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Rocket size={22} color={C.amber} />
             </div>
             <span style={{ fontSize: 13, fontWeight: 900, color: C.amber, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Opportunity Propulsion</span>
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 950, color: C.text, letterSpacing: '-0.05em' }}>Growth Action Matrix</h1>
          <p style={{ color: C.textSec, fontSize: 16, marginTop: 8 }}>High-velocity, AI-prioritized operations to scale traffic for <strong>{domain}</strong>.</p>
        </div>
        <div style={{ display: "flex", background: C.card, padding: 6, borderRadius: 16, border: `1px solid ${C.border}` }}>
          {["All", "Content", "Technical", "Links"].map(p => (
            <button key={p} onClick={() => setFilter(p)} style={{ background: filter === p ? C.cyan : "transparent", color: filter === p ? "#000" : C.textSec, border: "none", padding: '10px 20px', borderRadius: 12, fontSize: 13, cursor: "pointer", fontWeight: 800, transition: '0.2s' }}>
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)", gap: 32, marginBottom: 40 }}>
        <Card onClick={() => onTriggerInsight("Priority Analysis")} style={{ padding: 0 }}>
            <div style={{ padding: 32, borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Target size={20} color={C.purple} />
                    <h2 style={{ fontSize: 18, fontWeight: 900 }}>Strategic Priority Matrix</h2>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: C.green, background: `${C.green}10`, padding: '6px 12px', borderRadius: 8 }}>VULNERABILITY SCAN: ACTIVE</div>
                </div>
            </div>
            <div style={{ padding: 32 }}>
                <div style={{ height: 240, background: `radial-gradient(circle at 100% 0%, ${C.purple}05 0%, transparent 40%), ${C.surf}40`, borderRadius: 24, border: `1px solid ${C.border}`, position: 'relative' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={`${C.border}30`} />
                        <XAxis type="number" dataKey="effort" name="Effort" stroke={C.textMuted} domain={[0, 100]} tick={{ fontSize: 11, fontWeight: 700 }} />
                        <YAxis type="number" dataKey="impact" name="Impact" stroke={C.textMuted} domain={[0, 100]} tick={{ fontSize: 11, fontWeight: 700 }} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="Tasks" data={opportunityData}>
                            {opportunityData.map((entry, index) => {
                            const color = entry.impact > 80 && entry.effort < 40 ? C.green : entry.impact > 70 ? C.cyan : C.amber;
                            return <Cell key={`cell-${index}`} fill={color} stroke="#000" strokeWidth={2} />
                            })}
                        </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                    {/* Quadrant Labels */}
                    <div style={{ position: 'absolute', top: 20, right: 20, fontSize: 10, fontWeight: 900, color: C.green, opacity: 0.5 }}>STRATEGIC WINS</div>
                    <div style={{ position: 'absolute', bottom: 20, left: 20, fontSize: 10, fontWeight: 900, color: C.textMuted, opacity: 0.5 }}>LOW PRIORITY</div>
                </div>
            </div>
        </Card>

        <Card onClick={() => onTriggerInsight("Trajectory Pulse")} style={{ background: `linear-gradient(135deg, ${C.card}, ${C.green}05)` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                <TrendingUp size={20} color={C.green} />
                <h2 style={{ fontSize: 16, fontWeight: 900 }}>Yield Velocity Projection</h2>
            </div>
            <div style={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={impactTimeline}>
                        <CartesianGrid strokeDasharray="3 3" stroke={`${C.border}30`} vertical={false} />
                        <XAxis dataKey="week" hide />
                        <YAxis hide />
                        <Tooltip contentStyle={{ backgroundColor: C.card, borderColor: C.border, borderRadius: 12 }} />
                        <Line type="monotone" dataKey="estTraffic" stroke={C.green} strokeWidth={4} dot={{ r: 6, fill: C.green, strokeWidth: 2, stroke: C.card }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div style={{ textAlign: "center", marginTop: 32, padding: 24, background: `${C.surf}40`, borderRadius: 20, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 48, fontWeight: 950, color: C.green, letterSpacing: '-0.05em' }}>+2,400</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: C.textSec, marginTop: 4 }}>PROJECTED MONTHLY GROWTH (MAU)</div>
            </div>
        </Card>
      </div>

      {/* Task Stack */}
      <h2 style={{ fontSize: 14, fontWeight: 900, color: C.textMuted, letterSpacing: '0.15em', marginBottom: 24, textTransform: 'uppercase' }}>HIGH-FIDELITY ACTION STACK</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
        {[
          { title: "Rewrite Landing Page Headers", type: "Content", impact: "High", time: "2h", desc: "H1 nodes on /pricing and /features are sub-optimal compared to top 3 market leaders. Recommend neural keyword re-injection.", icon: <Layout /> , color: C.cyan },
          { title: "Optimize Mobile Rendering Cycle", type: "Technical", impact: "High", time: "4h", desc: "LCP threshold exceeded (4.2s). Mobile-first indexers are penalizing load velocity in high-competition SERPs.", icon: <Code />, color: C.purple },
          { title: "Purge 45 Toxic Discovery Nodes", type: "Links", impact: "Medium", time: "1h", desc: "Detection of synthetic link farms pointing to root infrastructure. Immediate disavow required to stabilize authority.", icon: <LinkIcon />, color: C.red },
          { title: "Deploy FAQ Knowledge Schema", type: "Technical", impact: "High", time: "3h", desc: "Missing semantic markup. Injecting FAQ structure gives a 40% probability of capturing high-intent PAA boxes.", icon: <Brain />, color: C.blue },
        ].map((task, i) => (
          <Card key={i} onClick={() => onTriggerInsight(task.title)} style={{ padding: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24, padding: 32 }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: `${task.color}10`, display: "flex", alignItems: "center", justifyContent: "center", color: task.color, flexShrink: 0 }}>
                    {React.cloneElement(task.icon as any, { size: 28 })}
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
                        <h3 style={{ fontSize: 18, fontWeight: 900, color: C.text }}>{task.title}</h3>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <span style={{ fontSize: 10, background: C.surf, padding: "4px 10px", borderRadius: 8, color: C.text, fontWeight: 800 }}>{task.type.toUpperCase()}</span>
                            <span style={{ fontSize: 10, background: task.impact === 'High' ? `${C.green}15` : `${C.amber}15`, color: task.impact === 'High' ? C.green : C.amber, padding: "4px 10px", borderRadius: 8, fontWeight: 900 }}>{task.impact.toUpperCase()} IMPACT</span>
                        </div>
                    </div>
                    <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6 }}>{task.desc}</p>
                </div>
                <div style={{ textAlign: "right", paddingLeft: 40, borderLeft: `1px solid ${C.border}40` }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: C.textMuted, marginBottom: 4 }}>EST. TIME</div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: C.text }}>{task.time}</div>
                    <motion.button 
                        whileHover={{ x: 5 }}
                        onClick={(e) => { e.stopPropagation(); onTriggerInsight(task.title, `Executing growth action: ${task.title}. Desc: ${task.desc}`); }}
                        style={{ marginTop: 12, background: 'transparent', border: 'none', color: C.cyan, fontSize: 13, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                        EXECUTE <ArrowRight size={16} />
                    </motion.button>
                </div>
            </div>
            {/* Progress/Confidence bar */}
            <div style={{ height: 4, width: '100%', background: C.surf }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${(100 - i * 15)}%` }} style={{ height: '100%', background: task.color, opacity: 0.6 }} />
            </div>
          </Card>
        ))}
      </div>

        {/* ADDED NEW ELEMENTS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>Advanced Prediction Engine</p>
            <p style={{ fontSize: 11, color: 'var(--textSec)' }}>AI-Driven forecasting indicates a +12.4% trajectory over the next quarter based on structural upgrades.</p>
            <div style={{ marginTop: 12, height: 60, background: 'var(--surf)', borderRadius: 8, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: '0 8px 8px', gap: 4 }}>
                 {[4, 7, 5, 8, 9, 12, 10, 15, 14, 18, 20].map((v, i) => <div key={i} style={{ flex: 1, height: `${v * 3}%`, background: 'var(--cyan)', opacity: 0.8, borderRadius: '2px 2px 0 0' }} />)}
            </div>
          </div>
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
             <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>Structural Integrity</p>
             <p style={{ fontSize: 11, color: 'var(--textSec)' }}>Zero significant metric anomalies detected in the last 72 hours. Operations are nominal.</p>
             <div style={{ marginTop: 12, height: 60, background: 'var(--surf)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <div style={{ width: '80%', height: 6, background: 'var(--border)', borderRadius: 10, overflow: 'hidden' }}>
                      <div style={{ width: '94%', height: '100%', background: 'var(--purple)', borderRadius: 10 }} />
                 </div>
             </div>
          </div>
        </div>
    </div>
  );
} 