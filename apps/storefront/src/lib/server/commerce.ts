import { env } from '$env/dynamic/private';

export type Product = {
  id: number; name: string; slug: string;
  prices: { price: string; currency_code: string; currency_minor_unit: number };
};

export async function getTestProduct(): Promise<Product | null> {
  if (!env.WORDPRESS_URL) throw new Error('WORDPRESS_URL is not configured');
  const url = new URL('/wp-json/wc/store/v1/products', env.WORDPRESS_URL);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Invalid API protocol');
  url.searchParams.set('slug', env.INKORA_TEST_PRODUCT_SLUG || 'inkora-phase-01-test');
  url.searchParams.set('per_page', '1');
  const response = await fetch(url, { signal: AbortSignal.timeout(8000), headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Store API HTTP ${response.status}`);
  const items: unknown = await response.json();
  if (!Array.isArray(items)) throw new Error('Invalid product response');
  if (items.length === 0) return null;
  const p = items[0];
  if (!Number.isInteger(p?.id) || typeof p?.name !== 'string' || typeof p?.slug !== 'string' || typeof p?.prices?.price !== 'string' || typeof p?.prices?.currency_code !== 'string' || !Number.isInteger(p?.prices?.currency_minor_unit)) throw new Error('Invalid product contract');
  return { id: p.id, name: p.name, slug: p.slug, prices: { price: p.prices.price, currency_code: p.prices.currency_code, currency_minor_unit: p.prices.currency_minor_unit } };
}
