/*
 Copyright 2014 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

// While overkill for this specific sample in which there is only one cache,
// this is one best practice that can be followed in general to keep track of
// multiple caches used by a given service worker, and keep them all versioned.
// It maps a shorthand identifier for a cache to a specific, versioned cache name.
// 캐시가 하나뿐인 이 특정 샘플에 대해서는 과잉 처리되지만, 이는 일반적으로 특정 서비스 직원이 사용하는 여러 캐시를 추적하고 모든 캐시를 버전별로 유지하기 위해 따를 수 있는 모범 사례 중 하나입니다. 캐시에 대한 단축 식별자를 특정 버전의 캐시 이름에 매핑합니다.


// Note that since global state is discarded in between service worker restarts, these
// variables will be reinitialized each time the service worker handles an event, and you
// should not attempt to change their values inside an event handler. (Treat them as constants.)
// 글로벌 상태는 서비스 작업자가 다시 시작하는 사이에 삭제되므로 이러한 변수는 서비스 작업자가 이벤트를 처리할 때마다 다시 초기화되므로 이벤트 핸들러 내에서 값을 변경하려고 하면 안 됩니다(상수로 처리).


// If at any point you want to force pages that use this service worker to start using a fresh
// cache, then increment the CACHE_VERSION value. It will kick off the service worker update
// flow and the old cache(s) will be purged as part of the activate event handler when the
// updated service worker is activated.
// 이 서비스 작업자를 사용하는 페이지가 새 캐시 사용을 시작하도록 하려면 CACHE_VERSION 값을 늘립니다. 그러면 서비스 작업자 업데이트 흐름이 시작되고 업데이트된 서비스 작업자가 활성화될 때 활성화 이벤트 처리기의 일부로 이전 캐시가 제거됩니다.


var CACHE_VERSION = 1;
var CURRENT_CACHES = {
  font: 'font-cache-v' + CACHE_VERSION
};

self.addEventListener('activate', function(event) {
  // Delete all caches that aren't named in CURRENT_CACHES.
  // While there is only one cache in this example, the same logic will handle the case where
  // there are multiple versioned caches.
  // CURRENT_CACHES에서 이름이 지정되지 않은 모든 캐시를 삭제합니다. 이 예에서는 캐시가 하나만 있지만 여러 버전의 캐시가 있는 경우에도 동일한 논리가 처리됩니다.

  var expectedCacheNamesSet = new Set(Object.values(CURRENT_CACHES));
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (!expectedCacheNamesSet.has(cacheName)) {
            // If this cache name isn't present in the set of "expected" cache names, then delete it.
            // 이 캐시 이름이 "예상된" 캐시 이름 집합에 없으면 삭제합니다.
            console.log('Deleting out of date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('Handling fetch event for', event.request.url);

  event.respondWith(
    caches.open(CURRENT_CACHES.font).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if (response) {
          // If there is an entry in the cache for event.request, then response will be defined
          // and we can just return it. Note that in this example, only font resources are cached.
          // 캐시에 event.request에 대한 항목이 있으면 응답이 정의되고 반환하면 됩니다. 이 예에서는 글꼴 리소스만 캐시됩니다.
          console.log(' Found response in cache:', response);

          return response;
        }

        // Otherwise, if there is no entry in the cache for event.request, response will be
        // undefined, and we need to fetch() the resource.
        // 그렇지 않으면 캐시에 event.request에 대한 항목이 없으면 응답이 정의되지 않으므로 리소스를 fetch()해야 합니다.
        console.log(' No response for %s found in cache. About to fetch ' +
          'from network...', event.request.url);

        // We call .clone() on the request since we might use it in a call to cache.put() later on.
        // Both fetch() and cache.put() "consume" the request, so we need to make a copy.
        // 나중에 cache.put() 호출에 사용할 수 있으므로 요청에 대해 .clone()을 호출합니다. fetch()와 cache.put() 둘 다 요청을 "소비"하기 때문에 복사본을 만들어야 합니다.
        // (see https://fetch.spec.whatwg.org/#dom-request-clone)
        return fetch(event.request.clone()).then(function(response) {
          console.log('  Response for %s from network is: %O',
            event.request.url, response);

          if (response.status < 400 &&
              response.headers.has('content-type') &&
              response.headers.get('content-type').match(/^font\//i)) {
            // This avoids caching responses that we know are errors (i.e. HTTP status code of 4xx or 5xx).
            // We also only want to cache responses that correspond to fonts,
            // i.e. have a Content-Type response header that starts with "font/".
            // Note that for opaque filtered responses (https://fetch.spec.whatwg.org/#concept-filtered-response-opaque)
            // we can't access to the response headers, so this check will always fail and the font won't be cached.
            // All of the Google Web Fonts are served off of a domain that supports CORS, so that isn't an issue here.
            // It is something to keep in mind if you're attempting to cache other resources from a cross-origin
            // domain that doesn't support CORS, though!
            // We call .clone() on the response to save a copy of it to the cache. By doing so, we get to keep
            // the original response object which we will return back to the controlled page.
            // 이렇게 하면 오류(예: HTTP 상태 코드 4xx 또는 5xx)로 알려진 응답을 캐싱하지 않습니다. 또한 글꼴에 해당하는 응답만 캐시하려고 합니다. 즉, "font/"로 시작하는 Content-Type 응답 헤더가 있습니다. 불투명하게 필터링된 응답(https://fetch.spec.whatwg.org/#concept-message-response-message)의 경우 응답 헤더에 액세스할 수 없으므로 이 검사는 항상 실패하고 글꼴은 캐시되지 않습니다. 모든 Google 웹 글꼴은 CORS를 지원하는 도메인에서 제공되므로 여기서는 문제가 되지 않습니다. 그러나 CORS를 지원하지 않는 교차 출처 도메인의 다른 리소스를 캐싱하려는 경우 명심해야 할 사항입니다! 응답에 대해 .clone()을 호출하여 캐시에 복사본을 저장합니다. 이렇게 하면 원래 응답 개체를 유지하고 제어된 페이지로 돌아갈 수 있습니다.
            // (see https://fetch.spec.whatwg.org/#dom-response-clone)
            console.log('  Caching the response to', event.request.url);
            cache.put(event.request, response.clone());
          } else {
            console.log('  Not caching the response to', event.request.url);
          }

          // Return the original response object, which will be used to fulfill the resource request.
          // 리소스 요청을 수행하는 데 사용할 원래 응답 개체를 반환합니다.
          return response;
        });
      }).catch(function(error) {
        // This catch() will handle exceptions that arise from the match() or fetch() operations.
        // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
        // It will return a normal response object that has the appropriate error code set.
        // 이 catch()는 match() 또는 fetch() 작업에서 발생하는 예외를 처리합니다. HTTP 오류 응답(예: 404)은 예외를 트리거하지 않습니다. 적절한 오류 코드가 설정된 일반 응답 개체를 반환합니다.
        console.error('  Error in fetch handler:', error);

        throw error;
      });
    })
  );
});
