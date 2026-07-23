export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/parkingAvailability') {
      const upstream = await fetch(env.PARKING_API_URL);
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

    // Other paths fall through to static assets from public/
    return new Response('Not Found', { status: 404 });
  }
};
