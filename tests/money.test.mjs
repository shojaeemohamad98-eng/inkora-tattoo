import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toToman } from '../apps/storefront/src/lib/money.mjs';
test('rial is converted exactly once to toman', () => assert.equal(toToman({ price: '1250000', currency_code: 'IRR', currency_minor_unit: 0 }), 125000));
test('minor units are respected', () => assert.equal(toToman({ price: '125000000', currency_code: 'IRR', currency_minor_unit: 2 }), 125000));
test('toman is not divided again', () => assert.equal(toToman({ price: '125000', currency_code: 'IRT', currency_minor_unit: 0 }), 125000));
test('unknown currencies and malformed prices fail visibly', () => {
  assert.throws(() => toToman({ price: '100', currency_code: 'USD', currency_minor_unit: 2 }));
  assert.throws(() => toToman({ price: 'NaN', currency_code: 'IRR', currency_minor_unit: 0 }));
});
