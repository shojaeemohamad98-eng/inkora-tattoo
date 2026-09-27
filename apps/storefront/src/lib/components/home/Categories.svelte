<script lang="ts">
  import { categories } from './data';
  import Media from './Media.svelte';
  import Icon from './Icon.svelte';
</script>
<section id="categories" class="home-section" aria-labelledby="categories-title">
  <div class="section-heading"><div><p class="eyebrow">ابزارِ خلق</p><h2 id="categories-title">از کجا شروع می‌کنی؟</h2></div><p>دسته‌های پیشنهادی؛ کاتالوگ در فاز بعد</p></div>
  <div class="category-grid">{#each categories as category}<a class="home-card category-card" href={category.href || '/shop'} data-category={category.id}><Media kind={category.kind} /><div class="category-copy"><h3>{category.title}</h3><span dir="ltr">{category.english}</span><Icon name="arrow" /></div></a>{/each}</div>
</section>
