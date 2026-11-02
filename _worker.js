// _worker.js
import { routes, matchRoute } from './router.js';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const { pathname } = url;

    // 1. Cek apakah ada rute yang cocok di router.js
    const matched = matchRoute(pathname);

    if (matched) {
      const { config } = matched;

      // 2. Jika rute adalah redirect (seperti /store)
      if (config.redirectTo) {
        let destination = config.redirectTo;
        
        // Jika preservePath true, tambahkan sisa path ke URL tujuan
        if (config.preservePath) {
          const remainderPath = pathname.replace('/store', ''); // Menghapus '/store' dari path
          if (remainderPath && remainderPath !== '/') {
            destination = destination.replace(/\/$/, '') + remainderPath;
          }
        }
        
        // Lakukan redirect
        return Response.redirect(destination, config.status || 302);
      }
    }

    // 3. Jika tidak ada rute yang cocok (misal: /home, /wiki), lanjutkan request seperti biasa
    return fetch(request);
  },
};
