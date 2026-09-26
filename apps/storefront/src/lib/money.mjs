/** Convert Store API minor units to toman, without silently assuming currency.
 * @param {{price: string, currency_code: string, currency_minor_unit: number}} prices
 */
export function toToman(prices) {
  if (!/^\d+$/.test(prices.price) || !Number.isInteger(prices.currency_minor_unit) || prices.currency_minor_unit < 0 || prices.currency_minor_unit > 6) throw new Error('Invalid price');
  const minor = Number(prices.price);
  if (!Number.isSafeInteger(minor)) throw new Error('Unsafe price');
  const major = minor / 10 ** prices.currency_minor_unit;
  if (prices.currency_code === 'IRR') return major / 10;
  if (prices.currency_code === 'IRT') return major;
  throw new Error('Unsupported currency');
}
