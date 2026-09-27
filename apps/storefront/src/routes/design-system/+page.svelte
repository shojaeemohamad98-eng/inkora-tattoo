<script lang="ts">
  import '$lib/design/tokens.css';
  import PreviewCard from '$lib/design/PreviewCard.svelte';
  let selected = $state(false);
  let sampleName = $state('');
  const palette = [
    ['زمینه', '#0B0C0F'], ['سطح', '#15161B'], ['سطح برجسته', '#202127'],
    ['قرمز اصلی', '#D62D42'], ['متن', '#F5F3F0'], ['متن کمکی', '#B7B6BD']
  ];
</script>

<svelte:head>
  <title>Inkora — دفتر طراحی فاز ۲</title>
  <meta name="robots" content="noindex,nofollow" />
  <meta name="description" content="پیش‌نمایش سیستم طراحی اینکورا؛ نمونه‌های موقت، بدون فروش یا قابلیت عملیاتی." />
</svelte:head>

<div class="inkora-theme design-page" dir="rtl">
  <a class="skip" href="#main">رفتن به محتوا</a>
  <header class="topbar wrap">
    <img src="/assets/brand/inkora-wordmark-temporary.svg" alt="اینکورا؛ نوشتار موقت برند" width="190" height="54" />
    <nav aria-label="بخش‌های دفتر طراحی"><a href="#identity">هویت</a><a href="#palette">رنگ و نوشتار</a><a href="#components">اجزا</a></nav>
    <span class="version" dir="ltr">DESIGN STUDY / 02</span>
  </header>
  <main id="main" class="wrap">
    <section class="intro" aria-labelledby="intro-heading">
      <div>
        <p class="eyebrow">اینکورا / دفتر زبان بصری</p>
        <h1 id="intro-heading">تاریک، دقیق،<br /><span>با امضای قرمز.</span></h1>
        <p class="lead">پایه‌ای برای دنیای اینکورا؛ از رنگ و نوشتار تا کارت‌هایی که قرار است میزبان تجهیزات و هنر باشند.</p>
        <div class="actions"><a class="ink-button" href="#components">دیدن نمونهٔ اجزا <span aria-hidden="true">↙</span></a><a class="ink-button secondary" href="#identity">انتخاب برند</a></div>
        <p class="notice">پیش‌نمایش فاز ۲ · این صفحه فروشگاه نیست. همهٔ کارت‌ها نمونه‌اند.</p>
      </div>
      <div class="identity-object ink-panel">
        <span class="object-label" lang="en" dir="ltr">INKORA / VISUAL FOUNDATION</span>
        <div class="rings" aria-hidden="true"><span>I<span class="red">/</span>K</span></div>
        <div class="object-caption"><span>ذغالی + قرمز</span><span dir="ltr">01 — 2026</span></div>
      </div>
    </section>

    <section id="identity" aria-labelledby="identity-heading">
      <div class="section-head"><div><p class="eyebrow">01 / هویت برند</p><h2 id="identity-heading">انتخاب تثبیت‌شده، اجرای موقت</h2></div><span class="subtle">لوگوی نهایی در انتظار فایل اصلی</span></div>
      <div class="identity-grid">
        <figure class="ink-panel reference"><p>مرجع داخلی فقط در docs/assets/reference نگهداری می‌شود.</p><figcaption>طرح ۰۴ · مرجع انتخاب کاربر؛ فقط پیش‌نمایش</figcaption></figure>
        <div class="ink-panel brand-copy"><img src="/assets/brand/inkora-wordmark-temporary.svg" alt="نوشتار موقت اینکورا بدون نماد جمجمه" width="320" height="90" /><h3>نوشتار موقت برای ادامهٔ طراحی</h3><p>این نسخه جای لوگوی نهایی نیست. نشان اصلی دایره‌ای و جمجمه‌دار، پس از دریافت فایل مجاز و باکیفیت جایگزین می‌شود.</p><span class="tag">بدون بازطراحی جمجمه یا حذف واترمارک</span></div>
      </div>
    </section>

    <section id="palette" aria-labelledby="palette-heading">
      <div class="section-head"><div><p class="eyebrow">02 / پایه‌ها</p><h2 id="palette-heading">رنگ‌هایی با نقش مشخص</h2></div><span class="subtle">قرمز برای تأکید و اقدام اصلی</span></div>
      <div class="palette">{#each palette as [label, value]}<div class="swatch"><div style:background={value}></div><strong>{label}</strong><span dir="ltr">{value}</span></div>{/each}</div>
      <div class="type-grid ink-panel"><div><p class="eyebrow">وزیرمتن / فارسی و لاتین</p><h3 class="type-title">هنر، از جزئیات شروع می‌شود.</h3><p>نوشتار خوانا، فاصلهٔ کافی و سلسله‌مراتب روشن؛ حتی روی زمینهٔ تیره.</p><p lang="en" dir="ltr" class="latin">Precision in every detail.</p></div><div class="type-scale"><p><b>۷۰۰</b> عنوان / درشت</p><p><b>۵۰۰</b> کنترل / متوسط</p><p><b>۴۰۰</b> متن / معمولی</p><p dir="ltr">Aa Bb · 0123456789</p><p>۰۱۲۳۴۵۶۷۸۹ · تومان</p></div></div>
    </section>

    <section id="components" aria-labelledby="components-heading">
      <div class="section-head"><div><p class="eyebrow">03 / نمونهٔ اجزا</p><h2 id="components-heading">قاب تصویر، نه محصول واقعی</h2></div><span class="subtle">نمونه‌های قابل جایگزینی</span></div>
      <div class="cards"><PreviewCard title="دستگاه‌های تتو" english="TATTOO MACHINES" index="01" /><PreviewCard title="سوزن و کارتریج" english="NEEDLES & CARTRIDGES" index="02" /><PreviewCard title="جوهرهای تتو" english="TATTOO INKS" index="03" /><PreviewCard title="کارت محصول نمونه" english="PRODUCT PLACEHOLDER" index="04" kind="product" /></div>
      <div class="controls-grid">
        <section class="ink-panel controls" aria-labelledby="buttons-heading"><h3 id="buttons-heading">دکمه و وضعیت</h3><p class="subtle">دکمهٔ زیر فقط حالت انتخاب را در همین صفحه عوض می‌کند.</p><div class="actions"><button class="ink-button" aria-pressed={selected} onclick={() => selected = !selected}>{selected ? 'نمونه انتخاب شد ✓' : 'انتخاب نمونه'}</button><button class="ink-button secondary" onclick={() => { selected = false; sampleName = ''; }}>بازنشانی نمونه</button><button class="ink-button" disabled>غیرفعال</button></div><p class="status" aria-live="polite">{selected ? 'وضعیت نمایشی: انتخاب‌شده' : 'وضعیت نمایشی: عادی'}</p></section>
        <section class="ink-panel controls" aria-labelledby="input-heading"><h3 id="input-heading">ورودی و راهنما</h3><label for="sample-name">عنوان نمونه (آزمایشی)</label><input class="ink-input" id="sample-name" bind:value={sampleName} placeholder="مثلاً: تجهیزات استودیو" aria-describedby="input-help" /><p id="input-help" class="subtle">چیزی ذخیره یا ارسال نمی‌شود.</p><label for="sample-error">نمونهٔ حالت خطا</label><input class="ink-input" id="sample-error" value="" aria-invalid="true" aria-describedby="sample-error-help" readonly /><p id="sample-error-help" class="error">نمونهٔ پیام خطا: این فیلد نیاز به تکمیل دارد.</p></section>
      </div>
    </section>

    <section class="responsive-note ink-panel" aria-labelledby="responsive-heading"><div><p class="eyebrow">04 / رفتار واکنش‌گرا</p><h2 id="responsive-heading">یک زبان، در هر اندازه</h2><p>در نمایشگر کوچک ستون‌ها زیر هم می‌آیند، کارت‌ها دو ستونه و در عرض بسیار کم تک‌ستونه می‌شوند. متن و کنترل اصلی همیشه در دسترس می‌مانند.</p></div><div class="sizes" dir="ltr"><span>Mobile<br /><b>320–767</b></span><span>Tablet<br /><b>768–1199</b></span><span>Desktop<br /><b>1200+</b></span></div></section>
  </main>
  <footer class="wrap"><span>INKORA · سیستم طراحی نسخهٔ ۰٫۲</span><p>تصاویر واقعی و لوگوی نهایی بعداً جایگزین می‌شوند. تأیید ظاهری کاربر هنوز ثبت نشده است.</p><a href="/">بازگشت به آزمون اتصال فاز ۱</a></footer>
</div>

<style>
  .design-page { min-height: 100vh; background-image: radial-gradient(ellipse at 10% 8%, #681a2720, transparent 35%); }
  .wrap { max-width: var(--ink-container); margin-inline: auto; padding-inline: var(--ink-space-8); }
  .topbar { min-height: 100px; display: flex; align-items: center; justify-content: space-between; gap: 24px; border-bottom: 1px solid var(--ink-border); }
  .topbar img { width: 190px; height: auto; }
  nav { display: flex; gap: 28px; }
  nav a, footer a { color: var(--ink-muted); text-decoration: none; min-height: 44px; display: inline-flex; align-items: center; }
  nav a:hover, footer a:hover { color: var(--ink-text); text-decoration: underline; }
  .version { font-size: .7rem; letter-spacing: .14em; color: var(--ink-muted); }
  .intro { display: grid; grid-template-columns: 1.2fr 1fr; gap: 64px; align-items: center; padding-block: 72px; }
  .eyebrow { color: var(--ink-accent-text); font-size: var(--ink-text-xs); font-weight: 600; margin: 0 0 12px; }
  h1 { font-size: var(--ink-text-display); line-height: 1.35; font-weight: 800; margin: 0 0 20px; }
  h1 > span { color: var(--ink-accent-text); }
  .lead { max-width: 520px; color: var(--ink-muted); font-size: 1.1rem; }
  .actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 28px; }
  .notice { font-size: var(--ink-text-xs); color: var(--ink-muted); margin-top: 22px; }
  .identity-object { min-height: 380px; display: flex; flex-direction: column; justify-content: space-between; padding: 26px; background: radial-gradient(ellipse at 50% 80%, #852b3b44, transparent 70%), var(--ink-glass); }
  .object-label { color: var(--ink-muted); font-size: .65rem; letter-spacing: .2em; }
  .rings { width: 210px; height: 210px; border: 1px solid #696773; border-radius: 50%; display: grid; place-items: center; margin: 32px auto; box-shadow: 0 0 0 22px #ffffff03, 0 0 0 23px #ffffff0c; }
  .rings > span { font: 300 72px/1 Arial, sans-serif; direction: ltr; letter-spacing: -.08em; }
  .red { color: var(--ink-accent); }
  .object-caption { display: flex; justify-content: space-between; font-size: var(--ink-text-xs); color: var(--ink-muted); }
  main > section:not(.intro) { padding-block: 30px; scroll-margin-top: 20px; }
  .section-head { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin-bottom: 24px; }
  h2 { font-size: var(--ink-text-title); line-height: 1.5; margin: 0; font-weight: 700; }
  h3 { font-weight: 700; font-size: var(--ink-text-lg); margin: 0 0 12px; }
  .subtle, .brand-copy p { color: var(--ink-muted); font-size: var(--ink-text-sm); }
  .identity-grid { display: grid; grid-template-columns: 1fr 1.7fr; gap: 20px; }
  .reference { margin: 0; padding: 16px; text-align: center; }
  figcaption { color: var(--ink-muted); font-size: var(--ink-text-xs); margin-top: 12px; }
  .brand-copy { padding: 36px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
  .brand-copy img { max-width: 100%; height: auto; margin-bottom: 24px; }
  .tag { display: inline-block; border: 1px solid var(--ink-border); border-radius: var(--ink-radius-pill); padding: 5px 12px; color: var(--ink-muted); font-size: var(--ink-text-xs); }
  .palette { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
  .swatch { min-width: 0; }
  .swatch > div { height: 90px; border: 1px solid var(--ink-border); border-radius: 12px; margin-bottom: 12px; }
  .swatch strong, .swatch span { display: block; font-size: var(--ink-text-sm); }
  .swatch span { color: var(--ink-muted); text-align: right; font-size: var(--ink-text-xs); }
  .type-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 40px; margin-top: 32px; padding: 32px; }
  .type-title { font-size: clamp(1.5rem, 3vw, 2rem); }
  .type-grid p { color: var(--ink-muted); }
  .latin { font-size: 1.6rem; color: var(--ink-text) !important; }
  .type-scale { border-inline-start: 1px solid var(--ink-border); padding-inline-start: 32px; }
  .type-scale p { margin: 6px 0; }
  .type-scale b { color: var(--ink-text); margin-inline-end: 20px; }
  .cards { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
  .controls-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 24px; }
  .controls { padding: 28px; }
  label { display: block; font-size: var(--ink-text-sm); margin-bottom: 8px; }
  .error { color: var(--ink-error); font-size: var(--ink-text-xs); }
  .status { color: var(--ink-success); font-size: var(--ink-text-sm); margin-top: 24px; }
  .responsive-note { padding: 32px !important; display: grid; grid-template-columns: 1.2fr 1fr; align-items: center; gap: 32px; margin-block: 32px 60px; }
  .responsive-note p { color: var(--ink-muted); }
  .sizes { display: flex; flex-wrap: wrap; gap: 12px; }
  .sizes span { flex: 1; padding: 16px 12px; border: 1px solid var(--ink-border); border-radius: 8px; text-align: center; font-size: var(--ink-text-xs); color: var(--ink-muted); }
  .sizes b { color: var(--ink-text); font-weight: 500; }
  footer { border-top: 1px solid var(--ink-border); padding-block: 28px; font-size: var(--ink-text-xs); color: var(--ink-muted); }
  .skip { position: absolute; top: -100px; inset-inline-start: 20px; padding: 12px 20px; background: var(--ink-text); color: var(--ink-bg); z-index: 10; }
  .skip:focus { top: 12px; }
  @media (max-width: 1199px) { .intro { gap: 32px; } .cards { grid-template-columns: repeat(2, minmax(0, 1fr)); } .version { display: none; } }
  @media (max-width: 767px) {
    .wrap { padding-inline: 20px; } .topbar { flex-wrap: wrap; padding-block: 18px; gap: 12px; } .topbar img { width: 150px; } nav { gap: 18px; font-size: var(--ink-text-sm); }
    .intro { grid-template-columns: 1fr; padding-block: 40px; gap: 32px; } .identity-object { min-height: 300px; } .rings { width: 160px; height: 160px; }
    .section-head { display: block; } .section-head > span { display: block; margin-top: 8px; }
    .identity-grid, .type-grid, .controls-grid, .responsive-note { grid-template-columns: 1fr; }
    .brand-copy, .type-grid, .controls { padding: 24px; } .palette { grid-template-columns: repeat(3, 1fr); row-gap: 24px; }
    .type-scale { border-inline-start: 0; border-top: 1px solid var(--ink-border); padding-inline-start: 0; padding-top: 20px; }
    .cards { gap: 12px; } .responsive-note { padding: 24px !important; }
  }
  @media (max-width: 479px) { .cards { grid-template-columns: 1fr; } .actions .ink-button { width: 100%; } }
</style>
