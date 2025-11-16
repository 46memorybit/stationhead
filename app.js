// app.js

const STATIONHEAD_URL = "https://www.stationhead.com/c/buddies";

window.addEventListener("load", () => {
  initApp();
  registerServiceWorker();
});

function initApp() {
  const container = document.querySelector(".iframe-container");
  const loading = document.getElementById("loading");

  // iframe 作成
  const iframe = document.createElement("iframe");
  iframe.src = STATIONHEAD_URL;
  iframe.allow =
    "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
  iframe.allowFullscreen = true;

  // 読み込み完了イベント
  iframe.addEventListener("load", () => {
    if (loading) {
      loading.classList.add("hidden");
    }
  });

  container.appendChild(iframe);

  // 設定例（今は固定URLだが、将来の拡張用）
  saveSetting("lastOpenedUrl", STATIONHEAD_URL);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("service-worker.js")
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
  }
}
