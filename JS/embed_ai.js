(function() {
    const AI_URL = 'http://dash.crackednetwork.run.place:2306/chat';
    const EMBED_ID = 'cn-ai-embed';

    function createEmbed() {
        const container = document.getElementById(EMBED_ID);
        if (!container) return;

        const height = container.dataset.height || '600px';

        // 🔥 Buat tombol + coba iframe
        const iframe = document.createElement('iframe');
        iframe.src = AI_URL;
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
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createEmbed);
    } else {
        createEmbed();
    }
})();