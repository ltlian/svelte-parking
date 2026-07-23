export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.endsWith('/api/parkingAvailability')) {
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

    return env.ASSETS.fetch(request);
  }
};
