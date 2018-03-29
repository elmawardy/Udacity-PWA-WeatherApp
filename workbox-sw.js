importScripts('/node_modules/workbox-sw/build/workbox-sw.js')
// Force production builds
// workbox.setConfig({ debug: false });


workbox.core.setCacheNameDetails({
  prefix: 'Weather',
  suffix: 'v1'
});


workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "8ef7f31e317b64d854233a04c3a9b9f5"
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
    "revision": "06737296393e812c1406d355510bba47"
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
  
  workbox.strategies.networkFirst({
          // Use a custom cache for this route
          cacheName: 'json-response',
          // Add an array of custom plugins (like workbox.expiration.Plugin)
          plugins: []
    })
  );


  // custom response
  workbox.routing.registerRoute(
    new RegExp('.*\.png'),
    ({url, event}) => {
      return fetch('./images/clear.png')
    }
  )

  workbox.routing.registerRoute(
    'https://code.jquery.com/jquery-3.3.1.min.js',
    workbox.strategies.staleWhileRevalidate()
  );


// // One thing to note is that if you return a value in the match callback, it’ll be passed into the handler callback as a params argument.
  // workbox.routing.registerRoute(
  //     ({url, event}) => {
  //       return {
  //         name: 'Workbox',
  //         type: 'guide',
  //       };
  //     },
  //     ({url, event, params}) => {
  //       // Response will be “A guide on Workbox”
  //     return new Response(
  //       `A ${params.type} on ${params.name}`
  //     );
  //   }
  // );



// //You can customize the entire cache name by parsing in a precache and / or runtime parameter.

// workbox.core.setCacheNameDetails({
//   prefix: 'my-app',
//   suffix: 'v1',
//   precache: 'custom-precache-name',
//   runtime: 'custom-runtime-name'
// });

