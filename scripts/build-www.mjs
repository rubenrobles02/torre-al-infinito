// Builds www/ for the Android app from index.html: swaps the CDN script and Google Fonts
// for the local copies in vendor/ (the app must work offline) and adds a proper doctype.
import fs from 'node:fs';
let html = fs.readFileSync('index.html', 'utf8');
const swap = (from, to) => { if (!html.includes(from)) throw new Error('Not found in index.html: ' + from); html = html.replace(from, to); };
swap('<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>', '<script src="vendor/three.min.js"></script>');
html = html.replace(/<link rel="preconnect"[^>]*>\r?\n/g, '');
html = html.replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/, '<link rel="stylesheet" href="vendor/fonts/fonts.css">');
if (/https:\/\/(cdnjs|fonts\.googleapis)/.test(html)) throw new Error('A remote resource is still referenced');
html = '<!doctype html>\n<meta charset="utf-8">\n' + html;
fs.rmSync('www', { recursive: true, force: true });
fs.mkdirSync('www/vendor', { recursive: true });
fs.writeFileSync('www/index.html', html);
fs.cpSync('vendor', 'www/vendor', { recursive: true });
console.log('www/ ready');
