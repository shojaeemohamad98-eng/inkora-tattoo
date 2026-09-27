import { error } from '@sveltejs/kit';
import { getCommunity } from '$lib/server/community';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ params, setHeaders }) => {
  setHeaders({ 'cache-control': 'no-store' });
  const data = await getCommunity('artists', params.slug);
  if (data.status !== 'ready' || data.items.length !== 1) error(404, 'Artist not found');
  return { data, profile: data.items[0] };
};
