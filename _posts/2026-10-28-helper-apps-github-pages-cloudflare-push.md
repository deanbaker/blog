---
title: "Tiny Helper Apps for $0: GitHub Pages, and Push Notifications from a Cloudflare Worker"
categories:
  - Blog
tags:
  - AI
  - Claude
  - GitHub Pages
  - Cloudflare
  - PWA
toc: true
hidden: false
---

> Drafted with AI assistance and reviewed by Dean.

I've started building small apps for an audience of one: me. Not products, not side hustles. Just little tools that do one job I'd otherwise do badly in my head.

Two of them live on this site:

- [Beginner Surf Check](/surf-check/) scores the next week of conditions across four Surf Coast beaches and tells me, in plain English, when it's worth paddling out.
- [Rep Snacks](/workouts/) pings my phone at quarter past every working hour with one five-minute bodyweight move or stretch. Squats, push-ups, a plank, a hip flexor stretch. Do it, skip it, or snooze it.

Both cost nothing to run. Both were built in an evening or two with Claude doing most of the typing. This post is how they're put together, and the one wall you hit as soon as you want your app to *tap you on the shoulder*.

## Why bother

There's a category of problem that's too small for a real app and too annoying to keep doing by hand. Reading four surf forecasts and doing the maths on wind direction. Remembering to get off my chair every hour while working from home.

The old trade-off was simple: building the thing took longer than putting up with the problem. AI flips that. I describe what I want, argue about the design for ten minutes, and then I'm reviewing and testing rather than writing boilerplate. The bottleneck moves from "can I be bothered building it" to "do I actually want it", which is a much better question to be stuck on.

## The cheap stack: a folder in the blog repo

This blog already runs on [GitHub Pages](/blog/host-a-blog-for-free-using-github-pages/) with Jekyll. The neat trick is that any folder in the repo that isn't Jekyll content gets published as-is. So an app is just:

```
blog/
  surf-check/
    index.html
  workouts/
    index.html
    app.js
    styles.css
    sw.js
    manifest.webmanifest
    icons/
```

No build step, no framework, no bundler. Plain HTML, CSS and JavaScript. `git push` and it's live at `dean-baker.com/workouts/` a minute later.

A few things make that enough for a surprising amount:

- **localStorage is your database.** Rep Snacks keeps the exercise list, the rotation, my history and settings entirely on the phone. There's an export/import button for backups.
- **Free APIs work straight from the browser.** Surf Check calls the Open-Meteo marine and weather APIs directly. No key, no proxy, no backend.
- **A manifest and a service worker make it an app.** Add it to your Home Screen and it opens full-screen with its own icon, works offline, and feels native enough.

For Surf Check, that's the whole story. Static page, free API, done.

## The wall: notifications

Rep Snacks was different. The entire point is that it reminds me. And a web app can't schedule its own notifications.

Once the page is in the background its code stops running, so there's no "set a timer for 10:15". There was a proposal for scheduled local notifications in browsers, but it was dropped. The only way to show a notification when the app isn't open is **Web Push**: something on the internet sends a message to the browser's push service (Apple's or Google's), which wakes up your service worker.

On iPhone there's an extra condition. Web Push only works for web apps added to the Home Screen (iOS 16.4 and later), and permission has to be requested from a tap, not on page load.

So I needed a server. A tiny one.

## The Worker: a server that barely exists

A [Cloudflare Worker](https://developers.cloudflare.com/workers/) on the free tier does the job. It does exactly two things:

1. Stores push subscriptions in Workers KV, via a small `/api/*` endpoint.
2. Runs a cron every five minutes and sends a push to anyone who's due.

```
 Phone (Home Screen PWA, dean-baker.com/workouts/)
   │  exercises, rotation, history → localStorage
   │
   │  PUT /api/sub  { subscription, timezone, hours, next exercise }
   ▼
 Cloudflare Worker (free tier)
   │  KV: one record per device
   │  cron */5 → is it :15 in this device's timezone?
   ▼
 Apple / Google push service  ──►  service worker on the phone  ──►  🔔
```

There are no accounts. When I tap "Turn on reminders", the phone gets a push subscription (a unique URL at Apple's push service, plus encryption keys) and sends it to the Worker along with only what the Worker needs: my timezone, working hours, the name of the next exercise, and when I last finished one. Everything else stays on the phone.

The cron checks each subscription against *that device's* local time:

```js
function isDue(rec, now) {
  if (rec.snoozeUntil) return now >= rec.snoozeUntil - 30_000;
  const { hour, minute, day } = localTime(now, rec.prefs.tz);
  if (minute < 15 || minute >= 20) return false; // cron runs every 5 min, so this matches once per hour
  if (!rec.prefs.days.includes(day)) return false;
  if (hour < rec.prefs.startHour || hour >= rec.prefs.endHour) return false;
  return !(rec.lastDoneAt && now - rec.lastDoneAt < RECENT_DONE_MS);
}
```

Running every five minutes rather than hourly is what makes snooze work: hit "Snooze 10m" and the next push lands within a few minutes of that. It also won't nag me if I've just done one. If the push service replies `404` or `410`, the subscription is dead (app deleted, permission revoked) and the Worker deletes it.

On the phone, the service worker just turns the push into a notification:

```js
self.addEventListener("push", (e) => {
  let data = {};
  try { data = e.data?.json() ?? {}; } catch {}
  e.waitUntil(self.registration.showNotification(data.title || "Time to move 💪", {
    body: data.body || "5 minutes. Up you get.",
    tag: "workout",
    renotify: true,
    // …icon, badge, click-through URL
  }));
});
```

### Web Push without a library

Sending a push properly means signing a VAPID token (an ES256 JWT) and encrypting the payload with `aes128gcm` (RFC 8291). There are npm packages for this, but the Worker runtime has WebCrypto built in, so the whole thing is under 100 lines with zero dependencies. Hand-rolled crypto deserves suspicion, so before trusting it I had it checked against independent libraries: `http_ece` decrypted the payload and `jose` verified the JWT.

### Locking it down

Because the page is served by GitHub Pages and the API lives on `workers.dev`, every call is cross-origin. The Worker only answers CORS for origins I list:

```js
function corsHeaders(request, env) {
  const origin = request.headers.get("Origin");
  if (!origin || !env.ALLOWED_ORIGINS.split(",").includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    // …methods, headers, max-age
    Vary: "Origin",
  };
}
```

It also only accepts subscription endpoints from the real push services, so it can't be used to make requests to arbitrary URLs. The VAPID private key lives in Worker secrets, never in the repo.

## The pattern

If I boil it down:

1. **Start static.** A folder in a repo you already deploy. HTML, JS, localStorage.
2. **Call free APIs straight from the browser** where you can.
3. **Add a tiny Worker only for what a static page genuinely can't do**, like waking up a phone. Keep it dumb, and keep the data on the device.

That covers more personal tools than you'd think. The hard part isn't the tech any more. It's noticing the small, annoying problems worth an evening.
