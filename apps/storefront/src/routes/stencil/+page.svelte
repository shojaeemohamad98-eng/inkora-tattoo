<script lang="ts">import ExperiencePage from '$lib/components/experiences/ExperiencePage.svelte'; import { experienceFor } from '$lib/components/experiences/data'; import type { PageData } from './$types'; let { data }: { data: PageData } = $props();</script>
<ExperiencePage definition={experienceFor('stencil')} products={data.products} articles={data.articles} status={data.status} />
