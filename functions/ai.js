exports.handler = async (event) => {
    const { question, user_id } = JSON.parse(event.body);

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
};