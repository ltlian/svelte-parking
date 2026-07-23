export async function onRequest(context) {
  const url = context.env.PARKING_API_URL;
  if (!url) {
    return new Response('PARKING_API_URL not configured', { status: 500 });
  }

  const upstream = await fetch(url);
  if (!upstream.ok) {
    return new Response(upstream.body, {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }

  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60'
    }
  });
}
