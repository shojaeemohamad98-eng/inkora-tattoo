/** @typedef {import('./server/commerce.ts').StoreProduct} StoreProduct */
export const experienceKeys = new Set(/** @type {string[]} */ (['machines', 'needles', 'inks', 'aftercare', 'stencil', 'accessories', 'about']));
/** @param {unknown} value */
export function isExperienceKey(value) { return typeof value === 'string' && experienceKeys.has(value); }
/**
 * @param {StoreProduct[]} products
 * @param {string | undefined} group
 * @param {readonly string[]} [categoryWords]
 * @returns {StoreProduct[]}
 */
export function eligibleExperienceProducts(products, group, categoryWords = []) {
  return products.filter((product) => {
    if (!product?.is_in_stock) return false;
    if (group) return product.inkora_smart?.group === group;
    const names = product.categories?.map((category) => `${category.slug} ${category.name}`.toLowerCase()).join(' ') || '';
    return categoryWords.some((word) => names.includes(word.toLowerCase()));
  });
}
