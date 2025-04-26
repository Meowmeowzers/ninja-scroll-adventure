const cacheName = "Meowmeowzers-NinjaScrollAdventure-1.0";
const contentToCache = [
    "Build/7a2dbded24d57e056180125b1583e7c4.loader.js",
    "Build/34c2fb9bcf40528b41ad5f26188ad6e0.framework.js",
    "Build/95f02b2497df82c9b1b314b30d25938d.data",
    "Build/87ccee1216e1c6c82fb9fed82ce3dda9.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
