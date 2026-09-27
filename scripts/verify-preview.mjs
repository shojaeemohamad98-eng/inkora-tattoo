import assert from 'node:assert/strict';
const base = process.argv[2] || 'http://127.0.0.1:4187';
const publicRoutes = ['/', '/shop', '/cart', '/checkout', '/account', '/machines', '/needles', '/inks', '/aftercare', '/stencil', '/accessories', '/about', '/advisor', '/compare', '/simulator', '/journal', '/community', '/artists', '/portfolio'];
for (const route of publicRoutes) {
  const res = await fetch(base + route);
  assert.equal(res.status, 200, route);
  assert.match(res.headers.get('x-robots-tag') || '', /noindex/, route);
  const html = await res.text();
  assert.match(html, /پیش‌نمایش اینکورا/, route);
  assert.doesNotMatch(html, /https?:\/\/[^\s"<>]*\.(?:local|test)\b|logo-04-preview|admin-post\.php/, route);
  console.log('PASS', route);
}
for (const route of ['/design-system', '/design-system/__data.json', '/integration-check', '/integration-check/__data.json', '/community/apply', '/community/apply/__data.json', '/admin', '/wp-admin']) {
  assert.equal((await fetch(base + route)).status, 404, route);
  console.log('BLOCKED', route);
}
for (const method of ['GET', 'POST']) {
  const res = await fetch(base + '/api/cart', { method });
  assert.equal(res.status, 503);
  assert.equal(res.headers.get('set-cookie'), null);
  assert.match(res.headers.get('cache-control') || '', /no-store/);
  console.log('DISABLED', method, '/api/cart');
}
