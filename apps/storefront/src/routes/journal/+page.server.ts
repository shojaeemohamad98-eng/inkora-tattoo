import { getReviewedJournalArticles } from '$lib/server/commerce'; import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ setHeaders }) => { setHeaders({ 'cache-control': 'no-store' }); try { return { status: 'ready', articles: await getReviewedJournalArticles() }; } catch { return { status: 'error', articles: [] }; } };
