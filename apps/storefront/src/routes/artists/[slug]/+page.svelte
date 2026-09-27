<script lang="ts">
  import CommunityPage from '$lib/components/community/CommunityPage.svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>
<CommunityPage data={data.data} profile={data.profile} view="profile" />
