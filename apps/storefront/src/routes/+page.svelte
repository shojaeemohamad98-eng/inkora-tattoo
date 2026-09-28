<script lang="ts">
  import { onMount } from 'svelte';
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
  let pageRoot: HTMLDivElement;

  onMount(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = Array.from(pageRoot.querySelectorAll<HTMLElement>([
      '.home-hero > *',
      '.trust-strip > div',
      '.section-title-row > *',
      '.glass-product',
      '.interactive-grid > article',
      '.commerce-grid > article',
      '.signature-finder > *',
      '.content-grid > article',
      '.idea-grid > article',
      '.home-section .section-heading',
      '.home-section .store-card',
      '.brands-row > *',
      '.footer-grid > *'
    ].join(',')));

    targets.forEach((target, index) => {
      target.classList.add('scroll-reveal');
      target.style.setProperty('--reveal-delay', `${(index % 6) * 55}ms`);
    });

    pageRoot.classList.add('reveal-ready');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' });

    targets.forEach((target) => observer.observe(target));
    let frame = 0;
    const revealPassedTargets = () => {
      frame = 0;
      targets.forEach((target) => {
        if (target.classList.contains('is-visible')) return;
        if (target.getBoundingClientRect().top <= window.innerHeight * 0.93) {
          target.classList.add('is-visible');
          observer.unobserve(target);
        }
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(revealPassedTargets);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    revealPassedTargets();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  });
</script>
<svelte:head>
  <title>اینکورا | از ایده تا یک تتوی ماندگار</title>
  <meta name="description" content="دنیای تجهیزات و الهام تتو در اینکورا؛ پیش‌نمایش دسته‌بندی‌ها، راهنمای انتخاب و مجله. خرید و خدمات در این نسخه فعال نیستند." />
</svelte:head>
<div bind:this={pageRoot} class="inkora-theme inkora-home" dir="rtl" id="top">
  <a class="home-skip" href="#main">رفتن به محتوای اصلی</a>
  <Header />
  <main class="home-container" id="main"><Hero />
    <InteractiveShowcase />
    {#if data.products.length}<section class="home-section" aria-labelledby="real-products"><div class="section-heading"><div><p class="eyebrow">متصل به فروشگاه</p><h2 id="real-products">محصولات واقعی WooCommerce</h2></div><a class="home-action" href="/shop">مشاهده همه کالاها</a></div><div class="product-grid">{#each data.products as product}<ProductCard {product} />{/each}</div></section>{/if}
  </main>
  <Footer />
</div>
