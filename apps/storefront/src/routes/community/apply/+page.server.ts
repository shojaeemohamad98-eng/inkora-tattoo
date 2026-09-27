import { getCommunity } from '$lib/server/community';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ setHeaders }) => { setHeaders({ 'cache-control': 'no-store' }); return { data: await getCommunity('artists') }; };
