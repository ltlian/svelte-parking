export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Strip route prefix (e.g. /parking) so routing and asset serving
    // operate against the root of the assets directory.
    let pathname = url.pathname;
    if (env.ROUTE_PREFIX && pathname.startsWith(env.ROUTE_PREFIX)) {
      pathname = pathname.slice(env.ROUTE_PREFIX.length) || '/';
    }

    if (pathname === '/api/parkingAvailability') {
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

    const assetUrl = new URL(request.url);
    assetUrl.pathname = pathname;
    return env.ASSETS.fetch(assetUrl);
  }
};
