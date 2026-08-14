(function() {
    const AI_BASE_URL = 'http://37.114.46.114:2306';
    const AI_EMBED_ID = 'cn-ai-embed';
    
    function createAIEmbed() {
        const container = document.getElementById(AI_EMBED_ID);
        if (!container) return;
        
        // Baca opsi dari data attribute
        const height = container.dataset.height || '600px';
        
        const iframe = document.createElement('iframe');
        iframe.src = `${AI_BASE_URL}/chat`;
        iframe.style.cssText = `
            width: 100%;
            height: ${height};
            border: none;
            border-radius: 15px;
            background: #1a1a2e;
            box-shadow: 0 4px 20px rgba(0, 255, 136, 0.15);
        `;
        iframe.setAttribute('loading', 'lazy');
        iframe.setAttribute('title', 'CrackedNetwork AI');
        
        container.appendChild(iframe);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createAIEmbed);
    } else {
        createAIEmbed();
    }
})();