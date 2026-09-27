<script lang="ts">
  import '$lib/design/tokens.css';
  import '$lib/components/home/home.css';
  import '$lib/components/commerce/store.css';
  import './experiences.css';
  import Header from '$lib/components/home/Header.svelte';
  import Footer from '$lib/components/home/Footer.svelte';
  import ProductCard from '$lib/components/commerce/ProductCard.svelte';
  import type { ExperienceDefinition } from './data';
  import type { StoreProduct, JournalArticle } from '$lib/server/commerce';

  let { definition, products = [], articles = [], status = 'ready' }: { definition: ExperienceDefinition; products?: StoreProduct[]; articles?: JournalArticle[]; status?: 'ready' | 'error' } = $props();
  let selected = $state(0);
  let resetNote = $state('');
  const currentItem = $derived(definition.selectorItems?.[selected] ?? '');
  function reset() { selected = 0; resetNote = 'نمای نمایشی به حالت نخست بازگشت.'; }
</script>

<svelte:head>
  <title>{definition.title} | اینکورا</title>
  <meta name="description" content={definition.lead} />
</svelte:head>

<div class="inkora-theme inkora-home experience-page" dir="rtl" id="top">
  <a class="home-skip" href="#experience-main">رفتن به محتوای اصلی</a>
  <Header />
  <main id="experience-main">
    <section class="experience-hero home-container" aria-labelledby="experience-title">
      <div class="experience-copy">
        <p class="eyebrow">{definition.eyebrow}</p>
        <h1 id="experience-title">{definition.title}</h1>
        <p class="experience-lead">{definition.lead}</p>
        <div class="experience-actions"><a class="home-action primary" href="#real-products">دیدن کالاهای واقعی</a><a class="home-action" href="/shop">باز کردن فروشگاه</a></div>
      </div>
      <figure class="experience-stage {definition.stage}" data-choice={selected} aria-describedby="stage-caption">
        <div class="stage-grid" aria-hidden="true"></div>
        {#if definition.stage === 'machine'}<i class="machine-body"></i><i class="machine-grip"></i><i class="machine-tip"></i><i class="machine-ring"></i>
        {:else if definition.stage === 'needle'}<i class="needle-shell"></i><i class="needle-lines"></i><i class="needle-tip"></i>
        {:else if definition.stage === 'ink'}<i class="ink-orb orb-one"></i><i class="ink-orb orb-two"></i><i class="ink-orb orb-three"></i><i class="ink-orb orb-four"></i>
        {:else if definition.stage === 'stencil'}<i class="stencil-paper"></i><i class="stencil-lines"></i><i class="stencil-shadow"></i>
        {:else if definition.stage === 'care'}<i class="care-frame"></i><i class="care-path"></i><i class="care-dot"></i>
        {:else if definition.stage === 'accessory'}<i class="accessory-desk"></i><i class="accessory-box box-one"></i><i class="accessory-box box-two"></i><i class="accessory-box box-three"></i>
        {:else}<i class="about-layer layer-one"></i><i class="about-layer layer-two"></i><i class="about-layer layer-three"></i><i class="about-layer layer-four"></i><i class="about-layer layer-five"></i><i class="about-layer layer-six"></i>{/if}
        <figcaption id="stage-caption">{definition.stageCaption}</figcaption>
      </figure>
    </section>

    {#if definition.selectorItems}
      <section class="home-container interaction-panel" aria-labelledby="selector-title">
        <div><p class="eyebrow">تعامل سبک</p><h2 id="selector-title">{definition.selectorLabel}</h2><p>این تغییر فقط نمای گرافیکی را عوض می‌کند و برای استفاده با لمس، ماوس و صفحه‌کلید طراحی شده است.</p></div>
        <div class="choice-controls" aria-label={definition.selectorLabel}>
          {#each definition.selectorItems as item, index}<button class:active={selected === index} aria-pressed={selected === index} onclick={() => { selected = index; resetNote = `${item} انتخاب شد.`; }}>{item}</button>{/each}
          <button class="reset" onclick={reset}>بازنشانی</button>
        </div>
        <p class="choice-note" aria-live="polite">{resetNote || `${currentItem} نمایش داده می‌شود.`}</p>
      </section>
    {/if}

    <section class="home-container experience-sections" aria-label="روایت صفحه">
      {#each definition.sections as section, index}
        <article class="experience-story"><span aria-hidden="true">0{index + 1}</span><div><h2>{section.title}</h2><p>{section.text}</p><ul>{#each section.steps as step}<li>{step}</li>{/each}</ul></div></article>
      {/each}
    </section>

    {#if definition.key === 'aftercare'}
      <section class="home-container aftercare-links" aria-labelledby="reviewed-journal"><div><p class="eyebrow">منبع تأییدشده</p><h2 id="reviewed-journal">مقاله‌های بازبینی‌شده</h2><p>فقط مقاله‌هایی که واقعاً منتشر و تأیید انسانی شده‌اند در مجله نمایش داده می‌شوند.</p></div><a class="home-action" href="/journal">باز کردن مجله</a></section>
    {/if}

    <section class="home-container real-products" id="real-products" aria-labelledby="real-products-title">
      <div class="section-heading"><div><p class="eyebrow">WooCommerce محلی</p><h2 id="real-products-title">کالاهای واقعی و موجود</h2></div><a class="home-action" href="/shop">همهٔ فروشگاه</a></div>
      {#if status === 'error'}<div class="experience-empty" role="alert"><h3>فهرست فروشگاه فعلاً در دسترس نیست</h3><p>این صفحه هیچ کالا یا موجودی جایگزین نمی‌سازد. اتصال WooCommerce را بررسی و دوباره تلاش کنید.</p></div>
      {:else if products.length}<div class="product-grid">{#each products as product}<ProductCard {product} />{/each}</div>
      {:else}<div class="experience-empty"><h3>هنوز کالای واقعی و موجود برای این بخش ثبت نشده است</h3><p>پس از انتشار کالا، موجودکردن آن و ثبت دسته‌بندی یا متادیتای مناسب در WooCommerce، پیوند آن اینجا دیده می‌شود.</p></div>{/if}
    </section>
  </main>
  <Footer />
</div>
