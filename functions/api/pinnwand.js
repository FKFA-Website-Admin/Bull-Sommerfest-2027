const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    'SELECT id, name, nachricht, erstellt_am FROM pinnwand ORDER BY erstellt_am DESC'
  ).all();
  return Response.json(results, { headers: CORS });
}

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch {
    return Response.json({ error: 'Ungültiges JSON' }, { status: 400, headers: CORS });
  }

  const { name, nachricht } = body;
  if (!name?.trim() || !nachricht?.trim()) {
    return Response.json({ error: 'Name und Nachricht sind Pflichtfelder' }, { status: 400, headers: CORS });
  }
  if (nachricht.trim().length > 500) {
    return Response.json({ error: 'Nachricht zu lang (max. 500 Zeichen)' }, { status: 400, headers: CORS });
  }

  const { meta } = await env.DB.prepare(
    'INSERT INTO pinnwand (name, nachricht) VALUES (?, ?)'
  ).bind(name.trim(), nachricht.trim()).run();

  return Response.json({ id: meta.last_row_id }, { status: 201, headers: CORS });
}
