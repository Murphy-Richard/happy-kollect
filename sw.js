// sw.js - Service Worker for HAMIS DQA PWA
const CACHE_NAME = 'hamis-dqa-v1';
const CACHE_VERSION = '1.0.0';

// Assets to cache immediately on install
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500:600:700&display=swap'
];

// Install Event - Cache assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching app shell');
        return cache.addAll(ASSETS);
      })
      .then(() => {
        console.log('[SW] Installation complete, skipping waiting');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Installation failed:', error);
      })
  );
});

// Activate Event - Clean old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Activation complete, claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch Event - Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests (like Firebase API calls)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[SW] Serving from cache:', event.request.url);
          // Return cached version, but update cache in background
          event.waitUntil(updateCache(event.request));
          return cachedResponse;
        }

        console.log('[SW] Fetching from network:', event.request.url);
        // Not in cache - fetch from network
        return fetch(event.request)
          .then((networkResponse) => {
            // Check if valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clone the response
            const responseToCache = networkResponse.clone();

            // Add to cache
            event.waitUntil(
              caches.open(CACHE_NAME)
                .then((cache) => {
                  return cache.put(event.request, responseToCache);
                })
            );

            return networkResponse;
          })
          .catch((error) => {
            console.error('[SW] Fetch failed:', error);
            // If it's a navigation request, return offline page
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Update cache in background (stale-while-revalidate strategy)
function updateCache(request) {
  return fetch(request)
    .then((response) => {
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }

      const responseToCache = response.clone();

      return caches.open(CACHE_NAME)
        .then((cache) => {
          return cache.put(request, responseToCache);
        });
    })
    .catch((error) => {
      console.error('[SW] Cache update failed:', error);
    });
}

// Handle messages from main app (for future features)
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    });
  }
});

console.log('[SW] Service Worker loaded successfully');
