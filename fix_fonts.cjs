const fs = require('fs');
const content = fs.readFileSync('src/client/App.tsx', 'utf8');
const modified = content
  .replace(/fontSize: 7\.5/g, 'fontSize: 10')
  .replace(/fontSize: 10\.5/g, 'fontSize: 13')
  .replace(/fontSize: 10, color: activeItem/g, 'fontSize: 12, color: activeItem')
  .replace(/fontSize: 12, color: isActive \? C\.cyan : C\.textSec/g, 'fontSize: 15, color: isActive ? C.cyan : C.textSec');
fs.writeFileSync('src/client/App.tsx', modified);
