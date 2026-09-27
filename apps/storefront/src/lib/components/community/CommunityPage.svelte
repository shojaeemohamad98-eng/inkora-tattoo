<script lang="ts">
  import '$lib/design/tokens.css';
  import '$lib/components/commerce/store.css';
  import type { CommunityData, CommunityItem } from '$lib/community';
  let { data, view, profile }: { data: CommunityData; view: 'community' | 'artists' | 'portfolio' | 'profile' | 'apply'; profile?: CommunityItem } = $props();
  const titles = { community: 'جایی برای شناختن هنر و هنرمند', artists: 'هنرمندان اینکورا', portfolio: 'گالری نمونه‌کارها', profile: 'پروفایل هنرمند', apply: 'درخواست حضور در جامعه' };
  const future = ['پیام خصوصی', 'گروه‌ها', 'بازار هنرمندان', 'دوره‌ها', 'اعلان‌ها', 'فید زنده'];
</script>

<svelte:head>
  <title>{profile?.name || titles[view]} | اینکورا</title>
  <meta name="description" content="جامعهٔ هنرمندان اینکورا؛ فقط پروفایل‌ها و نمونه‌کارهای عمومی و بازبینی‌شده." />
  <meta name="robots" content="noindex,nofollow" />
</svelte:head>

<div class="inkora-theme inkora-store community" dir="rtl">
  <a class="skip" href="#community-main">رفتن به محتوای اصلی</a>
  <header class="store-header">
    <div class="store-container store-header-inner">
      <a class="store-brand" href="/"><img src="/assets/brand/inkora-wordmark-temporary.svg" alt="اینکورا؛ نوشتار موقت برند" /></a>
      <nav class="store-nav" aria-label="ناوبری جامعه">
        <a href="/community" aria-current={view === 'community' ? 'page' : undefined}>جامعه</a>
        <a href="/artists" aria-current={view === 'artists' ? 'page' : undefined}>هنرمندان</a>
        <a href="/portfolio" aria-current={view === 'portfolio' ? 'page' : undefined}>نمونه‌کارها</a>
        <a href="/shop">فروشگاه</a>
      </nav>
    </div>
  </header>
  <main id="community-main" class="store-container store-main">
    <header class="intro">
      <p class="eyebrow">INKORA COMMUNITY · نسخهٔ محلی</p>
      <h1>{profile?.name || titles[view]}</h1>
      <p class="lead">فضایی برای معرفی هنرمند و احترام به حق اثر. هر پروفایل پیش از نمایش عمومی بازبینی می‌شود؛ انتخاب خصوصی‌ماندن با صاحب پروفایل است.</p>
      {#if view !== 'apply'}<a class="button primary" href="/community/apply">درخواست پروفایل هنرمند</a>{/if}
    </header>

    {#if view === 'apply'}
      <section class="panel"><p class="eyebrow">ورود ← درخواست ← بازبینی</p><h2>از حساب موجود خود شروع کنید</h2>
        <p>فرم درخواست روی همان WordPress محلی و پس از ورود باز می‌شود. فقط نام هنری، معرفی کوتاه، سبک‌ها، برچسب‌ها و اجازهٔ نمایش ثبت می‌شوند. درخواست به‌صورت خودکار شما را هنرمند تأییدشده نمی‌کند.</p>
        <p>می‌توانید وضعیت خصوصی درخواست را ببینید، آن را اصلاح کنید یا کاملاً حذف کنید. هر اصلاح دوباره به بازبینی نیاز دارد. فعلاً حساب تازه، ایمیل خودکار و دریافت فایل نداریم.</p>
        {#if data.portal}<a class="button primary" href={data.portal}>ورود و بازکردن فرم محلی</a>{:else}<p role="alert">نشانی WordPress تنظیم نشده است.</p>{/if}
      </section>
    {:else if data.status === 'error'}
      <section class="panel" role="alert"><h2>اتصال به جامعه برقرار نیست</h2><p>همان سایت Inkora Tattoo را در Local روشن کنید و صفحه را دوباره باز کنید. نبود اتصال را به معنی نبود هنرمند نمی‌گیریم.</p></section>
    {:else if profile}
      <section class="panel"><p class="badge">پروفایل عمومی · بازبینی‌شده</p><h2>دربارهٔ هنرمند</h2><p>{profile.bio || 'معرفی عمومی ثبت نشده است.'}</p>
        <p class="muted">این نشان فقط بازبینی محتوای پروفایل است؛ گواهی حرفه‌ای یا تضمین خدمات نیست.</p>
        {#if profile.styles.length}<h3>سبک‌ها</h3><p>{profile.styles.join('، ')}</p>{/if}
        {#if profile.tags.length}<h3>برچسب‌ها</h3><p>{profile.tags.join('، ')}</p>{/if}
        <button disabled aria-describedby="social-reason">دنبال‌کردن · آماده‌سازی</button>
      </section>
      <section class="panel"><h2>نمونه‌کارها هنوز آمادهٔ نمایش نیستند</h2><p>دریافت اثر تا تکمیل بررسی حق انتشار، رضایت اشخاص و حذف اطلاعات حساس فایل بسته است.</p></section>
    {:else if !data.items.length}
      <section class="panel empty"><span class="empty-symbol" aria-hidden="true">✳</span><h2>{view === 'portfolio' ? 'هنوز نمونه‌کار عمومی تأییدشده‌ای نداریم' : 'هنوز پروفایل عمومی تأییدشده‌ای نداریم'}</h2>
        <p>این فضا با اثر و هویت واقعی شکل می‌گیرد. پروفایل خصوصی، درخواست در انتظار بررسی و تصویر نمایشی به‌جای هنرمند در اینجا قرار نمی‌گیرد.</p>
        <a href="/community/apply">با روند درخواست آشنا شوید ←</a>
      </section>
    {:else}
      <section class="cards" aria-label={view === 'portfolio' ? 'نمونه‌کارهای عمومی' : 'پروفایل‌های عمومی'}>
        {#each data.items as artist (artist.slug)}
          <article class="panel"><p class="badge">بازبینی‌شده · عمومی</p><h2>{#if view === 'portfolio'}{artist.name}{:else}<a href={`/artists/${artist.slug}`}>{artist.name}</a>{/if}</h2><p>{artist.bio}</p><p class="muted">{artist.styles.join('، ')}</p></article>
        {/each}
      </section>
    {/if}
    {#if !profile && view !== 'apply' && data.status === 'ready' && (data.page > 1 || data.items.length === 12)}
      <nav class="pages" aria-label="صفحه‌بندی">{#if data.page > 1}<a href={`?page=${data.page - 1}`}>صفحهٔ قبل</a>{/if}{#if data.items.length === 12 && data.page < 100}<a href={`?page=${data.page + 1}`}>صفحهٔ بعد</a>{/if}</nav>
    {/if}
    <div class="details">
      <section class="panel"><h2>اثر شما، با اجازهٔ شما</h2><p>آپلود گالری بسته است. حذف EXIF، بررسی مالکیت اثر و رضایت فرد حاضر در تصویر باید پیش از دریافت فایل کامل و آزمایش شود. تصویر stock یا عکس فرد دیگری جای اثر هنرمند قرار نمی‌گیرد.</p><a href="/portfolio">دیدن وضعیت گالری ←</a></section>
      <section class="panel"><h2>تعاملات در حال آماده‌سازی</h2><p id="social-reason">دنبال‌کردن، پسندیدن و دیدگاه تا آماده‌شدن کنترل ضداسپم، گزارش تخلف و سیاست بازبینی فعال نمی‌شوند.</p><div class="controls"><button disabled>پسندیدن · بسته</button><button disabled>دیدگاه · بسته</button></div></section>
    </div>
    {#if view === 'community'}<section class="future"><h2>برای مراحل بعد</h2><ul>{#each future as label}<li>{label}<span>هنوز فعال نیست</span></li>{/each}</ul></section>{/if}
  </main>
  <footer class="store-container"><p>جامعه در مرحلهٔ آماده‌سازی محلی است؛ اطلاعات و شمارندهٔ ساختگی نمایش داده نمی‌شود.</p><a href="/">بازگشت به خانه</a></footer>
</div>

<style>
  .community{overflow-wrap:anywhere}.community a{color:var(--ink-accent-text)}.community .primary{color:white}.store-nav{flex-wrap:wrap;overflow:visible}.skip{position:absolute;top:-100px;right:16px;z-index:10;background:var(--ink-surface);padding:12px}.skip:focus{top:8px}.intro{max-width:820px;padding-block:24px 42px}.eyebrow{font-size:.8rem;letter-spacing:.06em;color:var(--ink-accent-text)}h1{font-size:clamp(2rem,4.5vw,3.8rem);line-height:1.4;margin:16px 0}h2{font-size:1.25rem;margin-top:0}.lead,.panel p{line-height:2}.lead,.muted,footer{color:var(--ink-muted)}.panel{padding:28px;border:1px solid var(--ink-border);border-radius:var(--ink-radius-card);background:var(--ink-surface);min-width:0;margin-bottom:20px}.empty{padding:44px;max-width:none;background:radial-gradient(ellipse at top right,#d62d4218,transparent 65%),var(--ink-surface)}.empty p{max-width:720px;color:var(--ink-muted)}.empty-symbol{display:block;font-size:2.8rem;color:var(--ink-accent-text);margin-bottom:12px}.details,.cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.badge{color:var(--ink-success);font-size:.85rem}.controls,.pages{display:flex;flex-wrap:wrap;gap:12px}button{font:inherit;min-height:44px;padding:8px 14px;border:1px solid var(--ink-control-border);border-radius:8px;background:var(--ink-raised);color:var(--ink-muted)}.future ul{list-style:none;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.future li{padding:16px;border-bottom:1px solid var(--ink-border)}.future span{display:block;color:var(--ink-muted);font-size:.8rem;margin-top:8px}footer{padding-block:24px 40px;border-top:1px solid var(--ink-border);font-size:.85rem}.pages{margin-bottom:20px}@media(max-width:700px){.details,.cards{grid-template-columns:1fr;gap:0}.future ul{grid-template-columns:repeat(2,minmax(0,1fr))}.panel,.empty{padding:20px}.intro{padding-top:8px}.store-nav{gap:8px 16px;justify-content:flex-start}}
</style>
