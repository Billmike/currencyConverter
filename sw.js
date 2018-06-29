// const cacheName = 'currencyConverter-v2';
// const dataCacheName = 'converted-cache-v4';
// const filesToCache = [
//   '/app.js',
//   '/index.html',
//   '/styles.css'
// ];

// self.addEventListener('install', (event) => {
//   console.log('[Service worker is installed]', event.request.url);
//   event.waitUntil(
//     caches.open(cacheName).then((cache) => {
//       console.log('[Service worker] caching shell.');
//       return cache.addAll(filesToCache);
//     })
//   )
// });

// self.addEventListener('activate', (event) => {
//   console.log('[ServiceWorker] Activate');
//   event.waitUntil(
//     caches.keys().then((keyList) => {
//       return Promise.all(keyList.map((key) => {
//         if (key !== cacheName && key !== dataCacheName) {
//           console.log('[ServiceWorker] Removing old cache', key);
//           return caches.delete(key);
//         }
//       }));
//     })
//   );
//   return self.clients.claim();
// });

// self.addEventListener('fetch', (event) => {
//   console.log('[ServiceWorker] Fetch----', event.request.url);
//   const fromCurrencyOption = document.getElementById("fromCurrency");
//   const toCurrencyOption = document.getElementById("toCurrency");

//   const fromCurrencyValue = fromCurrencyOption.options[fromCurrencyOption.selectedIndex].text;
//   const toCurrencyValue = toCurrencyOption.options[toCurrencyOption.selectedIndex].text;

//   const trimmedFromCurrencyValue = fromCurrencyValue.split(" ")[1].slice(1, -1);
//   const trimmedToCurrencyValue = toCurrencyValue.split(" ")[1].slice(1, -1);

//   const query = `${trimmedFromCurrencyValue}_${trimmedToCurrencyValue}`;
//   const currencyURL = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=y`;
//   console.log('>>>>>>', event.request.url.indexOf())
//   if (event.request.url.indexOf() > -1) {
//     event.respondWith(
//       caches.open(dataCacheName).then((cache) => {
//         return fetch(event.request).then((response) => {
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       })
//     );
//   } else {
//     event.respondWith(caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     }))
//   }
// });
