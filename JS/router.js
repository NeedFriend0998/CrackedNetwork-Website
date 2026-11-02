// router.js
export const routes = {
  // Rute untuk /store akan diarahkan ke subdomain.
  // Tanda '/*' menangkap semua sub-path di bawah /store.
  '/store/*': {
    redirectTo: 'https://store.crackednetwork.run.place',
    // 'preservePath' akan meneruskan path setelah /store.
    // Contoh: /store/product/1 -> https://store.crackednetwork.run.place/product/1
    preservePath: true, 
    status: 301, // 301 untuk permanen, 302 untuk sementara
  },
  // Anda bisa menambahkan rute lain di sini jika perlu.
};

// Fungsi helper untuk mencocokkan path dengan pola di routes
export function matchRoute(pathname) {
  for (const pattern in routes) {
    // Mengubah pola '/store/*' menjadi regex untuk mencocokkan path
    const regexPattern = pattern
      .replace(/\*/g, '.*') // Ganti * dengan .*
      .replace(/\//g, '\\/'); // Escape slash
    const regex = new RegExp(`^${regexPattern}$`);
    
    if (regex.test(pathname)) {
      return { pattern, config: routes[pattern] };
    }
  }
  return null;
}
