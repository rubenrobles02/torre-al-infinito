// One-off: keeps the latin subsets of the Google Fonts CSS and stores the font files locally,
// so the Android app works offline. Run: node scripts/vendor-fonts.mjs
import fs from 'node:fs';
const src = fs.readFileSync('vendor/fonts/fonts.src.css', 'utf8');
const blocks = src.split(/(?=\/\* [a-z-]+ \*\/)/).filter(b => /^\/\* latin(-ext)? \*\//.test(b));
let css = '', i = 0;
for (const b of blocks) {
  const url = b.match(/url\((https:[^)]+)\)/)[1];
  const fam = b.match(/font-family: '([^']+)'/)[1].replace(/\s+/g, '');
  const wt = b.match(/font-weight: (\d+)/)[1];
  const sub = b.startsWith('/* latin-ext') ? 'latin-ext' : 'latin';
  const file = `${fam}-${wt}-${sub}.woff2`;
  const res = await fetch(url);
  fs.writeFileSync(`vendor/fonts/${file}`, Buffer.from(await res.arrayBuffer()));
  css += b.replace(url, file); i++;
}
fs.writeFileSync('vendor/fonts/fonts.css', css);
fs.unlinkSync('vendor/fonts/fonts.src.css');
console.log(`${i} font files saved`);
