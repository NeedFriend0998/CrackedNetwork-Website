export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Biarkan file statis (.css, .js, .png, .json, dll) lewat normal
    if (url.pathname.match(/\.[a-zA-Z0-9]+$/)) {
      return env.ASSETS.fetch(request);
    }
    
    // Untuk semua rute lain, sajikan index.html
    const newUrl = new URL('/', url.origin);
    return env.ASSETS.fetch(new Request(newUrl.toString(), request));
  }
};
