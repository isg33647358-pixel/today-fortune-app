// 서비스 워커 버전입니다. 문제가 생겼을 때 숫자를 올리면 새 버전으로 인식됩니다.
const CACHE_NAME = "today-sea-fortune-v4";

// 서비스 워커가 설치될 때 바로 새 버전을 사용하게 합니다.
self.addEventListener("install", function (event) {
  self.skipWaiting();
});

// 기존 캐시를 모두 지우고 새 서비스 워커를 바로 적용합니다.
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// 현재는 로딩 문제를 막기 위해 브라우저의 기본 네트워크 요청을 그대로 사용합니다.
// 나중에 안정화되면 오프라인 캐시 기능을 다시 추가할 수 있습니다.
self.addEventListener("fetch", function (event) {
  return;
});
