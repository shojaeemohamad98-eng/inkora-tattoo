import { communityPage, getCommunity } from '$lib/server/community';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ url, setHeaders }) => { setHeaders({ 'cache-control': 'no-store' }); return { data: await getCommunity('portfolio', undefined, communityPage(url)) }; };
