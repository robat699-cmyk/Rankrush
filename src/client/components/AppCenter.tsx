import React, { useState, useEffect } from "react";
import { Plus, Search, Star, ExternalLink, Cpu, Layout, MessageSquare, Briefcase, Play, RefreshCw, Zap, ShieldCheck, Target, Shield } from "lucide-react";
import PredictiveAnalytics from "./PredictiveAnalytics";

const C = { bg:'var(--bg)', surf:'var(--surf)', card:'var(--card)', border:'var(--border)', borderHov:'var(--borderHov)', cyan:'var(--cyan)', green:'var(--green)', red:'var(--red)', amber:'var(--amber)', purple:'var(--purple)', blue:'var(--blue)', text:'var(--text)', textSec:'var(--textSec)', textMuted:'var(--textMuted)' };

const iconMap = {
  'Content': <MessageSquare size={24} color={C.purple} />,
  'Local': <Briefcase size={24} color={C.green} />,
  'Technical': <Cpu size={24} color={C.cyan} />,
  'E-commerce': <Layout size={24} color={C.amber} />,
  'Media': <Play size={24} color={C.red} />,
  'Ads': <RefreshCw size={24} color={C.blue} />
};

export default function AppCenter({ onTriggerInsight }: any) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [appsList, setAppsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/domain/appcenter`);
        const result = await res.json();
        setAppsList(Array.isArray(result) ? result : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredApps = appsList.filter(a => 
    (filter === "All" || (filter === "Installed" && a.installed) || a.category === filter) &&
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleInstall = (id: string) => {
    const app = appsList.find(a => a.id === id);
    if (!app) return;
    
    const newStatus = !app.installed;
    setAppsList(appsList.map(a => a.id === id ? { ...a, installed: newStatus } : a));
    onTriggerInsight(newStatus ? "Module Deployment" : "Module Decommission", `${newStatus ? 'Provisioning' : 'De-provisioning'} ${app.name} into the operational grid.`);
  };

  return (
    <div className="fade-in" style={{ padding: "32px 40px", display: "flex", flexDirection: "column", background: C.bg }}>
      <div style={{ marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: C.text, letterSpacing: '-0.04em' }}>Intelligence Marketplace</h1>
          <p style={{ color: C.textSec, fontSize: 14, marginTop: 4 }}>Deploying official modules and verified neural bridges to extend your strategic capabilities.</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ background: C.surf, color: C.text, border: `1px solid ${C.border}`, padding: '12px 20px', borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
            <Cpu size={16} color={C.cyan} /> Integration API
          </button>
          <button onClick={() => onTriggerInsight("App Submission", "Reviewing the neural handshake requirements for deploying custom third-party intelligence modules.")} style={{ background: C.cyan, color: '#fff', border: "none", padding: '12px 24px', borderRadius: 12, fontSize: 13, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: `0 8px 24px ${C.cyan}40` }}>
            <Plus size={16} /> Submit Module
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 40 }}>
        {/* Navigation Sidebar */}
        <div style={{ width: 280, display: "flex", flexDirection: "column", gap: 12 }}>
           <div style={{ position: "relative", marginBottom: 24 }}>
             <Search size={18} color={C.textMuted} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
             <input 
               type="text" 
               placeholder="Search registry..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               style={{ width: "100%", background: C.card, border: `1px solid ${C.border}`, color: C.text, padding: "14px 16px 14px 44px", borderRadius: 12, fontSize: 14, fontWeight: 600, outline: "none", transition: '0.2s border-color' }}
             />
           </div>

           <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 800, textTransform: "uppercase", letterSpacing: '0.1em', marginBottom: 8, marginLeft: 8 }}>Registry Categories</div>
           
           {["All", "Installed", "Content", "Technical", "Local", "E-commerce", "Media", "Ads", "Analytics"].map(cat => (
             <div 
               key={cat} 
               onClick={() => setFilter(cat)}
               style={{ 
                 padding: "12px 16px", 
                 borderRadius: 10, 
                 cursor: "pointer", 
                 fontSize: 14, 
                 color: filter === cat ? C.cyan : C.textSec, 
                 background: filter === cat ? `${C.cyan}10` : "transparent",
                 fontWeight: filter === cat ? 800 : 700,
                 display: "flex",
                 justifyContent: "space-between",
                 alignItems: "center",
                 transition: '0.2s'
               }}
             >
               {cat}
               {cat === "Installed" && <span style={{ background: C.cyan, color: '#fff', fontSize: 10, padding: "2px 8px", borderRadius: 20, fontWeight: 900 }}>{appsList.filter(a => a.installed).length}</span>}
             </div>
           ))}

           <div onClick={() => onTriggerInsight("Module Verification", "All listed applications undergo a 48-hour neural audit to ensure data integrity and security compliance.")} style={{ marginTop: 40, padding: 20, background: `${C.green}05`, border: `1px dashed ${C.green}30`, borderRadius: 16, cursor: 'pointer' }}>
             <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                <ShieldCheck size={18} color={C.green} />
                <span style={{ fontSize: 12, fontWeight: 900, color: C.text }}>Verified Registry</span>
             </div>
             <p style={{ fontSize: 12, color: C.textSec, lineHeight: 1.5 }}>Our AI monitors and sandboxes all active modules in real-time.</p>
           </div>
        </div>

        {/* Apps Grid */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
           {loading && <div style={{ color: C.textMuted, fontSize: 15, fontWeight: 700 }}>Synchronizing registry records...</div>}
           {filteredApps.map((app: any) => (
             <div 
               key={app.id} 
               onClick={() => onTriggerInsight("Module Intelligence", `Fetching alignment score for ${app.name}. Analyzing developer trust vectors.`)}
               style={{ 
                 background: C.card, 
                 border: `1px solid ${C.border}`, 
                 borderRadius: 20, 
                 padding: 24, 
                 display: "flex", 
                 flexDirection: "column", 
                 transition: "0.2s all", 
                 cursor: "pointer",
                 boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
               }} 
               onMouseOver={e => {
                 e.currentTarget.style.borderColor = C.cyan;
                 e.currentTarget.style.transform = 'translateY(-4px)';
               }} 
               onMouseOut={e => {
                 e.currentTarget.style.borderColor = C.border;
                 e.currentTarget.style.transform = 'translateY(0)';
               }}
             >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: C.surf, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)' }}>
                    {iconMap[app.category] || <Layout size={28} color={C.textSec} />}
                  </div>
                  {app.installed ? (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span style={{ fontSize: 10, color: C.green, background: `${C.green}10`, padding: "6px 12px", borderRadius: 20, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Deployed</span>
                      <button 
                       onClick={(e) => { e.stopPropagation(); toggleInstall(app.id); }}
                       style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.textSec, padding: "6px 12px", borderRadius: 20, fontSize: 10, cursor: "pointer", fontWeight: 800 }}
                      >
                        EJECT
                      </button>
                    </div>
                  ) : (
                    <button 
                     onClick={(e) => { e.stopPropagation(); toggleInstall(app.id); }}
                     style={{ background: C.cyan, border: "none", color: "#fff", padding: "6px 16px", borderRadius: 20, fontSize: 11, cursor: "pointer", fontWeight: 800 }}
                    >
                      DEPLOY
                    </button>
                  )}
                </div>
                
                <h3 style={{ fontSize: 18, fontWeight: 900, color: C.text, marginBottom: 4 }}>{app.name}</h3>
                <div style={{ fontSize: 13, color: C.cyan, marginBottom: 16, fontWeight: 700 }}>by {app.dev}</div>
                
                <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6, flex: 1, marginBottom: 20 }}>{app.desc}</p>
                
                <div style={{ display: "flex", alignItems: "center", gap: 16, borderTop: `1px solid ${C.border}40`, paddingTop: 20, marginTop: "auto" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.amber, fontSize: 12, fontWeight: 800 }}>
                    <Star size={16} fill={C.amber} /> {app.rating}
                  </div>
                  <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 700 }}>{app.users} active nodes</div>
                  <div style={{ marginLeft: "auto", color: C.textMuted }}>
                    <ExternalLink size={16} />
                  </div>
                </div>
             </div>
           ))}
        </div>
      </div>

        {/* ADDED NEW ELEMENTS */}
        <PredictiveAnalytics 
          onTriggerInsight={onTriggerInsight} 
          data={[
            {
              title: "Traffic Market Analysis",
              description: "Cross-app integration nodes are projecting a 10% increase in workflow-driven traffic.",
              metric: "+10%",
              trend: [5, 6, 7, 6.5, 8, 9, 8.5, 10, 11, 10.5, 12],
              type: "forecast",
              color: C.cyan,
              icon: Target
            },
            {
              title: "Authority Consistency",
              description: "Application ecosystem integrity nodes are operating at 94% stability.",
              metric: 94,
              type: "integrity",
              color: C.purple,
              icon: Shield
            }
          ]}
        />
    </div>
  );
} 