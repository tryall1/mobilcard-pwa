const CACHE = 'mobilcard-v17';
const ASSETS = ['./', './index.html', './qr.svg', './manifest.webmanifest', './icon-180.png', './icon-512.png', './logo.png', './qr-ilia.svg', './icon-chip.svg', './icon-ticket.svg', './icon-settings.svg'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
