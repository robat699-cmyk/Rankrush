const fs = require('fs');
let code = fs.readFileSync('src/client/components/AdminDashboard.tsx', 'utf8');

const terminateButton = `
              <button 
                onClick={() => {
                   if(confirm("Terminate subscription? All neural agents will be downgraded to basic tier.")) {
                     setActivePlan('Basic Plus');
                     onTriggerInsight("Subscription Termination", "Cluster plan downgraded. Priming resources for migration.");
                   }
                }}
                style={{ flex: 0.5, padding: '16px', background: C.surf, color: C.text, border: '1px solid ' + C.border, borderRadius: 16, fontWeight: 900, cursor: 'pointer' }}
              >TERMINATE</button>
`;

// Replace the specific TERMINATE button
// It has backticks in the style, so I'll be careful again
code = code.replace(/<button style={{ flex: 0\.5, padding: '16px', background: C\.surf, color: C\.text, border: `1px solid \${C\.border}`, borderRadius: 16, fontWeight: 900, cursor: 'pointer' }}>TERMINATE<\/button>/, terminateButton);

fs.writeFileSync('src/client/components/AdminDashboard.tsx', code);
