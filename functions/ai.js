exports.handler = async (event) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: ''
        };
    }

    // Handle GET (misalnya dibuka langsung di browser)
    if (event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'AI Chat API. Kirim POST dengan {"question": "...", "user_id": "..."}' })
        };
    }

    // Handle POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    // Cek body
    if (!event.body) {
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Pertanyaan kosong' })
        };
    }

    let question, user_id;
    try {
        const body = JSON.parse(event.body);
        question = body.question || '';
        user_id = body.user_id || 'web_user';
    } catch (e) {
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Invalid JSON' })
        };
    }

    try {
        const response = await fetch('http://37.114.46.114:2306/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, user_id })
        });

        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        };
    } catch (err) {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Gagal terhubung ke AI server' })
        };
    }
};