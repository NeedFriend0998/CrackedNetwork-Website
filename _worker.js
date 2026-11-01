export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname;
    const path = url.pathname;

    // ==========================================================
    // 1. LOGIKA UNTUK SUBDOMAIN STORE
    // ==========================================================
    if (host === 'store.crackednetwork.run.place') {
      // a. Jika buka root (/), redirect ke /store
      if (path === '/') {
        const storeUrl = new URL('/store', request.url);
        return Response.redirect(storeUrl.toString(), 301);
      }

      // b. Jika buka halaman selain /store dan bukan file aset (seperti .css, .js), 
      // lempar ke domain utama (www)
      if (path !== '/store' && !path.includes('.')) {
        const wwwUrl = new URL(request.url);
        wwwUrl.hostname = 'www.crackednetwork.run.place';
        return Response.redirect(wwwUrl.toString(), 301);
      }
    }

    // ==========================================================
    // 2. LOGIKA UNTUK DOMAIN UTAMA (WWW)
    // ==========================================================
    if (host === 'www.crackednetwork.run.place' || host === 'crackednetwork.run.place') {
      // Jika buka /store, redirect ke subdomain store
      if (path === '/store') {
        const storeUrl = new URL(request.url);
        storeUrl.hostname = 'store.crackednetwork.run.place';
        // Kita biarkan path tetap /store karena tadi udah work
        return Response.redirect(storeUrl.toString(), 301);
      }
    }

    // ==========================================================
    // 3. DEFAULT: LAYANI FILE
    // ==========================================================
    return env.ASSETS.fetch(request);
  },
};
