(function() {
    'use strict';

    const CONTENT_SELECTOR = 'main.pages';
    let isNavigating = false;

    async function navigateTo(url, pushState = true) {
        if (isNavigating) return;
        isNavigating = true;

        const currentContent = document.querySelector(CONTENT_SELECTOR);
        if (!currentContent) {
            window.location.href = url;
            return;
        }

        currentContent.style.transition = 'opacity 0.15s ease';
        currentContent.style.opacity = '0';

        try {
            const response = await fetch(url, { headers: { 'X-PJAX': 'true' } });
            if (!response.ok) throw new Error('HTTP ' + response.status);

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const newContent = doc.querySelector(CONTENT_SELECTOR);
            if (!newContent) throw new Error('Content selector not found');

            setTimeout(() => {
                currentContent.innerHTML = newContent.innerHTML;
                currentContent.style.opacity = '1';
                if (pushState) history.pushState({ url: url }, '', url);
                window.scrollTo({ top: 0, behavior: 'instant' });
                if (typeof window.reinitPage === 'function') window.reinitPage();
                isNavigating = false;
            }, 150);
        } catch (err) {
            console.error('[PJAX] Error:', err);
            window.location.href = url;
        }
    }

    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href) return;

        // Abaikan link yang tidak valid atau instruksi khusus
        if (href.startsWith('http') || href.startsWith('//') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
        if (link.target === '_blank' || link.hasAttribute('download') || link.hasAttribute('data-no-pjax')) return;

        const currentHost = window.location.hostname;
        const isStoreDomain = currentHost === 'store.crackednetwork.run.place';
        const isWwwDomain = currentHost === 'www.crackednetwork.run.place' || currentHost === 'crackednetwork.run.place';

        // =========================================================
        // 🚨 JANGAN CEGAT JIKA INI PERPINDAHAN DOMAIN 🚨
        // =========================================================
        
        // Jika di STORE, dan klik link yang BUKAN /store (misal /home)
        if (isStoreDomain && !href.startsWith('/store')) {
            // Biarkan browser melakukan loading ulang secara normal
            return; 
        }

        // Jika di WWW, dan klik link /store
        if (isWwwDomain && href.startsWith('/store')) {
            // Biarkan browser melakukan loading ulang secara normal
            return; 
        }

        // =========================================================
        // JIKA MASIH DI DOMAIN YANG SAMA, JALANKAN PJAX INSTAN
        // =========================================================
        const currentPath = window.location.pathname + window.location.search;
        const targetPath = href.split('#')[0];
        if (currentPath === targetPath) return;

        e.preventDefault();
        navigateTo(href);
    });

    window.addEventListener('popstate', function(e) {
        const url = (e.state && e.state.url) ? e.state.url : window.location.pathname;
        navigateTo(url, false);
    });
})();
