const MAIN = "www.crackednetwork.run.place";
const STORE = "store.crackednetwork.run.place";

// file statis (css, js, gambar, font, dll), selain .html
const isAsset = (p) => /\.(?!html?$)[a-z0-9]+$/i.test(p);

async function serve(env, request, path) {
  const u = new URL(request.url);
  u.pathname = path;
  let res = await env.ASSETS.fetch(new Request(u, request));
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

    // www + /store -> store.domain
    if (url.hostname === MAIN && isStorePath) {
      const rest = url.pathname.slice("/store".length) || "/";
      return Response.redirect(`https://${STORE}${rest}${url.search}`, 302);
    }

    if (url.hostname === STORE) {
      // /store di domain store -> rapikan ke root
      if (isStorePath) {
        const rest = url.pathname.slice("/store".length) || "/";
        return Response.redirect(`https://${STORE}${rest}${url.search}`, 302);
      }
      // halaman store
      if (url.pathname === "/") return serve(env, request, "/store/");
      // file statis tetap dilayani di domain store
      if (isAsset(url.pathname)) return env.ASSETS.fetch(request);
      // SEMUA halaman lain (/home, /wiki, /gamemodes, /rules, dll) -> www
      return Response.redirect(
        `https://${MAIN}${url.pathname}${url.search}`,
        302
      );
    }

    return env.ASSETS.fetch(request);
  },
};
