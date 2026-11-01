export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // Cuma berlaku kalau buka root store.
    if (url.hostname === 'store.crackednetwork.run.place' && url.pathname === '/') {
      url.pathname = '/store';
      return env.ASSETS.fetch(new Request(url, request));
    }
    // Path lain lolos gitu aja (buat diproses router.js/PJAX)
    return env.ASSETS.fetch(request);
  }
};
