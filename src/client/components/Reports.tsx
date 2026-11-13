import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { DownloadCloud, Mail, Share2, FileText, Settings, Plus, Calendar, Filter, BarChart2, PieChart as PieIcon, Archive, Clock, Zap, LayoutGrid, Terminal, Cpu, Activity, Download, Target, Shield } from "lucide-react";
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

export default function Reports({ domain, onTriggerInsight }: any) {
  const [activeTab, setActiveTab] = useState("MASTER_INTEL");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/domain/reports?domain=${encodeURIComponent(domain || 'yourdomain.com')}`);
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
                <Terminal size={22} color={C.cyan} />
             </div>
             <span style={{ fontSize: 13, fontWeight: 900, color: C.cyan, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Intelligence Assembly Lab</span>
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 950, color: C.text, letterSpacing: '-0.05em' }}>Strategic Data Command</h1>
          <p style={{ color: C.textSec, fontSize: 16, marginTop: 8 }}>Orchestrating automated, high-fidelity neural reports for <strong>{domain}</strong>.</p>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <button style={{ background: C.card, color: C.text, border: `1px solid ${C.border}`, padding: '0 24px', height: 48, borderRadius: 16, fontSize: 13, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
            <LayoutGrid size={18} /> TEMPLATES
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTriggerInsight("Report Customization")}
            style={{ background: C.cyan, color: '#000', border: "none", padding: '0 24px', height: 48, borderRadius: 16, fontSize: 13, fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
          >
            <Plus size={18} /> GENERATE NEW
          </motion.button>
        </div>
      </div>

      {/* Logic Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 40 }}>
        {[
          { label: "Reports Generated", val: data?.totals?.generated || '1,422', delta: "84% Automated", color: C.cyan, icon: <FileText size={18} /> },
          { label: "Active Schedules", val: data?.totals?.scheduled || '24', delta: "Next: 4h 12m", color: C.purple, icon: <Clock size={18} /> },
          { label: "Portal Engagements", val: data?.totals?.views || '842', delta: "34 New Views", color: C.green, icon: <Activity size={18} /> },
          { label: "Processing Clock", val: data?.totals?.saved || '128h', delta: "AI Optimized", color: C.amber, icon: <Cpu size={18} /> },
        ].map(item => (
          <Card key={item.label} onClick={() => onTriggerInsight(item.label)} style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
               <div style={{ color: item.color }}>{item.icon}</div>
               <span style={{ fontSize: 11, fontWeight: 900, color: C.textMuted, textTransform: "uppercase", letterSpacing: '0.05em' }}>{item.label}</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 950, color: item.color }}>{item.val}</div>
            <div style={{ fontSize: 10, color: C.textSec, marginTop: 12, fontWeight: 800 }}>{item.delta}</div>
          </Card>
        ))}
      </div>

      {/* Main Command View */}
      <div style={{ display: "flex", gap: 32, minHeight: 0 }}>
        <div style={{ flex: 1 }}>
            <Card style={{ padding: 0 }}>
                <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, background: `${C.surf}40` }}>
                    {[
                        { id: "MASTER_INTEL", label: "My Reports", icon: <FileText size={16} /> },
                        { id: "SCHEDULED_TASKS", label: "Schedules", icon: <Clock size={16} /> },
                        { id: "NEURAL_TEMPLATES", label: "Templates", icon: <Settings size={16} /> }
                    ].map(tab => (
                        <div key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "24px 32px", color: activeTab === tab.id ? C.cyan : C.textSec, borderBottom: activeTab === tab.id ? `4px solid ${C.cyan}` : "4px solid transparent", cursor: "pointer", fontSize: 13, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 10, transition: '0.2' }}>
                            {tab.icon} {tab.label.toUpperCase()}
                        </div>
                    ))}
                </div>
                
                <div style={{ padding: 32 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
                        <div style={{ display: "flex", gap: 16 }}>
                            <div style={{ background: C.surf, border: `1px solid ${C.border}`, padding: "10px 16px", borderRadius: 12, fontSize: 12, color: C.text, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <Filter size={14} color={C.cyan} /> FILTER NODES
                            </div>
                            <div style={{ background: C.surf, border: `1px solid ${C.border}`, padding: "10px 16px", borderRadius: 12, fontSize: 12, color: C.text, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <Calendar size={14} color={C.cyan} /> LAST 90 DAYS
                            </div>
                        </div>
                    </div>

                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ textAlign: "left", borderBottom: `1px solid ${C.border}`, color: C.textMuted, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                <th style={{ padding: "16px 12px", fontWeight: 900 }}>Assembly ID</th>
                                <th style={{ padding: "16px 12px", fontWeight: 900 }}>Vector</th>
                                <th style={{ padding: "16px 12px", fontWeight: 900 }}>Last Processed</th>
                                <th style={{ padding: "16px 12px", fontWeight: 900 }}>Status</th>
                                <th style={{ padding: "16px 12px", fontWeight: 900, textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(data?.reports || []).map((r, i) => (
                                <tr key={i} style={{ borderBottom: `1px solid ${C.border}40`, transition: '0.2s' }}>
                                    <td style={{ padding: "20px 12px", fontSize: 14, color: C.text, fontWeight: 800, display: "flex", alignItems: "center", gap: 16 }}>
                                        <div style={{ width: 40, height: 40, borderRadius: 12, background: `${C.cyan}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <FileText size={20} color={C.cyan} />
                                        </div>
                                        {r.name}
                                    </td>
                                    <td style={{ padding: "20px 12px", fontSize: 12, color: C.textSec, fontWeight: 700 }}>{r.type.toUpperCase()}</td>
                                    <td style={{ padding: "20px 12px", fontSize: 12, color: C.textMuted }}>{r.date}</td>
                                    <td style={{ padding: "20px 12px" }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.status === 'Delivered' ? C.green : C.amber }} />
                                            <span style={{ color: r.status === 'Delivered' ? C.green : C.amber, fontSize: 11, fontWeight: 900 }}>{r.status.toUpperCase()}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: "20px 12px", textAlign: 'right' }}>
                                        <div style={{ display: "flex", gap: 20, justifyContent: 'flex-end' }}>
                                            <motion.div whileHover={{ scale: 1.2, color: C.cyan }} style={{ cursor: 'pointer', color: C.textMuted }}><Download size={18} /></motion.div>
                                            <motion.div whileHover={{ scale: 1.2, color: C.cyan }} style={{ cursor: 'pointer', color: C.textMuted }}><Mail size={18} /></motion.div>
                                            <motion.div whileHover={{ scale: 1.2, color: C.cyan }} style={{ cursor: 'pointer', color: C.textMuted }}><Share2 size={18} /></motion.div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>

        <div style={{ width: 400, display: "flex", flexDirection: "column", gap: 32 }}>
            <Card onClick={() => onTriggerInsight("Intel Flow")} style={{ padding: 32 }}>
                <h2 style={{ fontSize: 16, fontWeight: 950, marginBottom: 32, letterSpacing: '0.05em' }}>DATA FLOW TOPOLOGY</h2>
                <div style={{ height: 260 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data?.trendData || []}>
                            <defs>
                                <linearGradient id="colorAuto" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={C.cyan} stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor={C.cyan} stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={`${C.border}30`} vertical={false} />
                            <XAxis dataKey="month" hide />
                            <YAxis hide />
                            <Tooltip contentStyle={{ backgroundColor: C.card, borderColor: C.border, borderRadius: 12 }} />
                            <Area type="monotone" dataKey="automated" stroke={C.cyan} fillOpacity={1} fill="url(#colorAuto)" strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ marginTop: 24, padding: 16, background: `${C.cyan}05`, borderRadius: 16, border: `1px solid ${C.cyan}20` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 800 }}>Neural Efficiency</span>
                        <span style={{ fontSize: 12, fontWeight: 900, color: C.green }}>+42.8%</span>
                    </div>
                    <div style={{ height: 6, background: C.surf, borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: '42.8%', height: '100%', background: C.cyan }} />
                    </div>
                </div>
            </Card>

            <Card onClick={() => onTriggerInsight("Resource Distribution")}>
                <h2 style={{ fontSize: 14, fontWeight: 900, letterSpacing: '0.1em', color: C.textMuted, marginBottom: 32, textAlign: 'center' }}>RESOURCE ALLOCATION</h2>
                <div style={{ height: 140 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={data?.usage || []} innerRadius={70} outerRadius={95} paddingAngle={10} dataKey="value" stroke="none">
                                {(data?.usage || []).map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color?.replace?.('var(--cyan)', C.cyan)?.replace?.('var(--purple)', C.purple) || C.cyan} />)}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ display: "flex", flexWrap: 'wrap', gap: 12, marginTop: 32, justifyContent: 'center' }}>
                    {(data?.usage || []).map(t => (
                        <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: '6px 12px', background: `${C.surf}40`, borderRadius: 8 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.color?.replace?.('var(--cyan)', C.cyan)?.replace?.('var(--purple)', C.purple) || C.cyan }} />
                            <span style={{ fontSize: 11, color: C.text, fontWeight: 800 }}>{t.name}</span>
                        </div>
                    ))}
                </div>
            </Card>

            <Card style={{ background: `linear-gradient(135deg, ${C.purple}15, ${C.card})`, border: `1px solid ${C.purple}30` }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: C.purple, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Zap size={22} color="#fff" />
                    </div>
                    <div>
                        <div style={{ fontSize: 14, fontWeight: 900 }}>AI RECOMMENDATION</div>
                        <p style={{ fontSize: 12, color: C.textSec, marginTop: 4 }}>"Consolidate 'Client Overviews' into a single cross-channel stream to optimize processing token cost by 15%."</p>
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
              description: "Report generation analysis indicates a 22% growth in data-driven decision making nodes for the current domain.",
              metric: "+22%",
              trend: [10, 12, 11, 13, 15, 16, 15, 18, 20, 21, 22],
              type: "forecast",
              color: C.cyan,
              icon: Target
            },
            {
              title: "Authority Consistency",
              description: "Reporting integrity maintains a 98% validity score across automated data pipelines.",
              metric: 98,
              type: "integrity",
              color: C.purple,
              icon: Shield
            }
          ]}
        />
    </div>
  );
} 