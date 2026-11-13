import React, { useState } from "react";
import { Lock, Mail, Loader2, Sparkles, ShieldCheck } from "lucide-react";

const C = { 
  bg: 'var(--bg)', 
  surf: 'var(--surf)', 
  card: 'var(--card)', 
  border: 'var(--border)', 
  cyan: 'var(--cyan)', 
  purple: 'var(--purple)', 
  text: 'var(--text)', 
  textSec: 'var(--textSec)',
  textMuted: 'var(--textMuted)',
  red: 'var(--red)'
};

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      if (res.ok) {
        onLogin(data);
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "10%", left: "10%", width: "40vw", height: "40vw", background: `radial-gradient(circle, ${C.cyan}15 0%, transparent 70%)`, filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "40vw", height: "40vw", background: `radial-gradient(circle, ${C.purple}15 0%, transparent 70%)`, filter: "blur(60px)" }} />
      </div>

      <div style={{ position: "relative", width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", width: 64, height: 64, borderRadius: 16, background: `linear-gradient(135deg, ${C.cyan}, ${C.purple})`, alignItems: "center", justifyContent: "center", color: "#fff", marginBottom: 20, boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }}>
            <ShieldCheck size={32} />
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: C.text, letterSpacing: "-0.04em", marginBottom: 8 }}>SearchIQ</h1>
          <p style={{ fontSize: 14, color: C.textSec }}>Enterprise SEO & AI Visibility Intelligence</p>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 24, padding: 32, boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}>
          <form style={{ display: "flex", flexDirection: "column", gap: 20 }} onSubmit={handleSubmit}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.textSec, marginBottom: 8 }}>Work Email</label>
              <div style={{ position: "relative" }}>
                <Mail style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.textSec }} size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@searchiq.com"
                  required
                  style={{ width: "100%", padding: "12px 12px 12px 42px", background: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, color: C.text, fontSize: 14, outline: "none", transition: "border-color 0.2s" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.textSec, marginBottom: 8 }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.textSec }} size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ width: "100%", padding: "12px 12px 12px 42px", background: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, color: C.text, fontSize: 14, outline: "none" }}
                />
              </div>
            </div>

            {error && (
              <div style={{ padding: "10px 12px", background: `${C.red}15`, border: `1px solid ${C.red}30`, borderRadius: 10, color: C.red, fontSize: 13, display: "flex", gap: 8, alignItems: "center" }}>
                <Lock size={14} /> {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              style={{ width: "100%", height: 48, background: `linear-gradient(135deg, ${C.cyan}, ${C.purple})`, color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: loading ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 8 }}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Access Dashboard"}
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: "center", display: "flex", justifyContent: "center", gap: 20 }}>
             <p style={{ fontSize: 11, color: C.textSec }}>Admin: admin@searchiq.com (pass: admin)</p>
          </div>
        </div>

        <div style={{ marginTop: 24, textAlign: "center", display: "flex", justifyContent: "center", gap: 20 }}>
           <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.textMuted, fontSize: 12 }}>
             <Sparkles size={14} /> Trusted by Enterprise Partners
           </div>
        </div>
      </div>
    </div>
  );
}
