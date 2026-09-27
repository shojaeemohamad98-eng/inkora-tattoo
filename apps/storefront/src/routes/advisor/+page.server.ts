import { getSmartProducts } from '$lib/server/commerce'; import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ setHeaders }) => { setHeaders({ 'cache-control': 'no-store' }); try { return { status: 'ready', products: await getSmartProducts() }; } catch { return { status: 'error', products: [] }; } };
