export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname;
    const path = url.pathname;

    // Jika mengakses root subdomain store, redirect ke /store
    if (host === 'store.crackednetwork.run.place' && path === '/') {
      const storeUrl = new URL('/store', request.url);
      return Response.redirect(storeUrl.toString(), 301);
    }

    if (host === 'store.crackednetwork.run.place' && path === '/ai') {
      const storeUrl = new URL('/store', request.url);
      return Response.redirect(storeUrl.toString(), 301);
    }

    // Biarkan Cloudflare menangani permintaan lainnya (termasuk file aset)
    return env.ASSETS.fetch(request);
  },
};
