// 캐시 이름입니다. 파일을 크게 바꿨을 때 숫자를 올리면 새 캐시를 만들 수 있습니다.
const CACHE_NAME = "today-sea-fortune-v2";

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
    })
  );
});

// 앱에서 파일을 요청할 때 캐시에 있으면 캐시 파일을 먼저 보여줍니다.
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request);
    })
  );
});
