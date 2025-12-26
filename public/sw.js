self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('opinai-v1').then(cache => {
      return cache.addAll([
        '/',
        '/html/index.html',
        '/css/style.css',
        '/js/app.js'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});
