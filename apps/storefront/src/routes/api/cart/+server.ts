import { json, error, type RequestHandler } from '@sveltejs/kit';
import { requestCart } from '$lib/server/commerce';

function sameOrigin(request: Request, url: URL) {
  const origin = request.headers.get('origin');
  return !origin || origin === url.origin;
}
export const GET: RequestHandler = async ({ cookies }) => json(await requestCart(cookies));
export const POST: RequestHandler = async ({ request, cookies, url }) => {
  if (!sameOrigin(request, url)) throw error(403, 'درخواست نامعتبر است.');
  const body: unknown = await request.json().catch(() => null);
  const input = body as { action?: string; id?: unknown; key?: unknown; quantity?: unknown };
  const quantity = Number(input?.quantity);
  let path: string;
  if (input?.action === 'add' && Number.isInteger(input.id) && Number.isInteger(quantity) && quantity > 0 && quantity <= 9999) path = `cart/add-item?id=${input.id}&quantity=${quantity}`;
  else if (input?.action === 'update' && typeof input.key === 'string' && input.key.length <= 128 && Number.isInteger(quantity) && quantity >= 0 && quantity <= 9999) path = `cart/update-item?key=${encodeURIComponent(input.key)}&quantity=${quantity}`;
  else if (input?.action === 'remove' && typeof input.key === 'string' && input.key.length <= 128) path = `cart/remove-item?key=${encodeURIComponent(input.key)}`;
  else throw error(400, 'اطلاعات سبد معتبر نیست.');
  try { return json(await requestCart(cookies, path, { method: 'POST' })); }
  catch (cause) { throw error(400, cause instanceof Error ? cause.message : 'سبد خرید به‌روزرسانی نشد.'); }
};
