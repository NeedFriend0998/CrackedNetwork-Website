// ============================================
// PJAX ROUTER - Navigasi Instan Tanpa Reload
// CrackedNetwork
// ============================================

(function() {
    'use strict';

    const CONTENT_SELECTOR = 'main.pages';
    let isNavigating = false;

    // ---------- FUNGSI UTAMA: FETCH & SWAP ----------
    async function navigateTo(url, pushState = true) {
        if (isNavigating) return;
        isNavigating = true;

        const currentContent = document.querySelector(CONTENT_SELECTOR);
        if (!currentContent) {
            window.location.href = url;
            return;
        }

        // Fade out
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

            // Update title
            const newTitle = doc.querySelector('title');
            if (newTitle) document.title = newTitle.textContent;

            // Update meta description
            const newDesc = doc.querySelector('meta[name="description"]');
            if (newDesc) {
                const currentDesc = document.querySelector('meta[name="description"]');
                if (currentDesc) currentDesc.setAttribute('content', newDesc.getAttribute('content'));
            }

            // Swap konten setelah fade out selesai
            setTimeout(() => {
                currentContent.innerHTML = newContent.innerHTML;
                currentContent.style.opacity = '1';

                // Update URL
                if (pushState) {
                    history.pushState({ url: url }, '', url);
                }

                // Scroll ke atas
                window.scrollTo({ top: 0, behavior: 'instant' });

                // Re-init logic halaman baru
                if (typeof window.reinitPage === 'function') {
                    window.reinitPage();
                }

                isNavigating = false;
            }, 150);

        } catch (err) {
            console.error('[PJAX] Error:', err);
            // Fallback: reload normal
            window.location.href = url;
        }
    }

    // ---------- INTERCEPT KLIK LINK ----------
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href) return;

        // Skip link eksternal
        if (href.startsWith('http') || href.startsWith('//')) return;
        // Skip anchor, mailto, tel
        if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
        // Skip custom protocol (crackedlauncher://, ftp://, dll)
if (href.includes('://') && !href.startsWith('http://') && !href.startsWith('https://')) return;
        // Skip target="_blank" atau download
        if (link.target === '_blank' || link.hasAttribute('download')) return;
        // Skip kalau ditandai no-pjax
        if (link.hasAttribute('data-no-pjax')) return;

        // Skip kalau cuma beda hash
        const currentPath = window.location.pathname + window.location.search;
        const targetPath = href.split('#')[0];
        if (currentPath === targetPath) return;

        e.preventDefault();
        navigateTo(href);
    });

    // ---------- HANDLE BACK/FORWARD BROWSER ----------
    window.addEventListener('popstate', function(e) {
        const url = (e.state && e.state.url) ? e.state.url : window.location.pathname;
        navigateTo(url, false);
    });

    // ---------- PREFETCH SAAT HOVER ----------
    document.addEventListener('mouseover', function(e) {
        const link = e.target.closest('a');
        if (!link) return;
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http')) return;
        if (link.dataset.prefetched) return;
        link.dataset.prefetched = 'true';

        const prefetch = document.createElement('link');
        prefetch.rel = 'prefetch';
        prefetch.href = href;
        document.head.appendChild(prefetch);
    });

    // ---------- EXPOSE KE GLOBAL ----------
    window.pjaxNavigate = navigateTo;

})();
