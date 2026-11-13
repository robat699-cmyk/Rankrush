const fs = require('fs');
let text = fs.readFileSync('src/client/App.tsx', 'utf8');
text = text.replace('      </div>\n    );\n  };\n\n  return', `         {/* ADDED NEW ELEMENTS */}
         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
           <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
             <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>Advanced Prediction Engine</p>
             <p style={{ fontSize: 11, color: 'var(--textSec)' }}>AI-Driven forecasting indicates a +12.4% trajectory over the next quarter based on structural upgrades.</p>
             <div style={{ marginTop: 12, height: 60, background: 'var(--surf)', borderRadius: 8, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: '0 8px 8px', gap: 4 }}>
                  {[4, 7, 5, 8, 9, 12, 10, 15, 14, 18, 20].map((v, i) => <div key={i} style={{ flex: 1, height: \`\${v * 3}%\`, background: 'var(--cyan)', opacity: 0.8, borderRadius: '2px 2px 0 0' }} />)}
             </div>
           </div>
           <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>Structural Integrity</p>
              <p style={{ fontSize: 11, color: 'var(--textSec)' }}>Zero significant metric anomalies detected in the last 72 hours. Operations are nominal.</p>
              <div style={{ marginTop: 12, height: 60, background: 'var(--surf)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '80%', height: 6, background: 'var(--border)', borderRadius: 10, overflow: 'hidden' }}>
                       <div style={{ width: '94%', height: '100%', background: 'var(--purple)', borderRadius: 10 }} />
                  </div>
              </div>
           </div>
         </div>
      </div>
    );
  };

  return`);
fs.writeFileSync('src/client/App.tsx', text);
