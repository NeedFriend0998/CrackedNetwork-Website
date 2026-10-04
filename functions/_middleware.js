// functions/_middleware.js
// Rewrite /ai, /wiki, /store, dll ke /[page]/index.html tanpa redirect

export async function onRequest(context) {
    const url = new URL(context.request.url);
    const path = url.pathname;

    // Daftar halaman yang punya folder sendiri
    const pages = ['home', 'gamemodes', 'wiki', 'rules', 'vote', 'store', 'ai', 'discord', 'forums', 'plugins', 'donate', 'legal', 'terms-of-service', 'privacy-policy', 'staff-detail'];

    // Ambil segmen pertama dari path (misal /ai dari /ai/atau /ai)
    const segments = path.split('/').filter(Boolean);
    const firstSegment = segments[0];

    // Kalau path adalah salah satu halaman, DAN TIDAK ADA trailing slash
    // (artinya request ke /ai, bukan /ai/)
    if (pages.includes(firstSegment) && !path.endsWith('/')) {
        // Rewrite ke /[page]/index.html
        const newUrl = new URL(`/${firstSegment}/index.html`, url.origin);
        // Pertahankan query string kalau ada
        newUrl.search = url.search;
        
        // Pakai env.ASSETS.fetch() buat ngambil file statis
        return context.env.ASSETS.fetch(newUrl);
    }

    // Kalau bukan, lanjutkan request normal
    return context.next();
}
