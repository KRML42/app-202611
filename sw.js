// Cambia V en cada versión publicada para que la app avise de la actualización.
const V='mi-dia-2026.11.21';
const SHELL=['./','index.html','xlsx.full.min.js','manifest.webmanifest','figtree.woff2','bricolage.woff2','icon-192.png','icon-512.png','icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
// Primero la copia guardada (abre al instante, con o sin señal); en segundo plano se descarga la versión nueva.
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET'||new URL(req.url).origin!==location.origin)return;
  const key=req.mode==='navigate'?'index.html':req;
  e.respondWith(caches.open(V).then(c=>c.match(key,{ignoreSearch:req.mode==='navigate'}).then(hit=>{
    const net=fetch(req).then(r=>{if(r&&r.ok)c.put(key,r.clone());return r;}).catch(()=>null);
    if(hit){e.waitUntil(net);return hit;}
    return net.then(r=>r||c.match('index.html'));
  })));
});
