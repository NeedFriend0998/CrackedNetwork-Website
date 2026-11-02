export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname;
    const path = url.pathname;

    // ==========================================================
    // 1. LOGIKA SUBDOMAIN STORE
    // ==========================================================
    if (host === 'store.crackednetwork.run.place') {
      // a. Jika buka root (/), tendang ke /store
      if (path === '/') {
        return Response.redirect('https://store.crackednetwork.run.place/store', 302);
      }

      // b. Jika buka halaman selain /store (misal /home) dan bukan file aset, lempar ke www
      if (path !== '/store' && !path.includes('.')) {
        return Response.redirect(`https://www.crackednetwork.run.place${path}`, 302);
      }

      // c. Layani file /store dan asetnya
      return env.ASSETS.fetch(request);
    }

    // ==========================================================
    // 2. LOGIKA DOMAIN UTAMA (WWW)
    // ==========================================================
    if (host === 'www.crackednetwork.run.place' || host === 'crackednetwork.run.place') {
      // Jika buka /store, lempar ke subdomain store
      if (path === '/store') {
        return Response.redirect('https://store.crackednetwork.run.place/store', 302);
      }
    }

    // ==========================================================
    // 3. DEFAULT: LAYANI FILE STATIS
    // ==========================================================
    return env.ASSETS.fetch(request);
  },
};
