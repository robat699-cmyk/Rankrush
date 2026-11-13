import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { AlertTriangle, Info, CheckCircle, Search, Server, Monitor, Sparkles, Activity, Shield } from "lucide-react";
import { motion } from "motion/react";

import PredictiveAnalytics from "./PredictiveAnalytics";

const C = { bg:'var(--bg)', surf:'var(--surf)', card:'var(--card)', border:'var(--border)', borderHov:'var(--borderHov)', cyan:'var(--cyan)', green:'var(--green)', red:'var(--red)', amber:'var(--amber)', purple:'var(--purple)', blue:'var(--blue)', text:'var(--text)', textSec:'var(--textSec)', textMuted:'var(--textMuted)' };


const Card = ({ children, style = {}, onClick, onAIInteraction }: any) => (
  <motion.div 
    whileHover={{ y: -1, scale: 1.002 }}
    style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", transition: "border-color 0.2s", cursor: onClick ? "pointer" : "default", position: 'relative', ...style }}
    onClick={onClick}
  >
    {children}
    {onAIInteraction && (
       <div onClick={(e) => { e.stopPropagation(); onAIInteraction(); }} style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer', color: C.purple, opacity: 0.7 }}>
          <Sparkles size={16} />
       </div>
    )}
  </motion.div>
);

const crawlHistory = [
  { date: 'May 1', score: 65, errors: 450, warnings: 1200 },
  { date: 'May 4', score: 68, errors: 410, warnings: 1100 },
  { date: 'May 8', score: 72, errors: 300, warnings: 900 },
  { date: 'May 12', score: 78, errors: 120, warnings: 650 },
  { date: 'May 14', score: 82, errors: 45, warnings: 400 },
];

export default function SiteAudit({ domain, onTriggerInsight }: any) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [auditData, setAuditData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runAudit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/audit/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: domain })
      });
      const data = await res.json();
      setAuditData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (domain) {
      runAudit();
    }
  }, [domain]);

  const issueBreakdown = [
    { name: 'Crawlability', value: auditData?.issues?.filter(i => i.type === 'error').length * 10 || 45, color: C.red, desc: 'Efficiency of search robots in navigating your domain.' },
    { name: 'Indexability', value: 25, color: C.amber, desc: 'Likelihood of pages being stored in search engine indices.' },
    { name: 'Core Web Vitals', value: 20, color: C.purple, desc: 'Performance metrics focused on user experience.' },
    { name: 'Metadata', value: auditData?.issues?.filter(i => i.type === 'warning').length * 5 || 10, color: C.cyan, desc: 'Completeness of descriptive HTML tags.' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: "32px 40px", display: "flex", flexDirection: "column", gap: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: `${C.surf}40`, padding: '24px 32px', borderRadius: 24, border: `1px solid ${C.border}` }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
             <div style={{ width: 12, height: 12, borderRadius: '50%', background: loading ? C.amber : C.green, boxShadow: `0 0 10px ${loading ? C.amber : C.green}` }} />
             <h1 style={{ fontSize: 24, fontWeight: 900, color: C.text, letterSpacing: '-0.03em' }}>Technical Core Health: {domain}</h1>
          </div>
          <p style={{ color: C.textSec, fontSize: 13, fontWeight: 600 }}>
            {loading ? "DEEP CRAWL IN PROGRESS..." : `SYNC COMPLETED • ${auditData?.linksCount || 1024} NODES ANALYZED • VERSION 4.2`}
          </p>
        </div>
        <button onClick={runAudit} disabled={loading} style={{ background: C.cyan, color: '#fff', border: "none", padding: '12px 24px', borderRadius: 12, fontSize: 13, cursor: "pointer", fontWeight: 900, display: "flex", alignItems: "center", gap: 10, transition: '0.2s', boxShadow: `0 4px 15px ${C.cyan}30` }}>
          <Search size={18} /> {loading ? "SCANNING..." : "TRIGGER RE-CRAWL"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 20 }}>
        <Card onClick={() => onTriggerInsight("Site Health Score", "Comprehensive health metric based on crawl depth and technical errors.")} style={{ border: `1px solid ${C.cyan}30`, flex: 1, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
             <div style={{ fontSize: 13, color: C.text, fontWeight: 800 }}>Site Health</div>
             <Info size={14} color={C.textMuted} />
          </div>
          <div style={{ position: 'relative', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[{value: auditData?.siteHealth || 72}, {value: 100 - (auditData?.siteHealth || 72)}]} innerRadius={60} outerRadius={80} startAngle={180} endAngle={0} dataKey="value" stroke="none">
                    <Cell fill={C.cyan} />
                    <Cell fill={`${C.cyan}15`} />
                  </Pie>
                </PieChart>
             </ResponsiveContainer>
             <div style={{ position: 'absolute', top: '65%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: C.text }}>{auditData?.siteHealth || 72}%</div>
                <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700 }}>no changes</div>
             </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.cyan }} />
                <span style={{ fontSize: 11, color: C.textSec }}>Your site</span>
             </div>
             <span style={{ fontSize: 11, color: C.text, fontWeight: 800 }}>{auditData?.siteHealth || 72}%</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.red }} />
                <span style={{ fontSize: 11, color: C.textSec }}>Top-10% websites</span>
             </div>
             <span style={{ fontSize: 11, color: C.text, fontWeight: 800 }}>92%</span>
          </div>
        </Card>

        <Card style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
             <div style={{ fontSize: 13, color: C.text, fontWeight: 800 }}>Crawled Pages</div>
             <Info size={14} color={C.textMuted} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
             <span style={{ fontSize: 32, fontWeight: 900, color: C.cyan }}>{auditData?.crawledPages?.total || 85}</span>
             <span style={{ fontSize: 11, color: C.textMuted, fontWeight: 700 }}>no changes</span>
          </div>
          <div style={{ height: 12, width: '100%', background: `${C.border}`, borderRadius: 6, overflow: 'hidden', display: 'flex', marginBottom: 20 }}>
             <div style={{ width: '2%', background: C.green }} />
             <div style={{ width: '3%', background: C.red }} />
             <div style={{ width: '95%', background: C.amber }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
             {[
               { label: 'Healthy', val: auditData?.crawledPages?.healthy || 1, color: C.green },
               { label: 'Broken', val: auditData?.crawledPages?.broken || 3, color: C.red },
               { label: 'Have issues', val: auditData?.crawledPages?.haveIssues || 81, color: C.amber },
               { label: 'Redirects', val: auditData?.crawledPages?.redirects || 0, color: C.blue },
               { label: 'Blocked', val: auditData?.crawledPages?.blocked || 0, color: C.textMuted },
             ].map(s => (
               <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                     <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
                     <span style={{ fontSize: 12, color: C.textSec, fontWeight: 500 }}>{s.label}</span>
                  </div>
                  <span style={{ fontSize: 12, color: C.text, fontWeight: 800 }}>{s.val}</span>
               </div>
             ))}
          </div>
        </Card>

        <Card style={{ padding: 24, border: `1px solid ${C.green}40` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
             <div style={{ fontSize: 13, color: C.text, fontWeight: 800 }}>AI Search Health <span style={{ background: C.amber, color: '#000', fontSize: 9, padding: '1px 4px', borderRadius: 4, marginLeft: 4 }}>BETA</span></div>
             <Info size={14} color={C.textMuted} />
          </div>
          <div style={{ position: 'relative', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[{value: auditData?.aiSearchHealth || 86}, {value: 100 - (auditData?.aiSearchHealth || 86)}]} innerRadius={60} outerRadius={80} startAngle={180} endAngle={0} dataKey="value" stroke="none">
                    <Cell fill={C.green} />
                    <Cell fill={`${C.green}15`} />
                  </Pie>
                </PieChart>
             </ResponsiveContainer>
             <div style={{ position: 'absolute', top: '65%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: C.text }}>{auditData?.aiSearchHealth || 86}%</div>
             </div>
          </div>
          <div style={{ background: `${C.surf}80`, padding: 12, borderRadius: 12, fontSize: 11, color: C.textSec, marginTop: 10, lineHeight: 1.4 }}>
             Website is better optimized for AI search engines
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
             <span style={{ fontSize: 11, color: C.textMuted, cursor: 'pointer', fontWeight: 600 }}>How it works</span>
             <span style={{ fontSize: 11, color: C.blue, cursor: 'pointer', fontWeight: 800 }}>31 issues</span>
          </div>
        </Card>

        <Card style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
             <div style={{ fontSize: 13, color: C.text, fontWeight: 800 }}>Blocked from AI Search</div>
             <Info size={14} color={C.textMuted} />
          </div>
          <div style={{ fontSize: 11, color: C.textSec, marginBottom: 12 }}>Pages crawled: {auditData?.crawledPages?.total || 85}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
             {(auditData?.blockedFromAI || [
               { name: 'Googlebot', count: 2, status: 'Warning' },
               { name: 'ChatGPT-User', count: 0, status: 'All good' },
               { name: 'OAI-SearchBot', count: 0, status: 'All good' },
               { name: 'Google-Extended', count: 0, status: 'All good' }
             ]).map(bot => (
               <div key={bot.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                     <div style={{ width: 14, height: 14, borderRadius: 3, background: bot.name === 'Googlebot' ? '#db4437' : '#10a37f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#fff', fontWeight: 900 }}>{bot.name[0]}</div>
                     <span style={{ fontSize: 11, color: C.text, fontWeight: 700 }}>{bot.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                     <span style={{ fontSize: 11, color: bot.count > 0 ? C.red : C.text, fontWeight: 800 }}>{bot.count > 0 ? bot.count : ''}</span>
                     <div style={{ fontSize: 10, color: bot.status === 'All good' ? C.green : C.amber, fontWeight: bot.status === 'All good' ? 900 : 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                        {bot.status === 'All good' && <CheckCircle size={10} />}
                        {bot.status.toUpperCase()}
                     </div>
                  </div>
               </div>
             ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: C.blue, cursor: 'pointer', fontWeight: 800 }}>Show more</div>
          <div style={{ marginTop: 8, fontSize: 11, color: C.textMuted, cursor: 'pointer', fontWeight: 600 }}>How to unblock pages</div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          <Card style={{ padding: 20, display: 'flex', gap: 16, alignItems: 'center' }}>
             <div style={{ fontSize: 12, fontWeight: 900, color: C.textSec }}>Errors</div>
             <div style={{ fontSize: 24, fontWeight: 900, color: C.red }}>{auditData?.stats?.errors || 245}</div>
             <div style={{ height: 1, flex: 1, background: C.border }} />
          </Card>
          <Card style={{ padding: 20, display: 'flex', gap: 16, alignItems: 'center' }}>
             <div style={{ fontSize: 12, fontWeight: 900, color: C.textSec }}>Warnings</div>
             <div style={{ fontSize: 24, fontWeight: 900, color: C.amber }}>{auditData?.stats?.warnings || 2101}</div>
             <div style={{ height: 1, flex: 1, background: C.border }} />
          </Card>
          <Card style={{ padding: 20, display: 'flex', gap: 16, alignItems: 'center' }}>
             <div style={{ fontSize: 12, fontWeight: 900, color: C.textSec }}>Notices</div>
             <div style={{ fontSize: 24, fontWeight: 900, color: C.blue }}>{auditData?.stats?.notices || 450}</div>
             <div style={{ height: 1, flex: 1, background: C.border }} />
          </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 32 }}>
        <Card onClick={() => onTriggerInsight("Audit Progress History", "Analyzing health score velocity across multiple scanning cycles.")} style={{ padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
             <h2 style={{ fontSize: 18, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Monitor size={20} color={C.green} /> Health Evolution Profile
             </h2>
             <div style={{ fontSize: 10, fontWeight: 900, color: C.textMuted, textTransform: 'uppercase' }}>Last 30 Days</div>
          </div>
          <div style={{ height: 220 }}>
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={crawlHistory}>
                   <defs>
                    <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={C.green} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={C.green} stopOpacity={0}/>
                    </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" stroke={`${C.border}30`} vertical={false} />
                   <XAxis dataKey="date" stroke={C.textMuted} tickLine={false} axisLine={false} fontSize={11} fontWeight={700} dy={10} />
                   <YAxis stroke={C.textMuted} tickLine={false} axisLine={false} fontSize={11} fontWeight={700} domain={[50, 100]} />
                   <Tooltip contentStyle={{ backgroundColor: C.card, borderColor: C.border, borderRadius: 16 }} />
                   <Area type="monotone" dataKey="score" stroke={C.green} strokeWidth={4} fillOpacity={1} fill="url(#scoreColor)" />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </Card>

        <Card style={{ padding: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
             <Server size={20} color={C.purple} /> Issue Topography
          </h2>
          <div style={{ height: 140, marginBottom: 32 }}>
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={issueBreakdown} innerRadius={65} outerRadius={85} paddingAngle={8} dataKey="value" stroke="none">
                    {issueBreakdown.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: C.card, borderColor: C.border, borderRadius: 12 }} />
                </PieChart>
             </ResponsiveContainer>
          </div>
          <div style={{ display: "grid", gap: 16 }}>
             {issueBreakdown.map(t => (
               <div key={t.name} onClick={() => onTriggerInsight(t.name, t.desc)} style={{ display: "flex", flexDirection: 'column', gap: 8, cursor: 'pointer', padding: 12, background: `${C.surf}40`, borderRadius: 12, border: `1px solid ${C.border}` }}>
                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                   <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                     <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.color }} />
                     <span style={{ fontSize: 13, color: C.text, fontWeight: 800 }}>{t.name}</span>
                   </div>
                   <span style={{ fontSize: 13, color: t.color, fontWeight: 900 }}>{t.value}%</span>
                 </div>
                 <div style={{ fontSize: 11, color: C.textSec }}>{t.desc}</div>
               </div>
             ))}
          </div>
        </Card>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 24, overflow: "hidden" }}>
         <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, padding: "0 32px", background: `${C.surf}40` }}>
            {['Diagnostic Log'].map(tab => (
               <div key={tab} style={{ padding: "20px 0", marginRight: 32, color: C.cyan, borderBottom: `2.5px solid ${C.cyan}`, cursor: "pointer", fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                 {tab}
               </div>
            ))}
         </div>
         
         <div style={{ padding: 32, maxHeight: 600, overflowY: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {(auditData?.issues || [
                    { type: 'error', text: 'Critical: Sitemaps not detected in robots.txt', cat: 'Indexability', why: 'Search engines cannot easily find all your pages without a sitemap entry in robots.txt.', priority: 'High' },
                    { type: 'warning', text: 'Warning: Missing meta description on 42 pages', cat: 'Metadata', why: 'Meta descriptions influence click-through rates from search results even if not a direct ranking factor.', priority: 'Medium' },
                    { type: 'error', text: 'Error: Large unoptimized hero assets (> 2MB)', cat: 'Core Web Vitals', why: 'Large images cause significant LCP delays, impacting mobile user experience and ranking.', priority: 'Critical' },
                    { type: 'notice', text: 'Low word count on supplemental content pages', cat: 'Content', why: 'Pages with less than 300 words might be perceived as "thin content" by quality algorithms.', priority: 'Low' },
                    { type: 'warning', text: 'Multiple H1 tags detected on homepage', cat: 'Structure', why: 'H1 tags should represent the primary topic of the page; multiple tags confuse semantic hierarchy.', priority: 'Medium' }
                ]).map((c, i) => (
                  <div key={i} onClick={() => onTriggerInsight("Issue Diagnostic", `Running AI simulation on potential fixes for: ${c.text}`)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', background: C.surf, border: `1px solid ${C.border}`, borderRadius: 20, cursor: 'pointer', transition: '0.2s', flexWrap: 'wrap', gap: 16 }}>
                     <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flex: 1, minWidth: 300 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 14, background: c.type === 'error' ? `${C.red}15` : c.type === 'warning' ? `${C.amber}15` : `${C.blue}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                           {c.type === 'error' ? <AlertTriangle size={22} color={C.red} /> : c.type === 'warning' ? <Info size={22} color={C.amber} /> : <Info size={22} color={C.blue} />}
                        </div>
                        <div style={{ flex: 1 }}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                              <span style={{ fontSize: 10, fontWeight: 900, padding: '2px 8px', borderRadius: 6, background: c.priority === 'High' || c.priority === 'Critical' ? `${C.red}15` : c.priority === 'Medium' ? `${C.amber}15` : `${C.blue}15`, color: c.priority === 'High' || c.priority === 'Critical' ? C.red : c.priority === 'Medium' ? C.amber : C.blue, border: `1px solid currentColor` }}>PRIORITY: {c.priority}</span>
                              <span style={{ fontSize: 10, color: C.textMuted, fontWeight: 800, textTransform: 'uppercase' }}>{c.cat}</span>
                           </div>
                           <div style={{ fontSize: 15, fontWeight: 850, color: C.text, marginBottom: 6 }}>{c.text}</div>
                           <p style={{ fontSize: 13, color: C.textSec, lineHeight: 1.5, margin: 0, fontWeight: 500 }}>{c.why}</p>
                        </div>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ background: `${C.cyan}10`, color: C.cyan, padding: '10px 18px', borderRadius: 12, fontSize: 11, fontWeight: 900 }}>AI FIX AVAILABLE</div>
                        <button style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.textSec, padding: '10px 18px', borderRadius: 12, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>GUIDE</button>
                     </div>
                  </div>
                ))}
            </div>
         </div>
      </div>

      <PredictiveAnalytics 
        onTriggerInsight={onTriggerInsight} 
        data={[
          {
            title: "Traffic Market Analysis",
            description: `Health issues are suppressing an estimated 15.5% of potential market traffic. Structural fixes will unlock immediate visibility gains.`,
            metric: "15.5%",
            trend: [10, 11, 13, 12, 14, 15, 14, 16, 17, 18, 20],
            type: "forecast",
            color: C.amber,
            icon: Activity
          },
          {
            title: "Authority Status",
            description: "Crawlability is high, but domain trust is slightly impacted by 7 critical errors. Resolution is priority Alpha.",
            metric: 78,
            type: "integrity",
            color: C.green,
            icon: Shield
          }
        ]}
      />
    </motion.div>
  );
}
