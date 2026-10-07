export async function onRequestGet(context) {
    const PANEL_URL = context.env.PTERO_PANEL_URL;
    const API_KEY = context.env.PTERO_API_KEY;
    const SERVER_ID = context.env.PTERO_SERVER_ID;

    if (!PANEL_URL || !API_KEY || !SERVER_ID) {
        return new Response(JSON.stringify({ error: 'Missing env vars' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const headers = {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
    };

    try {
        // 1. Baca .installed_plugins.json (metadata lengkap)
        let installedMeta = [];
        try {
            const metaRes = await fetch(
                `${PANEL_URL}/api/client/servers/${SERVER_ID}/files/contents?file=/.installed_plugins.json`,
                { headers }
            );
            if (metaRes.ok) {
                const text = await metaRes.text();
                installedMeta = JSON.parse(text);
            }
        } catch (e) {
            console.warn('[Plugins] Gagal baca .installed_plugins.json:', e.message);
        }

        // 2. List folder /plugins/ (buat nangkep yang manual upload)
        const listRes = await fetch(
            `${PANEL_URL}/api/client/servers/${SERVER_ID}/files/list?directory=/plugins`,
            { headers }
        );
        if (!listRes.ok) throw new Error('List HTTP ' + listRes.status);
        const listData = await listRes.json();

        const files = (listData.data || [])
            .filter(f => f.attributes.is_file && f.attributes.name.endsWith('.jar'))
            .map(f => ({
                file_name: f.attributes.name,
                size: f.attributes.size,
                modified: f.attributes.modified_at
            }));

        // 3. Gabungin: match by file_name
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
                    installed_at: meta.installed_at || file.modified,
                    size: file.size,
                    tracked: true
                };
            }
            // Plugin manual upload (nggak ada di JSON)
            return {
                name: file.file_name.replace(/\.jar$/i, '').replace(/-[\d.]+.*$/, ''),
                version: file.file_name.match(/-([\d.]+(?:-\w+)?)\.jar$/i)?.[1] || '-',
                file: file.file_name,
                author: '-',
                icon: null,
                provider: 'manual',
                installed_at: file.modified,
                size: file.size,
                tracked: false
            };
        });

        // Sort: plugin dengan icon dulu, terus by name
        merged.sort((a, b) => {
            if (a.tracked !== b.tracked) return a.tracked ? -1 : 1;
            return a.name.localeCompare(b.name);
        });

        return new Response(JSON.stringify({
            total: merged.length,
            tracked: merged.filter(p => p.tracked).length,
            manual: merged.filter(p => !p.tracked).length,
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
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}