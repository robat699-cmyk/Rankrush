import React from "react";

const C = { bg:'var(--bg)', surf:'var(--surf)', card:'var(--card)', border:'var(--border)', borderHov:'var(--borderHov)', cyan:'var(--cyan)', green:'var(--green)', red:'var(--red)', amber:'var(--amber)', purple:'var(--purple)', blue:'var(--blue)', text:'var(--text)', textSec:'var(--textSec)', textMuted:'var(--textMuted)' };

const PlaceholderModule = ({ title, description, icon }) => (
  <div className="fade-in" style={{ padding: "40px 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center" }}>
    <div style={{ 
      width: 80, height: 80, borderRadius: 24, 
      background: `linear-gradient(135deg, ${C.card}, ${C.surf})`, 
      border: `1px solid ${C.border}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      marginBottom: 24,
      boxShadow: `0 8px 32px rgba(0,0,0,0.2)`
    }}>
      <i className={`ti ${icon}`} style={{ fontSize: 32, color: C.cyan }} />
    </div>
    
    <h1 style={{ fontSize: 28, fontWeight: 700, color: C.text, marginBottom: 12 }}>{title}</h1>
    <p style={{ fontSize: 15, color: C.textSec, maxWidth: 480, lineHeight: 1.6, marginBottom: 32 }}>
      {description}
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, width: '100%', maxWidth: 800 }}>
       {[1, 2, 3].map(i => (
         <div key={i} style={{ 
           background: C.card, padding: 20, borderRadius: 12, border: `1px solid ${C.border}`,
           textAlign: 'left'
         }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `${C.cyan}10`, marginBottom: 16 }} />
            <div style={{ width: '80%', height: 12, borderRadius: 6, background: C.surf, marginBottom: 8 }} />
            <div style={{ width: '60%', height: 12, borderRadius: 6, background: C.surf }} />
         </div>
       ))}
    </div>

    <button style={{ 
      marginTop: 40,
      background: `linear-gradient(135deg, ${C.cyan}, ${C.blue})`, 
      color: '#fff', border: 'none', padding: '12px 32px', borderRadius: 8, 
      fontWeight: 600, fontSize: 15, cursor: 'pointer',
      boxShadow: `0 4px 12px ${C.cyan}40`
    }}>
      Initialize Service module
    </button>
  </div>
);

export default PlaceholderModule;
