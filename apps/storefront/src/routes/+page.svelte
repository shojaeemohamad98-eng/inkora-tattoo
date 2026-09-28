<script lang="ts">
  import '$lib/design/tokens.css';
  import '$lib/components/home/home.css';
  import Header from '$lib/components/home/Header.svelte';
  import Hero from '$lib/components/home/Hero.svelte';
  import InteractiveShowcase from '$lib/components/home/InteractiveShowcase.svelte';
  import Footer from '$lib/components/home/Footer.svelte';
  import ProductCard from '$lib/components/commerce/ProductCard.svelte';
  import '$lib/components/commerce/store.css';
  import '$lib/components/home/interactive.css';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>
<svelte:head>
  <title>اینکورا | از ایده تا یک تتوی ماندگار</title>
  <meta name="description" content="دنیای تجهیزات و الهام تتو در اینکورا؛ پیش‌نمایش دسته‌بندی‌ها، راهنمای انتخاب و مجله. خرید و خدمات در این نسخه فعال نیستند." />
</svelte:head>
<div class="inkora-theme inkora-home" dir="rtl" id="top">
  <a class="home-skip" href="#main">رفتن به محتوای اصلی</a>
  <Header />
  <main class="home-container" id="main"><Hero />
    <InteractiveShowcase />
    {#if data.products.length}<section class="home-section" aria-labelledby="real-products"><div class="section-heading"><div><p class="eyebrow">متصل به فروشگاه</p><h2 id="real-products">محصولات واقعی WooCommerce</h2></div><a class="home-action" href="/shop">مشاهده همه کالاها</a></div><div class="product-grid">{#each data.products as product}<ProductCard {product} />{/each}</div></section>{/if}
  </main>
  <Footer />
</div>
