import { wordpressBase } from '$lib/server/backend';
export const load = () => ({ previewOnly: !wordpressBase() });
