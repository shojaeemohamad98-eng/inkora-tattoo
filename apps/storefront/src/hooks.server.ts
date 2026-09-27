import { dev } from '$app/environment';
import { error, json, type Handle } from '@sveltejs/kit';
import { wordpressBase } from '$lib/server/backend';

export const handle: Handle = async ({ event, resolve }) => {
  const route = event.route.id || event.url.pathname;
  if (!dev && /^\/(design-system|integration-check|community\/apply|admin|wp-admin)(\/|$)/.test(route)) {
    error(404, 'صفحه پیدا نشد.');
  }
  if (route === '/api/cart' && !wordpressBase()) {
    return json({ message: 'سبد خرید در پیش‌نمایش فعال نیست.' }, { status: 503, headers: { 'cache-control': 'no-store' } });
  }
  const response = await resolve(event);
  if (!wordpressBase()) response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
};
