<script lang="ts">
  import type { MediaKind } from './data';
  let { kind = 'machine', label = 'تصویر مفهومی موقت؛ عکس محصول نیست', large = false }: { kind?: MediaKind; label?: string; large?: boolean } = $props();
</script>
<div class="home-media {kind}" class:large role="img" aria-label={label} data-asset-id="home-css-placeholder" data-temporary="true">
  <div class="media-orbit" aria-hidden="true"></div>
  <div class="media-object" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
  <span class="media-caption" aria-hidden="true">تصویر موقت</span>
</div>
