import { test } from 'node:test';
import assert from 'node:assert/strict';
import { eligibleExperienceProducts, isExperienceKey } from '../apps/storefront/src/lib/experiences.mjs';

const product = (overrides = {}) => ({
  id: 1, name: 'کالای واقعی', slug: 'real-product', description: '', short_description: '', sku: '',
  prices: { price: '1', currency_code: 'IRR', currency_minor_unit: 0 }, images: [], is_purchasable: true,
  is_in_stock: true, stock_availability: { text: 'موجود' }, has_options: false, categories: [], ...overrides
});

test('experience routes are limited to the seven published experiences', () => {
  assert.equal(isExperienceKey('machines'), true);
  assert.equal(isExperienceKey('about'), true);
  assert.equal(isExperienceKey('unknown'), false);
  assert.equal(isExperienceKey(12), false);
});

test('experience products require real in-stock data and a documented group', () => {
  const machine = product({ id: 2, inkora_smart: { group: 'machine' } });
  const unavailable = product({ id: 3, is_in_stock: false, inkora_smart: { group: 'machine' } });
  const ink = product({ id: 4, inkora_smart: { group: 'ink' } });
  assert.deepEqual(eligibleExperienceProducts([machine, unavailable, ink], 'machine').map((item) => item.id), [2]);
});

test('category experiences do not invent a fallback product', () => {
  const stencil = product({ id: 5, categories: [{ id: 1, slug: 'stencil-transfer', name: 'استنسیل و انتقال', count: 1, image: null }] });
  const unrelated = product({ id: 6, categories: [{ id: 2, slug: 'other', name: 'سایر', count: 1, image: null }] });
  assert.deepEqual(eligibleExperienceProducts([stencil, unrelated], undefined, ['stencil', 'استنسیل']).map((item) => item.id), [5]);
});
