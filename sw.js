const cacheName = 'new-currency-converter';
const dataCacheName = 'converted-cache-v6';
const filesToCache = [
  '/app.js',
  '/index.html',
  '/styles.css',
  '/idb.js'
];

self.addEventListener('install', (event) => {
  console.log('[Service worker is installed]');
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[Service worker] caching shell.');
      return cache.addAll(filesToCache);
    })
  )
});

self.addEventListener('fetch', (event) => {
  console.log(">>>>>>>>>", event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
