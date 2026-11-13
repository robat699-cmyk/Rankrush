const fs = require('fs');
let code = fs.readFileSync('src/client/components/AdminDashboard.tsx', 'utf8');

const newButton = `
           <button onClick={() => {
             const name = prompt("Enter agent name:");
             const email = prompt("Enter agent email:");
             if(name && email) {
               setUsers([...users, { id: String(Date.now()), name, email, role: 'user', plan: 'Basic Plus', status: 'active', joined: new Date().toISOString().split('T')[0] }]);
               onTriggerInsight("Agent Provisioning", \`Provisioned new neural agent: \${name}\`);
             }
           }} style={{ background: C.cyan, color: "#fff", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 13, fontWeight: 900, cursor: "pointer", boxShadow: '0 4px 15px ' + C.cyan + '30' }}>PROVISION NEURAL AGENT+ </button>
`;

// Replace the specific problematic button
code = code.replace(/<button style={{ background: C.cyan, color: "#fff", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 13, fontWeight: 900, cursor: "pointer", boxShadow: `([^`]+)` }}>PROVISION NEURAL AGENT\+ <\/button>/, newButton);

fs.writeFileSync('src/client/components/AdminDashboard.tsx', code);
