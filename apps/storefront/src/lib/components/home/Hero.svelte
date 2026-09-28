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
</section>
<div class="trust-strip">{#each trustNotes as note}<div><Icon name={note.icon} /><p><strong>{note.title}</strong><span>{note.text}</span></p></div>{/each}</div>
