import { test } from 'node:test';
import assert from 'node:assert/strict';
import { comparable, parseCompareIds, rankProducts, transformStyle } from '../apps/storefront/src/lib/smart-shopping.mjs';
const machine = (id, skill = 'beginner', styles = ['linework']) => ({ id, name: `کالای ${id}`, slug: `p-${id}`, smart: { schema_version: '1', group: 'machine', skill_level: skill, supported_styles: styles } });
test('ranking only returns documented matches and puts exact skill first', () => { const results = rankProducts([machine(1), machine(2, 'professional', ['color'])], { group: 'machine', skill: 'beginner', style: 'linework' }); assert.equal(results.length, 1); assert.equal(results[0].product.id, 1); assert.equal(results[0].score, 3); });
test('comparison accepts two or three products from one group only', () => { assert.equal(comparable([machine(1), machine(2)]), true); assert.equal(comparable([machine(1)]), false); assert.equal(comparable([machine(1), { ...machine(2), smart: { schema_version:'1', group:'ink' } }]), false); });
test('compare URL IDs are unique, positive and capped at three', () => assert.deepEqual(parseCompareIds('2,2,-1,no,3,4,5'), [2,3,4]));
test('simulator transform uses the supplied local transform values', () => assert.equal(transformStyle({ x: 25, y: 75, scale: 1.2, rotation: -15, opacity: .5 }), 'translate(25px, 75px) translate(-50%, -50%) scale(1.2) rotate(-15deg)'));
