import { wordpressBase } from '$lib/server/backend';
export const load = () => {
  const base = wordpressBase();
  return { wordpressAccount: base ? new URL('/my-account/', base).href : null };
};
