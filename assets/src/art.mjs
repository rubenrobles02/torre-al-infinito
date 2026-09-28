// Artwork for the app icon, splash and store graphics as SVG strings.
const stars = (n, w, h, seed = 7) => { let s = seed, out = ''; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < n; i++) out += `<circle cx="${(r() * w).toFixed(0)}" cy="${(r() * h).toFixed(0)}" r="${(0.8 + r() * 2.4).toFixed(1)}" fill="#fff" opacity="${(0.35 + r() * 0.6).toFixed(2)}"/>`; return out; };
// A stacked tower: each floor a bit narrower and offset, like a real game of Tower to Infinity.
function tower(cx, baseY, fh, widths, offsets) {
  const styles = [['#d6d2c8', '#3f5670'], ['#6f8fae', '#dbe8f3'], ['#b0654a', '#f1ede4']];
  let y = baseY, g = '';
  widths.forEach((w, i) => {
    const x = cx - w / 2 + offsets[i], [wall, win] = styles[Math.floor(i / 2) % 3];
    g += `<rect x="${x}" y="${y - fh}" width="${w}" height="${fh}" fill="${wall}"/>`;
    g += `<rect x="${x}" y="${y - fh * 0.16}" width="${w}" height="${fh * 0.16}" fill="#000" opacity=".18"/>`;
    const n = Math.max(2, Math.round(w / 58)), cw = w / n;
    for (let k = 0; k < n; k++) g += `<rect x="${x + k * cw + cw * 0.2}" y="${y - fh * 0.8}" width="${cw * 0.6}" height="${fh * 0.5}" rx="3" fill="${win}"/>`;
    y -= fh;
  });
  return { g, top: y };
}
export function iconForeground(size = 1024) {
  const t = tower(512, 800, 70, [430, 400, 372, 344, 318, 292], [0, 8, -4, 10, 2, -6]);
  const blockY = t.top - 128, bw = 270;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1024 1024">
    ${t.g}
    <line x1="512" y1="120" x2="512" y2="${blockY - 34}" stroke="#2b2b2b" stroke-width="7"/>
    <rect x="490" y="${blockY - 44}" width="44" height="26" rx="4" fill="#ffc21a"/>
    <path d="M512 ${blockY - 20} L${512 - bw / 2 + 10} ${blockY} M512 ${blockY - 20} L${512 + bw / 2 - 10} ${blockY}" stroke="#2b2b2b" stroke-width="5"/>
    <rect x="${512 - bw / 2}" y="${blockY}" width="${bw}" height="70" fill="#ffc21a"/>
    <rect x="${512 - bw / 2}" y="${blockY + 58}" width="${bw}" height="12" fill="#b3830a"/>
    ${[0, 1, 2, 3].map(k => `<rect x="${512 - bw / 2 + 18 + k * 64}" y="${blockY + 14}" width="40" height="34" rx="3" fill="#6b4d06" opacity=".55"/>`).join('')}
  </svg>`;
}
export function iconBackground(size = 1024) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1024 1024">
    <defs><radialGradient id="g" cx="50%" cy="30%" r="80%"><stop offset="0" stop-color="#27305a"/><stop offset=".55" stop-color="#141830"/><stop offset="1" stop-color="#0a0b12"/></radialGradient>
    <pattern id="hz" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="40" height="80" fill="#ffc21a"/><rect x="40" width="40" height="80" fill="#17181c"/></pattern></defs>
    <rect width="1024" height="1024" fill="url(#g)"/>${stars(70, 1024, 760)}
    <rect y="800" width="1024" height="224" fill="url(#hz)"/>
  </svg>`;
}
export function iconFull(size = 1024) { // legacy / store icon: background + foreground
  return iconBackground(size).replace('</svg>', iconForeground(size).replace(/^<svg[^>]*>/, '').replace('</svg>', '') + '</svg>');
}
export function splash(size = 2732) {
  const fg = iconForeground(1024).replace(/^<svg[^>]*>/, '').replace('</svg>', '');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 2732 2732">
    <rect width="2732" height="2732" fill="#17181c"/>${stars(160, 2732, 2732, 3)}
    <g transform="translate(${1366 - 400} ${1366 - 460}) scale(0.78)">${fg}</g>
  </svg>`;
}
export function featureGraphic(lang) { // 1024 x 500 banner for the Play Store listing
  const [a, b, c] = lang === 'es'
    ? ['TORRE', 'AL INFINITO', 'Construye desde la ciudad hasta otra dimensión']
    : ['TOWER', 'TO INFINITY', 'Build from the city to another dimension'];
  const fg = iconForeground(1024).replace(/^<svg[^>]*>/, '').replace('</svg>', '');
  const planet = (x, y, r, c1, c2) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#p${x})"/><defs><radialGradient id="p${x}" cx="35%" cy="35%" r="70%"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient></defs>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="500" viewBox="0 0 1024 500">
    <defs><linearGradient id="sky" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#4a6fae"/><stop offset=".45" stop-color="#10306f"/><stop offset="1" stop-color="#03040c"/></linearGradient>
    <pattern id="hz" width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="18" height="36" fill="#ffc21a"/><rect x="18" width="18" height="36" fill="#17181c"/></pattern>
    <linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="#0c0d10" stop-opacity=".92"/><stop offset=".45" stop-color="#0c0d10" stop-opacity=".55"/><stop offset=".7" stop-color="#0c0d10" stop-opacity="0"/></linearGradient></defs>
    <rect width="1024" height="500" fill="url(#sky)"/>${stars(90, 1024, 300, 11)}
    ${planet(930, 90, 46, '#f0dfb0', '#8a6a3a')}<ellipse cx="930" cy="90" rx="84" ry="16" fill="none" stroke="#e8d7a8" stroke-width="5" opacity=".8" transform="rotate(-14 930 90)"/>
    ${planet(640, 70, 22, '#ffb08a', '#8a3a1c')}
    <g transform="translate(560 -12) scale(0.5)">${fg}</g>
    <rect width="1024" height="500" fill="url(#fade)"/>
    <text x="56" y="205" font-family="Bungee, Impact, sans-serif" font-size="108" fill="#ffc21a">${a}</text>
    <text x="58" y="268" font-family="Bungee, Impact, sans-serif" font-size="52" fill="#f5f3ea">${b}</text>
    <text x="58" y="322" font-family="'Barlow Condensed', 'Arial Narrow', sans-serif" font-weight="600" font-size="30" fill="#dcd9cd">${c}</text>
    <rect y="484" width="1024" height="16" fill="url(#hz)"/>
  </svg>`;
}
