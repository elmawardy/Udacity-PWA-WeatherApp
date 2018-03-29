importScripts('/node_modules/workbox-sw/build/workbox-sw.js')

workbox.precaching.precacheAndRoute([])


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

  workbox.routing.registerRoute(
    'https://code.jquery.com/jquery-3.3.1.min.js',
    workbox.strategies.staleWhileRevalidate()
  );