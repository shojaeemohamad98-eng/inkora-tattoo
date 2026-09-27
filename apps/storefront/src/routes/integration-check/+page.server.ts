import { getTestProduct } from '$lib/server/commerce';
import { toToman } from '$lib/money.mjs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
  setHeaders({ 'cache-control': 'no-store' });
  try {
    const product = await getTestProduct();
    if (!product) return { status: 'empty', product: null, toman: null };
    return { status: 'connected', product, toman: toToman(product.prices) };
  } catch (error) {
    console.error('[commerce]', error instanceof Error ? error.message : 'Unknown failure');
    return { status: 'unavailable', product: null, toman: null };
  }
};
