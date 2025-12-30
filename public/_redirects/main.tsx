# Netlify redirects for SPA + PWA
# https://docs.netlify.com/routing/redirects/

# Service Worker - must be served from root
/service-worker.js /service-worker.js 200
  Cache-Control: no-cache, no-store, must-revalidate

# Manifest
/manifest.json /manifest.json 200
  Cache-Control: public, max-age=604800

# Offline page
/offline.html /offline.html 200

# Icons - long cache
/icons/* /icons/:splat 200
  Cache-Control: public, max-age=31536000, immutable

# SPA fallback - all other routes go to index.html
/* /index.html 200
