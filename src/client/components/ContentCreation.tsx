import React, { useState } from "react";
import { Edit3, Sparkles, Copy, Download, Zap, Layout, FileText, Share2, AlertCircle, Wand2, Search, BookOpen, Layers, CheckSquare, BarChart3, Command, Cpu, Waves, Radar, Terminal, Globe, Target, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import PredictiveAnalytics from "./PredictiveAnalytics";

const C = { bg:'var(--bg)', surf:'var(--surf)', card:'var(--card)', border:'var(--border)', borderHov:'var(--borderHov)', cyan:'var(--cyan)', green:'var(--green)', red:'var(--red)', amber:'var(--amber)', purple:'var(--purple)', blue:'var(--blue)', text:'var(--text)', textSec:'var(--textSec)', textMuted:'var(--textMuted)' };


const Card = ({ children, onClick, style = {} }: any) => (
  <motion.div 
    whileHover={onClick ? { y: -2, borderColor: C.cyan } : {}}
    onClick={onClick}
    style={{ 
      background: C.card, 
      border: `1px solid ${C.border}`, 
      borderRadius: 14, 
      padding: 16, 
      transition: "all 0.2s", 
      cursor: onClick ? "pointer" : "default",
      position: "relative",
      overflow: 'hidden',
      ...style 
    }}
  >
    {children}
  </motion.div>
);

export default function ContentCreation({ mode, domain, onTriggerInsight }: any) {
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [content, setContent] = useState("");

  const handleGenerate = async () => {
    if (!topic) return;
    setGenerating(true);
    try {
      const res = await fetch("/api/content/generate", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ topic, mode, domain })
      });
      const result = await res.json();
      setContent(result.content || `Constructed neural response for ${topic}. High alignment detected.`);
    } catch (err) {
      console.error(err);
      setContent("Neural link severed. Please re-initiate topic generation.");
    } finally {
      setGenerating(false);
    }
  };

  const renderWritingAssistantUI = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: 32, height: 'calc(100vh - 280px)' }}>
        <div style={{ background: C.card, borderRadius: 24, border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.05)' }}>
            <div style={{ padding: '20px 32px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: `${C.surf}40` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: C.cyan }} />
                    <span style={{ fontSize: 11, fontWeight: 950, color: C.textSec, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Neural Scribe v4.1</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: C.surf, border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 10, fontWeight: 900, color: C.textMuted }}>
                         <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.green }} /> SYNCED
                    </div>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ padding: '8px 20px', background: C.cyan, color: '#000', border: 'none', borderRadius: 12, fontSize: 11, fontWeight: 950, cursor: 'pointer' }}>EXPORT SOURCE</motion.button>
                </div>
            </div>
            <textarea 
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Initialize semantic node architecture..."
                style={{ flex: 1, background: 'transparent', border: 'none', padding: 48, color: C.text, fontSize: 19, lineHeight: 1.8, resize: 'none', outline: 'none', fontFamily: 'Georgia, serif' }}
            />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <Card style={{ textAlign: 'center', background: `linear-gradient(135deg, ${C.card}, ${C.cyan}08)`, padding: 40 }}>
                <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 950, marginBottom: 16, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Resonance Quotient</div>
                <div style={{ fontSize: 72, fontWeight: 950, color: C.text, letterSpacing: '-0.05em', lineHeight: 1 }}>82<span style={{ fontSize: 24, color: C.textMuted }}>/100</span></div>
                <div style={{ height: 6, background: `${C.surf}80`, borderRadius: 3, margin: '32px 0', overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: '82%' }} style={{ height: '100%', background: C.cyan, borderRadius: 3 }} />
                </div>
                <p style={{ fontSize: 13, color: C.textSec, fontWeight: 800, lineHeight: 1.5 }}>Strategic alignment established. Inject 2 additional high-authority entities to breach top tier.</p>
            </Card>

            <Card style={{ padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <Cpu size={16} color={C.cyan} />
                    <h4 style={{ fontSize: 14, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Required Entities</h4>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {['content strategy', 'search intent', 'entity mapping', 'topical authority', 'LSI optimization'].map(t => (
                        <div key={t} style={{ padding: '8px 14px', background: `${C.cyan}05`, border: `1px solid ${C.cyan}20`, borderRadius: 10, fontSize: 11, fontWeight: 900, color: C.cyan }}>{t.toUpperCase()}</div>
                    ))}
                </div>
            </Card>

            <Card style={{ flex: 1, padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                    <BarChart3 size={16} color={C.purple} />
                    <h4 style={{ fontSize: 14, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Performance Analytics</h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {[
                        { t: 'Sentence Depth', v: 'High', c: C.cyan },
                        { t: 'Lexical Density', v: '0.84', c: C.purple },
                        { t: 'Semantic Drift', v: 'Minimal', c: C.green }
                    ].map(item => (
                        <div key={item.t} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${C.border}40` }}>
                            <span style={{ color: C.textSec, fontSize: 13, fontWeight: 800 }}>{item.t}</span>
                            <span style={{ fontWeight: 950, color: item.c, fontSize: 13 }}>{item.v}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    </motion.div>
  );

  const renderTopicResearchUI = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="fade-in">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
            {[
                { title: 'Topical Islands', icon: Globe, count: 12, color: C.cyan },
                { title: 'Semantic Gaps', icon: AlertCircle, count: 4, color: C.amber },
                { title: 'Growth Nodes', icon: Sparkles, count: 28, color: C.green }
            ].map((box, i) => (
                <Card key={i} onClick={() => onTriggerInsight(box.title)} style={{ padding: 16 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }} style={{ width: 36, height: 36, borderRadius: 10, background: `${box.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <box.icon color={box.color} size={18} />
                        </motion.div>
                        <div>
                            <div style={{ fontSize: 9, fontWeight: 950, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{box.title}</div>
                            <div style={{ fontSize: 24, fontWeight: 950, color: C.text, letterSpacing: '-0.02em' }}>{box.count}</div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: 16 }}>
            <Card style={{ padding: 0 }}>
                <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: 13, fontWeight: 950 }}>Topical Authority Matrix</h3>
                    <div style={{ display: 'flex', gap: 4 }}>{[1,2,3].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: C.border }} />)}</div>
                </div>
                <div style={{ padding: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {[
                            { topic: 'Digital Strategy', vol: '14.2k', diff: '84/100', c: C.red },
                            { topic: 'Search Intent Analysis', vol: '2.4k', diff: '12/100', c: C.green },
                            { topic: 'Content Lifecycle', vol: '8.1k', diff: '42/100', c: C.amber },
                            { topic: 'Entity Extraction', vol: '1.2k', diff: '08/100', c: C.green },
                            { topic: 'Semantic SEO', vol: '9.4k', diff: '56', c: C.amber },
                            { topic: 'Link Velocity', vol: '3.1k', diff: '29', c: C.green },
                            { topic: 'Crawl Budget', vol: '5.5k', diff: '14', c: C.green },
                            { topic: 'Ranking Factors', vol: '21k', diff: '93', c: C.red }
                        ].map((row, i) => (
                            <motion.div 
                                key={i} 
                                whileHover={{ background: `${C.surf}80`, x: 4 }}
                                style={{ padding: "8px 12px", background: C.surf, borderRadius: 8, border: `1px solid ${C.border}40`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                            >
                                <div>
                                    <div style={{ fontSize: 12, fontWeight: 900, color: C.text }}>{row.topic}</div>
                                    <div style={{ fontSize: 9, color: C.textMuted, fontWeight: 800, marginTop: 2 }}>{row.vol} monthly volume throughput</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: 10, fontWeight: 950, color: row.c, letterSpacing: '0.05em' }}>DIF: {row.diff}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Card>

            <Card style={{ padding: 0 }}>
                <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}` }}>
                    <h3 style={{ fontSize: 13, fontWeight: 950 }}>Contextual Intelligence Feed</h3>
                </div>
                <div style={{ padding: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                            { m: 'Competitor node density increased by 40% in "Strategy" cluster.', i: <Radar size={14} color={C.cyan} /> },
                            { m: 'Market intent re-routing toward "Comparison" logic blocks.', i: <Waves size={14} color={C.amber} /> },
                            { m: 'Authority signal depletion detected in secondary sub-clusters.', i: <AlertCircle size={14} color={C.red} /> },
                            { m: 'New high-conversion portal detected at "Content Lifecycle" node.', i: <Zap size={14} color={C.green} /> }
                        ].map((news, i) => (
                            <div key={i} style={{ display: 'flex', gap: 8 }}>
                                <div style={{ marginTop: 2 }}>{news.i}</div>
                                <p style={{ color: C.textSec, fontSize: 10, fontWeight: 800, lineHeight: 1.5 }}>{news.m}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    </motion.div>
  );

  const renderTemplateUI = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="fade-in">
        <Card style={{ marginBottom: 32, background: `linear-gradient(135deg, ${C.card}, ${C.purple}10)`, border: `1px solid ${C.purple}40`, padding: 48 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ width: 80, height: 80, borderRadius: 28, background: C.purple, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 12px 32px ${C.purple}40` }}>
                        <Terminal size={40} color="#fff" />
                    </motion.div>
                    <div>
                         <h3 style={{ fontSize: 28, fontWeight: 950, color: C.text, letterSpacing: '-0.03em' }}>SEO Architecture Protocol</h3>
                         <p style={{ color: C.textSec, fontSize: 17, marginTop: 6, fontWeight: 800 }}>Deploying structural schemas based on high-authority SERP archetypes.</p>
                    </div>
                </div>
                <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: `0 12px 40px ${C.purple}50` }} whileTap={{ scale: 0.95 }}
                    onClick={handleGenerate} disabled={generating} 
                    style={{ padding: '20px 40px', background: C.purple, color: '#fff', border: 'none', borderRadius: 20, fontWeight: 950, cursor: 'pointer', fontSize: 15, letterSpacing: '0.05em' }}
                >
                    {generating ? 'COMPILING...' : 'GENERATE BLUEPRINT'}
                </motion.button>
            </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
                { t: 'Meta Matrix', desc: 'Weighted Title & Description vector sets.', p: '100%', i: <Layout size={24} /> },
                { t: 'Semantic Core', desc: 'H1-H4 structural hierarchy mapping.', p: '92%', i: <FileText size={24} /> },
                { t: 'Link Topology', desc: 'Internal link flow & anchor pathing.', p: '85%', i: <Share2 size={24} /> }
            ].map((sec, i) => (
                <Card key={i} style={{ padding: 40 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: `${C.purple}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: C.purple }}>
                        {sec.i}
                    </div>
                    <h4 style={{ fontSize: 20, fontWeight: 950 }}>{sec.t}</h4>
                    <p style={{ fontSize: 15, color: C.textSec, marginTop: 12, lineHeight: 1.6, fontWeight: 800 }}>{sec.desc}</p>
                    <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.green }} />
                            <span style={{ fontSize: 12, fontWeight: 950, color: C.purple, letterSpacing: '0.05em' }}>READY</span>
                        </div>
                        <div style={{ fontSize: 20, fontWeight: 950, color: C.text }}>{sec.p}</div>
                    </div>
                </Card>
            ))}
        </div>

        <AnimatePresence>
            {content && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <Card style={{ marginTop: 32, padding: 0 }}>
                        <div style={{ padding: 32, borderBottom: `1px solid ${C.border}`, background: `${C.surf}40` }}>
                            <h3 style={{ fontSize: 18, fontWeight: 950 }}>Generated Protocol Guidance</h3>
                        </div>
                        <pre style={{ background: 'transparent', padding: 40, color: C.text, fontSize: 15, whiteSpace: 'pre-wrap', fontFamily: 'monospace', lineHeight: 1.8 }}>
                            {content}
                        </pre>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
  );

  return (
    <div style={{ padding: "40px 48px", background: C.bg, minHeight: '100%' }}>
      <div style={{ marginBottom: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
           <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
             <div style={{ width: 40, height: 40, borderRadius: 12, background: `${C.cyan}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Command size={22} color={C.cyan} />
             </div>
             <span style={{ fontSize: 13, fontWeight: 900, color: C.cyan, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {mode === "seowrite" ? "Linguistic Intelligence Editor" : mode === "topic" ? "Topic Discovery Engine" : "Structural Architecture Nexus"}
             </span>
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 950, color: C.text, letterSpacing: '-0.05em' }}>{domain || 'GLOBAL NODE'}</h1>
        </div>
        
        <div style={{ display: 'flex', gap: 16, width: '100%', maxWidth: 500 }}>
            <div style={{ flex: 1, position: 'relative' }}>
                <Search size={20} color={C.textMuted} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    placeholder="Focus Keyword/Topic..."
                    style={{ width: '100%', background: C.card, border: `1px solid ${C.border}`, padding: '18px 24px 18px 56px', borderRadius: 20, color: C.text, fontSize: 16, outline: 'none', fontWeight: 700, transition: '0.3s' }}
                />
            </div>
            {mode !== "seowrite" && (
                <motion.button 
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={handleGenerate} disabled={generating} 
                    style={{ padding: '0 32px', background: C.cyan, color: '#000', border: 'none', borderRadius: 20, fontWeight: 950, cursor: 'pointer', fontSize: 14, letterSpacing: '0.05em' }}>
                    {generating ? 'SYNCING...' : 'INITIATE'}
                </motion.button>
            )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {generating ? (
          <motion.div 
            key="gen"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ height: 190, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24 }}
          >
              <motion.div animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 64, height: 64, border: `4px solid ${C.cyan}20`, borderTopColor: C.cyan, borderRadius: 20 }} />
              <p style={{ fontWeight: 950, color: C.textMuted, letterSpacing: '0.2em', fontSize: 13 }}>SYNTHESIZING TOPIC VECTORS...</p>
          </motion.div>
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {mode === "seowrite" && renderWritingAssistantUI()}
            {mode === "topic" && renderTopicResearchUI()}
            {mode === "seotempl" && renderTemplateUI()}
            {!content && !generating && mode !== "seowrite" && (
                <Card style={{ padding: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', textAlign: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: 24, background: `${C.cyan}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                        <Wand2 size={40} color={C.cyan} />
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 950 }}>Initialize Semantic Synthesis</h3>
                    <p style={{ fontSize: 16, color: C.textMuted, marginTop: 12, maxWidth: 400 }}>Deploy a strategic topic vector above to begin deconstructing market density and building authority.</p>
                </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>

        {/* ADDED NEW ELEMENTS */}
        <PredictiveAnalytics 
          onTriggerInsight={onTriggerInsight} 
          data={[
            {
              title: "Traffic Market Analysis",
              description: `Content production is projected to unlock 18% more market share in "unmet needs" keyword clusters.`,
              metric: "+18%",
              trend: [12, 13, 15, 14, 16, 17, 18, 19, 21, 20, 22],
              type: "forecast",
              color: C.cyan,
              icon: Target
            },
            {
              title: "Authority Consistency",
              description: "Semantic topic coverage maintains a 91% authority score against top-ranking industry benchmarks.",
              metric: 91,
              type: "integrity",
              color: C.purple,
              icon: Shield
            }
          ]}
        />
    </div>
  );
} 