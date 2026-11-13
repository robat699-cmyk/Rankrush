import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from "recharts";
import { MapPin, Star, AlertTriangle, Navigation, ShieldCheck, Search, ArrowRight, Share2, Locate, Map, CheckCircle2, History, Target, Shield } from "lucide-react";
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

const geoData = [
  { x: 10, y: 30, z: 200, name: 'Downtown (Rank #1)' },
  { x: -20, y: 50, z: 400, name: 'Northside (Rank #4)' },
  { x: 40, y: -10, z: 300, name: 'East End (Rank #2)' },
  { x: -50, y: -40, z: 150, name: 'Westville (Rank #8)' },
  { x: 15, y: -60, z: 250, name: 'Southpark (Rank #3)' },
];

const reviewSentiment = [
  { name: 'Positive', value: 450, color: C.green },
  { name: 'Neutral', value: 120, color: C.amber },
  { name: 'Negative', value: 45, color: C.red },
];

export default function LocalSEO({ domain, onTriggerInsight }: any) {
  const [location, setLocation] = useState("San Francisco, CA");

  return (
    <div className="fade-in" style={{ padding: "40px 48px", minHeight: '100%', background: C.bg }}>
      {/* Header Evolution */}
      <div style={{ marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
             <div style={{ width: 40, height: 40, borderRadius: 12, background: `${C.cyan}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={22} color={C.cyan} />
             </div>
             <span style={{ fontSize: 13, fontWeight: 900, color: C.cyan, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Geo-Intelligence Array</span>
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 950, color: C.text, letterSpacing: '-0.05em' }}>Local Domain Dominance</h1>
          <p style={{ color: C.textSec, fontSize: 16, marginTop: 8 }}>Analyzing map-pack resonance and localized semantic authority for <strong>{domain}</strong>.</p>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '4px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
             <Locate size={16} color={C.textMuted} />
             <select value={location} onChange={e => setLocation(e.target.value)} style={{ background: 'transparent', color: C.text, border: "none", height: 40, outline: "none", fontWeight: 700, fontSize: 14 }}>
                <option>San Francisco, CA</option>
                <option>Palo Alto, CA</option>
                <option>New York, NY</option>
             </select>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ background: C.cyan, color: '#000', border: "none", padding: '0 24px', borderRadius: 16, fontSize: 13, cursor: "pointer", fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            INITIATE CORE SCAN
          </motion.button>
        </div>
      </div>

      {/* Grid Pulse */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 40 }}>
        {[
          { label: "Map-Pack Share", val: "72%", delta: "+5.4%", color: C.cyan, icon: <Map size={18} /> },
          { label: "Trust Resonance", val: "4.9/5", delta: "Elite Mode", color: C.green, icon: <Star size={18} /> },
          { label: "Signal Integrity", val: "94.2", delta: "Synchronized", color: C.purple, icon: <ShieldCheck size={18} /> },
          { label: "Discovery Rate", val: "12K", delta: "High Velocity", color: C.blue, icon: <Navigation size={18} /> },
        ].map(item => (
          <Card key={item.label} onClick={() => onTriggerInsight(item.label)} style={{ padding: 24 }}>
            <div style={{ color: item.color, marginBottom: 16 }}>{item.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 900, color: C.textMuted, textTransform: "uppercase", letterSpacing: '0.05em', marginBottom: 8 }}>{item.label}</div>
            <div style={{ fontSize: 32, fontWeight: 950, color: item.color }}>{item.val}</div>
            <div style={{ fontSize: 10, color: C.textSec, marginTop: 12, fontWeight: 800, padding: '4px 10px', background: `${item.color}05`, borderRadius: 20, display: 'inline-block' }}>{item.delta}</div>
          </Card>
        ))}
      </div>

      {/* Main Intel Body */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)", gap: 32, marginBottom: 40 }}>
        <Card onClick={() => onTriggerInsight("Geo-Rank Radius")} style={{ padding: 0 }}>
            <div style={{ padding: 32, borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                   <h2 style={{ fontSize: 18, fontWeight: 900 }}>Spatial Ranking Radius</h2>
                   <p style={{ fontSize: 13, color: C.textSec, marginTop: 4 }}>Visualizing ranking decay across coordinate grids from center mass.</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: C.green, background: `${C.green}10`, padding: '6px 12px', borderRadius: 8 }}>RANK #1 FOCUS</div>
                </div>
            </div>
            <div style={{ padding: 32 }}>
                <div style={{ height: 190, background: `radial-gradient(circle at 50% 50%, ${C.cyan}05 0%, transparent 60%), ${C.surf}40`, borderRadius: 24, border: `1px solid ${C.border}`, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: `radial-gradient(${C.textMuted} 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={`${C.border}30`} vertical={false} />
                            <XAxis type="number" dataKey="x" stroke={C.border} tick={false} domain={[-100, 100]} axisLine={false} />
                            <YAxis type="number" dataKey="y" stroke={C.border} tick={false} domain={[-100, 100]} axisLine={false} />
                            <ZAxis type="number" dataKey="z" range={[200, 1000]} name="Confidence" />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter name="Grid Ranks" data={geoData}>
                                {geoData.map((entry, index) => {
                                    const color = entry.name.includes('#1') ? C.cyan : entry.name.includes('#2') ? C.green : C.purple;
                                    return <Cell key={`cell-${index}`} fill={color} stroke="#000" strokeWidth={2} />
                                })}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                    <div style={{ position: 'absolute', bottom: 20, right: 20, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', padding: '12px 16px', borderRadius: 16, border: `1px solid ${C.border}` }}>
                        <div style={{ fontSize: 10, fontWeight: 900, color: C.textMuted, marginBottom: 8 }}>SIGNAL SCALE</div>
                        <div style={{ display: 'flex', gap: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: C.cyan }} /><span style={{ fontSize: 11, fontWeight: 700 }}>Peak Power</span></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: C.purple }} /><span style={{ fontSize: 11, fontWeight: 700 }}>Signal Decay</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <Card onClick={() => onTriggerInsight("Sentiment Analysis")} style={{ background: `linear-gradient(135deg, ${C.card}, ${C.green}05)`, textAlign: 'center' }}>
                <h2 style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.1em', color: C.textMuted, marginBottom: 32 }}>PUBLIC SENTIMENT VECTOR</h2>
                <div style={{ height: 260, position: 'relative' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={reviewSentiment} innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value" stroke="none">
                                {reviewSentiment.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <div style={{ fontSize: 48, fontWeight: 950, color: C.text, letterSpacing: '-0.05em' }}>4.9</div>
                        <div style={{ fontSize: 12, fontWeight: 800, color: C.green }}>ELITE TRUST</div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 32 }}>
                    {reviewSentiment.map(t => (
                        <div key={t.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: `${C.surf}40`, borderRadius: 12 }}>
                            <span style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</span>
                            <span style={{ fontSize: 13, fontWeight: 900, color: t.color }}>{t.value} Feedback Pulses</span>
                        </div>
                    ))}
                </div>
            </Card>

            <Card style={{ background: `${C.purple}10`, border: `1px solid ${C.purple}30` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <History size={18} color={C.purple} />
                        <span style={{ fontSize: 13, fontWeight: 900 }}>Scan Latency</span>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 900, color: C.green }}>LIVE</span>
                </div>
                <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>420ms</div>
                <p style={{ fontSize: 12, color: C.textSec, lineHeight: 1.6 }}>Real-time location synchronizers are currently monitoring <strong>842 citations</strong> across Google and Bing.</p>
            </Card>
        </div>
      </div>

      {/* Directory Integrity */}
      <Card style={{ padding: 0 }}>
        <div style={{ padding: 32, borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 18, fontWeight: 900 }}>NAP Citation Integrity Vault</h2>
            <button style={{ fontSize: 12, color: C.cyan, background: `${C.cyan}10`, border: 'none', padding: '10px 20px', borderRadius: 12, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Share2 size={14} /> Full Synchronization
            </button>
        </div>
        <div style={{ padding: 20 }}>
            {[
                { dir: 'Google Business Cloud', status: 'SYNCHRONIZED', score: 100, color: C.green },
                { dir: 'Yelp Precision Intel', status: 'VERIFIED', score: 98, color: C.cyan },
                { dir: 'Bing Places Network', status: 'MISMATCHED', score: 45, color: C.amber },
                { dir: 'Apple Discovery Nodes', status: 'NOT PROVISIONED', score: 0, color: C.red },
            ].map((c, i) => (
                <div key={i} style={{ padding: 24, borderBottom: i === 3 ? 'none' : `1px solid ${C.border}40`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: '0.2s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, flex: 1 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 16, background: `${c.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {c.score > 90 ? <CheckCircle2 size={24} color={c.color} /> : <AlertTriangle size={24} color={c.color} />}
                        </div>
                        <div>
                            <div style={{ fontSize: 15, fontWeight: 800, color: C.text }}>{c.dir}</div>
                            <div style={{ fontSize: 11, fontWeight: 900, color: c.color, marginTop: 4 }}>{c.status}</div>
                        </div>
                    </div>
                    <div style={{ flex: 1, padding: '0 40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 900, color: C.textMuted, marginBottom: 8 }}>
                            <span>Integrity Quotient</span>
                            <span>{c.score}%</span>
                        </div>
                        <div style={{ width: '100%', height: 6, background: C.surf, borderRadius: 10, overflow: 'hidden' }}>
                            <motion.div initial={{ width: 0 }} animate={{ width: `${c.score}%` }} style={{ height: '100%', background: c.color, borderRadius: 10 }} />
                        </div>
                    </div>
                    <button 
                        onClick={() => onTriggerInsight("Integrity Fix", `Correcting protocol for ${c.dir}. Global sync initiated.`)}
                        style={{ padding: '10px 24px', background: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 11, fontWeight: 900, cursor: 'pointer', color: C.text }}
                    >
                        {c.score === 100 ? 'VIEW LOGS' : 'REPAIR NODE'}
                    </button>
                </div>
            ))}
        </div>
      </Card>

      <PredictiveAnalytics 
        onTriggerInsight={onTriggerInsight} 
        data={[
          {
            title: "Traffic Market Analysis",
            description: "Local search vectors are projecting a 14% increase in proximity-based traffic for target retail nodes.",
            metric: "+14%",
            trend: [10, 11, 12, 11.5, 13, 14, 13.5, 15, 16, 17, 18],
            type: "forecast",
            color: C.cyan,
            icon: Target
          },
          {
            title: "Authority Consistency",
            description: "NAP (Name, Address, Phone) consistency nodes maintain a 96% accuracy rating across local directories.",
            metric: 96,
            type: "integrity",
            color: C.purple,
            icon: Shield
          }
        ]}
      />
    </div>
  );
}

const CheckIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const AlertIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
