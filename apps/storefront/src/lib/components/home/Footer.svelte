<script lang="ts">import { navigation } from './data';</script>
<footer class="home-footer"><div class="home-container footer-grid">
  <div class="footer-brand"><img src="/assets/brand/inkora-skull-badge-transparent-v2.png" width="72" height="72" alt="نشان اسکلت اینکورا" /><b dir="ltr">INKORA</b><p>از ایده تا بیان شخصی.<br />پیش‌نمایش دنیای تتوی اینکورا.</p><span class="sample-tag">تصاویر محصولات نمونه‌اند</span></div>
  <nav aria-label="دسترسی سریع"><h2>دسترسی سریع</h2>{#each navigation.slice(0, 4) as link}<a href={link.href}>{link.label}</a>{/each}</nav>
  <div><h2>شفافیت خدمات</h2><p>سبد خرید محلی برای کالاهای واقعی فعال است. پرداخت تا انتخاب و آزمون درگاه ایرانی در انتظار می‌ماند؛ شرایط ارسال، ضمانت و مرجوعی پس از تأیید فروشگاه اعلام می‌شود.</p></div>
  <div><h2>همراه اینکورا</h2><p>خبرنامه و راه‌های ارتباطی پس از آماده‌شدن خدمات و تأیید نشانی‌ها اضافه می‌شوند.</p><span class="sample-tag">ثبت اطلاعات فعلاً غیرفعال</span></div>
</div><div class="home-container footer-bottom"><span>INKORA · نسخهٔ نمایشی صفحه اصلی</span><a href="#top">بازگشت به بالا ↑</a></div></footer>
