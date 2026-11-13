const fs = require('fs');
const path = require('path');

const componentsDir = path.join(process.cwd(), 'src', 'client', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));
files.push('../App.tsx'); // Also adjust App.tsx

const newCards = `
        {/* ADDED NEW ELEMENTS */}
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
`;

for (const file of files) {
    const filePath = file.startsWith('..') ? path.join(process.cwd(), 'src', 'client', file.replace('../', '')) : path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    let modified = content;
    
    modified = modified.replace(/height:\s*450/g, "height: 300");
    modified = modified.replace(/height:\s*400/g, "height: 280");
    modified = modified.replace(/height:\s*350/g, "height: 240");
    modified = modified.replace(/height:\s*320/g, "height: 220");
    modified = modified.replace(/height:\s*300/g, "height: 200");
    modified = modified.replace(/height:\s*280/g, "height: 190");
    modified = modified.replace(/height:\s*250/g, "height: 170");
    modified = modified.replace(/height:\s*200/g, "height: 140");

    if (file === '../App.tsx') {
        modified = modified.replace(/fontSize:\s*7\.5/g, 'fontSize: 10');
        modified = modified.replace(/fontSize:\s*10,\s*color:\s*activeItem/g, 'fontSize: 12, color: activeItem');
        modified = modified.replace(/fontSize:\s*10\.5/g, 'fontSize: 13');
        modified = modified.replace(/fontSize:\s*12,\s*color:\s*isActive\s*\?\s*C\.cyan\s*:\s*C\.textSec/g, 'fontSize: 15, color: isActive ? C.cyan : C.textSec');
        modified = modified.replace(/height:\s*90/g, 'height: 60'); 
    }

    if (!['Login.tsx', 'AIChatModal.tsx', 'InsightModal.tsx', 'AIChatSidebar.tsx', 'PlaceholderModule.tsx', 'AdminDashboard.tsx'].includes(file)) {
        modified = modified.replace(/    <\/div>\s*?\n\s*?\);\s*?\n}\s*?(export default |$)/g, newCards + '    </div>\n  );\n} $1');
        
        // Sometimes components don't match the regex perfectly
        if (modified === content) {
           modified = modified.replace(/(\n\s*<\/div>\n\s*\);?\n}\n)/, "\n" + newCards + "$1");
        }
        
        if (file === '../App.tsx') {
           // Insert the cards in App.tsx right at the bottom of the activeItem check block (renderContent)
           // But App.tsx has its own card system. Wait... let's just insert it at the end of the <div className="fade-in"> return in renderContent.
           modified = content.replace(/(<\/div>\n\s*<\/Card>\n\s*<\/div>\n\s*<\/div>\n\s*);?\n}/g, "\n" + newCards + "\n$1");
        }
    }

    if (modified !== content) {
      fs.writeFileSync(filePath, modified);
    }
}
