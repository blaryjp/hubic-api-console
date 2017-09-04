importScripts('serviceworker-cache-polyfill.js');

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('airhorner').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/home.html',
                '/home-hubic.html',
                '/home-ovh.html',
                '/hubic-home.html',
                '/about.html',
                '/about-ovh.html',
                '/about-hubic.html',
                '/ng-hubic.js',
                '/app.js',

            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {

    console.log(event.request.url);

    event.respondWith(

        caches.match(event.request).then(function(response) {

            return response || fetch(event.request);

        })

    );

});
