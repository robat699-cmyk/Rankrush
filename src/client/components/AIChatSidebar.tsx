import React, { useState } from "react";
import { MessageSquare, Sparkles, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AIChatSidebar({ context }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (messages.length === 0) {
      const displayContext = typeof context === 'string' ? context : (context?.title || "Operational Grid");
      setMessages([
        { role: 'ai', text: `NODE SCAN INITIATED: [${displayContext}]. Send tactical query now.` }
      ]);
    }
  }, [context]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const text = input;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput("");
    setLoading(true);
    
    try {
        const res = await fetch('/api/generate-insight', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
              element: text, 
              context: typeof context === 'string' ? context : `Sidebar context: ${context?.title || 'General'}` 
            })
        });
        const data = await res.json();
        setMessages(prev => [...prev, { role: 'ai', text: data.strategicSummary || "I'm sorry, I couldn't generate an analysis." }]);
    } catch {
        setMessages(prev => [...prev, { role: 'ai', text: "Network interference detected." }]);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div style={{ padding: "16px", display: 'flex', flexDirection: 'column', height: '100%', gap: 12, background: '#0f172a', borderLeft: '1px solid #1e293b' }}>
      <div style={{ fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, color: '#38bdf8' }}>
        <MessageSquare size={16} /> Neural Link Assistant
      </div>
      {context && (
        <div style={{ padding: 8, background: '#1e293b', borderRadius: 6, fontSize: 10, color: '#94a3b8', border: '1px solid #334155' }}>
          CONTEXT: {context.title}
        </div>
      )}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((m, i) => (
            <div key={i} style={{ padding: 10, borderRadius: 10, fontSize: 12, lineHeight: 1.4, background: m.role === 'ai' ? '#1e293b' : '#0369a1', alignSelf: m.role === 'ai' ? 'flex-start' : 'flex-end', maxWidth: '90%', border: m.role === 'ai' ? '1px solid #334155' : 'none' }}>
                <div className="markdown-body">
                   <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {typeof m.text === 'object' ? `\`\`\`json\n${JSON.stringify(m.text, null, 2)}\n\`\`\`` : m.text}
                   </ReactMarkdown>
                </div>
            </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
        <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={loading ? "Analyzing..." : "Ask anything..."} 
            disabled={loading}
            style={{ flex: 1, background: '#1e293b', border: '1px solid #334155', borderRadius: 6, padding: '8px 12px', color: '#f1f5f9', fontSize: 12, outline: 'none', opacity: loading ? 0.7 : 1 }} 
        />
        <button onClick={handleSend} disabled={loading} style={{ background: loading ? '#64748b' : '#0ea5e9', border: 'none', borderRadius: 6, padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Send size={14} color="#fff" style={{ opacity: loading ? 0.5 : 1 }} />
        </button>
      </div>
    </div>
  );
}
