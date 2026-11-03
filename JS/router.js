(() => {
  const MAIN = "https://www.crackednetwork.run.place";
  const STORE = "https://store.crackednetwork.run.place";
  const onStoreHost = location.hostname.startsWith("store.");
  const isStore = (p) => p === "/store" || p.startsWith("/store/");

  // ---------- helper slug staff (staffTeam ada di main.js) ----------
  let detailOpen = false;
  const slug = (s, i) =>
    (s.name || `${s.role}-${i + 1}`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  // main.js memanggil ini untuk More Info dan Back
  window.pjaxNavigate = (path) => {
    if (path === "/staff-detail") {
      const i = parseInt(sessionStorage.getItem("staffIndex") || "0", 10);
      location.hash = "staff/" + slug(staffTeam[i], i);
      return;
    }
    if (path === "/wiki" && detailOpen) {
      location.hash = "staff";
      return;
    }
    const toStore = isStore(path);
    if (onStoreHost && !toStore) location.href = MAIN + path;
    else if (!onStoreHost && toStore) location.href = STORE + "/";
    else location.href = path;
  };

  // Di domain store: path tampil /store supaya main.js memuat isi store
  if (onStoreHost && location.pathname === "/") {
    history.replaceState(null, "", "/store" + location.search + location.hash);
  }

  // ---------- Wiki: #tab dan #staff/<nama> ----------
  if (!onStoreHost && /^\/wiki\/?$/.test(location.pathname)) {
    const originalTitle = document.title;

    const closeDetail = () => {
      document.getElementById("staffDetailContent")?.remove();
      const page = document.querySelector(".wiki-page");
      if (page) page.style.display = "";
      document.title = originalTitle;
      detailOpen = false;
    };

    const openDetail = (name) => {
      const i = staffTeam.findIndex((s, k) => slug(s, k) === name);
      const page = document.querySelector(".wiki-page");
      if (i < 0 || !page) {
        location.hash = "staff";
        return;
      }
      sessionStorage.setItem("staffIndex", i);
      let box = document.getElementById("staffDetailContent");
      if (!box) {
        box = document.createElement("div");
        box.id = "staffDetailContent";
        box.className = "staff-detail-page";
        page.after(box);
      }
      page.style.display = "none";
      detailOpen = true;
      initStaffDetailPage();
      const s = staffTeam[i];
      document.title = `${s.name || s.role} | CrackedNetwork`;
      if (typeof lenis !== "undefined") lenis.scrollTo(0, { immediate: true });
    };

    const route = () => {
      const h = decodeURIComponent(location.hash.slice(1));
      if (h.startsWith("staff/")) return openDetail(h.slice(6));
      if (detailOpen) closeDetail();
      const tab = h && document.querySelector(`.wiki-tab[data-tab="${CSS.escape(h)}"]`);
      if (tab && !tab.classList.contains("active")) tab.click();
    };

    window.addEventListener("hashchange", route);
    // 'load' = setelah main.js selesai membangun grid dan tab
    window.addEventListener("load", () => {
      document.querySelectorAll(".wiki-tab").forEach((t) =>
        t.addEventListener("click", () =>
          history.replaceState(null, "", "/wiki#" + t.dataset.tab)
        )
      );
      route();
    });
  }

  // Pindah domain = navigasi normal (tanpa swap body)
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
    const u = new URL(a.href, location.href);
    if (u.origin !== MAIN && u.origin !== STORE) return;
    const path = u.pathname + u.search + u.hash;

    if (onStoreHost) {
      if (isStore(u.pathname) || u.pathname === "/") return;
      e.preventDefault();
      location.href = MAIN + path;
    } else if (isStore(u.pathname)) {
      e.preventDefault();
      location.href = STORE + "/" + u.hash;
    }
  });

  // Percepat halaman di www
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
        if (!isStore(p) && !/\.[a-z0-9]+$/i.test(p)) prefetch(p);
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
          ] },
          eagerness: "moderate",
        }],
      });
      document.head.appendChild(s);
    }
  }
})();