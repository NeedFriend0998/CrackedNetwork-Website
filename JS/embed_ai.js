// CrackedNetwork AI Embed
(function() {
    const AI_BASE_URL = 'http://37.114.46.114:2306/';
    const AI_EMBED_ID = 'cn-ai-embed';
    
    // Fungsi bikin iframe
    function createAIEmbed() {
        const container = document.getElementById(AI_EMBED_ID);
        if (!container) return;
        
        const iframe = document.createElement('iframe');
        iframe.src = `${AI_BASE_URL}/chat`;
        iframe.style.cssText = `
            width: 100%;
            height: 600px;
            border: none;
            border-radius: 15px;
            background: #1a1a2e;
        `;
        iframe.setAttribute('loading', 'lazy');
        iframe.setAttribute('title', 'CrackedNetwork AI Assistant');
        
        container.appendChild(iframe);
    }
    
    // Jalanin pas DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createAIEmbed);
    } else {
        createAIEmbed();
    }
})();