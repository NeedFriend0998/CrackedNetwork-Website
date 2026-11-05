// functions/suggestions.js
// Proxy HTTPS di Netlify -> server Node.js (HTTP), sama polanya dengan functions/ai.js
// URL publik: https://crackednetwork.netlify.app/.netlify/functions/suggestions

// Alamat server Node.js. Ganti port sesuai PORT server suggestion-mu.
// Bisa juga diatur lewat env var SUGGESTION_SERVER di pengaturan Netlify.
const SERVER = process.env.SUGGESTION_SERVER || '';

// Rahasia bersama antara function ini dan server Node.js (env var SUGGESTION_SECRET di keduanya).
const SECRET = process.env.SUGGESTION_SECRET || '';

const ALLOWED_ORIGINS = [
    'https://www.crackednetwork.run.place',
    'https://crackednetwork.run.place'
];
const LOCAL_ORIGIN = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
const MAX_BODY = 10000;

function isAllowed(origin) {
    return ALLOWED_ORIGINS.includes(origin) || LOCAL_ORIGIN.test(origin);
}

function corsHeaders(origin) {
    if (!origin || !isAllowed(origin)) return {};
    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Vary': 'Origin'
    };
}

function reply(statusCode, bodyObj, origin) {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
            ...corsHeaders(origin)
        },
        body: typeof bodyObj === 'string' ? bodyObj : JSON.stringify(bodyObj)
    };
}

exports.handler = async (event) => {
    const origin = event.headers.origin || event.headers.Origin || '';

    // CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers: corsHeaders(origin), body: '' };
    }

    if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
        return reply(405, { error: 'Method not allowed' }, origin);
    }

    // Hanya website sendiri yang boleh mengirim saran
    if (event.httpMethod === 'POST') {
        if (origin && !isAllowed(origin)) {
            return reply(403, { error: 'Origin tidak diizinkan.' }, origin);
        }
        if (!event.body) {
            return reply(400, { error: 'Data kosong.' }, origin);
        }
        if (event.body.length > MAX_BODY) {
            return reply(413, { error: 'Data terlalu besar.' }, origin);
        }
    }

    // IP asli pengunjung, diteruskan supaya rate limit di server Node.js per-pengunjung
    const clientIp =
        event.headers['x-nf-client-connection-ip'] ||
        event.headers['client-ip'] ||
        '';

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    try {
        const response = await fetch(`${SERVER}/api/suggestions`, {
            method: event.httpMethod,
            headers: {
                'Content-Type': 'application/json',
                'x-proxy-secret': SECRET,
                'x-client-ip': clientIp
            },
            body: event.httpMethod === 'POST' ? event.body : undefined,
            signal: controller.signal
        });

        const text = await response.text();
        // Status dari server (400/429/dll) diteruskan apa adanya agar pesan errornya tampil di form
        return reply(response.status, text, origin);
    } catch (err) {
        return reply(502, { error: 'Gagal terhubung ke server saran.' }, origin);
    } finally {
        clearTimeout(timer);
    }
};
