import { requestCart } from '$lib/server/commerce'; import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ cookies, setHeaders }) => { setHeaders({ 'cache-control': 'no-store' }); try { return { status: 'ready', cart: await requestCart(cookies) }; } catch { return { status: 'error', cart: null }; } };
