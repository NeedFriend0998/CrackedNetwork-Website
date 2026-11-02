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
        if (!href || href.startsWith('#') || href.startsWith('http') || link.hasAttribute('data-no-pjax')) return;

        const currentHost = window.location.hostname;
        const isStoreDomain = currentHost === 'store.crackednetwork.run.place';
        const isWwwDomain = currentHost === 'www.crackednetwork.run.place' || currentHost === 'crackednetwork.run.place';

        // Jika pindah domain, biarkan browser reload agar _worker.js bisa redirect
        if (isStoreDomain && !href.startsWith('/store')) {
            window.location.href = href;
            return;
        }
        if (isWwwDomain && href.startsWith('/store')) {
            window.location.href = href;
            return;
        }

        e.preventDefault();
        navigateTo(href);
    });
})();
