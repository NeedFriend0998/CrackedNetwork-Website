// ============================================
// Cloudflare Pages Middleware
// Hapus query string ?p= dari URL sebelum sampai ke origin
// ============================================

export async function onRequest(context) {
    const url = new URL(context.request.url);
    
    // Kalau ada parameter 'p', hapus
    if (url.searchParams.has('p')) {
        url.searchParams.delete('p');
        return Response.redirect(url.toString(), 301);
    }
    
    // Lanjutkan request normal
    return context.next();
}
