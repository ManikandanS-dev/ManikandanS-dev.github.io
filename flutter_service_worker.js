'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "78733e4383d52fe40c7954443abb9b5a",
"assets/AssetManifest.bin.json": "797789445f8c71966c9ef27cd38f5549",
"assets/AssetManifest.json": "28bf1a573c47b29681712ed6755b270a",
"assets/assets/font/Orbitron_SemiBold.ttf": "ba8511f076fe49d64ae9c1a50a2d96be",
"assets/assets/font/Poppins_Regular.ttf": "093ee89be9ede30383f39a899c485a82",
"assets/assets/png/d_bg.png": "c2ca554926c9a0a28ebdb78dc84bb8c1",
"assets/assets/png/m_bg.png": "68153553bb2bfbef795a7a205f940c85",
"assets/assets/png/t_bg.png": "439ed864a03ad8142048778e731df475",
"assets/assets/svg/connect.svg": "e90550ca250e2220313401a87dfe0ef2",
"assets/assets/svg/dart_svg.svg": "5751dd2a6263bb4092e2185c9751506f",
"assets/assets/svg/github.svg": "7397290d5c99194acc064641ff5f639a",
"assets/assets/svg/link.svg": "e6da54dfc82ee3f111bf80f37f0fc888",
"assets/assets/svg/linkdin.svg": "e4dd9977a4e7cc035cee52cd2560b4f7",
"assets/assets/svg/loading.svg": "1d130bc4b4baa1ed6e7ffbd6df97db57",
"assets/assets/svg/loading_b.svg": "775abb9f125db0561508105045b9e6f9",
"assets/assets/svg/loding_null.svg": "775abb9f125db0561508105045b9e6f9",
"assets/assets/svg/platform_svg.svg": "f0dfdca426483e432f363104b49a1207",
"assets/assets/svg/plus.svg": "7793b60882d46025b9b09b4a9e5e43e7",
"assets/assets/svg/project_next.svg": "fee195715d6e2817739c032524529410",
"assets/assets/svg/project_svg.svg": "979cf3e1e7c7a14d5022ecf654bcf9b1",
"assets/assets/svg/skills.svg": "c3a5eb9ca493a0858e901161ce13e9fc",
"assets/assets/svg/sotwarDevloper.svg": "59114e5ce388976a72ac9b969352b2ff",
"assets/assets/svg/x.svg": "f441a78fe0cec89ad06584894945fe5f",
"assets/FontManifest.json": "c857ab1704ea6cf26e08e1caf1fb8d7d",
"assets/fonts/MaterialIcons-Regular.otf": "0db35ae7a415370b89e807027510caf0",
"assets/NOTICES": "0022dac7e4118fb727535453c442b8d2",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.ico": "9afdbff4ffdf6213d91c66ee89f38ed6",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"flutter_bootstrap.js": "2dc83b6ced76489cc502f2bc01963b41",
"icons/Icon-192.png": "74224e553c76a4212cf356978d3f5732",
"icons/Icon-512.png": "f5a6d344401592433ad1d303288e75c2",
"icons/Icon-maskable-192.png": "74224e553c76a4212cf356978d3f5732",
"icons/Icon-maskable-512.png": "f5a6d344401592433ad1d303288e75c2",
"index.html": "a95aa8cb2c8f549335b893a822a8e9a2",
"/": "a95aa8cb2c8f549335b893a822a8e9a2",
"main.dart.js": "05e8255adac346bdabf1d9d28bdf8537",
"manifest.json": "21cf65b0b5a4555563bf5fa164b2cc0d",
"version.json": "536dc42524442522d15a255b5eeebed3"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
