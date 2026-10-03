export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Hanya redirect ke index.html jika:
    // 1. Bukan file statis (tidak berekstensi)
    // 2. Bukan API eksternal
    // 3. Bukan path khusus Cloudflare
    if (
      !path.includes('.') &&
      !path.startsWith('/cdn-cgi/') &&
      !path.startsWith('/api/')
    ) {
      return env.ASSETS.fetch(new Request(new URL('/', url.origin), request));
    }

    // Semua request lain (file statis, API, embed) lewat normal
    return env.ASSETS.fetch(request);
  }
};
