<script lang="ts">
  type Product = { id: string; title: string; english: string; image: string; price: number; weight: string; use: string; href: string };

  const products: Product[] = [
    { id: 'machine', title: 'دستگاه تتو', english: 'WIRELESS PEN', image: '/assets/products/tattoo-machine-v1.jpg', price: 12900000, weight: '۱۸۶ گرم', use: 'لاین، شید و رنگ', href: '/machines' },
    { id: 'needle', title: 'سوزن و کارتریج', english: 'CARTRIDGES', image: '/assets/products/needle-cartridges-v1.jpg', price: 890000, weight: 'بسته ۲۰ عددی', use: 'لاین و شید', href: '/needles' },
    { id: 'ink', title: 'رنگ‌های تتو', english: 'TATTOO INKS', image: '/assets/products/tattoo-inks-v1.jpg', price: 1450000, weight: '۵ بطری ۳۰ میل', use: 'ترکیب رنگ', href: '/inks' },
    { id: 'printer', title: 'پرینتر استنسیل', english: 'STENCIL PRINTER', image: '/assets/products/stencil-printer-v1.jpg', price: 8500000, weight: '۱.۲ کیلوگرم', use: 'انتقال طرح', href: '/stencil' },
    { id: 'aftercare', title: 'مراقبت و ترمیم', english: 'AFTERCARE', image: '/assets/products/aftercare-v1.jpg', price: 780000, weight: 'پک سه‌تکه', use: 'مراقبت پس از تتو', href: '/aftercare' },
    { id: 'accessories', title: 'اکسسوری استودیو', english: 'ACCESSORIES', image: '/assets/products/accessories-v1.jpg', price: 2200000, weight: 'پک کاربردی', use: 'تجهیز میز کار', href: '/accessories' }
  ];

  const pigments = [
    { name: 'قرمز', hex: '#e12839' }, { name: 'زرد', hex: '#f0ad21' }, { name: 'آبی', hex: '#168fb5' },
    { name: 'سفید', hex: '#ece9df' }, { name: 'مشکی', hex: '#111217' }, { name: 'بنفش', hex: '#713b78' }
  ];
  const styles = [
    { name: 'رئالیسم', en: 'REALISM', product: 'دستگاه پن + کارتریج مگنوم', image: products[0].image },
    { name: 'فاین لاین', en: 'FINE LINE', product: 'کارتریج 3RL + جوهر مشکی', image: products[1].image },
    { name: 'رنگی', en: 'COLOR', product: 'ست جوهر رنگی + مگنوم', image: products[2].image },
    { name: 'استنسیل', en: 'STENCIL', product: 'پرینتر حرارتی + کاغذ انتقال', image: products[3].image },
    { name: 'بلک‌ورک', en: 'BLACKWORK', product: 'پن قدرتمند + مشکی عمیق', image: products[0].image },
    { name: 'ترمیم', en: 'AFTERCARE', product: 'بالم + فیلم محافظ', image: products[4].image }
  ];

  let rail: HTMLDivElement;
  let chosenColors = $state(['#e12839', '#168fb5']);
  let uploadedDesign = $state('');
  let tattooSize = $state(42);
  let tattooOpacity = $state(72);
  let leftId = $state('machine');
  let rightId = $state('printer');
  let activeStyle = $state(0);
  let sessionHours = $state(3);
  let clients = $state(4);
  let sterileSteps = $state([false, false, false, false]);

  const formatPrice = (value: number) => new Intl.NumberFormat('fa-IR').format(value) + ' تومان';
  const selected = (id: string) => products.find((product) => product.id === id) ?? products[0];
  const mixHex = (colors: string[]) => {
    if (!colors.length) return '#c52236';
    const rgb = colors.reduce((sum, hex) => {
      const value = hex.replace('#', '');
      return [sum[0] + parseInt(value.slice(0, 2), 16), sum[1] + parseInt(value.slice(2, 4), 16), sum[2] + parseInt(value.slice(4, 6), 16)];
    }, [0, 0, 0]);
    return `rgb(${rgb.map((channel) => Math.round(channel / colors.length)).join(',')})`;
  };
  const togglePigment = (hex: string) => chosenColors = chosenColors.includes(hex) ? chosenColors.filter((color) => color !== hex) : [...chosenColors, hex];
  const onUpload = (event: Event) => {
    const file = (event.currentTarget as HTMLInputElement).files?.[0];
    if (!file) return;
    if (uploadedDesign) URL.revokeObjectURL(uploadedDesign);
    uploadedDesign = URL.createObjectURL(file);
  };
</script>

<section class="catalog-section" aria-labelledby="catalog-title">
  <div class="section-title-row">
    <div><span>محصولات منتخب</span><h2 id="catalog-title">تجهیزات مورد نیاز استودیو</h2></div>
    <div class="rail-actions"><button aria-label="قبلی" onclick={() => rail.scrollBy({ left: 310, behavior: 'smooth' })}>→</button><button aria-label="بعدی" onclick={() => rail.scrollBy({ left: -310, behavior: 'smooth' })}>←</button></div>
  </div>
  <div class="product-rail" bind:this={rail}>
    {#each products as product}
      <a class="glass-product" href={product.href}>
        <img src={product.image} alt={`تصویر نمونهٔ ${product.title}`} />
        <div><span>{product.english}</span><h3>{product.title}</h3><small>مشاهده دسته‌بندی ←</small></div>
      </a>
    {/each}
  </div>
</section>

<section class="interactive-grid" aria-label="ابزارهای تعاملی انتخاب تتو">
  <article class="glass-panel color-lab">
    <div class="panel-heading"><span>INK MIX LAB</span><h2>ترکیب سوزن و رنگ مناسب</h2><p>چند رنگ را انتخاب کن تا ترکیب پیشنهادی را همان لحظه ببینی.</p></div>
    <div class="mix-workspace">
      <div class="mixed-color" style={`--mixed:${mixHex(chosenColors)}`}><b>رنگ ساخته‌شده</b><small>{chosenColors.length} پیگمنت فعال</small></div>
      <div class="pigments">
        {#each pigments as pigment}
          <button class:active={chosenColors.includes(pigment.hex)} style={`--pigment:${pigment.hex}`} onclick={() => togglePigment(pigment.hex)} aria-pressed={chosenColors.includes(pigment.hex)}><i></i><span>{pigment.name}</span></button>
        {/each}
      </div>
    </div>
    <div class="needle-result"><span>پیشنهاد سوزن</span><strong>{chosenColors.length > 2 ? 'Magnum 9M برای پوشش و ترکیب نرم' : 'Round Shader 7RS برای کنترل بهتر'}</strong></div>
  </article>

  <article class="glass-panel simulator-lab">
    <div class="panel-heading"><span>SKIN PREVIEW</span><h2>شبیه‌سازی نتیجه روی پوست</h2><p>طرح خودت را فقط روی دستگاهت بارگذاری و اندازه‌اش را تنظیم کن.</p></div>
    <div class="skin-preview">
      <img class="arm-image" src="/assets/products/simulator-arm-v1.jpg" alt="بازوی بدون تتو برای پیش‌نمایش طرح" />
      {#if uploadedDesign}<img class="tattoo-overlay" src={uploadedDesign} alt="پیش‌نمایش طرح بارگذاری‌شده" style={`width:${tattooSize}%;opacity:${tattooOpacity / 100}`} />{:else}<div class="upload-hint">طرح شما<br /><small>اینجا نمایش داده می‌شود</small></div>{/if}
    </div>
    <div class="sim-controls">
      <label class="upload-button">آپلود طرح<input type="file" accept="image/png,image/jpeg,image/webp" onchange={onUpload} /></label>
      <label>اندازه <input type="range" min="18" max="72" bind:value={tattooSize} /></label>
      <label>شفافیت <input type="range" min="25" max="100" bind:value={tattooOpacity} /></label>
    </div>
    <small class="privacy-note">فایل از مرورگر شما خارج نمی‌شود.</small>
  </article>
</section>

<section class="commerce-grid">
  <article class="glass-panel kits-showcase">
    <div class="panel-heading"><span>INKORA KITS</span><h2>کیت‌های آمادهٔ اینکورا</h2><p>ترکیب‌های پیشنهادی برای شروع سریع‌تر.</p></div>
    <div class="kit-feature"><img src="/assets/products/starter-kit-v1.jpg" alt="نمونه کیت کامل تتو" /><div><b>کیت حرفه‌ای کامل</b><span>دستگاه، سوزن، رنگ و ملزومات</span><strong>۲۴٬۹۰۰٬۰۰۰ تومان</strong><a href="/shop">مشاهده جزئیات ←</a></div></div>
    <div class="mini-kits"><span>کیت لاین و شید</span><span>کیت رنگی</span><span>کیت شروع</span></div>
  </article>

  <article class="glass-panel compare-panel">
    <div class="panel-heading"><span>COMPARE</span><h2>مقایسهٔ محصولات</h2><p>دو محصول را از نظر قیمت و مشخصات کنار هم ببین.</p></div>
    <div class="compare-selects"><select bind:value={leftId}>{#each products as product}<option value={product.id}>{product.title}</option>{/each}</select><b>VS</b><select bind:value={rightId}>{#each products as product}<option value={product.id}>{product.title}</option>{/each}</select></div>
    <div class="compare-cards">
      {#each [selected(leftId), selected(rightId)] as product}<div><img src={product.image} alt={product.title} /><h3>{product.title}</h3><strong>{formatPrice(product.price)}</strong><span>{product.weight}</span><span>{product.use}</span></div>{/each}
    </div>
  </article>
</section>

<section class="style-finder" aria-labelledby="style-title">
  <div class="section-title-row"><div><span>سبک خودت را پیدا کن</span><h2 id="style-title">الهام بگیر و ابزار مناسب را انتخاب کن</h2></div><p>با انتخاب هر سبک، ترکیب پیشنهادی تجهیزات تغییر می‌کند.</p></div>
  <div class="style-tabs">{#each styles as style, index}<button class:active={activeStyle === index} onclick={() => activeStyle = index}><img src={style.image} alt="" /><span>{style.name}<small>{style.en}</small></span></button>{/each}</div>
  <div class="style-result glass-panel"><img src={styles[activeStyle].image} alt={`تجهیزات پیشنهادی سبک ${styles[activeStyle].name}`} /><div><span>پیشنهاد برای {styles[activeStyle].name}</span><h3>{styles[activeStyle].product}</h3><p>این پیشنهاد نمایشی است و پس از ثبت مشخصات واقعی محصولات دقیق‌تر می‌شود.</p><a href="/advisor">باز کردن راهنمای هوشمند ←</a></div></div>
</section>

<section class="content-grid">
  <article class="glass-panel care-story"><img src="/assets/products/aftercare-v1.jpg" alt="محصولات مراقبت از تتو" /><div><span>راهنمای نگهداری</span><h2>سه روز اول، مهم‌ترین بخش ترمیم</h2><p>شست‌وشوی ملایم، لایهٔ نازک بالم و دوری از نور مستقیم؛ راهنمای کامل پس از بازبینی تخصصی منتشر می‌شود.</p><a href="/aftercare">مطالعه راهنما ←</a></div></article>
  <article class="glass-panel trend-card"><span>پالت‌های محبوب</span><h2>رنگ‌های ترند استودیو</h2><div class="trend-orbs"><i style="--c:#7a101b"></i><i style="--c:#cc2738"></i><i style="--c:#d6861f"></i><i style="--c:#167d8e"></i><i style="--c:#202f58"></i><i style="--c:#d7c7af"></i></div><p>روی پالت‌ساز بالا امتحانشان کن و ترکیب شخصی خودت را بساز.</p><a href="/inks">دیدن رنگ‌ها ←</a></article>
  <article class="glass-panel article-teaser"><span>مجله اینکورا</span><h2>چطور دستگاه مناسب دستمان را انتخاب کنیم؟</h2><p>وزن، طول کورس و فرم گریپ سه عامل اصلی در انتخاب دستگاه هستند.</p><a href="/journal">مشاهده مقاله‌ها ←</a></article>
</section>

<section class="idea-grid" aria-label="ابزارهای ویژه اینکورا">
  <article class="glass-panel session-planner"><div class="panel-heading"><span>ایدهٔ ویژه ۰۱</span><h2>برآوردگر مصرف جلسه</h2><p>برای برنامه‌ریزی مواد مصرفی استودیو.</p></div><label>مدت هر جلسه: <b>{sessionHours} ساعت</b><input type="range" min="1" max="8" bind:value={sessionHours} /></label><label>مراجعه در هفته: <b>{clients} نفر</b><input type="range" min="1" max="20" bind:value={clients} /></label><div class="planner-result"><span>{Math.ceil(sessionHours * clients * 1.4)} کارتریج</span><span>{clients * 3} جفت دستکش</span><span>{Math.ceil(sessionHours * clients * 2.5)} عدد کپ رنگ</span></div></article>
  <article class="glass-panel sterile-check"><div class="panel-heading"><span>ایدهٔ ویژه ۰۲</span><h2>چک‌لیست آماده‌سازی میز</h2><p>پیش از شروع جلسه، مراحل را کامل کن.</p></div>{#each ['ضدعفونی سطح و تجهیزات', 'آماده‌سازی پوشش و دستکش', 'کنترل تاریخ سوزن و رنگ', 'چیدمان ظرف پسماند'] as step, index}<label><input type="checkbox" bind:checked={sterileSteps[index]} /><span>{step}</span></label>{/each}<div class="progress"><i style={`width:${sterileSteps.filter(Boolean).length * 25}%`}></i></div><strong>{sterileSteps.filter(Boolean).length === 4 ? 'میز آماده است ✓' : `${sterileSteps.filter(Boolean).length} از ۴ مرحله کامل شده`}</strong></article>
</section>
