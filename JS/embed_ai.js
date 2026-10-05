(function() {
    const AI_EMBED_URL = '/ai-embed.html';
    const EMBED_ID = 'cn-ai-embed';

    window.initCnAiEmbed = function() {
        const container = document.getElementById(EMBED_ID);
        if (!container) return;

        // GUARD: kalau iframe udah ada, jangan bikin lagi
        if (container.querySelector('iframe')) {
            console.log('[AI] Embed udah ada, skip.');
            return;
        }

        const iframe = document.createElement('iframe');
        iframe.src = AI_EMBED_URL;
        iframe.style.cssText = `
            width: 100%;
            height: calc(100vh - 64px);
            border: none;
            border-radius: 12px;
            background: #1a1a2e;
            display: block;
        `;
        iframe.setAttribute('title', 'CrackedNetwork AI');
        container.appendChild(iframe);

        // Update tinggi saat viewport di-resize (misal rotasi HP)
        const resizeHandler = () => {
            const h = window.innerHeight - 64;
            iframe.style.height = h + 'px';
        };
        window.addEventListener('resize', resizeHandler);

        // Simpan handler biar bisa di-cleanup kalau perlu
        iframe._resizeHandler = resizeHandler;

        console.log('[AI] Embed loaded.');
    };
})();
