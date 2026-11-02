(() => {
  const STORE_URL = "https://store.crackednetwork.run.place/";
  const isStore = (p) => p === "/store" || p.startsWith("/store/");
  const cache = new Map();

  async function load(path) {
    if (!cache.has(path)) {
      cache.set(path, fetch(path).then((r) => r.text()));
    }
    return cache.get(path);
  }

  async function navigate(path, push = true) {
    if (isStore(path)) return (location.href = STORE_URL);
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
    if (u.origin !== location.origin) return;
    e.preventDefault();
    navigate(u.pathname + u.search);
  });

  // prefetch saat hover/sentuh = terasa instan
  const prefetch = (e) => {
    const a = e.target.closest?.("a[href]");
    if (!a) return;
    const u = new URL(a.href, location.href);
    if (u.origin === location.origin && !isStore(u.pathname)) load(u.pathname);
  };
  document.addEventListener("mouseover", prefetch);
  document.addEventListener("touchstart", prefetch, { passive: true });

  window.addEventListener("popstate", () => navigate(location.pathname, false));
})();
