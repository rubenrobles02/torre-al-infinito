// Renders the SVG artwork to PNG files with headless Edge.
import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';
import { iconForeground, iconBackground, iconFull, splash } from './art.mjs';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const tmp = path.resolve(process.env.TEMP, 'torre-art'); fs.mkdirSync(tmp, { recursive: true });
function png(svg, w, h, out, transparent = false) {
  const html = path.join(tmp, path.basename(out) + '.html');
  fs.writeFileSync(html, `<!doctype html><style>html,body{margin:0;background:${transparent ? 'transparent' : '#17181c'}}svg{display:block}</style>${svg}`);
  execFileSync(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--window-size=${w},${h}`, `--screenshot=${path.resolve(out)}`,
    ...(transparent ? ['--default-background-color=00000000'] : []), `--user-data-dir=${tmp}/prof`, 'file:///' + html.split(path.sep).join('/')], { stdio: 'ignore' });
  console.log('wrote', out);
}
fs.mkdirSync('assets', { recursive: true }); fs.mkdirSync('store/graphics', { recursive: true });
png(iconForeground(1024), 1024, 1024, 'assets/icon-foreground.png', true);
png(iconBackground(1024), 1024, 1024, 'assets/icon-background.png');
png(iconFull(1024), 1024, 1024, 'assets/icon-only.png');
png(splash(2732), 2732, 2732, 'assets/splash.png');
png(splash(2732), 2732, 2732, 'assets/splash-dark.png');
png(iconFull(512), 512, 512, 'store/graphics/icono-512.png');
