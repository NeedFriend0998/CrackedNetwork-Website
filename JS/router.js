(() => {
  const MAIN = "https://www.crackednetwork.run.place";
  const STORE = "https://store.crackednetwork.run.place";
  const onStoreHost = location.hostname.startsWith("store.");
  const isStore = (p) => p === "/store" || p.startsWith("/store/");

// kompatibel dengan main.js: navigasi normal + sadar domain
window.pjaxNavigate = (path) => {
  const toStore = isStore(path);
  if (onStoreHost && !toStore) location.href = MAIN + path;
  else if (!onStoreHost && toStore) location.href = STORE + "/";
  else location.href = path;
};

  // Di domain store: path tampil /store supaya main.js memuat isi store
  if (onStoreHost && location.pathname === "/") {
    history.replaceState(null, "", "/store" + location.search + location.hash);
  }

  // Pindah domain = navigasi normal (tanpa swap body)
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
    const u = new URL(a.href, location.href);
    if (u.origin !== MAIN && u.origin !== STORE) return; // link luar: biarkan
    const path = u.pathname + u.search + u.hash;

    if (onStoreHost) {
      if (isStore(u.pathname) || u.pathname === "/") return; // tetap di store
      e.preventDefault();
      location.href = MAIN + path;
    } else if (isStore(u.pathname)) {
      e.preventDefault();
      location.href = STORE + "/";
    }
  });

  // Percepat halaman di www: prefetch + prerender saat hover/sentuh
  if (!onStoreHost) {
    const done = new Set();
    const prefetch = (path) => {
      if (done.has(path)) return;
      done.add(path);
      const l = document.createElement("link");
      l.rel = "prefetch";
      l.href = path;
      document.head.appendChild(l);
    };

    const idle = window.requestIdleCallback || ((f) => setTimeout(f, 800));
    idle(() => {
      document.querySelectorAll("a[href^='/']").forEach((a) => {
        const p = new URL(a.href).pathname;
        if (!isStore(p)) prefetch(p);
      });
    });

    if (HTMLScriptElement.supports && HTMLScriptElement.supports("speculationrules")) {
      const s = document.createElement("script");
      s.type = "speculationrules";
      s.textContent = JSON.stringify({
        prerender: [{
          where: { and: [
            { href_matches: "/*" },
            { not: { href_matches: "/store*" } },
            { not: { href_matches: "/*.*" } },
            { not: { href_matches: "/staff-detail*" } },
          ] },
          eagerness: "moderate"
        }]
      });
      document.head.appendChild(s);
    }
  }
})();
