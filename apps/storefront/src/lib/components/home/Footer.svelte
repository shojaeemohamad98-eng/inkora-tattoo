<script lang="ts">import { navigation } from './data';</script>
<footer class="home-footer" id="about"><div class="home-container footer-grid">
  <div><img src="/assets/brand/inkora-wordmark-temporary.svg" width="164" height="52" alt="اینکورا؛ نوشتار موقت برند" /><p>از ایده تا بیان شخصی.<br />پیش‌نمایش دنیای تتوی اینکورا.</p><span class="sample-tag">لوگو و تصاویر موقت‌اند</span></div>
  <nav aria-label="دسترسی سریع"><h2>در این صفحه</h2>{#each navigation.slice(0, 4) as link}<a href={link.href}>{link.label}</a>{/each}</nav>
  <div><h2>شفافیت خدمات</h2><p>خرید، پرداخت، حساب و مشاوره هنوز فعال نیستند. شرایط ارسال، ضمانت و مرجوعی پس از تأیید فروشگاه اعلام می‌شود.</p></div>
  <div><h2>همراه اینکورا</h2><p>خبرنامه و راه‌های ارتباطی پس از آماده‌شدن خدمات و تأیید نشانی‌ها اضافه می‌شوند.</p><span class="sample-tag">ثبت اطلاعات فعلاً غیرفعال</span></div>
</div><div class="home-container footer-bottom"><span>INKORA · نسخهٔ نمایشی صفحه اصلی</span><a href="#top">بازگشت به بالا ↑</a></div></footer>
