import React from "react";
import { Check, Target, Shield } from "lucide-react";
import PredictiveAnalytics from "./PredictiveAnalytics";


const C = { bg:'var(--bg)', surf:'var(--surf)', card:'var(--card)', border:'var(--border)', borderHov:'var(--borderHov)', cyan:'var(--cyan)', green:'var(--green)', red:'var(--red)', amber:'var(--amber)', purple:'var(--purple)', blue:'var(--blue)', text:'var(--text)', textSec:'var(--textSec)', textMuted:'var(--textMuted)' };

const features = {
  pro: ["5 Projects", "500 Keywords tracked daily", "10,000 Pages crawled per month", "Standard AI Limits", "Basic Search Data"],
  guru: ["15 Projects", "1,500 Keywords tracked daily", "300,000 Pages crawled per month", "Historical Data", "Extended AI Limits", "Content Marketing Toolkit", "GDS Integration"],
  business: ["40 Projects", "5,000 Keywords tracked daily", "1,000,000 Pages crawled per month", "Share of Voice Metric", "API Access", "PLA Analytics", "Free Migration"]
};

export default function Pricing({ onTriggerInsight }: any) {
  return (

    <div className="fade-in" style={{ padding: "40px 24px", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: C.text, marginBottom: 12 }}>Choose Your SEO Arsenal</h1>
        <p style={{ color: C.textSec, fontSize: 16 }}>Start with a 14-day free trial. Unlock enterprise AI features instantly.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, width: "100%" }}>
        {/* Pro */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32, display: "flex", flexDirection: "column" }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: C.text }}>Pro</h2>
          <p style={{ fontSize: 13, color: C.textSec, marginTop: 8, minHeight: 40 }}>For newbies and small teams mastering search.</p>
          <div style={{ margin: "24px 0" }}>
            <span style={{ fontSize: 40, fontWeight: 700, color: C.text }}>$129</span><span style={{ fontSize: 16, color: C.textSec }}>/mo</span>
          </div>
          <button style={{ width: "100%", background: C.surf, border: `1px solid ${C.border}`, color: C.text, padding: "12px 0", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 24 }}>Start free trial</button>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: C.text, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Key Features</p>
            {features.pro.map(f => (
               <div key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                 <Check size={16} color={C.green} style={{ marginTop: 2, flexShrink: 0 }} />
                 <span style={{ fontSize: 13, color: C.textSec, lineHeight: 1.4 }}>{f}</span>
               </div>
            ))}
          </div>
        </div>

        {/* Guru (Highlight) */}
        <div style={{ background: C.card, border: `2px solid ${C.cyan}`, borderRadius: 16, padding: 32, display: "flex", flexDirection: "column", position: "relative", transform: "scale(1.05)", zIndex: 10 }}>
          <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: C.cyan, color: C.bg, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 12, textTransform: "uppercase", letterSpacing: 1 }}>Most Popular</div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: C.cyan }}>Guru</h2>
          <p style={{ fontSize: 13, color: C.textSec, marginTop: 8, minHeight: 40 }}>For agencies and mid-size businesses.</p>
          <div style={{ margin: "24px 0" }}>
            <span style={{ fontSize: 40, fontWeight: 700, color: C.text }}>$249</span><span style={{ fontSize: 16, color: C.textSec }}>/mo</span>
          </div>
          <button style={{ width: "100%", background: C.cyan, border: "none", color: C.bg, padding: "12px 0", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 24 }}>Start free trial</button>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: C.text, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Everything in Pro, plus</p>
            {features.guru.map(f => (
               <div key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                 <Check size={16} color={C.green} style={{ marginTop: 2, flexShrink: 0 }} />
                 <span style={{ fontSize: 13, color: C.textSec, lineHeight: 1.4 }}>{f}</span>
               </div>
            ))}
          </div>
        </div>

        {/* Enterprise */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32, display: "flex", flexDirection: "column" }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: C.text }}>Enterprise</h2>
          <p style={{ fontSize: 13, color: C.textSec, marginTop: 8, minHeight: 40 }}>For large agencies and enterprises handling scale.</p>
          <div style={{ margin: "24px 0" }}>
            <span style={{ fontSize: 40, fontWeight: 700, color: C.text }}>$499</span><span style={{ fontSize: 16, color: C.textSec }}>/mo</span>
          </div>
          <button style={{ width: "100%", background: C.surf, border: `1px solid ${C.border}`, color: C.text, padding: "12px 0", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 24 }}>Start 14-day free trial</button>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: C.text, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Everything in Guru, plus</p>
            {features.business.map(f => (
               <div key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                 <Check size={16} color={C.green} style={{ marginTop: 2, flexShrink: 0 }} />
                 <span style={{ fontSize: 13, color: C.textSec, lineHeight: 1.4 }}>{f}</span>
               </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 48, background: `linear-gradient(135deg, ${C.card}, ${C.surf})`, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: C.text, marginBottom: 8 }}>Need a Custom Enterprise Solution?</h2>
          <p style={{ fontSize: 14, color: C.textSec }}>Unlimited projects, white-label reporting, custom API limits, and dedicated account management.</p>
        </div>
        <button style={{ background: C.text, color: C.bg, border: "none", padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Request Enterprise Custom Options</button>
      </div>

        {/* ADDED NEW ELEMENTS */}
        <PredictiveAnalytics 
          onTriggerInsight={onTriggerInsight} 
          data={[
            {
              title: "Traffic Market Analysis",
              description: "Strategic plan upgrades are projected to unlock an average of 45% additional traffic capability per project.",
              metric: "45%",
              trend: [30, 32, 35, 34, 38, 40, 39, 42, 43, 44, 45],
              type: "forecast",
              color: C.cyan,
              icon: Target
            },
            {
              title: "Authority Consistency",
              description: "Account authority nodes are 100% verified for all premium subscription tiers.",
              metric: "100%",
              type: "integrity",
              color: C.purple,
              icon: Shield
            }
          ]}
        />
    </div>
  );
} 