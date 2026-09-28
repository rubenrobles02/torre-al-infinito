// Renders the Play Store feature graphic (1024x500) in Spanish and English.
import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';
import { featureGraphic } from './art.mjs';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const fonts = 'file:///' + path.resolve('vendor/fonts/fonts.css').split(path.sep).join('/');
for (const lang of ['es', 'en']) {
  const html = path.resolve(process.env.TEMP, `feature-${lang}.html`), out = path.resolve('store/graphics', `grafico-destacado-${lang}.png`);
  fs.writeFileSync(html, `<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="${fonts}"><style>html,body{margin:0}svg{display:block}</style>${featureGraphic(lang)}`);
  execFileSync(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=1024,500', '--virtual-time-budget=3000', `--screenshot=${out}`,
    '--allow-file-access-from-files', `--user-data-dir=${process.env.TEMP}/edge-feature`, 'file:///' + html.split(path.sep).join('/')], { stdio: 'ignore' });
  console.log('wrote', out);
}
