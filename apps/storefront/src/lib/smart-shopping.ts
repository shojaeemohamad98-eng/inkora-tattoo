export const smartGroups = ['machine', 'needle', 'ink'] as const;
export const skillLevels = ['beginner', 'intermediate', 'professional'] as const;
export const tattooStyles = ['linework', 'shading', 'color', 'blackwork', 'realism', 'traditional'] as const;
export type SmartGroup = (typeof smartGroups)[number];
export type SkillLevel = (typeof skillLevels)[number];
export type SmartSpecs = Record<string, string | number>;
export type SmartMetadata = { schema_version: '1'; group: SmartGroup; skill_level?: SkillLevel; supported_styles?: string[]; techniques?: string[]; specifications?: SmartSpecs };
export type SmartProduct = { id: number; name: string; slug: string; smart: SmartMetadata };
export type AdvisorAnswers = { group: SmartGroup; skill?: SkillLevel; style?: string };
const includes = <T>(list: T[] | undefined, value: T | undefined) => !value || (list?.includes(value) ?? false);
export function rankProducts(products: SmartProduct[], answers: AdvisorAnswers) {
  return products.filter((product) => product.smart.group === answers.group).map((product) => {
    let score = 0; const reasons: string[] = [];
    if (answers.skill && product.smart.skill_level === answers.skill) { score += 2; reasons.push('سطح مهارت یکسان است'); }
    if (answers.style && includes(product.smart.supported_styles, answers.style)) { score += 1; reasons.push('سبک انتخاب‌شده در دادهٔ محصول ثبت شده است'); }
    return { product, score, reasons };
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name, 'fa'));
}
export function comparable(products: SmartProduct[]) { return products.length > 1 && products.length <= 3 && products.every((product) => product.smart.group === products[0].smart.group); }
export function parseCompareIds(value: string | null) { if (!value) return []; return [...new Set(value.split(',').map((id) => Number(id)).filter((id) => Number.isSafeInteger(id) && id > 0))].slice(0, 3); }
export function transformStyle(transform: { x: number; y: number; scale: number; rotation: number; opacity: number }) { return `translate(${transform.x}px, ${transform.y}px) translate(-50%, -50%) scale(${transform.scale}) rotate(${transform.rotation}deg)`; }
