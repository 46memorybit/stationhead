// service-worker.js

const CACHE_NAME = "buddies-pwa-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./app.js",
  "./db.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
  // Stationhead 本体は外部ドメイン & CORS などのためキャッシュしない
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // 自サイトのファイルだけキャッシュ優先で返す
  if (request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        return (
          cached ||
          fetch(request).catch(() => {
            // オフライン時に navigate リクエストなら index.html にフォールバック
            if (request.mode === "navigate") {
              return caches.match("./index.html");
            }
          })
        );
      })
    );
  }
});
