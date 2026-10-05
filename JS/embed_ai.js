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

        const height = container.dataset.height || '600px';

        const iframe = document.createElement('iframe');
        iframe.src = AI_EMBED_URL;
        iframe.style.cssText = `
            width: 100%;
            height: ${height};
            border: none;
            border-radius: 12px;
            background: #1a1a2e;
            display: block;
        `;
        iframe.setAttribute('title', 'CrackedNetwork AI');
        container.appendChild(iframe);

        console.log('[AI] Embed loaded.');
    };
})();
