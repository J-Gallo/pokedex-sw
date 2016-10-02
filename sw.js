var versionCache = 'v3';

var urlsCache = [
  '/',
  '/src/js/test.js',
  '/statics/default/images/1.jpg',
  '/statics/default/images/2.jpg',
  '/statics/default/images/3.jpg',
  '/statics/default/images/4.jpg',
  '/statics/default/images/5.jpg',
  '/statics/default/images/6.jpg'
];

self.addEventListener('install', function(event) {
  console.log('install J');
  self.skipWaiting();

  event.waitUntil(
      caches.open(versionCache).then(function(cache) {
        console.log('Final del install', cache);
          return cache.addAll(urlsCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log('activate J');
  event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != versionCache) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(function() {
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', function(event) {
  console.log('fetch');
  if (isValidUrl(event.request.url)) {
      event.respondWith(
          caches.open(versionCache).then(function(cache) {
            console.log(cache);
              return cache.match(event.request).then(function(response) {
                  return response || fetch(event.request).then(function(response) {
                      cache.put(event.request, response.clone());
                      return response;
                  });
              });
          })
      );
  }
});

function isValidUrl(url) {
    for (var index in urlsCache) {
        var tmpUrl = urlsCache[index];

        if (isUrl(tmpUrl)) {
            if (url == tmpUrl) {
                return true;
            }
        } else {
            if (parseUrl(url) == tmpUrl) {
                return true;
            }
        }
    }

    return false;
}

function parseUrl(url) {
    var splitUrl = url.split('/'),
        stringUrl = '';

    for (var i = 3; i < splitUrl.length; i++) {
        stringUrl += '/' + splitUrl[i];
    }

    return stringUrl;
}

function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(s);
}
