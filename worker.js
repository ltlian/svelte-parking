export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Redirect bare route prefix to add trailing slash so relative
    // asset URLs (global.css, app.js) resolve correctly.
    if (env.ROUTE_PREFIX && url.pathname === env.ROUTE_PREFIX) {
      return Response.redirect(env.ROUTE_PREFIX + '/', 301);
    }

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

    // Strip the route prefix (e.g. /parking) so the assets fetcher can
    // resolve files at the root of the assets directory.
    if (env.ROUTE_PREFIX && url.pathname.startsWith(env.ROUTE_PREFIX)) {
      const stripped = new URL(request.url);
      stripped.pathname = url.pathname.slice(env.ROUTE_PREFIX.length) || '/';
      return env.ASSETS.fetch(stripped);
    }

    return env.ASSETS.fetch(request);
  }
};
