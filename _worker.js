// _worker.js
import { handleRequest } from './router.js';

export default {
  async fetch(request, env, ctx) {
    // 1. Jalankan router untuk cek apakah perlu redirect
    const redirectResponse = handleRequest(request);
    if (redirectResponse) {
      return redirectResponse; // Kembalikan response redirect (jika ada)
    }

    // 2. Jika tidak di-redirect, layani aset statis seperti biasa
    //    (env.ASSETS.fetch akan mengambil file dari build output Pages)
    return env.ASSETS.fetch(request);
  }
};
