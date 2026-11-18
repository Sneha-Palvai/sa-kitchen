// Offline support for S&A Kitchen.
// Change the version below whenever you upload new app files, so phones update quickly.
const CACHE = 'sa-kitchen-v2';
const CORE = ['./', './index.html', './foods.js', './recipes.js', './core.js', './app.js', './backend.js', './manifest.webmanifest', './icon-180.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
function withTimeout(p, ms) {
  return new Promise((res, rej) => { const t = setTimeout(() => rej(new Error('timeout')), ms); p.then(r => { clearTimeout(t); res(r); }, e => { clearTimeout(t); rej(e); }); });
}
function saveCopy(req, res) { if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; }
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // App files: network first for updates, saved copy when offline.
  if (url.origin === self.location.origin) {
    e.respondWith(withTimeout(fetch(req), 3000).then(r => saveCopy(req, r)).catch(() => caches.match(req).then(m => m || caches.match('./index.html'))));
    return;
  }
  // Firebase library files (fixed version) and fonts: saved copy first.
  if ((url.hostname === 'www.gstatic.com' && url.pathname.startsWith('/firebasejs/')) || url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.match(req).then(m => m || fetch(req).then(r => saveCopy(req, r))));
  }
  // Everything else (the database itself) goes straight to the network.
});
