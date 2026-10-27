const CACHE = "qp-v2";
// Relative to this script, so everything stays under /workouts/.
const SCOPE = self.registration.scope;
const SHELL = ["./", "index.html", "styles.css", "app.js", "exercises.js", "manifest.webmanifest", "icons/icon.svg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith("qp-") && k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});

// Network first so deploys show up straight away; cache is the offline fallback.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || !e.request.url.startsWith(SCOPE)) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match(SCOPE)))
  );
});

self.addEventListener("push", (e) => {
  let data = {};
  try { data = e.data?.json() ?? {}; } catch {}
  e.waitUntil(self.registration.showNotification(data.title || "Time to move 💪", {
    body: data.body || "5 minutes. Up you get.",
    icon: SCOPE + "icons/icon-192.png",
    badge: SCOPE + "icons/icon-192.png",
    tag: "workout",
    renotify: true,
    data: { url: SCOPE },
  }));
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    const win = wins.find((w) => w.url.startsWith(SCOPE));
    if (win) return win.focus();
    return self.clients.openWindow(e.notification.data?.url || SCOPE);
  })());
});
