importScripts('/node_modules/workbox-sw/build/workbox-sw.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "be91561b75cae64d739d98b8dcf10cfb"
  },
  {
    "url": "styles/ud811.css",
    "revision": "4206d8b20299f8f3c56a8b55773caa9b"
  },
  {
    "url": "scripts/app.js",
    "revision": "ce9ea2232fc25e94be0ce5ed729e0b36"
  },
  {
    "url": "scripts/dexie.min.js",
    "revision": "58117347fa3eaec207482f5d117b966c"
  }
])


workbox.routing.registerRoute(
    new RegExp('.*\.svg'),
    workbox.strategies.networkFirst()
  );
  
  workbox.routing.registerRoute(
    ({url, event}) => {
      // Return true if the route should match
      if (url.href.startsWith("https://publicdata-weather.firebaseio.com/")) return true;
      return false;
    },
    workbox.strategies.networkFirst()
  );