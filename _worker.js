export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname;
    const path = url.pathname;

    // ==========================================================
    // 1. LOGIKA UNTUK SUBDOMAIN STORE
    // ==========================================================
    if (host === 'store.crackednetwork.run.place') {
      // a. Jika membuka root ("/"), arahkan ke "/store"
      if (path === '/') {
        return Response.redirect('https://store.crackednetwork.run.place/store', 302);
      }

      // b. Jika membuka halaman selain "/store" (misal "/home"), lempar ke domain utama
      if (path !== '/store' && !path.includes('.')) {
        return Response.redirect(`https://www.crackednetwork.run.place${path}`, 302);
      }

      // c. Jika membuka "/store" atau file aset, tampilkan dari Pages
      return env.ASSETS.fetch(request);
    }

    // ==========================================================
    // 2. LOGIKA UNTUK DOMAIN UTAMA (WWW)
    // ==========================================================
    if (host === 'www.crackednetwork.run.place' || host === 'crackednetwork.run.place') {
      // Jika membuka "/store", lempar ke subdomain store
      if (path === '/store') {
        return Response.redirect('https://store.crackednetwork.run.place/store', 302);
      }
    }

    // ==========================================================
    // 3. DEFAULT: TAMPILKAN FILE STATIS LAINNYA
    // ==========================================================
    return env.ASSETS.fetch(request);
  },
};
