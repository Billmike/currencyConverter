const cacheName = 'new-currency-converter';
const dataCacheName = 'converted-cache-v6';
const filesToCache = [
  './app.js',
  './index.html',
  './styles.css',
  './idb.js'
];


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[Service worker] caching shell.');
      return cache.addAll(filesToCache);
    })
  )
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(returnedResponse => {
          if (!returnedResponse || returnedResponse.status !== 200 || returnedResponse.type !== 'basic') {
            return returnedResponse;
          }
          const currencyResponseToCache = returnedResponse.clone();

          caches.open(cacheName).then(cache => {
            cache.put(event.request, currencyResponseToCache);
          })
          return returnedResponse;
        })
      }
    )
  );
});
