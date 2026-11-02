(() => {
  const MAIN = "https://www.crackednetwork.run.place";
  const STORE = "https://store.crackednetwork.run.place";
  const onStoreHost = location.hostname.startsWith("store.");
  const isStore = (p) => p === "/store" || p.startsWith("/store/");
  const cache = new Map();

  const load = (path) => {
    if (!cache.has(path)) cache.set(path, fetch(path).then((r) => r.text()));
    return cache.get(path);
  };

  async function navigate(path, push = true) {
    try {
      const html = await load(path);
      const doc = new DOMParser().parseFromString(html, "text/html");
      document.title = doc.title;
      document.body.replaceWith(doc.body);
      if (push) history.pushState({}, "", path);
      window.scrollTo(0, 0);
    } catch {
      location.href = path; // fallback aman
    }
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;

    const u = new URL(a.href, location.href);
    const ours = u.origin === MAIN || u.origin === STORE;
    if (!ours) return; // link luar (instagram, youtube) biarkan normal

    const path = u.pathname + u.search;

    if (onStoreHost) {
      // di store: link ke halaman selain store -> pindah ke www (normal)
      if (u.pathname !== "/" && !isStore(u.pathname)) {
        e.preventDefault();
        location.href = MAIN + path;
      } else if (isStore(u.pathname)) {
        e.preventDefault();
        location.href = STORE + "/";
      }
      return;
    }

    // di www: ke /store -> pindah domain (normal, tidak instan)
    if (isStore(u.pathname)) {
      e.preventDefault();
      location.href = STORE + "/";
      return;
    }

    // di www: halaman lain instan
    if (u.origin !== location.origin) return;
    e.preventDefault();
    navigate(path);
  });

  // router instan hanya aktif di www
  if (!onStoreHost) {
    const prefetch = (e) => {
      const a = e.target.closest?.("a[href]");
      if (!a) return;
      const u = new URL(a.href, location.href);
      if (u.origin === location.origin && !isStore(u.pathname)) load(u.pathname);
    };
    document.addEventListener("mouseover", prefetch);
    document.addEventListener("touchstart", prefetch, { passive: true });
    window.addEventListener("popstate", () => navigate(location.pathname, false));
  }
})();
