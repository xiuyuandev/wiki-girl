const fs = require('fs');
const c = fs.readFileSync(process.argv[2] || 'views/universal-scripts.js', 'utf8');
let d = 0, s = null, e = 0;
for (let i = 0; i < c.length; i++) {
  let ch = c[i];
  if (e) { e = 0; continue; }
  if (ch === '\\') { e = 1; continue; }
  if (s) { if (ch === s) s = null; continue; }
  if (ch === '"' || ch === "'" || ch === '`') { s = ch; continue; }
  if (ch === '(' || ch === '{' || ch === '[') d++;
  if (ch === ')' || ch === '}' || ch === ']') d--;
}
console.log('depth', d, 'string', s || 'ok');
