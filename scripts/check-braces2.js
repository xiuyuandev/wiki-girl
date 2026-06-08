const fs = require('fs');
const src = fs.readFileSync(process.argv[2], 'utf8');
let depth = 0, inString = false, stringChar = '', line = 1;
for (let i = 0; i < src.length; i++) {
  const ch = src[i];
  const prev = src[i-1];
  if (ch === '\n') line++;
  if (!inString && (ch === '"' || ch === "'" || ch === '`')) {
    inString = true; stringChar = ch;
  } else if (inString && ch === stringChar && prev !== '\\') {
    inString = false;
  } else if (!inString) {
    if (ch === '{') { depth++; if (depth === 1) console.log('Open at line', line); }
    if (ch === '}') { if (depth === 1) console.log('Close at line', line); depth--; }
  }
}
console.log('Final depth:', depth);
