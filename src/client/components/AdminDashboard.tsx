import React, { useState, useEffect, useRef } from "react";
import { User, Shield, Settings, CreditCard, Bell, LogOut, ChevronRight, Activity, Loader2, Zap, Trash2, Edit3, Plus, Check, Save, Image as ImageIcon, Target } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const C = { 
  bg:'var(--bg)', 
  surf:'var(--surf)', 
  card:'var(--card)', 
  border:'var(--border)', 
  borderHov:'var(--borderHov)', 
  cyan:'var(--cyan)', 
  green:'var(--green)', 
  red:'var(--red)', 
  amber:'var(--amber)', 
  purple:'var(--purple)', 
  blue:'var(--blue)', 
  text:'var(--text)', 
  textSec:'var(--textSec)', 
  textMuted:'var(--textMuted)' 
};

const Card = ({ children, style = {}, onClick = undefined, onAIInteraction = undefined }: any) => (
  <motion.div 
    whileHover={onClick ? { translateY: -4, borderColor: C.cyan } : {}}
    onClick={onClick}
    onMouseEnter={() => onAIInteraction?.("hover")}
    style={{ 
      background: C.card, 
      border: `1px solid ${C.border}`, 
      borderRadius: 16, 
      padding: "16px", 
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      cursor: onClick ? "pointer" : "default",
      ...style 
    }}
  >
    {children}
  </motion.div>
);

import PredictiveAnalytics from "./PredictiveAnalytics";

export default function AdminDashboard({ currentUser, onLogout, onTriggerInsight }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [users, setUsers] = useState([
    { id: '1', name: 'Admin User', email: 'admin@searchiq.com', role: 'admin', plan: 'Enterprise Elite', status: 'active', joined: '2024-01-10' },
    { id: '2', name: 'Regular User', email: 'user@searchiq.com', role: 'user', plan: 'Pro Master', status: 'active', joined: '2024-02-15' },
    { id: '3', name: 'Mark Wilson', email: 'mark@client.com', role: 'user', plan: 'Basic Plus', status: 'active', joined: '2024-03-01' },
    { id: '4', name: 'Sarah Chen', email: 'sarah@dev.com', role: 'editor', plan: 'Enterprise Elite', status: 'inactive', joined: '2024-03-12' }
  ]);
  
  const [activePlan, setActivePlan] = useState('Enterprise Elite');
  const [showPlanModal, setShowPlanModal] = useState(false);
  
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Visa', last4: '4242', exp: '12/26', primary: true },
    { id: 2, type: 'Mastercard', last4: '8812', exp: '09/25', primary: false }
  ]);

  const [editingPayment, setEditingPayment] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const isAdmin = currentUser?.role === 'admin';

  const handlePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result as string);
      reader.readAsDataURL(file);
      onTriggerInsight("Biometric Sync", "Synchronizing high-resolution agent identity visual into the neural vault.");
    }
  };

  const [editingUser, setEditingUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [systemSettings, setSystemSettings] = useState({
    siteName: 'RankRush',
    adminEmail: 'admin@rankrush.io',
    enableRegistration: true,
    apiThrottle: 60,
    maintenanceMsg: 'System undergoing neural recalibration. Access restricted.'
  });

  const [plans, setPlans] = useState([
    { id: 'basic', name: 'Basic Plus', price: 99, features: ['10k Keywords', 'Daily Updates', 'Standard Support'] },
    { id: 'pro', name: 'Pro Master', price: 499, features: ['100k Keywords', 'Hourly Updates', 'Priority Support', 'API Access'] },
    { id: 'enterprise', name: 'Enterprise Elite', price: 2400, features: ['Unlimited Keywords', 'Real-time Sync', 'Dedicated Agent', 'Custom AI Training'] }
  ]);

  const handleDeleteUser = (id: string) => {
    if (window.confirm("Are you certain you wish to permanently decommission this entity? This operation is irreversible.")) {
      setUsers(users.filter(u => u.id !== id));
      onTriggerInsight("Security Audit", "User record purged from primary identity vault and all associated access tokens revoked.");
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowUserModal(true);
  };

  const saveUserUpdate = () => {
    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    setShowUserModal(false);
    onTriggerInsight("Identity Modification", `Refactoring neural permissions for node: ${editingUser.name}`);
  };

  const renderOverview = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
       {showUserModal && (
         <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 24, padding: 40, width: '100%', maxWidth: 500 }}>
                <h3 style={{ fontSize: 24, fontWeight: 950, marginBottom: 32 }}>Modify Agent Node</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 950, color: C.textMuted, marginBottom: 8 }}>AGENT NAME</label>
                        <input value={editingUser?.name} onChange={e => setEditingUser({...editingUser, name: e.target.value})} style={{ width: '100%', background: C.surf, border: `1px solid ${C.border}`, padding: '14px', borderRadius: 12, color: C.text, fontWeight: 800 }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 950, color: C.textMuted, marginBottom: 8 }}>NEURAL TIER</label>
                        <select value={editingUser?.plan} onChange={e => setEditingUser({...editingUser, plan: e.target.value})} style={{ width: '100%', background: C.surf, border: `1px solid ${C.border}`, padding: '14px', borderRadius: 12, color: C.text, fontWeight: 800 }}>
                            {plans.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 950, color: C.textMuted, marginBottom: 8 }}>ACCESS STATUS</label>
                        <select value={editingUser?.status} onChange={e => setEditingUser({...editingUser, status: e.target.value})} style={{ width: '100%', background: C.surf, border: `1px solid ${C.border}`, padding: '14px', borderRadius: 12, color: C.text, fontWeight: 800 }}>
                            <option value="active">ACTIVE</option>
                            <option value="inactive">INACTIVE</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                        <button onClick={saveUserUpdate} style={{ flex: 1, padding: '16px', background: C.cyan, color: '#000', border: 'none', borderRadius: 16, fontWeight: 950, cursor: 'pointer' }}>SYNC CHANGES</button>
                        <button onClick={() => setShowUserModal(false)} style={{ flex: 1, padding: '16px', background: C.surf, color: C.text, border: `1px solid ${C.border}`, borderRadius: 16, fontWeight: 950, cursor: 'pointer' }}>ABORT</button>
                    </div>
                </div>
            </motion.div>
         </div>
       )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
        {[
          { label: 'Cloud Node Clusters', val: '24', color: C.cyan, icon: <Activity size={18} />, delta: 'ONLINE' },
          { label: 'Neural Throughput', val: '9.2 GB/s', color: C.purple, icon: <Zap size={18} />, delta: '+14% PKT' },
          { label: 'Security Firewall', val: 'BRUTAL', color: C.green, icon: <Shield size={18} />, delta: '0 BREACH' },
          { label: 'Vault Balance', val: '$1.4M', color: C.amber, icon: <CreditCard size={18} />, delta: '+42% REV' },
        ].map(item => (
          <Card key={item.label} onClick={() => onTriggerInsight(item.label, `Diagnostic telemetry for ${item.label}. All systems reporting nominal parameters.`)} style={{ cursor: 'pointer', background: `linear-gradient(135deg, ${C.card}, ${item.color}05)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: C.textSec, marginBottom: 12 }}>
              <div style={{ color: item.color }}>{item.icon}</div> <span style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: '0.1em' }}>{item.label}</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 900, color: item.color }}>{item.val}</div>
            <div style={{ fontSize: 11, color: item.color, marginTop: 8, fontWeight: 800, background: `${item.color}10`, padding: '4px 10px', borderRadius: 20, display: 'inline-block' }}>{item.delta}</div>
          </Card>
        ))}
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 24, overflow: "hidden", boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
        <div style={{ padding: "32px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: `${C.surf}40` }}>
          <div>
             <h2 style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.03em" }}>Intelligence Nodes (Identity Vault)</h2>
             <p style={{ fontSize: 12, color: C.textSec, marginTop: 4 }}>Managing {users.length} active authorized agents.</p>
          </div>
          
           <button onClick={() => {
             const name = prompt("Enter agent name:");
             const email = prompt("Enter agent email:");
             if(name && email) {
               setUsers([...users, { id: String(Date.now()), name, email, role: 'user', plan: 'Basic Plus', status: 'active', joined: new Date().toISOString().split('T')[0] }]);
               onTriggerInsight("Agent Provisioning", `Provisioned new neural agent: ${name}`);
             }
           }} style={{ background: C.cyan, color: "#fff", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 13, fontWeight: 900, cursor: "pointer", boxShadow: '0 4px 15px ' + C.cyan + '30' }}>PROVISION NEURAL AGENT+ </button>

        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: `1px solid ${C.border}`, background: C.surf }}>
                <th style={{ padding: "20px 32px", fontSize: 11, fontWeight: 900, color: C.textMuted, textTransform: "uppercase", letterSpacing: '0.05em' }}>Agent Identity</th>
                <th style={{ padding: "20px 32px", fontSize: 11, fontWeight: 900, color: C.textMuted, textTransform: "uppercase", letterSpacing: '0.05em' }}>Neural Tier</th>
                <th style={{ padding: "20px 32px", fontSize: 11, fontWeight: 900, color: C.textMuted, textTransform: "uppercase", letterSpacing: '0.05em' }}>Access Status</th>
                <th style={{ padding: "20px 32px", fontSize: 11, fontWeight: 900, color: C.textMuted, textTransform: "uppercase", letterSpacing: '0.05em', textAlign: "right" }}>Neural Control</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={{ borderBottom: `1px solid ${C.border}`, transition: "0.2s" }}>
                  <td style={{ padding: "20px 32px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: u.role === 'admin' ? `linear-gradient(135deg, ${C.purple}, ${C.blue})` : `linear-gradient(135deg, ${C.cyan}, ${C.blue})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: C.text }}>{u.name}</div>
                        <div style={{ fontSize: 12, color: C.textMuted }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "20px 32px" }}>
                     <span style={{ padding: '6px 12px', background: `${C.surf}`, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, fontWeight: 800 }}>{u.plan.toUpperCase()}</span>
                  </td>
                  <td style={{ padding: "20px 32px" }}>
                     <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: u.status === 'active' ? C.green : C.red, boxShadow: `0 0 8px ${u.status === 'active' ? C.green : C.red}` }} />
                        <span style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase' }}>{u.status}</span>
                     </div>
                  </td>
                  <td style={{ padding: "20px 32px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                      <button onClick={() => handleEditUser(u)} style={{ padding: '8px 16px', background: C.surf, border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 11, fontWeight: 900, color: C.text, cursor: 'pointer' }}><Edit3 size={14} /></button>
                      <button onClick={() => handleDeleteUser(u.id)} style={{ padding: '8px 16px', background: `${C.red}10`, border: `1px solid ${C.red}30`, borderRadius: 10, fontSize: 11, fontWeight: 900, color: C.red, cursor: 'pointer' }}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <h2 style={{ fontSize: 24, fontWeight: 950, letterSpacing: '-0.04em' }}>Core System Directives</h2>
         <div style={{ background: `${C.amber}10`, color: C.amber, padding: '8px 16px', borderRadius: 12, fontSize: 11, fontWeight: 950, border: `1px solid ${C.amber}30` }}>PROD ENVIRONMENT: L4 SECURITY</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
           <Card style={{ padding: 40 }}>
              <h3 style={{ fontSize: 16, fontWeight: 950, marginBottom: 24, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nexus Global Parameters</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 950, color: C.textMuted, marginBottom: 8 }}>APPLICATION MONIKER</label>
                      <input value={systemSettings.siteName} onChange={e => setSystemSettings({...systemSettings, siteName: e.target.value})} style={{ width: '100%', background: C.surf, border: `1px solid ${C.border}`, padding: '14px', borderRadius: 12, color: C.text, fontWeight: 800 }} />
                  </div>
                  <div>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 950, color: C.textMuted, marginBottom: 8 }}>ADMIN OVERRIDE EMAIL</label>
                      <input value={systemSettings.adminEmail} onChange={e => setSystemSettings({...systemSettings, adminEmail: e.target.value})} style={{ width: '100%', background: C.surf, border: `1px solid ${C.border}`, padding: '14px', borderRadius: 12, color: C.text, fontWeight: 800 }} />
                  </div>
                  <div>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 950, color: C.textMuted, marginBottom: 8 }}>API THROTTLE DEPTH (req/m)</label>
                      <input type="number" value={systemSettings.apiThrottle} onChange={e => setSystemSettings({...systemSettings, apiThrottle: parseInt(e.target.value)})} style={{ width: '100%', background: C.surf, border: `1px solid ${C.border}`, padding: '14px', borderRadius: 12, color: C.text, fontWeight: 800 }} />
                  </div>
                  <button onClick={() => onTriggerInsight("Settings Commit", "Synchronizing global application state across all distributed clusters.")} style={{ padding: '16px', background: C.cyan, color: '#000', border: 'none', borderRadius: 16, fontWeight: 950, cursor: 'pointer', marginTop: 12 }}>COMMIT GLOBAL STATE</button>
              </div>
           </Card>

           <Card>
              <h3 style={{ fontSize: 16, fontWeight: 900, marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Intelligence Core</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                 <div style={{ padding: 20, background: `${C.surf}`, border: `1px solid ${C.border}`, borderRadius: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                       <div style={{ fontSize: 14, fontWeight: 900, color: C.text }}>NEXUS-V8 (FORCED)</div>
                       <div style={{ fontSize: 11, color: C.green, fontWeight: 800 }}>99.98% ACCURACY RATING</div>
                    </div>
                    <div style={{ width: 12, height: 12, background: C.green, borderRadius: '50%', boxShadow: `0 0 10px ${C.green}` }} />
                 </div>
                 <p style={{ fontSize: 13, color: C.textSec, lineHeight: 1.6 }}>Custom LLM weights prioritized for SERP volatility and semantic correlation tracking. Low latency mode active.</p>
              </div>
           </Card>
        </div>

        <Card style={{ padding: 32 }}>
           <h3 style={{ fontSize: 16, fontWeight: 900, marginBottom: 24, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Global Behavioral Directives</h3>
           <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: "OLED PERFORMANCE VECTORS", desc: "Forced spectral optimization for high-density neural displays.", enabled: true, color: C.cyan },
                { label: "AUTO-INSIGHT TRIGGER", desc: "Synthesize intelligence on every user interaction event.", enabled: true, color: C.purple },
                { label: "EXPERIMENTAL CRAWL NODES", desc: "Utilize non-standard indexing paths for deeper market extraction.", enabled: systemSettings.enableRegistration, color: C.amber, toggle: () => setSystemSettings({...systemSettings, enableRegistration: !systemSettings.enableRegistration}) },
                { label: "HMAC GATEWAY ACCESS", desc: "Allow direct binary queries via the high-speed API tunnel.", enabled: false, color: C.blue },
                { label: "MAINTENANCE LOCKDOWN", desc: "Disable all external ingress points for emergency patching.", enabled: maintenanceMode, color: C.red, toggle: () => { if(isAdmin) setMaintenanceMode(!maintenanceMode); onTriggerInsight("System Lockdown", "Initiating global access restricted environment protocol."); } },
              ].map((s, i) => (
                <div key={i} onClick={s.toggle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: `${C.surf}40`, border: `1px solid ${C.border}`, borderRadius: 16, marginBottom: 8, cursor: s.toggle ? 'pointer' : 'default' }}>
                   <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 900, color: C.text }}>{s.label}</div>
                      <div style={{ fontSize: 12, color: C.textSec, marginTop: 4 }}>{s.desc}</div>
                   </div>
                   <div style={{ width: 48, height: 24, background: s.enabled ? s.color : `${C.border}80`, borderRadius: 12, position: "relative", transition: '0.3s' }}>
                      <div style={{ position: "absolute", top: 3, left: s.enabled ? 26 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: '0 2px 4px rgba(0,0,0,0.2)', transition: '0.3s' }} />
                   </div>
                </div>
              ))}
           </div>
           <div style={{ marginTop: 24 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 950, color: C.textMuted, marginBottom: 8 }}>MAINTENANCE MESSAGE</label>
                <textarea value={systemSettings.maintenanceMsg} onChange={e => setSystemSettings({...systemSettings, maintenanceMsg: e.target.value})} style={{ width: '100%', background: C.surf, border: `1px solid ${C.border}`, padding: '14px', borderRadius: 12, color: C.text, fontSize: 13, height: 80, resize: 'none' }} />
           </div>
        </Card>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
       {showPlanModal && (
         <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 24, padding: 40, width: '100%', maxWidth: 800 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    <h3 style={{ fontSize: 24, fontWeight: 950 }}>Select Neural Tier</h3>
                    <button onClick={() => setShowPlanModal(false)} style={{ background: 'transparent', border: 'none', color: C.text, fontSize: 24, cursor: 'pointer' }}>×</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                    {plans.map(p => (
                        <div key={p.id} onClick={() => { setActivePlan(p.name); setShowPlanModal(false); onTriggerInsight("Plan Migration", `Migrating neural cluster to the ${p.name} tier.`); }} style={{ padding: 32, borderRadius: 20, border: `1px solid ${activePlan === p.name ? C.cyan : C.border}`, background: activePlan === p.name ? `${C.cyan}05` : C.surf, cursor: 'pointer', transition: '0.2s' }}>
                            <div style={{ fontSize: 11, fontWeight: 950, color: C.textMuted, textTransform: 'uppercase', marginBottom: 12 }}>{p.id}</div>
                            <div style={{ fontSize: 22, fontWeight: 950, marginBottom: 8 }}>{p.name}</div>
                            <div style={{ fontSize: 32, fontWeight: 950, color: activePlan === p.name ? C.cyan : C.text, marginBottom: 24 }}>${p.price}<span style={{ fontSize: 14, color: C.textMuted }}>/mo</span></div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {p.features.map(f => <div key={f} style={{ fontSize: 12, color: C.textSec, display: 'flex', alignItems: 'center', gap: 6 }}><Check size={12} color={C.green} /> {f}</div>)}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
         </div>
       )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <h2 style={{ fontSize: 24, fontWeight: 950, letterSpacing: '-0.04em' }}>Neural Subscriptions & Yield</h2>
         <button onClick={() => onTriggerInsight("Yield Analysis", "Analyzing revenue projection based on current enterprise retention metrics.")} style={{ background: `${C.cyan}10`, color: C.cyan, border: `1px solid ${C.cyan}30`, padding: '8px 16px', borderRadius: 12, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>DOWNLOAD AUDIT PDF</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
        <Card onClick={() => onTriggerInsight("Tier Performance", "Analyzing the yield and utilization density of the active Enterprise Elite tier.")} style={{ padding: 40, background: `linear-gradient(135deg, ${C.card}, ${C.cyan}05)`, position: 'relative', overflow: 'hidden' }}>
           <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}><CreditCard size={120} /></div>
           <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 950, textTransform: "uppercase", letterSpacing: '0.1em', marginBottom: 20 }}>Primary Provisioning Tier</div>
           <div style={{ fontSize: 42, fontWeight: 950, color: C.cyan, marginBottom: 12, letterSpacing: '-0.03em' }}>{activePlan.toUpperCase()}</div>
           <div style={{ fontSize: 16, color: C.textSec, fontWeight: 800 }}>$2,400.00 / CYCLE • SYNC: OCT 12</div>
           <div style={{ marginTop: 40, display: 'flex', gap: 12 }}>
              <button 
                onClick={() => setShowPlanModal(true)}
                style={{ flex: 1, padding: '16px', background: C.cyan, color: '#000', border: 'none', borderRadius: 16, fontWeight: 950, cursor: 'pointer', boxShadow: `0 8px 25px ${C.cyan}40` }}
              >
                MANAGE TIER
              </button>
              
              <button 
                onClick={() => {
                   if(confirm("Terminate subscription? All neural agents will be downgraded to basic tier.")) {
                     setActivePlan('Basic Plus');
                     onTriggerInsight("Subscription Termination", "Cluster plan downgraded. Priming resources for migration.");
                   }
                }}
                style={{ flex: 0.5, padding: '16px', background: C.surf, color: C.text, border: '1px solid ' + C.border, borderRadius: 16, fontWeight: 900, cursor: 'pointer' }}
              >TERMINATE</button>

           </div>
        </Card>

        <Card style={{ padding: 40 }}>
           <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 950, textTransform: "uppercase", letterSpacing: '0.1em', marginBottom: 24 }}>Neural Computation Quota</div>
           <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                   <span style={{ fontSize: 15, color: C.text, fontWeight: 900 }}>CONCEPT SYNTHESIS</span>
                   <span style={{ fontSize: 15, fontWeight: 950, color: C.cyan }}>84,204 / 1,000,000</span>
                 </div>
                 <div style={{ height: 12, background: `${C.surf}`, border: `1px solid ${C.border}`, borderRadius: 20, overflow: 'hidden' }}>
                   <motion.div initial={{ width: 0 }} animate={{ width: '8.4%' }} style={{ height: '100%', background: C.cyan, borderRadius: 20 }} />
                 </div>
              </div>
              <div style={{ background: `${C.surf}80`, padding: 24, borderRadius: 20, border: `1px solid ${C.border}` }}>
                 <p style={{ fontSize: 13, color: C.textSec, lineHeight: 1.7, fontWeight: 800 }}>Quota utilized for deep-layer SERP indexing. Limit resets globally on the 1st of every calendar month. Enterprise accounts support linear scaling.</p>
              </div>
           </div>
        </Card>
      </div>

      <Card style={{ padding: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
           <div>
              <h3 style={{ fontSize: 20, fontWeight: 950, letterSpacing: '-0.02em' }}>Financial Ingress Configuration</h3>
              <p style={{ fontSize: 13, color: C.textMuted, marginTop: 4, fontWeight: 800 }}>Vaulted payment methodologies for automated neural renewal.</p>
           </div>
           <button 
             onClick={() => {
               const type = prompt("Enter card type (Visa/Mastercard):");
               const last4 = prompt("Enter last 4 digits:");
               if(type && last4) {
                 setPaymentMethods([...paymentMethods, { id: Date.now(), type, last4, exp: '12/28', primary: false }]);
                 onTriggerInsight("Vault Provisioning", "Authorized new payment primitive for identity validation.");
               }
             }}
             style={{ background: C.cyan, color: '#000', border: 'none', borderRadius: 16, padding: '14px 28px', fontSize: 13, fontWeight: 950, cursor: 'pointer', boxShadow: `0 8px 25px ${C.cyan}40` }}
           >
             <Plus size={18} style={{ marginBottom: -3, marginRight: 8 }} /> ADD METHOD
           </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {paymentMethods.map(pm => (
            <div key={pm.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '28px', background: C.surf, border: `1px solid ${C.border}`, borderRadius: 24, transition: '0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                 <div style={{ width: 72, height: 48, background: `linear-gradient(135deg, ${C.bg}, ${C.surf})`, border: `1px solid ${C.border}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 950, color: C.textSec }}>{pm.type.toUpperCase()}</div>
                 <div>
                    <div style={{ fontSize: 18, fontWeight: 950, color: C.text }}>CRYPTOGRAPHIC TOKEN: •••• {pm.last4}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
                       <span style={{ fontSize: 13, color: C.textMuted, fontWeight: 800 }}>EXPIRATION: {pm.exp}</span>
                       {pm.primary && <span style={{ color: C.green, fontSize: 11, fontWeight: 950, background: `${C.green}15`, padding: '4px 12px', borderRadius: 12, border: `1px solid ${C.green}30` }}>PRIMARY TUNNEL</span>}
                    </div>
                 </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button 
                  onClick={() => {
                    const l = prompt("Update last 4 digits:", pm.last4);
                    if(l) {
                      setPaymentMethods(paymentMethods.map(p => p.id === pm.id ? { ...p, last4: l } : p));
                      onTriggerInsight("Vault Update", "Primitive token parameters updated and encrypted.");
                    }
                  }} 
                  style={{ padding: '12px 24px', background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, fontSize: 13, fontWeight: 950, color: C.text, cursor: 'pointer' }}
                >
                  CONFIGURE
                </button>
                {!pm.primary && (
                  <button 
                    onClick={() => {
                      setPaymentMethods(paymentMethods.filter(p => p.id !== pm.id));
                      onTriggerInsight("Vault Ejection", "Primitive token successfully purged.");
                    }}
                    style={{ padding: '12px 24px', background: `${C.red}10`, border: `1px solid ${C.red}30`, borderRadius: 16, fontSize: 13, fontWeight: 950, color: C.red, cursor: 'pointer' }}
                  >
                    EJECT
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderAlerts = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <h2 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.04em' }}>Neural Signaling (Alerts)</h2>
         <div style={{ background: `${C.purple}10`, color: C.purple, padding: '8px 16px', borderRadius: 12, fontSize: 11, fontWeight: 900, border: `1px solid ${C.purple}30` }}>REAL-TIME TOPOLOGY ACTIVE</div>
      </div>
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            { id: '1', title: "SERP Algorithm Changes", desc: "Notify when significant volatility is detected in local markets.", enabled: true },
            { id: '2', title: "Competitor Domain Growth", desc: "Alert when a competitor adds more than 100 new pages.", enabled: true },
            { id: '3', title: "Weekly Intelligence Summary", desc: "Receive an AI-curated executive brief every Monday morning.", enabled: false },
            { id: '4', title: "Keyword Ranking Drops", desc: "Instant alert if any top-10 keywords drop more than 5 positions.", enabled: true },
          ].map((a, i) => (
            <div key={a.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: '32px', borderBottom: i < 3 ? `1px solid ${C.border}` : 'none', background: a.enabled ? 'transparent' : `${C.surf}20` }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 900, color: C.text }}>{a.title}</div>
                <div style={{ fontSize: 13, color: C.textSec, marginTop: 4 }}>{a.desc}</div>
              </div>
              <div style={{ width: 48, height: 24, background: a.enabled ? C.purple : C.border, borderRadius: 12, cursor: "pointer", position: "relative", transition: '0.3s' }}>
                 <div style={{ position: "absolute", top: 3, left: a.enabled ? 26 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: '0.3s' }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <button onClick={() => onTriggerInsight("Notification Topology", "Global mapping of real-time server-sent events for critical SEO alerts.")} style={{ padding: '20px', background: `${C.purple}10`, color: C.purple, border: `2px dashed ${C.purple}30`, borderRadius: 16, fontWeight: 900, cursor: 'pointer', fontSize: 14 }}>VERIFY SYSTEM WEBHOOKS</button>
    </div>
  );

  const renderProfile = () => (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32 }}>
        <div style={{ flex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'profile' && (
                <Card style={{ padding: 24 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 24, letterSpacing: "-0.04em" }}>Identity Parameters</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 10, fontWeight: 900, color: C.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: '0.05em' }}>Agent Moniker</label>
                        <input type="text" defaultValue={currentUser?.name} style={{ width: "100%", background: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px", color: C.text, fontWeight: 800, fontSize: 14 }} />
                      </div>
                      <div>
                         <label style={{ display: "block", fontSize: 10, fontWeight: 900, color: C.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: '0.05em' }}>Neural Workspace</label>
                         <input type="text" defaultValue="SearchIQ Headquarters (L7)" disabled style={{ width: "100%", background: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px", color: C.textSec, opacity: 0.5, fontWeight: 600 }} />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 10, fontWeight: 900, color: C.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: '0.05em' }}>Strategic Intelligence Summary</label>
                      <textarea 
                        style={{ width: "100%", background: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px", color: C.text, height: 120, resize: "none", lineHeight: 1.5, fontSize: 14, fontWeight: 600 }} 
                        placeholder="Define your operational focus."
                      />
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                      <button style={{ background: C.cyan, color: "#000", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 14, fontWeight: 900, cursor: "pointer", display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Save size={16} /> COMMIT IDENTITY
                      </button>
                      <button style={{ background: "transparent", color: C.textSec, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 24px", fontSize: 14, fontWeight: 900, cursor: "pointer" }}>
                        HARD RESET
                      </button>
                    </div>
                  </div>
                </Card>
              )}
              {activeTab === 'billing' && renderBilling()}
              {activeTab === 'alerts' && renderAlerts()}
              {activeTab === 'overview' && isAdmin && renderOverview()}
              {activeTab === 'settings' && isAdmin && renderSettings()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card style={{ padding: 24, textAlign: "center", background: `linear-gradient(135deg, ${C.card}, ${C.purple}08)` }}>
            <div 
              onClick={() => fileInputRef.current?.click()}
              style={{ width: 80, height: 80, borderRadius: 20, background: profilePic ? `url(${profilePic}) center/cover` : `linear-gradient(135deg, ${C.purple}, ${C.blue})`, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 900, color: "#fff", boxShadow: `0 4px 20px ${C.purple}20`, cursor: "pointer", overflow: "hidden", position: "relative" }}
            >
              {!profilePic && (currentUser?.name?.charAt(0) || <User size={32} />)}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.7)", color: "#fff", fontSize: 8, padding: "4px 0", fontWeight: 900, opacity: 0, transition: '0.3s' }} className="hover-trigger">UPDATE DNA</div>
            </div>
            <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handlePicUpload} />
            <h3 style={{ fontSize: 18, fontWeight: 900, color: C.text }}>{currentUser?.name || 'Agent Unknown'}</h3>
            <p style={{ fontSize: 12, color: C.textSec, marginTop: 4 }}>{currentUser?.email}</p>
          </Card>
          
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
             {[
               { id: 'profile', icon: <User size={16} />, label: 'Profile Identity' },
               { id: 'billing', icon: <CreditCard size={16} />, label: 'Subscription Vault' },
               { id: 'alerts', icon: <Bell size={16} />, label: 'Neural Signaling' },
               { id: 'overview', icon: <Activity size={16} />, label: 'Command Center', show: isAdmin },
               { id: 'settings', icon: <Settings size={16} />, label: 'Core Directives', show: isAdmin },
             ].map(item => (!item.show || isAdmin) && (
               <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ width: "100%", padding: "16px 20px", background: activeTab === item.id ? `${C.cyan}05` : "transparent", border: "none", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12, color: activeTab === item.id ? C.cyan : C.textSec, cursor: "pointer", textAlign: "left", transition: '0.2s' }}>
                  <div style={{ color: activeTab === item.id ? C.cyan : C.textMuted }}>{item.icon}</div> <span style={{ fontSize: 13, flex: 1, fontWeight: 900 }}>{item.label}</span>
               </button>
             ))}
             <button onClick={onLogout} style={{ width: "100%", padding: "16px 20px", background: "transparent", border: "none", display: "flex", alignItems: "center", gap: 12, color: C.red, cursor: "pointer", textAlign: "left" }}>
                <LogOut size={16} /> <span style={{ fontSize: 13, fontWeight: 900 }}>Security Termination</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return (
    <div style={{ padding: 80, color: C.textSec, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
      <Loader2 className="animate-spin" size={64} style={{ color: C.cyan, marginBottom: 24 }} />
      <h2 style={{ fontSize: 24, fontWeight: 900, color: C.text }}>INITIALIZING IDENTITY VAULT...</h2>
      <p style={{ fontSize: 14, color: C.textMuted, marginTop: 12, fontWeight: 600 }}>Zero-knowledge proof verification in progress.</p>
    </div>
  );

  return (
    <div style={{ padding: "48px", minHeight: '100vh', background: 'var(--bg-gradient)' }}>
      <style>{`
        .hover-trigger { transition: opacity 0.3s; }
        div:hover > .hover-trigger { opacity: 1 !important; }
      `}</style>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 60 }}>
          <div>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}
          >
             <div style={{ padding: "6px 14px", borderRadius: 12, background: `${C.cyan}15`, color: C.cyan, fontSize: 11, fontWeight: 900, border: `1px solid ${C.cyan}30` }}>V4.8.2 ALPHA</div>
             <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.textMuted }} />
             <span style={{ fontSize: 13, color: C.textSec, fontWeight: 800 }}>Uptime: 432:12:04</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ fontSize: 42, fontWeight: 900, color: C.text, letterSpacing: "-0.06em" }}
          >
            {activeTab === 'profile' ? "Identity Center" : activeTab === 'settings' ? "Core Directives" : activeTab === 'billing' ? "Subscription Vault" : activeTab === 'alerts' ? "Signal Control" : "Intelligence Command"}
          </motion.h1>
         </div>

         {/* Profile Button in Right Side Header */}
         <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ textAlign: 'right' }}>
               <div style={{ fontSize: 14, fontWeight: 900, color: C.text }}>{currentUser?.name || 'Agent'}</div>
               <div style={{ fontSize: 11, color: C.textSec }}>{currentUser?.role || 'User'}</div>
            </div>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: profilePic ? `url(${profilePic}) center/cover` : `linear-gradient(135deg, ${C.purple}, ${C.blue})`, border: `2px solid ${C.card}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: '#fff' }}>
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
         </div>
      </div>


       <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 60 }}>





        {/* Moved Header Content */}
       </div>


      <div>
        {renderProfile()}
      </div>

      <div style={{ marginTop: 60 }}>
        <PredictiveAnalytics 
          onTriggerInsight={onTriggerInsight} 
          data={[
            {
              title: "Traffic Market Analysis",
              description: "Administrative oversight nodes indicate a 100% operational uptime for all global traffic routing maps.",
              metric: "100%",
              trend: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
              type: "forecast",
              color: C.cyan,
              icon: Target
            },
            {
              title: "Authority Consistency",
              description: "System-wide authority protocols are operating at peak integrity across all multi-tenant clusters.",
              metric: 99.9,
              type: "integrity",
              color: C.purple,
              icon: Shield
            }
          ]}
        />
      </div>
    </div>
  );
}
