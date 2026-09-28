<script lang="ts">
  import FutureButton from './FutureButton.svelte';
  import Icon from './Icon.svelte';
  import { trustNotes } from './data';
</script>
<section class="home-hero" aria-labelledby="hero-title">
  <div class="hero-copy">
    <p class="eyebrow" dir="ltr">INKORA / THE ART OF EXPRESSION</p>
    <h1 id="hero-title">از ایده تا یک<br /><em>تتوی</em> ماندگار.</h1>
    <p class="hero-intro">تجهیزات حرفه‌ای، ابزارهای انتخاب هوشمند<br />و تجربه‌ای که از استودیو شروع می‌شود.</p>
    <div class="hero-actions"><a class="home-action primary" href="/shop">ورود به فروشگاه <Icon name="arrow" /></a><FutureButton label="تماشای ویدیو" icon="play" /></div>
    <p class="fineprint">تصاویر فعلی نمونه‌اند و با محصولات واقعی فروشگاه جایگزین می‌شوند.</p>
  </div>
  <div class="hero-art"><img src="/assets/products/tattoo-machine-v1.jpg" alt="نمونه دستگاه تتو بی‌سیم" /><span class="hero-art-label" dir="ltr">PRECISION.<br />EXPRESSION.<br /><strong>INKORA.</strong></span></div>
  <aside class="home-card monthly">
    <p class="eyebrow">ویترین منتخب</p><h2>پیشنهاد ماه</h2><img class="monthly-image" src="/assets/products/tattoo-inks-v1.jpg" alt="نمونه مجموعه رنگ تتو" />
    <p>پالت رنگ حرفه‌ای<br />برای تمرین ترکیب و انتخاب.</p>
    <span class="sample-tag">تصویر و قیمت نمونه</span>
    <a class="home-action" href="#catalog-title">مشاهده محصولات <Icon name="arrow" /></a>
  </aside>
</section>
<div class="trust-strip">{#each trustNotes as note}<div><Icon name={note.icon} /><p><strong>{note.title}</strong><span>{note.text}</span></p></div>{/each}</div>
