export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname;
    const path = url.pathname;

    // ==========================================
    // LOGIKA REDIRECT ANTAR DOMAIN
    // ==========================================

    // 1. Jika di subdomain STORE tapi minta halaman selain /store (misal /home)
    // JANGAN redirect kalau yang diminta adalah file aset (.css, .js, .png)
    if (host === 'store.crackednetwork.run.place' && path !== '/' && path !== '/store' && !path.includes('.')) {
      url.hostname = 'www.crackednetwork.run.place';
      return Response.redirect(url.toString(), 301); // Redirect permanen
    }

    // 2. Jika di domain WWW tapi minta halaman /store
    if ((host === 'www.crackednetwork.run.place' || host === 'crackednetwork.run.place') && path === '/store') {
      url.hostname = 'store.crackednetwork.run.place';
      url.pathname = '/'; // Ubah /store jadi / karena di subdomain store, root (/) udah nampilin toko
      return Response.redirect(url.toString(), 301);
    }

    // ==========================================
    // LOGIKA REWRITE (Tampilan Awal)
    // ==========================================
    
    // 3. Jika di subdomain STORE dan buka root (/), tampilkan file /store
    if (host === 'store.crackednetwork.run.place' && path === '/') {
      url.pathname = '/store';
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }

    // Default behavior (Load file asli)
    return env.ASSETS.fetch(request);
  },
};
