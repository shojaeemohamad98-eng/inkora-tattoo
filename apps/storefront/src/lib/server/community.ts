import { dev } from '$app/environment';
import { wordpressBase } from './backend';
import type { CommunityItem, CommunityData } from '$lib/community';

function item(value: unknown): CommunityItem {
  const v = value as Partial<CommunityItem>;
  if (!v || typeof v.slug !== 'string' || !/^[a-z0-9-]{1,100}$/.test(v.slug) ||
    typeof v.name !== 'string' || typeof v.bio !== 'string' || v.approved !== true ||
    !Array.isArray(v.styles) || !v.styles.every(x => typeof x === 'string') ||
    !Array.isArray(v.tags) || !v.tags.every(x => typeof x === 'string')) throw new Error('Invalid community item');
  return { slug: v.slug, name: v.name, bio: v.bio, styles: v.styles, tags: v.tags, approved: true };
}

export async function getCommunity(kind: 'artists' | 'portfolio', slug?: string, page = 1): Promise<CommunityData> {
  let portal = '';
  try {
    const base = wordpressBase();
    if (!base) throw new Error('Community unavailable');
    if (!['http:', 'https:'].includes(base.protocol)) throw new Error('Invalid WordPress URL');
    portal = dev ? new URL('/wp-admin/admin-post.php?action=inkora_community_portal', base).href : '';
    const url = new URL(`/wp-json/inkora/v1/community/${kind}`, base);
    if (slug) url.searchParams.set('slug', slug);
    url.searchParams.set('page', String(page));
    const response = await fetch(url, { signal: AbortSignal.timeout(8000), cache: 'no-store', headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Community unavailable');
    const data = await response.json();
    if (data.schema_version !== 1 || !Array.isArray(data.items) || data.items.length > 12) throw new Error('Invalid community response');
    return { status: 'ready', items: data.items.map(item), portal, page };
  } catch {
    return { status: 'error', items: [], portal, page };
  }
}

export function communityPage(url: URL) {
  const value = Number(url.searchParams.get('page') || '1');
  return Number.isInteger(value) && value >= 1 && value <= 100 ? value : 1;
}
