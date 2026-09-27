<script lang="ts">
  import Media from './Media.svelte';
  import FutureButton from './FutureButton.svelte';
  import { devices, kits } from './data';
</script>
<section class="home-section" aria-label="پیش‌نمایش ابزارهای انتخاب">
  <div class="tools-top">
    <article class="home-card advisor">
      <div><p class="eyebrow">انتخاب آگاهانه</p><h2>ترکیب سوزن و رنگ مناسب</h2><p>جایگاه مشاور انتخاب تجهیزات، بر اساس سبک و نیاز شما.</p>
        <div class="demo-fields"><label>سبک تتو<select disabled><option>در فاز بعد انتخاب می‌شود</option></select></label><label>ناحیهٔ بدن<select disabled><option>در فاز بعد انتخاب می‌شود</option></select></label></div>
        <p class="fineprint">هنوز هیچ پیشنهاد شخصی یا نتیجه‌ای تولید نمی‌شود.</p><FutureButton label="پیش‌نمایش مشاور" primary icon="arrow" />
      </div><Media kind="art" large />
    </article>
    <article class="home-card simulator"><p class="eyebrow">قبل از اجرا، تصور کن</p><h2>شبیه‌سازی طرح روی پوست</h2><p>پیش‌نمایش فضای شبیه‌ساز آینده.</p><div class="simulator-frame"><Media kind="stencil" /><span>تصویر انتزاعی؛ شبیه‌سازی واقعی نیست</span></div><FutureButton label="شبیه‌ساز · فاز بعد" icon="image" /></article>
  </div>
  <div class="equipment-grid" id="equipment">
    <article class="home-card equipment-guide"><p class="eyebrow">راهنمای انتخاب</p><h2>دستگاهِ مناسب مسیر تو</h2><p>جایگاه شناخت فرم‌ها و سازوکارها؛ راهنمای کامل در فاز بعد.</p><div class="device-grid">{#each devices as device}<div><Media kind="machine" /><h3 dir="ltr">{device}</h3></div>{/each}</div><FutureButton label="راهنمای دستگاه‌ها" icon="arrow" /></article>
    <article class="home-card kits-panel" id="kits"><p class="eyebrow">کنار هم، هماهنگ‌تر</p><h2>چیدمان کیت‌های اینکورا</h2><p>نام‌های مفهومی؛ کیت قابل خرید نیستند.</p><div class="kit-grid">{#each kits as kit}<div><Media kind={kit.kind} /><h3>{kit.title}</h3><span class="fineprint">ترکیب نمونه</span></div>{/each}</div><FutureButton label="مشاهدهٔ کیت‌ها · فاز بعد" icon="bag" /></article>
    <article class="home-card comparison"><p class="eyebrow">جزئیات تفاوت می‌سازند</p><h2>مقایسهٔ تجهیزات</h2><div class="compare-media"><Media kind="machine" /><span dir="ltr">VS</span><Media kind="machine" /></div><p>دو جایگاه خالی برای محصولات واقعی آینده؛ بدون امتیاز یا مشخصات فرضی.</p><FutureButton label="مقایسه · فاز بعد" icon="layers" /></article>
  </div>
</section>
