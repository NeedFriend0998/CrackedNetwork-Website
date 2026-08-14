// CrackedNetwork AI Embed - HTTP Compatible
(function() {
    const AI_BASE_URL = 'https://crackednetwork.netlify.app/.netlify/functions/ai';
    const AI_EMBED_ID = 'cn-ai-embed';

    function createAIEmbed() {
        const container = document.getElementById(AI_EMBED_ID);
        if (!container) return;

        const height = container.dataset.height || '600px';

        // 🔥 Cara 1: Iframe langsung (browser mungkin blokir)
        const iframe = document.createElement('iframe');
        iframe.src = `${AI_BASE_URL}/chat`;
        iframe.style.cssText = `
            width: 100%;
            height: ${height};
            border: none;
            border-radius: 12px;
            background: #1a1a2e;
            display: block;
        `;
        iframe.setAttribute('loading', 'lazy');
        iframe.setAttribute('title', 'CrackedNetwork AI Assistant');
        iframe.setAttribute('allow', 'clipboard-read; clipboard-write');
        
        container.appendChild(iframe);

        // 🔥 Cara 2: Fallback pakai window.open kalau iframe diblokir
        iframe.addEventListener('error', function() {
            const fallbackBtn = document.createElement('button');
            fallbackBtn.textContent = 'Open AI Chat';
            fallbackBtn.style.cssText = `
                display: block;
                margin: 20px auto;
                padding: 12px 24px;
                background: #00ff88;
                color: #1a1a2e;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                font-weight: bold;
                font-size: 1em;
            `;
            fallbackBtn.onclick = function() {
                window.open(`${AI_BASE_URL}/chat`, '_blank');
            };
            container.innerHTML = '';
            container.appendChild(fallbackBtn);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createAIEmbed);
    } else {
        createAIEmbed();
    }
})();