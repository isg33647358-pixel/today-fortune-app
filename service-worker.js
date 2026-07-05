// 캐시 이름입니다. 파일을 크게 바꿨을 때 숫자를 올리면 새 캐시를 만들 수 있습니다.
const CACHE_NAME = "today-sea-fortune-v3";

// 오프라인에서도 열리도록 저장해 둘 파일 목록입니다.
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// 서비스 워커가 설치될 때 기본 파일들을 캐시에 저장합니다.
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return Promise.all(
        FILES_TO_CACHE.map(function (file) {
          return cache.add(file).catch(function () {
            // 아이콘 파일이 아직 없을 수도 있으므로, 실패해도 설치를 계속합니다.
            return null;
          });
        })
      );
    })
  );

  // 새 서비스 워커가 설치되면 기다리지 않고 바로 적용되게 합니다.
  self.skipWaiting();
});

// 오래된 캐시가 있으면 정리합니다.
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }

          return null;
        })
      );
    }).then(function () {
      // 이미 열린 화면에도 새 서비스 워커가 바로 적용되게 합니다.
      return self.clients.claim();
    })
  );
});

// 앱에서 파일을 요청할 때 최신 파일을 먼저 가져오고, 실패하면 캐시를 보여줍니다.
self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).then(function (networkResponse) {
      const responseClone = networkResponse.clone();

      caches.open(CACHE_NAME).then(function (cache) {
        cache.put(event.request, responseClone);
      });

      return networkResponse;
    }).catch(function () {
      return caches.match(event.request);
    })
  );
});
