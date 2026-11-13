import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import { Link, AlertTriangle, ShieldCheck, Globe, Network, Trash2, ExternalLink, Sparkles, Shield, Target } from "lucide-react";
import PredictiveAnalytics from "./PredictiveAnalytics";

const C = { bg:'var(--bg)', surf:'var(--surf)', card:'var(--card)', border:'var(--border)', borderHov:'var(--borderHov)', cyan:'var(--cyan)', green:'var(--green)', red:'var(--red)', amber:'var(--amber)', purple:'var(--purple)', blue:'var(--blue)', text:'var(--text)', textSec:'var(--textSec)', textMuted:'var(--textMuted)' };

const Card = ({ children, onClick, style = {}, onAIInteraction }: any) => (
  <div 
    onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'A' || target.closest('a') || target.tagName === 'BUTTON') return;
        if (onClick) onClick(e);
    }}
    style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 20px", transition: "all 0.2s", cursor: onClick ? "pointer" : "default", position: 'relative', overflow: 'hidden', ...style }}
    onMouseEnter={e => { if(onClick) e.currentTarget.style.borderColor = C.cyan; }}
    onMouseLeave={e => { if(onClick) e.currentTarget.style.borderColor = C.border; }}
  >
    {children}
    {onAIInteraction && (
       <div onClick={(e) => { e.stopPropagation(); onAIInteraction(); }} style={{ position: 'absolute', top: 12, right: 12, cursor: 'pointer', color: C.purple, opacity: 0.7 }}>
          <Sparkles size={16} />
       </div>
    )}
  </div>
);

export default function LinkBuilding({ domain, mode, onTriggerInsight }: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/domain/linkbuilding?domain=${encodeURIComponent(domain || 'yourdomain.com')}&mode=${mode}`);
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

  const renderBacklinksUI = () => (
    <div className="fade-in">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24, marginBottom: 24 }}>
        <Card onClick={() => onTriggerInsight("Backlink Profile Density", "Analyzing the topological depth and node connectivity of the inbound link graph.")} onAIInteraction={() => onTriggerInsight("Backlink Profile Density", "Analyzing the topological depth and node connectivity of the inbound link graph.")}>
          <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}><Network size={120} color={C.cyan} /></div>
          <h3 style={{ fontSize: 13, color: C.textSec, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>Inbound Grid</h3>
          <div style={{ fontSize: 48, fontWeight: 900, color: C.cyan, letterSpacing: '-0.04em' }}>{data?.metrics?.total || "0"}</div>
          <p style={{ fontSize: 14, color: C.text, marginTop: 8, fontWeight: 600 }}>Total Active Backlinks</p>
          <div style={{ marginTop: 32, display: 'flex', gap: 8 }}>
            <span style={{ padding: '6px 12px', background: `${C.green}10`, color: C.green, borderRadius: 20, fontSize: 10, fontWeight: 900 }}>+12% GROWTH</span>
            <span style={{ padding: '6px 12px', background: `${C.blue}10`, color: C.blue, borderRadius: 20, fontSize: 10, fontWeight: 900 }}>92% DOFOLLOW</span>
          </div>
        </Card>
        
        <Card onClick={() => onTriggerInsight("Ingress Velocity Matrix")}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}><Link size={18} color={C.purple} /> Ingress Velocity Matrix</h3>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.velocity || []}>
                <defs>
                   <linearGradient id="vNew" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.cyan} stopOpacity={0.4}/><stop offset="100%" stopColor={C.cyan} stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
                <XAxis dataKey="month" stroke={C.textMuted} fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: C.surf, border: `1px solid ${C.border}`, borderRadius: 12 }} />
                <Area type="stepAfter" dataKey="newLinks" stroke={C.cyan} strokeWidth={3} fill="url(#vNew)" />
                <Area type="stepAfter" dataKey="lostLinks" stroke={C.red} strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card onClick={() => onTriggerInsight("Semantic Anchor Optimization")}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24 }}>Top Semantic Anchors</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {data?.anchors?.map((a: any, i: number) => (
            <div 
              key={i} 
              onClick={(e) => { e.stopPropagation(); onTriggerInsight("Anchor Semantic Analysis", `Analyzing the keyword association for: ${a.text}`); }}
              style={{ padding: '16px 20px', background: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, cursor: 'pointer', flex: '1 1 200px' }}
            >
              <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>{a.percent} Density</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{a.text}</div>
              <div style={{ fontSize: 12, color: C.cyan, marginTop: 12, fontWeight: 600 }}>{a.domains} Domains</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderRefDomsUI = () => (
    <div className="fade-in">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 24 }}>
        {[
          { label: 'Primary Domains', val: data?.metrics?.domains, icon: Globe, color: C.cyan },
          { label: 'Domain Authority', val: data?.metrics?.authority, icon: ShieldCheck, color: C.purple },
          { label: 'New Referral Nodes', val: '42', icon: Link, color: C.green }
        ].map((stat, i) => (
          <Card key={i} onClick={() => onTriggerInsight(stat.label)} onAIInteraction={() => onTriggerInsight(stat.label + " AI")}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${stat.color}10`, display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                <stat.icon color={stat.color} size={24} />
              </div>
              <div>
                <div style={{ fontSize: 12, color: C.textSec, fontWeight: 600 }}>{stat.label}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: C.text }}>{stat.val}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Card onClick={() => onTriggerInsight("TLD Topology")}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24 }}>TLD Distribution</h3>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{ name: '.com', value: 65 }, { name: '.org', value: 15 }, { name: '.net', value: 10 }, { name: '.edu', value: 10 }]} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  <Cell fill={C.cyan} /><Cell fill={C.purple} /><Cell fill={C.blue} /><Cell fill={C.green} />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: -20 }}>
             <div style={{ textAlign: 'center' }}><div style={{ width: 8, height: 8, borderRadius: 2, background: C.cyan, margin: '0 auto 4px' }} /><span style={{ fontSize: 10, color: C.textSec }}>.com</span></div>
             <div style={{ textAlign: 'center' }}><div style={{ width: 8, height: 8, borderRadius: 2, background: C.purple, margin: '0 auto 4px' }} /><span style={{ fontSize: 10, color: C.textSec }}>.org</span></div>
             <div style={{ textAlign: 'center' }}><div style={{ width: 8, height: 8, borderRadius: 2, background: C.green, margin: '0 auto 4px' }} /><span style={{ fontSize: 10, color: C.textSec }}>.edu</span></div>
          </div>
        </Card>

        <Card onClick={() => onTriggerInsight("Referral Magnitude Grid")}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24 }}>Referral Magnitude</h3>
          <div style={{ height: 140 }}>
             <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={[{ subject: 'Tech', A: 120, B: 110, fullMark: 150 }, { subject: 'News', A: 98, B: 130, fullMark: 150 }, { subject: 'Edu', A: 86, B: 130, fullMark: 150 }, { subject: 'Finance', A: 99, B: 100, fullMark: 150 }, { subject: 'Social', A: 85, B: 90, fullMark: 150 }]}>
                    <PolarGrid stroke={C.border} />
                    <PolarAngleAxis dataKey="subject" stroke={C.textSec} fontSize={10} />
                    <Radar name="Domain Volume" dataKey="A" stroke={C.purple} fill={C.purple} fillOpacity={0.5} />
                    <Tooltip contentStyle={{ background: C.surf, border: `1px solid ${C.border}` }} />
                </RadarChart>
             </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderAuditUI = () => (
    <div className="fade-in">
      <Card onClick={() => onTriggerInsight("Toxicity Management")} onAIInteraction={() => onTriggerInsight("Auto Mitigation AI")} style={{ marginBottom: 24, border: `1px solid ${C.red}30`, background: `linear-gradient(135deg, ${C.card}, ${C.red}05)` }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
               <h2 style={{ fontSize: 24, fontWeight: 900, color: C.red, letterSpacing: '-0.02em' }}>Toxicity Alert: {data?.metrics?.toxic || "0%"}</h2>
               <p style={{ color: C.textSec, fontSize: 14, marginTop: 4 }}>Potential link pollution detected in the inbound grid.</p>
            </div>
            <button onClick={(e) => { e.stopPropagation(); onTriggerInsight("Toxic Link Mitigation", "Generating a disavow file list for problematic inbound nodes."); }} style={{ padding: '12px 24px', background: C.red, color: '#fff', border: 'none', borderRadius: 12, fontWeight: 900, cursor: 'pointer', boxShadow: `0 4px 15px ${C.red}30` }}>INITIATE DISAVOW</button>
         </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <Card onClick={() => onTriggerInsight("High Risk Node Audit")}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}><AlertTriangle size={18} color={C.amber} /> High Risk Ingress Nodes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ padding: 16, background: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <a 
                    href={`https://spammy-domain-example-${i}.net`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ fontSize: 14, fontWeight: 700, color: C.cyan, textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                  >
                    spammy-domain-example-{i}.net
                  </a>
                  <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>Anchor: "get rich fast" · Detected May 12</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 12, color: C.red, fontWeight: 900 }}>TOXIC</span>
                    <a 
                      href={`https://spammy-domain-example-${i}.net`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ background: 'transparent', border: 'none', color: C.textSec, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <ExternalLink size={14} />
                    </a>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card onClick={() => onTriggerInsight("Audit Checklist Protocol")}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24 }}><Trash2 size={18} color={C.red} /> Audit Checklist</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
             {[
               { t: 'Scan PBN networks', s: true },
               { t: 'Review hidden anchor spikes', s: false },
               { t: 'Verify redirection chains', s: false },
               { t: 'Audit TLD abnormalities', s: true }
             ].map((task, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                   <div style={{ width: 20, height: 20, borderRadius: 6, border: `1px solid ${task.s ? C.green : C.border}`, background: task.s ? C.green : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     {task.s && <ShieldCheck size={12} color="#fff" />}
                   </div>
                   <span style={{ fontSize: 13, color: task.s ? C.textSec : C.text, textDecoration: task.s ? 'line-through' : 'none' }}>{task.t}</span>
                </div>
             ))}
          </div>
          <button onClick={(e) => { e.stopPropagation(); onTriggerInsight("Full Backlink Audit"); }} style={{ width: '100%', marginTop: 32, padding: '14px', background: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, color: C.text, fontWeight: 700, cursor: 'pointer' }}>RUN FULL AUDIT</button>
        </Card>
      </div>
    </div>
  );

  const getHeaderInfo = () => {
    if (mode === "backlinks") return { t: "Backlink Stratosphere", d: "Deep analysis of your inbound authority graph." };
    if (mode === "refdoms") return { t: "Referring Territory", d: "Geographical and structural analysis of linking domains." };
    if (mode === "blaudit") return { t: "Security Scan: Link Integrity", d: "Identifying and purging toxic signals from your profile." };
    return { t: "Link Building", d: "Expand your digital footprint." };
  };

  const info = getHeaderInfo();

  return (
    <div style={{ padding: "32px 40px", display: "flex", flexDirection: "column", background: C.bg, minHeight: '100%' }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: C.text, letterSpacing: '-0.04em' }}>{info.t}</h1>
        <p style={{ color: C.textSec, fontSize: 15, marginTop: 8 }}>{info.d}</p>
      </div>

      {loading ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
           <div style={{ width: 40, height: 40, border: `3px solid ${C.cyan}20`, borderTopColor: C.cyan, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
           <p style={{ fontSize: 14, color: C.textSec, fontWeight: 600 }}>Analyzing Domain Network...</p>
           <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <>
          {mode === "backlinks" && renderBacklinksUI()}
          {mode === "refdoms" && renderRefDomsUI()}
          {mode === "blaudit" && renderAuditUI()}
        </>
      )}

        {/* ADDED NEW ELEMENTS */}
        <PredictiveAnalytics 
          onTriggerInsight={onTriggerInsight} 
          data={[
            {
              title: "Traffic Market Analysis",
              description: `Link-derived market share for ${domain} is currently 18.4%. Strategic acquisition of high-DR domains will drive this to 25% by Q4.`,
              metric: "18.4%",
              trend: [16, 17, 18, 17.5, 18.4, 19, 20, 21, 22, 23, 25],
              type: "forecast",
              color: C.cyan,
              icon: Target
            },
            {
              title: "Authority Consistency",
              description: "Link velocity and anchor diversity nodes maintain an 82% health rating, signaling strong long-term resilience.",
              metric: 82,
              type: "integrity",
              color: C.purple,
              icon: Shield
            }
          ]}
        />
    </div>
  );
} 