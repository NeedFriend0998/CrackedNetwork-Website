// CrackedNetwork AI Embed
(function() {
    const AI_BASE_URL = 'http://37.114.46.114:2306/chat';
    const AI_EMBED_ID = 'cn-ai-embed';
    
    function createAIEmbed() {
        const container = document.getElementById(AI_EMBED_ID);
        if (!container) return;
        
        const height = container.dataset.height || '600px';
        
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
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createAIEmbed);
    } else {
        createAIEmbed();
    }
})();