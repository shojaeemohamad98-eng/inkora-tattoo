import assert from 'node:assert/strict';
import { toToman } from '../apps/storefront/src/lib/money.mjs';

process.loadEnvFile('apps/storefront/.env');
const base = process.env.WORDPRESS_URL;
assert.ok(base, 'WORDPRESS_URL must be configured');
async function json(path) {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(10000) });
  assert.equal(response.status, 200, `${path} must return HTTP 200`);
  return response.json();
}
const health = await json('/wp-json/inkora/v1/health');
assert.equal(health.plugin, 'inkora-core');
assert.equal(health.woocommerce, true, 'WooCommerce must be active');
const slug = process.env.INKORA_TEST_PRODUCT_SLUG || 'inkora-phase-01-test';
const products = await json(`/wp-json/wc/store/v1/products?slug=${encodeURIComponent(slug)}`);
assert.equal(products.length, 1, 'Exactly one published test product must exist');
const product = products[0];
assert.equal(product.slug, slug);
assert.equal(toToman(product.prices), 125000, 'Test price must be 125,000 toman');
const page = await fetch('http://127.0.0.1:5173/', { signal: AbortSignal.timeout(15000) });
assert.equal(page.status, 200);
const html = await page.text();
const escapedName = product.name.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
assert.ok(html.includes('محصول از WooCommerce دریافت شد'), 'SSR must report real connection');
assert.ok(html.includes(escapedName), 'SSR must show the real product name');
assert.ok(html.includes(`شناسه محصول: ${product.id}`), 'SSR must show the same product ID');
console.log(JSON.stringify({ verified: true, productId: product.id, productName: product.name, toman: toToman(product.prices) }, null, 2));
