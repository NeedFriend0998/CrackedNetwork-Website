const MAIN = "www.crackednetwork.run.place";
const STORE = "store.crackednetwork.run.place";

// file statis (css, js, gambar, font, dll), selain .html
const isAsset = (p) => /\.(?!html?$)[a-z0-9]+$/i.test(p);

async function serve(env, request, path) {
  let u = new URL(request.url);
  u.pathname = path;
  let res = await env.ASSETS.fetch(new Request(u, request));
  // ikuti redirect berantai milik Pages (/store -> /store/ dst)
  for (let i = 0; i < 3 && res.status >= 300 && res.status < 400; i++) {
    u = new URL(res.headers.get("Location"), u);
    res = await env.ASSETS.fetch(new Request(u, request));
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
  // root dan /store sama-sama menampilkan halaman store (tanpa redirect)
  if (url.pathname === "/" || url.pathname === "/store") {
    return serve(env, request, "/store");
  }
  // file statis (css/js/img/json) dilayani di domain store
  if (isAsset(url.pathname) || isStorePath) return env.ASSETS.fetch(request);
  // halaman lain -> www
  return Response.redirect(`https://${MAIN}${url.pathname}${url.search}`, 302);
    }
    }

    return env.ASSETS.fetch(request);
  },
};
