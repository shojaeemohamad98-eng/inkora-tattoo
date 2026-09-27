import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

// Preview never connects to a shop, even when a developer's .env is present.
export function wordpressBase(): URL | null {
  if (env.VERCEL_ENV === 'preview' || !env.WORDPRESS_URL) return null;
  if (!dev && env.INKORA_BACKEND_ENABLED !== 'true') return null;
  try {
    const url = new URL(env.WORDPRESS_URL);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return null;
    if (!dev && (url.protocol !== 'https:' || !url.hostname.includes('.') ||
      /(^localhost$|\.local$|\.test$|\.internal$|^\d+\.\d+\.\d+\.\d+$|:)/i.test(url.hostname))) return null;
    return url;
  } catch { return null; }
}
