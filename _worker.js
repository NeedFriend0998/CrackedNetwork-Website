export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Daftar ekstensi file statis
    const ext = path.split('.').pop().toLowerCase();
    const staticExts = ['js','css','html','htm','png','jpg','jpeg','gif','ico','svg','woff','woff2','ttf','eot','json','xml','txt','mp3','ogg','mp4','webm','webp','avif'];

    // Jika punya ekstensi statis, serve langsung
    if (staticExts.includes(ext)) {
      return env.ASSETS.fetch(request);
    }

    // Path khusus Cloudflare, lewati
    if (path.startsWith('/cdn-cgi/')) {
      return env.ASSETS.fetch(request);
    }

    // Semua path lain → serve index.html
    return env.ASSETS.fetch(new Request(new URL('/index.html', url.origin), request));
  }
};
