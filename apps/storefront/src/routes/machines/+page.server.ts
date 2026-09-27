import { loadExperience } from '$lib/server/experiences';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ setHeaders }) => { setHeaders({ 'cache-control': 'no-store' }); try { return { status: 'ready' as const, ...(await loadExperience('machines')) }; } catch { return { status: 'error' as const, products: [], articles: [] }; } };
