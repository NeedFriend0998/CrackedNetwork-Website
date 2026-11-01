export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname;
    const path = url.pathname;

    // ==========================================================
    // LOGIKA 1: REWRITE (Tampilkan konten tanpa ganti URL)
    // ==========================================================
    // Jika user membuka domain store DAN berada di root ("/")
    if (host === 'store.crackednetwork.run.place' && path === '/') {
      // Ubah path secara internal menjadi /store
      url.pathname = '/store';
      // Ambil file /store dan tampilkan seolah-olah itu halaman utama
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }

    // ==========================================================
    // LOGIKA 2: REDIRECT (Pindah domain)
    // ==========================================================
    
    // Jika user berada di domain store tapi mencoba akses halaman lain (misal /home)
    // Maka lempar ke domain utama (www)
    if (host === 'store.crackednetwork.run.place' && path !== '/' && !path.includes('.')) {
      url.hostname = 'www.crackednetwork.run.place';
      return Response.redirect(url.toString(), 301);
    }

    // Jika user berada di domain utama (www) tapi mencoba akses /store
    // Maka lempar ke subdomain store
    if ((host === 'www.crackednetwork.run.place' || host === 'crackednetwork.run.place') && path === '/store') {
      url.hostname = 'store.crackednetwork.run.place';
      url.pathname = '/'; // Kembalikan ke root subdomain store
      return Response.redirect(url.toString(), 301);
    }

    // ==========================================================
    // DEFAULT: Biarkan Cloudflare menangani file statis lainnya
    // ==========================================================
    return env.ASSETS.fetch(request);
  },
};
