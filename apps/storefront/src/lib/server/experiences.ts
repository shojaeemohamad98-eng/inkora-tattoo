import { eligibleExperienceProducts } from '$lib/experiences.mjs';
import { experienceFor, type ExperienceKey } from '$lib/components/experiences/data';
import { getProducts, getReviewedJournalArticles } from '$lib/server/commerce';

export async function loadExperience(key: ExperienceKey) {
  const definition = experienceFor(key);
  const [products, articles] = await Promise.all([getProducts(), key === 'aftercare' ? getReviewedJournalArticles() : Promise.resolve([])]);
  return { products: eligibleExperienceProducts(products, definition.group, definition.categoryWords), articles };
}
