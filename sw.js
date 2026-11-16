const V='mi-dia-v1';
const SHELL=['./','index.html','xlsx.full.min.js','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(
    fetch(e.request).then(r=>{
      if(r&&(r.status===200||r.type==='opaque')){const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp));}
      return r;
    }).catch(()=>caches.match(e.request).then(m=>m||caches.match('index.html')))
  );
});
