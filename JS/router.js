// router.js
export function handleRequest(request) {
  const url = new URL(request.url);
  // Jika path diawali dengan /store, redirect ke subdomain store.
  if (url.pathname.startsWith('/store')) {
    const storeUrl = 'https://store.crackednetwork.run.place';
    // Gabungkan sisa path setelah /store (jika ada) ke URL tujuan
    const newUrl = storeUrl + url.pathname.slice('/store'.length) + url.search;
    return Response.redirect(newUrl, 302); // 302 agar aman & instan
  }
  // Jika bukan /store, kembalikan null agar _worker.js melanjutkan ke aset statis
  return null;
}
