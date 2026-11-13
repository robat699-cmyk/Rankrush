import React from "react";
import { Cpu, ShieldCheck } from "lucide-react";

const C = { bg:'var(--bg)', surf:'var(--surf)', card:'var(--card)', border:'var(--border)', borderHov:'var(--borderHov)', cyan:'var(--cyan)', green:'var(--green)', red:'var(--red)', amber:'var(--amber)', purple:'var(--purple)', blue:'var(--blue)', text:'var(--text)', textSec:'var(--textSec)', textMuted:'var(--textMuted)' };

interface PredictiveData {
  title: string;
  description: string;
  metric: string | number;
  trend?: number[];
  type: "forecast" | "integrity";
  color?: string;
  icon?: React.ElementType;
}

interface PredictiveAnalyticsProps {
  onTriggerInsight?: (title: string, context?: string) => void;
  data?: PredictiveData[];
}

const PredictiveAnalytics = ({ onTriggerInsight, data }: PredictiveAnalyticsProps) => {
  const defaultData: PredictiveData[] = [
    {
      title: "Advanced Prediction Engine",
      description: "AI-Driven forecasting indicates a +12.4% trajectory over the next quarter based on structural upgrades.",
      metric: "+12.4%",
      trend: [4, 7, 5, 8, 9, 12, 10, 15, 14, 18, 20],
      type: "forecast",
      color: C.cyan,
      icon: Cpu
    },
    {
      title: "Structural Integrity",
      description: "Zero significant metric anomalies detected in the last 72 hours. Operations are nominal.",
      metric: "94%",
      type: "integrity",
      color: C.purple,
      icon: ShieldCheck
    }
  ];

  const displayData = data || defaultData;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
      {displayData.map((item, idx) => (
        <div 
          key={idx}
          onClick={() => onTriggerInsight?.(item.title, item.description)}
          style={{ 
            background: C.card, 
            border: `1px solid ${C.border}`, 
            borderRadius: 16, 
            padding: 20, 
            cursor: onTriggerInsight ? 'pointer' : 'default',
            transition: '0.2s transform, 0.2s border-color'
          }}
          onMouseEnter={e => { if(onTriggerInsight) { e.currentTarget.style.borderColor = item.color || C.cyan; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = 'none'; }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              {item.icon ? <item.icon size={18} color={item.color || C.cyan} /> : <Cpu size={18} color={item.color || C.cyan} />}
              <p style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{item.title}</p>
          </div>
          <p style={{ fontSize: 11, color: C.textSec, lineHeight: 1.5 }}>{item.description}</p>
          
          {item.type === "forecast" ? (
            <div style={{ marginTop: 16, height: 60, background: C.surf, borderRadius: 10, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: '0 8px 8px', gap: 4 }}>
                 {(item.trend || [4, 7, 5, 8, 9, 12, 10, 15, 14, 18, 20]).map((v, i) => (
                    <div key={i} style={{ flex: 1, height: `${v * 3}%`, background: item.color || C.cyan, opacity: 0.8, borderRadius: '2px 2px 0 0' }} />
                 ))}
            </div>
          ) : (
            <div style={{ marginTop: 16, height: 60, background: C.surf, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <div style={{ width: '80%', height: 6, background: C.border, borderRadius: 10, overflow: 'hidden' }}>
                      <div style={{ width: typeof item.metric === 'number' ? `${item.metric}%` : '94%', height: '100%', background: item.color || C.purple, borderRadius: 10 }} />
                 </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PredictiveAnalytics;
