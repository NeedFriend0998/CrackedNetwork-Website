// _worker.js (Cloudflare Pages)
const MAIN = "www.crackednetwork.run.place";
const STORE = "store.crackednetwork.run.place";

const isAsset = (p) => /\.(?!html?$)[a-z0-9]+$/i.test(p);

function withCache(res) {
  if (res.status !== 200) return res;
  const out = new Response(res.body, res);
  out.headers.set(
    "Cache-Control",
    "public, max-age=300, stale-while-revalidate=86400"
  );
  return out;
}

async function assets(env, request) {
  return withCache(await env.ASSETS.fetch(request));
}

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
    const { hostname, search } = url;
    const pathname =
      url.pathname.length > 1 ? url.pathname.replace(/\/$/, "") : url.pathname;
    const isStorePath = pathname === "/store" || pathname.startsWith("/store/");

    // 1) www + /store -> store
    if (hostname === MAIN && isStorePath) {
      const rest = pathname.slice("/store".length) || "/";
      return Response.redirect(`https://${STORE}${rest}${search}`, 301);
    }

    // 2) domain store
    if (hostname === STORE) {
      if (pathname === "/" || pathname === "/store") {
        return withCache(await serve(env, request, "/store"));
      }
      if (isAsset(pathname) || isStorePath) return assets(env, request);
      return Response.redirect(`https://${MAIN}${pathname}${search}`, 301);
    }

    // 3) www: link staff -> router.js menampilkan detailnya
    if (hostname === MAIN) {
      // /wiki/needfriend -> /wiki#staff/needfriend
      const m = pathname.match(/^\/wiki\/([^/.]+)$/);
      if (m) {
        return Response.redirect(`https://${MAIN}/wiki#staff/${m[1]}`, 302);
      }
      // URL lama /staff-detail -> tab staff
      if (pathname === "/staff-detail") {
        return Response.redirect(`https://${MAIN}/wiki#staff`, 302);
      }
    }

    return assets(env, request);
  },
};