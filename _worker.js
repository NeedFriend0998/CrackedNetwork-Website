const MAIN = "www.crackednetwork.run.place";
const STORE = "store.crackednetwork.run.place";

async function serve(env, request, path) {
  const u = new URL(request.url);
  u.pathname = path;
  let res = await env.ASSETS.fetch(new Request(u, request));
  // Pages sering membalas redirect (/store -> /store/), ikuti manual
  if (res.status >= 300 && res.status < 400) {
    const loc = new URL(res.headers.get("Location"), u);
    res = await env.ASSETS.fetch(new Request(loc, request));
  }
  return res;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isStorePath =
      url.pathname === "/store" || url.pathname.startsWith("/store/");

    // www/store -> store.domain
    if (url.hostname === MAIN && isStorePath) {
      const rest = url.pathname.slice("/store".length) || "/";
      return Response.redirect(`https://${STORE}${rest}${url.search}`, 302);
    }

    // store.domain: root menampilkan halaman /store
    if (url.hostname === STORE) {
      if (isStorePath) {
        const rest = url.pathname.slice("/store".length) || "/";
        return Response.redirect(`https://${STORE}${rest}${url.search}`, 302);
      }
      if (url.pathname === "/") return serve(env, request, "/store/");
      return env.ASSETS.fetch(request); // css/js/gambar
    }

    return env.ASSETS.fetch(request);
  },
};
