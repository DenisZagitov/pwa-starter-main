importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js'
);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

// Уведомления через service worker
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Уведомление";
  const options = {
    body: data.body || "Текст уведомления",
    icon: 'assets/icons/192x192.png',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
