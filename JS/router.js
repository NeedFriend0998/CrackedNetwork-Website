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
            const response = await fetch(url, {
                headers: { 'X-PJAX': 'true' }
            });
            if (!response.ok) throw new Error('HTTP ' + response.status);

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const newContent = doc.querySelector(CONTENT_SELECTOR);
            if (!newContent) throw new Error('Content selector not found');

            const newTitle = doc.querySelector('title');
            if (newTitle) document.title = newTitle.textContent;

            const newDesc = doc.querySelector('meta[name="description"]');
            if (newDesc) {
                const currentDesc = document.querySelector('meta[name="description"]');
                if (currentDesc) currentDesc.setAttribute('content', newDesc.getAttribute('content'));
            }

            setTimeout(() => {
                currentContent.innerHTML = newContent.innerHTML;
                currentContent.style.opacity = '1';

                if (pushState) {
                    history.pushState({ url: url }, '', url);
                }

                window.scrollTo({ top: 0, behavior: 'instant' });

                if (typeof window.reinitPage === 'function') {
                    window.reinitPage();
                }

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

        if (href.startsWith('http') || href.startsWith('//')) return;
        if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
        if (href.includes('://') && !href.startsWith('http://') && !href.startsWith('https://')) return;
        if (link.target === '_blank' || link.hasAttribute('download')) return;
        if (link.hasAttribute('data-no-pjax')) return;

        // =========================================================
        // 🚨 LOGIKA PENCEGATAN DOMAIN 🚨
        // =========================================================
        const currentHost = window.location.hostname;
        const isStoreDomain = currentHost === 'store.crackednetwork.run.place';
        const isWwwDomain = currentHost === 'www.crackednetwork.run.place' || currentHost === 'crackednetwork.run.place';

        // 1. Jika di STORE, dan klik link yang BUKAN /store (misal /home)
        if (isStoreDomain && !href.startsWith('/store')) {
            window.location.href = href; // Biarkan browser reload, _worker.js yang akan redirect
            return;
        }

        // 2. Jika di WWW, dan klik link /store
        if (isWwwDomain && href.startsWith('/store')) {
            window.location.href = href; // Biarkan browser reload, _worker.js yang akan redirect
            return;
        }
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
