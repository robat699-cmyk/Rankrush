import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Target, Send, X, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AIChatModal({ isOpen, onClose, context }: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const displayContext = typeof context === 'string' ? context : (context?.title || context?.label || "unspecified sector");
      setMessages([{ role: 'ai', text: `SYSTEM BYPASS ESTABLISHED. Accessing high-fidelity telemetry for: [${displayContext}]. STAND BY.` }]);
      if (context) {
        const query = typeof context === 'string' ? context : (context.detail || context.title || context.label);
        handleSend(`INITIATE DEEP ANALYTIC EXPLOIT REPORT FOR: ${query}. Output a comprehensive summary with tables where applicable.`);
      }
    }
  }, [isOpen, context]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (overrideInput?: string) => {
    const text = overrideInput || input;
    if (!text.trim()) return;
    
    if (!overrideInput) {
        setMessages(prev => [...prev, { role: 'user', text }]);
        setInput("");
    }
    
    setLoading(true);
    try {
        const res = await fetch('/api/generate-insight', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
              element: text, 
              context: typeof context === 'string' ? context : `Target: ${context?.title || 'Unknown'} | Payload: ${context?.detail || 'None'}` 
            })
        });
        const data = await res.json();
        setMessages(prev => [...prev, { role: 'ai', text: data.strategicSummary || "I'm sorry, I couldn't generate an analysis for that." }]);
    } catch {
        setMessages(prev => [...prev, { role: 'ai', text: "Network error occurred." }]);
    } finally {
        setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', bottom: 85, right: 30, width: 450, height: 600, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, boxShadow: '0 10px 40px rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: "16px", background: 'var(--surf)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--red)' }}>
          <Target size={18} /> AI Core Assistant
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--textSec)' }}><X size={18} /></button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: "16px", display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((m, i) => (
            <div key={i} style={{ padding: "12px 16px", borderRadius: 12, fontSize: 13, lineHeight: 1.5, background: m.role === 'ai' ? 'var(--surf)' : 'var(--cyan)', color: m.role === 'ai' ? 'var(--text)' : '#000', alignSelf: m.role === 'ai' ? 'flex-start' : 'flex-end', maxWidth: '95%', border: m.role === 'ai' ? '1px solid var(--border)' : 'none' }}>
                <div className="markdown-body">
                   <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {typeof m.text === 'object' ? `\`\`\`json\n${JSON.stringify(m.text, null, 2)}\n\`\`\`` : m.text}
                   </ReactMarkdown>
                </div>
            </div>
        ))}
        {loading && (
            <div style={{ alignSelf: 'flex-start', padding: 12, color: 'var(--cyan)' }}>
               <Loader2 className="animate-spin" size={20} />
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: 'flex', gap: 8, padding: "16px", borderTop: '1px solid var(--border)', background: 'var(--surf)' }}>
        <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Command AI..." 
            style={{ flex: 1, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontSize: 13, outline: 'none' }} 
        />
        <button onClick={() => handleSend()} disabled={loading} style={{ background: 'var(--cyan)', border: 'none', borderRadius: 8, padding: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Send size={16} color="#000" />
        </button>
      </div>
    </div>
  );
}
