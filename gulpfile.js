var gulp = require('gulp');
var path = require('path');
var swPrecache = require('./node_modules/sw-precache/lib/sw-precache.js');

var DEV_DIR = '.';

gulp.task('swdev', function(callback) {
    writeServiceWorkerFile(DEV_DIR, true, callback);
});

function writeServiceWorkerFile(rootDir, handleFetch, callback) {
  var config = {
    cacheId: 'WeatherApp-2',
    /*
    dynamicUrlToDependencies: {
      'dynamic/page1': [
        path.join(rootDir, 'views', 'layout.jade'),
        path.join(rootDir, 'views', 'page1.jade')
      ],
      'dynamic/page2': [
        path.join(rootDir, 'views', 'layout.jade'),
        path.join(rootDir, 'views', 'page2.jade')
      ]
    },
    */
    // If handleFetch is false (i.e. because this is called from generate-service-worker-dev), then
    // the service worker will precache resources but won't actually serve them.
    // This allows you to test precaching behavior without worry about the cache preventing your
    // local changes from being picked up during the development cycle.
    handleFetch: handleFetch,
    runtimeCaching: [{
      // See https://github.com/GoogleChrome/sw-toolbox#methods
      urlPattern: /https:\/\/publicdata-weather\.firebaseio\.com\/*/,
      handler: 'fastest',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: null,
          name: 'runtime-cache'
        }
      }
    },{
      // See https://github.com/GoogleChrome/sw-toolbox#methods
      urlPattern: /https:\/\/code\.jquery\.com\/*/,
      handler: 'fastest',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: null,
          name: 'runtime-cache'
        }
      }
    }],
    staticFileGlobs: [
      rootDir + '/styles/**.css',
      rootDir + '/index.html',
      rootDir + '/images/**.*',
      rootDir + '/scripts/**.js'
    ],
    stripPrefix: rootDir + '/',
    // verbose defaults to false, but for the purposes of this demo, log more.
    verbose: true
  };

  swPrecache.write(path.join(rootDir, 'sw.js'), config, callback);

}





