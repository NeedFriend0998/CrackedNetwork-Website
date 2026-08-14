(function() {
    const AI_EMBED_ID = 'cn-ai-embed';
    const AI_CHAT_URL = 'https://crackednetwork.netlify.app/.netlify/functions/ai';

    function createAIEmbed() {
        const container = document.getElementById(AI_EMBED_ID);
        if (!container) return;
        const iframe = document.createElement('iframe');
        iframe.src = AI_CHAT_URL;
        iframe.style.cssText = 'width:100%;height:600px;border:none;border-radius:12px;background:#1a1a2e;';
        container.appendChild(iframe);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createAIEmbed);
    } else {
        createAIEmbed();
    }
})();