import React from "react";
import { X, ChevronRight, Info, TrendingUp, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const C = { 
  bg: 'var(--bg)', 
  surf: 'var(--surf)', 
  card: 'var(--card)', 
  border: 'var(--border)', 
  cyan: 'var(--cyan)', 
  green: 'var(--green)', 
  red: 'var(--red)', 
  amber: 'var(--amber)', 
  purple: 'var(--purple)', 
  blue: 'var(--blue)',
  text: 'var(--text)', 
  textSec: 'var(--textSec)',
  textMuted: 'var(--textMuted)' 
};

export default function InsightModal({ isOpen, onClose, data, loading }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div 
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />
      <div style={{ 
        position: "relative", 
        width: "100%", 
        maxWidth: 500, 
        background: C.card, 
        border: `1px solid ${C.border}`, 
        borderRadius: 20, 
        overflow: "hidden", 
        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        animation: "slideUp 0.3s ease-out" 
      }}>
        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${C.cyan}15`, display: "flex", alignItems: "center", justifyContent: "center", color: C.cyan }}>
              <Info size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{loading ? "Generating Insight..." : data?.title}</h3>
              <p style={{ fontSize: 12, color: C.textSec }}>AI-Powered Strategic Summary</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: C.textMuted, cursor: "pointer", padding: 4 }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "24px", maxHeight: "75vh", overflowY: "auto" }}>
          {loading ? (
             <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
               <div style={{ height: 20, background: `${C.textMuted}10`, borderRadius: 4, width: "70%" }} className="shimmer" />
               <div style={{ height: 100, background: `${C.textMuted}10`, borderRadius: 12, width: "100%" }} className="shimmer" />
               <div style={{ height: 60, background: `${C.textMuted}10`, borderRadius: 12, width: "100%" }} className="shimmer" />
             </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* AI Strategic Summary */}
              <section style={{ padding: 18, background: `linear-gradient(135deg, ${C.purple}20, ${C.blue}20)`, borderRadius: 14, border: `1px solid ${C.purple}40` }}>
                <h4 style={{ fontSize: 13, fontWeight: 800, color: C.purple, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <TrendingUp size={14} /> AI-POWERED STRATEGIC SUMMARY
                </h4>
                <div className="markdown-body" style={{ fontSize: 13, color: C.text, lineHeight: 1.6, fontWeight: 500 }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {typeof data?.strategicSummary === 'object' ? JSON.stringify(data.strategicSummary, null, 2) : data?.strategicSummary}
                  </ReactMarkdown>
                </div>
              </section>

              {/* Status Badge */}
              <div style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: 8, 
                padding: "8px 16px", 
                borderRadius: 12, 
                fontSize: 14, 
                fontWeight: 800,
                background: (data?.status?.includes("NOMINAL") || data?.status?.includes("OPTIMIZED")) ? `${C.green}20` : (data?.status?.includes("FAILURE") || data?.status?.includes("VULNERABILITY")) ? `${C.red}20` : `${C.amber}20`,
                color: (data?.status?.includes("NOMINAL") || data?.status?.includes("OPTIMIZED")) ? C.green : (data?.status?.includes("FAILURE") || data?.status?.includes("VULNERABILITY")) ? C.red : C.amber,
                width: "fit-content",
                border: "1px solid currentColor"
              }}>
                <AlertCircle size={16} />
                {data?.status?.toUpperCase()}
              </div>

              {/* Explanation */}
              <section>
                <h4 style={{ fontSize: 12, fontWeight: 800, color: C.textMuted, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>Detail Technical Analysis</h4>
                <div className="markdown-body" style={{ fontSize: 14, color: C.text, lineHeight: 1.6 }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {typeof data?.explanation === 'object' ? JSON.stringify(data.explanation, null, 2) : data?.explanation}
                  </ReactMarkdown>
                </div>
              </section>

              {/* Effect */}
              <section>
                <h4 style={{ fontSize: 12, fontWeight: 800, color: C.textMuted, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>Target Impact Profile</h4>
                <div className="markdown-body" style={{ fontSize: 14, color: C.text, lineHeight: 1.6 }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {typeof data?.currentEffect === 'object' ? JSON.stringify(data.currentEffect, null, 2) : data?.currentEffect}
                  </ReactMarkdown>
                </div>
              </section>

              {/* Next Steps */}
              <section>
                <h4 style={{ fontSize: 12, fontWeight: 800, color: C.textMuted, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>Strategic Next Steps</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {data?.nextSteps?.map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, background: C.surf, padding: "14px", borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                      <div style={{ color: C.cyan, flexShrink: 0, marginTop: 2 }}><ChevronRight size={18} /></div>
                      <p style={{ fontSize: 14, color: C.text, fontWeight: 600, lineHeight: 1.4 }}>
                        {typeof step === 'object' ? JSON.stringify(step) : step}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", background: `${C.surf}`, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "flex-end" }}>
          <button 
            onClick={onClose}
            style={{ 
              background: C.cyan, 
              color: "#fff", 
              border: "none", 
              borderRadius: 10, 
              padding: "10px 20px", 
              fontSize: 14, 
              fontWeight: 600, 
              cursor: "pointer" 
            }}
          >
            Got it
          </button>
        </div>
      </div>
      <style>{`
        .shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shim 1.5s infinite;
        }
        @keyframes shim {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
