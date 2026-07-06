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
    'SELECT id, kategorie, was, name, menge, kommentar, erstellt_am FROM eintraege ORDER BY erstellt_am ASC'
  ).all();
  return Response.json(results, { headers: CORS });
}

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch {
    return Response.json({ error: 'Ungültiges JSON' }, { status: 400, headers: CORS });
  }

  const { kategorie, was, name, menge = '', kommentar = '' } = body;

  if (!kategorie?.trim() || !was?.trim() || !name?.trim()) {
    return Response.json({ error: 'Pflichtfelder fehlen' }, { status: 400, headers: CORS });
  }

  const ERLAUBTE_KATEGORIEN = [
    'Kuchen','Salate','Beilagen','Dips','Dessert','Knabberkram',
    'Getränke alkoholisch','Getränke alkoholfrei','Sonstiges',
  ];
  if (!ERLAUBTE_KATEGORIEN.includes(kategorie)) {
    return Response.json({ error: 'Ungültige Kategorie' }, { status: 400, headers: CORS });
  }

  const { meta } = await env.DB.prepare(
    'INSERT INTO eintraege (kategorie, was, name, menge, kommentar) VALUES (?, ?, ?, ?, ?)'
  ).bind(kategorie, was.trim(), name.trim(), menge.trim(), kommentar.trim()).run();

  return Response.json({ id: meta.last_row_id }, { status: 201, headers: CORS });
}
