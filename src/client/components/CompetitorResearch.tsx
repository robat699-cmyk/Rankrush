import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { motion } from "motion/react";
import { Users, Search, Link, Copy, ArrowRightLeft, Shield, Globe, TrendingUp, Target } from "lucide-react";

import PredictiveAnalytics from "./PredictiveAnalytics";

const C = { bg:'var(--bg)', surf:'var(--surf)', card:'var(--card)', border:'var(--border)', borderHov:'var(--borderHov)', cyan:'var(--cyan)', green:'var(--green)', red:'var(--red)', amber:'var(--amber)', purple:'var(--purple)', blue:'var(--blue)', text:'var(--text)', textSec:'var(--textSec)', textMuted:'var(--textMuted)' };


const Card = ({ children, style = {}, onClick }: any) => (
  <motion.div 
    whileHover={onClick ? { y: -2, borderColor: C.cyan } : {}}
    onClick={onClick}
    style={{ 
      background: C.card, 
      border: `1px solid ${C.border}`, 
      borderRadius: 10, 
      padding: "12px", 
      transition: "all 0.2s", 
      cursor: onClick ? "pointer" : "default",
      ...style 
    }}
  >
    {children}
  </motion.div>
);

export default function CompetitorResearch({ domain, mode, onTriggerInsight }: any) {
  const [compA, setCompA] = useState("semrush.com");
  const [compB, setCompB] = useState("ahrefs.com");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const getTitle = () => {
    if (mode === "kwgap") return "Keyword Gap Analysis";
    if (mode === "blgap") return "Backlink Network Gap";
    if (mode === "aicomp") return "AI-First Competitor Intelligence";
    if (mode === "compare") return "Domain Authority Comparison";
    return "Competitive Intelligence";
  };

  const fetchComparison = async () => {
    setLoading(true);
    try {
      const targetDomain = domain || 'yourdomain.com';
      const res = await fetch(`/api/domain/compare?domain1=${encodeURIComponent(targetDomain)}&domain2=${encodeURIComponent(compA)}&domain3=${encodeURIComponent(compB)}`);
      const body = await res.json();
      setData(body);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComparison();
  }, [domain]);

  const renderComparisonSearch = () => (
    <div style={{ display: 'flex', gap: 12, marginBottom: 32, padding: 16, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 13, color: C.text, fontWeight: 800, width: 80 }}>YOU</span>
        <input disabled value={domain || 'yourdomain.com'} style={{ flex: 1, background: C.surf, border: `1px solid ${C.border}`, padding: '10px 16px', borderRadius: 8, color: C.textSec, fontSize: 14, fontWeight: 600 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 13, color: C.purple, fontWeight: 800, width: 80 }}>COMP 1</span>
        <input value={compA} onChange={(e) => setCompA(e.target.value)} style={{ flex: 1, background: C.surf, border: `1px solid ${C.purple}40`, padding: '10px 16px', borderRadius: 8, color: C.text, fontSize: 14, fontWeight: 600 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 13, color: C.amber, fontWeight: 800, width: 80 }}>COMP 2</span>
        <input value={compB} onChange={(e) => setCompB(e.target.value)} style={{ flex: 1, background: C.surf, border: `1px solid ${C.amber}40`, padding: '10px 16px', borderRadius: 8, color: C.text, fontSize: 14, fontWeight: 600 }} />
      </div>
      <button onClick={fetchComparison} disabled={loading} style={{ background: C.cyan, color: '#000', border: 'none', padding: '0 24px', borderRadius: 10, fontWeight: 800, cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
        {loading ? "Syncing..." : "Compare"}
      </button>
    </div>
  );

  const renderAICompetitor = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[domain || 'yourdomain.com', compA, compB].map((d, i) => {
          const colors = [C.cyan, C.purple, C.amber];
          const color = colors[i];
          const stats = data?.stats?.[d] || { sov: '0%', mentions: 0, sentiment: 'Neutral' };
          return (
            <Card key={d} style={{ borderTop: `4px solid ${color}` }} onClick={() => onTriggerInsight("Competitor AI Performance", `Analyzing ${d}'s strategic positioning in generative search results.`)}>
               <div style={{ fontSize: 13, color: C.textSec, fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Globe size={14} color={color} /> {d.toUpperCase()}
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                 <span style={{ fontSize: 13, color: C.textMuted }}>Share of Voice</span>
                 <span style={{ fontSize: 16, fontWeight: 900, color: C.text }}>{stats.sov}</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                 <span style={{ fontSize: 13, color: C.textMuted }}>AI Citations</span>
                 <span style={{ fontSize: 16, fontWeight: 900, color: C.text }}>{stats.mentions.toLocaleString()}</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                 <span style={{ fontSize: 13, color: C.textMuted }}>Semantic Vibe</span>
                 <span style={{ fontSize: 16, fontWeight: 900, color: stats.sentiment === 'Positive' ? C.green : C.amber }}>{stats.sentiment}</span>
               </div>
            </Card>
          );
        })}
      </div>

      <Card onClick={() => onTriggerInsight("Historical Competition", "Evaluating the intersection of brand visibility growth across indexed models.")}>
        <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}><TrendingUp size={20} color={C.cyan} /> Multi-Domain Visibility Trend</h2>
        <div style={{ height: 190 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data?.trendData || []}>
              <defs>
                <linearGradient id="gUs" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.cyan} stopOpacity={0.3}/><stop offset="95%" stopColor={C.cyan} stopOpacity={0}/></linearGradient>
                <linearGradient id="gC1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.purple} stopOpacity={0.3}/><stop offset="95%" stopColor={C.purple} stopOpacity={0}/></linearGradient>
                <linearGradient id="gC2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.amber} stopOpacity={0.3}/><stop offset="95%" stopColor={C.amber} stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="month" stroke={C.textSec} tickLine={false} axisLine={false} />
              <YAxis stroke={C.textSec} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: C.card, borderColor: C.border, borderRadius: 12 }} />
              <Legend verticalAlign="top" height={36}/>
              <Area type="monotone" dataKey="domain1" name={domain || 'yourdomain.com'} stroke={C.cyan} strokeWidth={3} fillOpacity={1} fill="url(#gUs)" />
              <Area type="monotone" dataKey="domain2" name={compA} stroke={C.purple} strokeWidth={2} fillOpacity={1} fill="url(#gC1)" />
              <Area type="monotone" dataKey="domain3" name={compB} stroke={C.amber} strokeWidth={2} fillOpacity={1} fill="url(#gC2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );

  const renderDomainCompare = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card onClick={() => onTriggerInsight("Technical Comparison", "Matrix analysis of core domain metrics against chosen competitors.")}>
        <div style={{ padding: "0 16px 12px", borderBottom: `1px solid ${C.border}` }}>
            <h3 style={{ fontSize: 13, fontWeight: 900 }}>Technical & Semantic Matrix</h3>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}`, color: C.textMuted, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <th style={{ padding: 10, textAlign: 'left' }}>Metric</th>
              <th style={{ padding: 10, textAlign: 'center', color: C.cyan }}>{domain || 'You'}</th>
              <th style={{ padding: 10, textAlign: 'center', color: C.purple }}>{compA}</th>
              <th style={{ padding: 10, textAlign: 'center', color: C.amber }}>{compB}</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'Authority Score', v1: 72, v2: 84, v3: 65 },
              { label: 'Intelligence Index', v1: 890, v2: 670, v3: 450 },
              { label: 'AI Citation Rate', v1: '4.2%', v2: '5.1%', v3: '2.8%' },
              { label: 'Content Depth', v1: 'High', v2: 'V. High', v3: 'Medium' },
              { label: 'Load Velocity', v1: '1.2s', v2: '0.8s', v3: '1.8s' },
              { label: 'Organic Keywords', v1: '14.2k', v2: '42.1k', v3: '8.4k' },
              { label: 'Backlink Count', v1: '1.2M', v2: '4.5M', v3: '500k' },
              { label: 'Referring Domains', v1: '8.4k', v2: '21k', v3: '3.2k' },
              { label: 'Top 3 Rankings', v1: '420', v2: '1,200', v3: '150' },
              { label: 'Local Citations', v1: '124', v2: '340', v3: '88' },
              { label: 'Brand Mentions', v1: '8.4k', v2: '21k', v3: '3.2k' },
              { label: 'Social Velocity', v1: 'High', v2: 'Medium', v3: 'Low' },
              { label: 'Content Originality', v1: '94%', v2: '88%', v3: '76%' },
              { label: 'Technical SEO Score', v1: '98/100', v2: '92/100', v3: '84/100' },
              { label: 'Core Web Vitals', v1: 'Pass', v2: 'Pass', v3: 'Fail' }
            ].map((row, i) => (
              <tr key={row.label} style={{ borderBottom: i === 14 ? 'none' : `1px solid ${C.border}40`, transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = `${C.surf}80`} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: "8px 10px", fontSize: 11, fontWeight: 700, color: C.textSec }}>{row.label}</td>
                <td style={{ padding: "8px 10px", textAlign: 'center', fontSize: 11, fontWeight: 950, color: C.text }}>{row.v1}</td>
                <td style={{ padding: "8px 10px", textAlign: 'center', fontSize: 11, fontWeight: 950, color: C.text }}>{row.v2}</td>
                <td style={{ padding: "8px 10px", textAlign: 'center', fontSize: 11, fontWeight: 950, color: C.text }}>{row.v3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
         <Card onClick={() => onTriggerInsight("Semantic Overlap", "Evaluating the similarity of topic coverage between domains.")}>
            <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 20 }}>Topical Overlap</h3>
            <div style={{ height: 140 }}>
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={[
                   { name: 'SEO', d1: 90, d2: 80, d3: 40 },
                   { name: 'Content', d1: 70, d2: 95, d3: 50 },
                   { name: 'Backlinks', d1: 45, d2: 85, d3: 90 },
                   { name: 'AI', d1: 95, d2: 40, d3: 30 },
                 ]}>
                    <XAxis dataKey="name" hide />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="d1" fill={C.cyan} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="d2" fill={C.purple} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="d3" fill={C.amber} radius={[4, 4, 0, 0]} />
                 </BarChart>
              </ResponsiveContainer>
            </div>
         </Card>
         <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <ArrowRightLeft size={48} color={C.cyan} style={{ marginBottom: 16 }} />
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Ready for Migration?</h3>
            <p style={{ color: C.textSec, fontSize: 14, lineHeight: 1.6 }}>Our AI indicates you have a 12% content gap in 'Advanced Analytics' compared to {compA}.</p>
            <button style={{ marginTop: 20, background: `${C.cyan}15`, color: C.cyan, border: `1px solid ${C.cyan}40`, padding: '10px 20px', borderRadius: 8, fontWeight: 700 }}>Generate Gap Strategy</button>
         </Card>
      </div>
    </div>
  );

  const renderKeywordGap = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Card onClick={() => onTriggerInsight("Keyword Venn", "Visualizing shared vs unique keywords across the three domains.")}>
           <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 20 }}>Keyword Intersection</h2>
           <div style={{ height: 140, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 180, height: 180, border: `2px solid ${C.cyan}`, borderRadius: '50%', background: `${C.cyan}10`, position: 'absolute', top: '20%', left: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <span style={{ fontSize: 11, fontWeight: 800 }}>YOU</span>
              </div>
              <div style={{ width: 180, height: 180, border: `2px solid ${C.purple}`, borderRadius: '50%', background: `${C.purple}10`, position: 'absolute', top: '20%', right: '25%', mixBlendMode: 'plus-lighter' }}></div>
              <div style={{ width: 180, height: 180, border: `2px solid ${C.amber}`, borderRadius: '50%', background: `${C.amber}10`, position: 'absolute', bottom: '15%', left: '35%', mixBlendMode: 'plus-lighter' }}></div>
              <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                 <div style={{ fontSize: 24, fontWeight: 900 }}>4.2k</div>
                 <div style={{ fontSize: 11, fontWeight: 800, color: C.textMuted }}>SHARED KEYWORDS</div>
              </div>
           </div>
        </Card>

        <Card onClick={() => onTriggerInsight("Gap Opportunities", "Identification of keywords highly valued by AI engines where you currently lack ranking.")}>
           <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Missing High-Yield Terms</h3>
           <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { kw: 'ai search console', vol: '12k', diff: '84', comp: compA },
                { kw: 'generative seo suite', vol: '8.4k', diff: '72', comp: compB },
                { kw: 'llm visibility monitoring', vol: '15.2k', diff: '91', comp: compA },
                { kw: 'prompt impact analysis', vol: '6.1k', diff: '45', comp: compB },
              ].map((k, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, background: C.surf, border: `1px solid ${C.border}`, borderRadius: 10 }}>
                   <div>
                     <div style={{ fontSize: 13, fontWeight: 800 }}>{k.kw}</div>
                     <div style={{ fontSize: 11, color: C.textMuted }}>Held by {k.comp}</div>
                   </div>
                   <div style={{ textAlign: 'right' }}>
                     <div style={{ fontSize: 13, fontWeight: 700, color: C.cyan }}>{k.vol}</div>
                     <div style={{ fontSize: 10, color: C.red }}>KD: {k.diff}</div>
                   </div>
                </div>
              ))}
           </div>
        </Card>
      </div>

      <Card>
         <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Keyword Distribution Profile</h3>
         <div style={{ height: 170 }}>
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={[
                 { type: 'Transactional', u: 40, c1: 60, c2: 30 },
                 { type: 'Informational', u: 90, c1: 40, c2: 80 },
                 { type: 'Navigational', u: 30, c1: 20, c2: 90 },
                 { type: 'Commercial', u: 65, c1: 85, c2: 45 },
               ]}>
                  <XAxis dataKey="type" />
                  <Bar dataKey="u" fill={C.cyan} name="You" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="c1" fill={C.purple} name={compA} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="c2" fill={C.amber} name={compB} radius={[4, 4, 0, 0]} />
                  <Tooltip cursor={{fill: 'transparent'}} />
               </BarChart>
            </ResponsiveContainer>
         </div>
      </Card>
    </div>
  );

  const renderBacklinkGap = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
         {[
           { label: 'Common Domains', value: '1,240', color: C.cyan, icon: <Link size={16} /> },
           { label: 'Unique to You', value: '8,420', color: C.green, icon: <Copy size={16} /> },
           { label: 'Unique to Rivals', value: '14,200', color: C.red, icon: < ArrowRightLeft size={16} /> },
           { label: 'Toxic Overlap', value: '12', color: C.amber, icon: <Shield size={16} /> },
         ].map(s => (
           <Card key={s.label} onClick={() => onTriggerInsight(s.label, `Analyzing the link network for ${s.label} specifically for AI discovery performance.`)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.textSec, marginBottom: 12 }}>
                {s.icon} <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>{s.label}</span>
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: s.color }}>{s.value}</div>
           </Card>
         ))}
      </div>

      <Card onClick={() => onTriggerInsight("Link Acquisition Gap", "Identifying top domains linking to your competitors but not to your domain.")}>
         <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 20 }}>High-Value Referral Opportunities</h2>
         <div style={{ display: 'grid', gap: 12 }}>
            {[
              { domain: 'techcrunch.com', dr: 92, traffic: '4.2M', comp: 'Both Rivals' },
              { domain: 'forbes.com', dr: 95, traffic: '12M', comp: compA },
              { domain: 'verge.com', dr: 89, traffic: '1.8M', comp: compB },
              { domain: 'wired.com', dr: 91, traffic: '3.1M', comp: compA },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: C.surf, border: `1px solid ${C.border}`, borderRadius: 12 }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{r.domain}</div>
                    <div style={{ fontSize: 11, background: `${C.cyan}15`, color: C.cyan, padding: '4px 8px', borderRadius: 4, fontWeight: 800 }}>DR: {r.dr}</div>
                 </div>
                 <div style={{ fontSize: 13, color: C.textSec }}>Linking to <strong style={{color: C.text}}>{r.comp}</strong></div>
                 <button style={{ background: C.cyan, color: '#000', border: 'none', padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>Outreach AI Brief</button>
              </div>
            ))}
         </div>
      </Card>

      <Card>
         <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Link Velocity Comparison</h3>
         <div style={{ height: 170 }}>
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={[
                 { month: 'Jun', d1: 120, d2: 150, d3: 80 },
                 { month: 'Jul', d1: 180, d2: 140, d3: 110 },
                 { month: 'Aug', d1: 220, d2: 190, d3: 160 },
                 { month: 'Sep', d1: 210, d2: 240, d3: 200 },
               ]}>
                  <Area dataKey="d1" stroke={C.cyan} fill={C.cyan} fillOpacity={0.1} />
                  <Area dataKey="d2" stroke={C.purple} fill={C.purple} fillOpacity={0.1} />
                  <Area dataKey="d3" stroke={C.amber} fill={C.amber} fillOpacity={0.1} />
                  <Tooltip contentStyle={{ backgroundColor: C.card, borderColor: C.border, borderRadius: 12 }} />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </Card>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: "20px 24px" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: C.text, letterSpacing: '-0.03em' }}>{getTitle()}</h1>
        <p style={{ color: C.textSec, fontSize: 14, marginTop: 4 }}>Analyzing <strong>{domain || 'your domain'}</strong> vs search rivals across the global intelligence network.</p>
      </div>

      {renderComparisonSearch()}

      <div style={{ marginTop: 24 }}>
        {mode === "kwgap" ? renderKeywordGap() : 
         mode === "blgap" ? renderBacklinkGap() : 
         mode === "compare" ? renderDomainCompare() : 
         renderAICompetitor()}
      </div>

      <PredictiveAnalytics 
        onTriggerInsight={onTriggerInsight} 
        data={[
          {
            title: "Traffic Market Analysis",
            description: `Domain ${domain} is outperforming competitors in 3 key niche clusters. Total market overlap is currently 42%.`,
            metric: "42%",
            trend: [38, 39, 41, 40, 42, 43, 42, 44, 45, 46, 48],
            type: "forecast",
            color: C.cyan,
            icon: Target
          },
          {
            title: "Authority Consistency",
            description: "Competitive authority nodes are stable, with 88% of major referring domains appearing in all competitor maps.",
            metric: 88,
            type: "integrity",
            color: C.purple,
            icon: Shield
          }
        ]}
      />
    </motion.div>
  );
}
