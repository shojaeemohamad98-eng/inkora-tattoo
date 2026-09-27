<script lang="ts">
  import Media from './Media.svelte';
  import FutureButton from './FutureButton.svelte';
  import Icon from './Icon.svelte';
  import { trustNotes } from './data';
</script>
<section class="home-hero" aria-labelledby="hero-title">
  <div class="hero-copy">
    <p class="eyebrow" dir="ltr">INKORA / THE ART OF EXPRESSION</p>
    <h1 id="hero-title">از ایده تا یک<br /><em>تتوی</em> ماندگار.</h1>
    <p class="hero-intro">دنیای تجهیزات، رنگ و الهام تتو؛<br />برای انتخابی که امضای تو باشد.</p>
    <div class="hero-actions"><a class="home-action primary" href="/shop">ورود به فروشگاه <Icon name="arrow" /></a><FutureButton label="تماشای ویدیو" icon="play" /></div>
    <p class="fineprint">فقط کالاهای واقعی ثبت‌شده در فروشگاه محلی نمایش داده می‌شوند.</p>
  </div>
  <div class="hero-art"><Media large /><span class="hero-art-label" dir="ltr">PRECISION.<br />EXPRESSION.<br /><strong>INKORA.</strong></span></div>
  <aside class="home-card monthly">
    <p class="eyebrow">ویترین منتخب</p><h2>پیشنهاد ماه</h2><Media kind="ink" />
    <p>جایگاه معرفی مجموعهٔ منتخب؛<br />در انتظار محصولات تأییدشده.</p>
    <span class="sample-tag">نمونهٔ چیدمان · بدون پیشنهاد فروش</span>
    <a class="home-action" href="#kits">دیدن چیدمان کیت‌ها <Icon name="arrow" /></a>
  </aside>
</section>
<div class="trust-strip">{#each trustNotes as note}<div><Icon name={note.icon} /><p><strong>{note.title}</strong><span>{note.text}</span></p></div>{/each}</div>
