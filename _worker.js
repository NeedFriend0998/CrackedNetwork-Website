export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname;
    const path = url.pathname;

    // ==========================================================
    // 1. LOGIKA UNTUK SUBDOMAIN STORE
    // ==========================================================
    if (host === 'store.crackednetwork.run.place') {
      // Jika membuka root ("/"), tampilkan file /store TANPA redirect
      if (path === '/') {
        // Buat URL baru dengan path /store
        const storeUrl = new URL('/store', request.url);
        // Ambil file /store dan tampilkan seolah-olah itu root
        return env.ASSETS.fetch(storeUrl);
      }

      // Jika mengakses path lain selain /store (misal /home), 
      // barulah redirect ke domain utama (www)
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
      // Jika mengakses /store, redirect ke subdomain store
      if (path === '/store') {
        const storeUrl = new URL(request.url);
        storeUrl.hostname = 'store.crackednetwork.run.place';
        storeUrl.pathname = '/store'; // Kembalikan ke root subdomain store
        return Response.redirect(storeUrl.toString(), 301);
      }
    }

    // ==========================================================
    // 3. DEFAULT: LAYANI FILE STATIS LAINNYA
    // ==========================================================
    // Penting: Jangan ubah request, biarkan Cloudflare yang mengurus
    return env.ASSETS.fetch(request);
  },
};
