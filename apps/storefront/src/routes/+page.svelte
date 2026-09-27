<script lang="ts">
  import '$lib/design/tokens.css';
  import '$lib/components/home/home.css';
  import Header from '$lib/components/home/Header.svelte';
  import Hero from '$lib/components/home/Hero.svelte';
  import Categories from '$lib/components/home/Categories.svelte';
  import Tools from '$lib/components/home/Tools.svelte';
  import Editorial from '$lib/components/home/Editorial.svelte';
  import Footer from '$lib/components/home/Footer.svelte';
  import ProductCard from '$lib/components/commerce/ProductCard.svelte';
  import '$lib/components/commerce/store.css';
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
    <section class="home-section" aria-labelledby="real-products"><div class="section-heading"><div><p class="eyebrow">فروشگاه محلی</p><h2 id="real-products">کالاهای واقعی فروشگاه</h2></div><a class="home-action" href="/shop">مشاهده همه کالاها</a></div>
      {#if data.status === 'error'}<p class="future-message" role="status">فهرست واقعی فروشگاه فعلاً در دسترس نیست.</p>{:else if data.products.length}<div class="product-grid">{#each data.products as product}<ProductCard {product} />{/each}</div>{:else}<div class="home-card product-copy"><p>هنوز کالای واقعی و قابل نمایش در WooCommerce ثبت نشده است. محصول تست داخلی در این بخش نمایش داده نمی‌شود.</p><a class="home-action primary" href="/shop">باز کردن فروشگاه</a></div>{/if}
    </section><Categories /><Tools /><Editorial /></main>
  <Footer />
</div>
