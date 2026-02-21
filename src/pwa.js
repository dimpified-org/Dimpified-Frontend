import { Workbox } from "workbox-window";

export function registerPWA() {
  if ("serviceWorker" in navigator) {
    const wb = new Workbox("/sw.js");

    wb.addEventListener("installed", (event) => {
      if (event.isUpdate) {
        console.log("App updated. Reload to see new content.");
        // Optional: Show a "Update available" notification
        if (confirm("New version available! Reload to update?")) {
          window.location.reload();
        }
      } else {
        console.log("App installed and cached for offline use.");
      }
    });

    wb.addEventListener("controlling", () => {
      window.location.reload();
    });

    wb.register();
  }
}

export function unregisterPWA() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}