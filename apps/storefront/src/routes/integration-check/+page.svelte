<script lang="ts">
  import { Accordion } from 'bits-ui';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<svelte:head><title>Inkora — بررسی اتصال فاز ۱</title><meta name="robots" content="noindex,nofollow" /></svelte:head>
<main class="mx-auto max-w-2xl space-y-6 px-5 py-12">
  <header><p class="text-sm text-slate-600">INKORA · محیط توسعه محلی</p><h1 class="text-2xl font-bold">بررسی اتصال فروشگاه</h1><p>فاز ۱: زیرساخت — این صفحه طرح صفحه اصلی نیست.</p></header>
  <section class="rounded-xl border border-slate-200 bg-white p-6" aria-label="وضعیت اتصال">
    {#if data.product && data.toman !== null}
      <p class="font-bold text-emerald-800">محصول از WooCommerce دریافت شد</p>
      <h2 class="mt-4 text-xl">{data.product.name}</h2>
      <p>{new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 3 }).format(data.toman)} تومان</p>
      <p class="text-sm text-slate-600">شناسه محصول: {data.product.id}</p>
    {:else if data.status === 'empty'}
      <h2 class="font-bold">API پاسخ داد؛ محصول آزمایشی پیدا نشد.</h2>
      <p>محصول منتشرشده با نامک inkora-phase-01-test را در ووکامرس ایجاد کنید.</p>
    {:else}
      <h2 class="font-bold text-amber-800">اتصال واقعی هنوز تأیید نشده است</h2>
      <p>سایت جدید Local و WooCommerce باید روشن باشند و نشانی سرور تنظیم شده باشد. هیچ محصول ساختگی نمایش داده نمی‌شود.</p>
    {/if}
    <a class="mt-4 inline-block text-blue-800 underline" href="/integration-check" data-sveltekit-reload>بررسی دوباره اتصال</a>
    <a class="ms-4 inline-block text-blue-800 underline" href="/">بازگشت به صفحه اصلی</a>
  </section>
  <Accordion.Root type="single">
    <Accordion.Item value="help">
      <Accordion.Header><Accordion.Trigger class="w-full rounded-lg border border-slate-300 p-3 text-start">این آزمون چه چیزی را بررسی می‌کند؟</Accordion.Trigger></Accordion.Header>
      <Accordion.Content class="p-4">سرور SvelteKit محصول منتشرشده را از Store API می‌خواند و قیمت ریال را به تومان تبدیل می‌کند. خرید و درگاه در فاز ۴ آماده می‌شوند.</Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</main>
