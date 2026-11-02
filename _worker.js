export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname;
    const path = url.pathname;

    // ==========================================================
    // 1. LOGIKA UNTUK SUBDOMAIN STORE
    // ==========================================================
    if (host === 'store.crackednetwork.run.place') {
      // a. Jika buka root ("/"), ambil konten /store dari Pages
      if (path === '/') {
        const storeUrl = new URL('/store', 'https://crackednetwork-website.pages.dev');
        return fetch(storeUrl, request);
      }

      // b. Jika buka halaman lain (misal /ai, /home), lempar ke www
      if (path !== '/store' && !path.includes('.')) {
        const wwwUrl = new URL(request.url);
        wwwUrl.hostname = 'www.crackednetwork.run.place';
        return Response.redirect(wwwUrl.toString(), 302);
      }
    }

    // ==========================================================
    // 2. LOGIKA UNTUK DOMAIN UTAMA (WWW)
    // ==========================================================
    if (host === 'www.crackednetwork.run.place' || host === 'crackednetwork.run.place') {
      // Jika buka /store, lempar ke subdomain store
      if (path === '/store') {
        const storeUrl = new URL(request.url);
        storeUrl.hostname = 'store.crackednetwork.run.place';
        storeUrl.pathname = '/'; // Ubah jadi root
        return Response.redirect(storeUrl.toString(), 302);
      }
    }

    // ==========================================================
    // 3. DEFAULT: Proxy ke Cloudflare Pages
    // ==========================================================
    // Jika yang diakses adalah /ai, /home, dll di domain utama, ambil dari Pages
    const pagesUrl = new URL(url.pathname + url.search, 'https://crackednetwork-website.pages.dev');
    return fetch(pagesUrl, request);
  },
};
