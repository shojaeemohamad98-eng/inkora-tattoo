export type ClientCart = { items: Array<{ key: string; id: number; name: string; quantity: number; quantity_limits: { minimum: number; maximum: number; editable: boolean }; prices: { price: string; currency_code: string; currency_minor_unit: number }; totals: { line_total: string; price: string; currency_code: string; currency_minor_unit: number }; images: Array<{ src: string; thumbnail: string; alt: string }> }>; totals: { total_price: string; price: string; currency_code: string; currency_minor_unit: number; total_shipping: string | null }; items_count: number; needs_shipping: boolean; needs_payment: boolean; shipping_rates: unknown[]; payment_methods: string[] };
export async function cartRequest(body?: unknown): Promise<ClientCart> {
  const response = await fetch('/api/cart', { method: body ? 'POST' : 'GET', credentials: 'same-origin', headers: body ? { 'content-type': 'application/json', accept: 'application/json' } : { accept: 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) throw new Error(typeof (payload as any)?.message === 'string' ? (payload as any).message : 'سبد خرید به‌روزرسانی نشد.');
  return payload as ClientCart;
}
export function announceCart(cart: ClientCart) { window.dispatchEvent(new CustomEvent('inkora:cart-updated', { detail: cart })); }
