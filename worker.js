export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    return new Response(JSON.stringify({
      pathname: url.pathname,
      routePrefix: env.ROUTE_PREFIX,
      parkingApiUrl: env.PARKING_API_URL
    }), { headers: { 'Content-Type': 'application/json' } });
  }
};
