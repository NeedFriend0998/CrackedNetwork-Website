// _worker.js (Cloudflare Pages)
const MAIN = "www.crackednetwork.run.place";
const STORE = "store.crackednetwork.run.place";

// file statis (css, js, gambar, font, json, dll), selain .html
const isAsset = (p) => /\.(?!html?$)[a-z0-9]+$/i.test(p);

// ambil halaman dari ASSETS dan ikuti redirect berantai milik Pages
async function serve(env, request, path) {
  let u = new URL(request.url);
  u.pathname = path;
  let res = await env.ASSETS.fetch(new Request(u, request));
  for (let i = 0; i < 3 && res.status >= 300 && res.status < 400; i++) {
    u = new URL(res.headers.get("Location"), u);
    res = await env.ASSETS.fetch(new Request(u, request));
  }
  return res;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { hostname, pathname, search } = url;
    const isStorePath = pathname === "/store" || pathname.startsWith("/store/");

    // 1) www + /store  ->  store.crackednetwork.run.place
    if (hostname === MAIN && isStorePath) {
      const rest = pathname.slice("/store".length) || "/";
      return Response.redirect(`https://${STORE}${rest}${search}`, 302);
    }

    // 2) domain store
    if (hostname === STORE) {
      // root dan /store sama-sama menampilkan halaman store (tanpa redirect)
      if (pathname === "/" || pathname === "/store") {
        return serve(env, request, "/store");
      }
      // file statis dan sub-path store dilayani langsung
      if (isAsset(pathname) || isStorePath) {
        return env.ASSETS.fetch(request);
      }
      // halaman lain (/home, /gamemodes, /wiki, /rules, dll) -> www
      return Response.redirect(`https://${MAIN}${pathname}${search}`, 302);
    }

    // 3) domain lain (www, pages.dev, dll): layani seperti biasa
    return env.ASSETS.fetch(request);
  },
};
