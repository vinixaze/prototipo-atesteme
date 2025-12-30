const CACHE_NAME = 'atesteme-v1.0.0';
const RUNTIME_CACHE = 'atesteme-runtime-v1.0.0';

// Arquivos essenciais para funcionamento offline
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Cache aberto');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('[Service Worker] Instalado com sucesso');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Erro na instalação:', error);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativando...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('[Service Worker] Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Ativado com sucesso');
        return self.clients.claim();
      })
  );
});

// Estratégia de fetch: Network First, fallback para Cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora requisições que não são do mesmo origin (APIs externas, CDNs, etc)
  if (url.origin !== location.origin) {
    return;
  }

  // Ignora requisições do tipo chrome-extension
  if (request.url.startsWith('chrome-extension://')) {
    return;
  }

  // Para navegação (HTML)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clona a resposta antes de cachear
          const responseClone = response.clone();
          
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          
          return response;
        })
        .catch(() => {
          // Se offline, tenta buscar do cache
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Se não encontrou no cache, retorna página offline
              return caches.match('/offline.html');
            });
        })
    );
    return;
  }

  // Para recursos estáticos (JS, CSS, imagens, fontes)
  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            // Cache hit - retorna do cache e atualiza em background
            fetch(request).then((response) => {
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, response);
              });
            }).catch(() => {
              // Ignora erros de atualização em background
            });
            
            return cachedResponse;
          }
          
          // Cache miss - busca da rede e cacheia
          return fetch(request).then((response) => {
            // Só cacheia respostas válidas
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            const responseClone = response.clone();
            
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
            
            return response;
          });
        })
    );
    return;
  }

  // Para outras requisições (API, etc) - Network only
  event.respondWith(
    fetch(request)
      .catch(() => {
        // Se falhar e for uma requisição GET, tenta o cache
        if (request.method === 'GET') {
          return caches.match(request);
        }
        
        // Para POST, PUT, DELETE sem conexão, retorna erro
        return new Response(
          JSON.stringify({ 
            error: 'Sem conexão com a internet',
            offline: true 
          }),
          {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          }
        );
      })
  );
});

// Mensagens do cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    const urlsToCache = event.data.payload;
    
    event.waitUntil(
      caches.open(RUNTIME_CACHE)
        .then((cache) => cache.addAll(urlsToCache))
        .then(() => {
          event.ports[0].postMessage({ 
            type: 'CACHE_URLS_RESPONSE',
            success: true 
          });
        })
        .catch((error) => {
          event.ports[0].postMessage({ 
            type: 'CACHE_URLS_RESPONSE',
            success: false,
            error: error.message
          });
        })
    );
  }
});

// Sincronização em background (quando voltar online)
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background Sync:', event.tag);
  
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  console.log('[Service Worker] Sincronizando dados...');
  // Aqui você pode adicionar lógica para sincronizar dados quando voltar online
  // Por enquanto, apenas registra no console
}

// Push notifications (para futuro)
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push recebido:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver detalhes',
        icon: '/icons/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icons/icon-192x192.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('ATESTEME', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notificação clicada:', event);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('[Service Worker] Carregado com sucesso!');
