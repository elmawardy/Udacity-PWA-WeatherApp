var cacheName = 'weatherPWA-v2';
var filesToCache = ['/','index.html','/scripts/app.js?v=18','/styles/ud811.css'];
var baseURL = 'http://localhost:3030';

self.addEventListener('install',function (e){
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            return cache.addAll(filesToCache)
        })
    );
});

self.addEventListener('activate',function (e){
    e.waitUntil(
        caches.keys().then(function(keyList){
            return Promise.all(keyList.map(function (key){
                if (key !== cacheName){
                    return caches.delete(key);
                }
            }))
        })
    );
});


self.addEventListener('fetch',function (e){
    var url = e.request.url;
    var pending = true;
    console.log(url);
    if(url == `${baseURL}/index.html` || url == `${baseURL}/scripts/app.js?v=18` || url == `${baseURL}/` || url == `${baseURL}/styles/ud811.css`){
        console.log('[ServiceWorker] Fetch [Cache]',e.request.url);
        e.respondWith(
            caches.match(e.request)
        )
    }

    else if(url == `${baseURL}/content.js` || url.startsWith("https://publicdata-weather.firebaseio.com/") ){
        //go to the network for updates then cache response and return

        e.respondWith(
            caches.open(cacheName).then(function(cache){
                return cache.match(e.request).then(function (response){
                    // console.log('[ServiceWorker] Fetch [Cache]',e.request.url);
                    // console.log(response);
                    return response || fetch(e.request).then(function(response) {
                        cache.put(e.request, response.clone());
                        return response;
                    });
                })
            }).catch((err)=>{console.log(err)})
        )
    }

    else {
        e.respondWith(
            fetch(e.request)
        )
    }

    // e.respondWith(
    //     caches.match(e.request).then(function(response){
    //         return response || fetch(e.request);
    //     })
    // )
})