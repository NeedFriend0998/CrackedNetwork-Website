export async function onRequestGet(context) {
    const PANEL_URL = context.env.PTERO_PANEL_URL;
    const API_KEY = context.env.PTERO_API_KEY;
    const SERVERS_JSON = context.env.PTERO_SERVERS;

    if (!PANEL_URL || !API_KEY || !SERVERS_JSON) {
        return new Response(JSON.stringify({ error: 'Missing env vars' }), {
            status: 500, headers: { 'Content-Type': 'application/json' }
        });
    }

    let SERVERS;
    try {
        SERVERS = JSON.parse(SERVERS_JSON);
    } catch (e) {
        return new Response(JSON.stringify({ error: 'PTERO_SERVERS bukan JSON valid' }), {
            status: 500, headers: { 'Content-Type': 'application/json' }
        });
    }

    // Ambil server dari query param, default server pertama
    const url = new URL(context.request.url);
    const requestedServer = url.searchParams.get('server');
    const serverName = requestedServer && SERVERS[requestedServer]
        ? requestedServer
        : Object.keys(SERVERS)[0];
    const serverId = SERVERS[serverName];

    const headers = {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
    };

    try {
        // Baca .installed_plugins.json
        let installedMeta = [];
        try {
            const metaRes = await fetch(
                `${PANEL_URL}/api/client/servers/${serverId}/files/contents?file=/.installed_plugins.json`,
                { headers }
            );
            if (metaRes.ok) installedMeta = JSON.parse(await metaRes.text());
        } catch (e) { /* skip */ }

        // List folder /plugins/
        const listRes = await fetch(
            `${PANEL_URL}/api/client/servers/${serverId}/files/list?directory=/plugins`,
            { headers }
        );
        if (!listRes.ok) throw new Error('HTTP ' + listRes.status);
        const listData = await listRes.json();

        const files = (listData.data || [])
            .filter(f => f.attributes.is_file && f.attributes.name.endsWith('.jar'))
            .map(f => ({
                file_name: f.attributes.name,
                size: f.attributes.size,
                modified: f.attributes.modified_at
            }));

        const merged = files.map(file => {
            const meta = installedMeta.find(m => m.file_name === file.file_name);
            if (meta) {
                return {
                    name: meta.plugin_name || file.file_name.replace(/\.jar$/i, ''),
                    version: file.file_name.match(/-([\d.]+(?:-\w+)?)\.jar$/i)?.[1] || '-',
                    file: file.file_name,
                    author: meta.plugin_author || '-',
                    icon: meta.plugin_icon || null,
                    provider: meta.provider || 'manual',
                    size: file.size,
                    tracked: true
                };
            }
            return {
                name: file.file_name.replace(/\.jar$/i, '').replace(/-[\d.]+.*$/, ''),
                version: file.file_name.match(/-([\d.]+(?:-\w+)?)\.jar$/i)?.[1] || '-',
                file: file.file_name,
                author: '-',
                icon: null,
                provider: 'manual',
                size: file.size,
                tracked: false
            };
        });

        merged.sort((a, b) => {
            if (a.tracked !== b.tracked) return a.tracked ? -1 : 1;
            return a.name.localeCompare(b.name);
        });

        return new Response(JSON.stringify({
            server: serverName,
            servers: Object.keys(SERVERS),
            total: merged.length,
            tracked: merged.filter(p => p.tracked).length,
            plugins: merged
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=60',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500, headers: { 'Content-Type': 'application/json' }
        });
    }
}