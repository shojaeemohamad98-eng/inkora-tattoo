<script lang="ts">
  type Product = { id: string; title: string; english: string; image: string; price: number; weight: string; use: string; href: string };
  type CompareModel = Product & { category: string; stroke: string; voltage: string; speed: string };
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
  const colorRecipes = [
    { words: ['زرشکی', 'شرابی'], name: 'زرشکی عمیق', target: '#771b32', colors: ['#e12839', '#713b78', '#111217'] },
    { words: ['سبز', 'زیتونی'], name: 'سبز زیتونی', target: '#65733c', colors: ['#f0ad21', '#168fb5', '#111217'] },
    { words: ['نارنجی', 'مرجانی'], name: 'مرجانی گرم', target: '#ec6546', colors: ['#e12839', '#f0ad21', '#ece9df'] },
    { words: ['فیروزه', 'اقیانوس'], name: 'فیروزه‌ای', target: '#159ba4', colors: ['#168fb5', '#f0ad21', '#ece9df'] },
    { words: ['بنفش', 'یاسی'], name: 'بنفش یاسی', target: '#8d5a91', colors: ['#713b78', '#ece9df', '#e12839'] }
  ];
  const tattooSuggestions = [
    { name: 'رز فاین‌لاین', image: '/assets/tattoo-designs/rose-line.svg' },
    { name: 'اورنامنتال', image: '/assets/tattoo-designs/ornamental.svg' },
    { name: 'نشان ببر', image: '/assets/tattoo-designs/tiger-mark.svg' }
  ];
  const bodyAreas: Record<string, { image: string; x: number; y: number; size: number }> = {
    'مچ و ساعد داخلی': { image: '/assets/body-areas/wrist.jpg', x: 50, y: 43, size: 27 },
    'ساعد بیرونی': { image: '/assets/body-areas/forearm.jpg', x: 52, y: 50, size: 38 },
    'بازو و شانه': { image: '/assets/body-areas/upper-arm.jpg', x: 50, y: 45, size: 44 },
    'ساق پا': { image: '/assets/body-areas/calf.jpg', x: 50, y: 48, size: 40 }
  };
  const compareModels: CompareModel[] = [
    { ...products[0], id: 'pen-pro', category: 'machine', title: 'Pen Pro X', stroke: '۴.۰ میلی‌متر', voltage: '۶–۹ ولت', speed: '۱۱۰۰۰ دور' },
    { ...products[0], id: 'rotary-air', category: 'machine', title: 'Rotary Air', price: 10800000, weight: '۱۷۲ گرم', use: 'شید و رنگ', stroke: '۳.۵ میلی‌متر', voltage: '۵–۸ ولت', speed: '۹۵۰۰ دور' },
    { ...products[1], id: 'rl3', category: 'needle', title: 'کارتریج 3RL', stroke: 'لاین ظریف', voltage: '۰.۳۰ میلی‌متر', speed: 'بسته ۲۰ عددی' },
    { ...products[1], id: 'm1-9', category: 'needle', title: 'کارتریج 9M1', price: 980000, weight: 'بسته ۲۰ عددی', use: 'سایه و پک رنگ', stroke: 'مگنوم خمیده', voltage: '۰.۳۵ میلی‌متر', speed: 'ممبران نرم' },
    { ...products[2], id: 'ink-black', category: 'ink', title: 'مشکی عمیق ۳۰ml', stroke: 'پیگمنت بالا', voltage: 'وگان', speed: 'لاین و بلک‌ورک' },
    { ...products[2], id: 'ink-color', category: 'ink', title: 'ست رنگی ۵ عددی', price: 3900000, weight: '۵ × ۳۰ میل', use: 'رئالیسم رنگی', stroke: 'قابل ترکیب', voltage: 'وگان', speed: 'پک رنگ' }
  ];
  const compareCategories = [{ id: 'machine', name: 'دستگاه‌ها' }, { id: 'needle', name: 'سوزن‌ها' }, { id: 'ink', name: 'رنگ‌ها' }];

  let rail: HTMLDivElement;
  let stage: HTMLDivElement;
  let chosenColors = $state(['#e12839', '#168fb5']);
  let colorMode = $state<'manual' | 'assistant'>('manual');
  let colorQuery = $state('');
  let targetColor = $state('');
  let recipeName = $state('ترکیب دستی');
  let uploadedDesign = $state('');
  let simulatorMode = $state<'upload' | 'suggested'>('upload');
  let tattooSize = $state(42);
  let tattooOpacity = $state(72);
  let tattooX = $state(50);
  let tattooY = $state(52);
  let bodyArea = $state('مچ و ساعد داخلی');
  let tattooPrompt = $state('گل و پلنگ رئالیسم');
  let selectedTattoo = $state(0);
  let suggestionsReady = $state(false);
  let dragStart: { clientX: number; clientY: number; x: number; y: number } | null = null;
  let compareCategory = $state('machine');
  let leftId = $state('pen-pro');
  let rightId = $state('rotary-air');
  let compareOpen = $state(false);
  let quoteSize = $state(14);
  let quoteDetail = $state(2);
  let quoteColor = $state('رنگی');
  let hourlyRate = $state(1500000);
  let needleTask = $state('لاین ظریف');
  let skinTechnique = $state('کنترل بالا');
  let weeklySessions = $state(8);
  let cartridgeStock = $state(36);
  let gloveStock = $state(90);

  const formatPrice = (value: number) => new Intl.NumberFormat('fa-IR').format(value) + ' تومان';
  const modelsForCategory = () => compareModels.filter((model) => model.category === compareCategory);
  const selectedModel = (id: string) => compareModels.find((model) => model.id === id) ?? modelsForCategory()[0];
  const currentTattoo = () => simulatorMode === 'upload' ? uploadedDesign : (suggestionsReady ? tattooSuggestions[selectedTattoo].image : '');
  const mixHex = (colors: string[]) => {
    if (!colors.length) return '#f4f1ed';
    const rgb = colors.reduce((sum, hex) => {
      const value = hex.replace('#', '');
      return [sum[0] + parseInt(value.slice(0, 2), 16), sum[1] + parseInt(value.slice(2, 4), 16), sum[2] + parseInt(value.slice(4, 6), 16)];
    }, [0, 0, 0]);
    return `rgb(${rgb.map((channel) => Math.round(channel / colors.length)).join(',')})`;
  };
  const displayedColor = () => targetColor || mixHex(chosenColors);
  const togglePigment = (hex: string) => { targetColor = ''; recipeName = 'ترکیب دستی'; chosenColors = chosenColors.includes(hex) ? chosenColors.filter((color) => color !== hex) : [...chosenColors, hex]; };
  const suggestColor = () => {
    const normalized = colorQuery.trim();
    const recipe = colorRecipes.find((item) => item.words.some((word) => normalized.includes(word))) ?? colorRecipes[Math.abs([...normalized].reduce((sum, char) => sum + char.charCodeAt(0), 0)) % colorRecipes.length];
    chosenColors = recipe.colors; targetColor = recipe.target; recipeName = recipe.name;
  };
  const onUpload = (event: Event) => {
    const file = (event.currentTarget as HTMLInputElement).files?.[0]; if (!file) return;
    if (uploadedDesign) URL.revokeObjectURL(uploadedDesign);
    uploadedDesign = URL.createObjectURL(file); simulatorMode = 'upload';
  };
  const changeBodyArea = () => { const area = bodyAreas[bodyArea]; tattooX = area.x; tattooY = area.y; tattooSize = area.size; };
  const generateTattooSuggestions = () => { suggestionsReady = true; changeBodyArea(); };
  const startDrag = (event: PointerEvent) => { if (!currentTattoo()) return; (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId); dragStart = { clientX: event.clientX, clientY: event.clientY, x: tattooX, y: tattooY }; };
  const dragTattoo = (event: PointerEvent) => { if (!dragStart || !stage) return; const rect = stage.getBoundingClientRect(); tattooX = Math.max(8, Math.min(92, dragStart.x + ((event.clientX - dragStart.clientX) / rect.width) * 100)); tattooY = Math.max(10, Math.min(90, dragStart.y + ((event.clientY - dragStart.clientY) / rect.height) * 100)); };
  const endDrag = () => dragStart = null;
  const changeCategory = () => { const models = modelsForCategory(); leftId = models[0].id; rightId = models[1]?.id ?? models[0].id; };
  const quoteHours = () => Math.max(1, Math.ceil((quoteSize / 7) * quoteDetail * (quoteColor === 'رنگی' ? 1.25 : 1)));
  const quotePrice = () => quoteHours() * hourlyRate;
  const needleRecommendation = () => { const recommendations: Record<string, string> = { 'لاین ظریف': '3RL یا 5RL · قطر ۰.۲۵ تا ۰.۳۰', 'لاین ضخیم': '9RL یا 11RL · قطر ۰.۳۵', 'سایه نرم': '9RM یا 13RM · مگنوم خمیده', 'پک رنگ': '11M1 یا 15M1 · مگنوم مستقیم' }; return `${recommendations[needleTask]} · ${skinTechnique}`; };
  const stockDays = () => Math.floor(Math.min(cartridgeStock / Math.max(1, weeklySessions * 1.5), gloveStock / Math.max(1, weeklySessions * 3)) * 7);
</script>

<svelte:window onkeydown={(event) => { if (event.key === 'Escape') compareOpen = false; }} />

<section class="catalog-section" aria-labelledby="catalog-title">
  <div class="section-title-row"><div><span>محصولات منتخب</span><h2 id="catalog-title">تجهیزات مورد نیاز استودیو</h2></div><div class="rail-actions"><button aria-label="قبلی" onclick={() => rail.scrollBy({ left: 310, behavior: 'smooth' })}>→</button><button aria-label="بعدی" onclick={() => rail.scrollBy({ left: -310, behavior: 'smooth' })}>←</button></div></div>
  <div class="product-rail" bind:this={rail}>{#each products as product}<a class="glass-product" href={product.href}><img src={product.image} alt={`تصویر نمونهٔ ${product.title}`} /><div><span>{product.english}</span><h3>{product.title}</h3><small>مشاهده دسته‌بندی ←</small></div></a>{/each}</div>
</section>

<section class="interactive-grid" aria-label="ابزارهای تعاملی انتخاب تتو">
  <article class="glass-panel color-lab">
    <div class="panel-heading"><span>INK MIX STUDIO</span><h2>آزمایشگاه واقعی ترکیب رنگ</h2><p>روی زمینهٔ روشن رنگ‌ها را دستی ترکیب کن یا نام رنگ دلخواه را به پیشنهادگر بده.</p></div>
    <div class="tool-tabs" role="tablist" aria-label="روش انتخاب رنگ"><button class:active={colorMode === 'manual'} onclick={() => colorMode = 'manual'}>ترکیب دستی</button><button class:active={colorMode === 'assistant'} onclick={() => colorMode = 'assistant'}>پیشنهاد هوشمند</button></div>
    {#if colorMode === 'assistant'}<div class="color-search"><input bind:value={colorQuery} placeholder="مثلاً زرشکی عمیق یا سبز زیتونی" aria-label="رنگ دلخواه" /><button onclick={suggestColor}>پیدا کردن فرمول</button></div>{/if}
    <div class="mix-workspace"><div class="mix-surface"><div class="paint-puddle" style={`--mixed:${displayedColor()}`}></div><div class="mix-readout"><b>{recipeName}</b><small>{displayedColor()} · {chosenColors.length} پیگمنت</small></div></div><div class="pigments">{#each pigments as pigment}<button class:active={chosenColors.includes(pigment.hex)} style={`--pigment:${pigment.hex}`} onclick={() => togglePigment(pigment.hex)} aria-pressed={chosenColors.includes(pigment.hex)}><i></i><span>{pigment.name}</span></button>{/each}</div></div>
  </article>

  <article class="glass-panel simulator-lab">
    <div class="panel-heading"><span>SKIN PREVIEW</span><h2>شبیه‌سازی و جای‌گذاری طرح</h2><p>طرح خودت را بارگذاری کن یا بر اساس محل، اندازه و ایده چند پیشنهاد بساز.</p></div>
    <div class="tool-tabs" role="tablist" aria-label="روش انتخاب طرح"><button class:active={simulatorMode === 'upload'} onclick={() => simulatorMode = 'upload'}>۱. آپلود طرح</button><button class:active={simulatorMode === 'suggested'} onclick={() => simulatorMode = 'suggested'}>۲. طرح پیشنهادی</button></div>
    <div class="body-area-row"><label>عضو بدن<select bind:value={bodyArea} onchange={changeBodyArea} aria-label="عضو بدن">{#each Object.keys(bodyAreas) as area}<option>{area}</option>{/each}</select></label><span>با تغییر عضو، عکس و جای اولیهٔ طرح عوض می‌شود.</span></div>
    {#if simulatorMode === 'suggested'}<div class="suggestion-form"><input bind:value={tattooPrompt} aria-label="ایده طرح" placeholder="ایده؛ مثلاً گل رئالیسم" /><button onclick={generateTattooSuggestions}>ساخت ۳ پیشنهاد</button></div>{#if suggestionsReady}<div class="tattoo-suggestions">{#each tattooSuggestions as suggestion, index}<button class:active={selectedTattoo === index} onclick={() => selectedTattoo = index}><img src={suggestion.image} alt="" /><span>{suggestion.name}</span></button>{/each}</div>{/if}{/if}
    <div class="skin-preview" bind:this={stage}><img class="arm-image" src={bodyAreas[bodyArea].image} alt={`پیش‌نمایش ${bodyArea}`} />{#if currentTattoo()}<img class="tattoo-overlay draggable" src={currentTattoo()} alt="طرح قابل جابه‌جایی روی پوست" style={`left:${tattooX}%;top:${tattooY}%;width:${tattooSize}%;opacity:${tattooOpacity / 100}`} onpointerdown={startDrag} onpointermove={dragTattoo} onpointerup={endDrag} onpointercancel={endDrag} />{:else}<div class="upload-hint">طرح شما<br /><small>اینجا نمایش داده می‌شود</small></div>{/if}{#if currentTattoo()}<span class="drag-tip">با ماوس یا لمس جابه‌جا کن</span>{/if}</div>
    <div class="sim-controls"><label class="upload-button">آپلود طرح<input type="file" accept="image/png,image/jpeg,image/webp" onchange={onUpload} /></label><label>اندازه <input type="range" min="18" max="72" bind:value={tattooSize} /></label><label>شفافیت <input type="range" min="25" max="100" bind:value={tattooOpacity} /></label></div><small class="privacy-note">آپلود و جابه‌جایی در همین مرورگر انجام می‌شود. پیشنهادها فعلاً نمونهٔ تعاملی‌اند.</small>
  </article>
</section>

<section class="commerce-grid">
  <article class="glass-panel kits-showcase"><div class="panel-heading"><span>INKORA KITS</span><h2>کیت‌های آمادهٔ اینکورا</h2><p>ترکیب‌های پیشنهادی برای شروع سریع‌تر.</p></div><div class="kit-feature"><img src="/assets/products/starter-kit-v1.jpg" alt="نمونه کیت کامل تتو" /><div><b>کیت حرفه‌ای کامل</b><span>دستگاه، سوزن، رنگ و ملزومات</span><strong>۲۴٬۹۰۰٬۰۰۰ تومان</strong><a href="/shop">مشاهده جزئیات ←</a></div></div><div class="mini-kits"><span>کیت لاین و شید</span><span>کیت رنگی</span><span>کیت شروع</span></div></article>
  <article class="glass-panel compare-panel"><div class="panel-heading"><span>COMPARE</span><h2>مقایسهٔ هم‌دستهٔ محصولات</h2><p>اول دسته را انتخاب کن، سپس دو مدل دقیق را کنار هم بسنج.</p></div><label class="compare-category">دسته محصول<select bind:value={compareCategory} onchange={changeCategory}>{#each compareCategories as category}<option value={category.id}>{category.name}</option>{/each}</select></label><div class="compare-selects"><select bind:value={leftId}>{#each modelsForCategory() as model}<option value={model.id}>{model.title}</option>{/each}</select><b>VS</b><select bind:value={rightId}>{#each modelsForCategory() as model}<option value={model.id}>{model.title}</option>{/each}</select></div><div class="compare-cards">{#each [selectedModel(leftId), selectedModel(rightId)] as model}<div><img src={model.image} alt={model.title} /><h3>{model.title}</h3><strong>{formatPrice(model.price)}</strong><span>{model.weight}</span><span>{model.use}</span></div>{/each}</div><button class="compare-open" onclick={() => compareOpen = true}>نمایش مقایسهٔ کامل مشخصات</button></article>
</section>

<section class="quote-calculator glass-panel" aria-labelledby="quote-title"><div class="quote-copy"><span>PROJECT QUOTE</span><h2 id="quote-title">برآورد زمان و قیمت پروژه</h2><p>یک تخمین اولیه برای پاسخ سریع به مشتری؛ قیمت نهایی بعد از مشاوره و بررسی پوست تعیین می‌شود.</p><div class="quote-fields"><label>اندازه تقریبی <b>{quoteSize} سانتی‌متر</b><input type="range" min="4" max="35" bind:value={quoteSize} /></label><label>جزئیات<select bind:value={quoteDetail}><option value={1}>ساده</option><option value={2}>متوسط</option><option value={3}>پر جزئیات</option></select></label><label>نوع اجرا<select bind:value={quoteColor}><option>مشکی و خاکستری</option><option>رنگی</option></select></label><label>تعرفه ساعتی<select bind:value={hourlyRate}><option value={1000000}>۱ میلیون</option><option value={1500000}>۱.۵ میلیون</option><option value={2000000}>۲ میلیون</option></select></label></div></div><div class="quote-result"><small>تخمین پروژه</small><b>{quoteHours()} ساعت کار</b><strong>{formatPrice(quotePrice())}</strong><p>پیشنهاد: {quoteHours() > 5 ? 'تقسیم به دو جلسه برای کیفیت و استراحت پوست' : 'قابل انجام در یک جلسه با زمان استراحت'}</p></div></section>

<section class="content-grid"><article class="glass-panel care-story"><img src="/assets/products/aftercare-v1.jpg" alt="محصولات مراقبت از تتو" /><div><span>راهنمای نگهداری</span><h2>سه روز اول، مهم‌ترین بخش ترمیم</h2><p>شست‌وشوی ملایم، لایهٔ نازک بالم و دوری از نور مستقیم؛ راهنمای کامل پس از بازبینی تخصصی منتشر می‌شود.</p><a href="/aftercare">مطالعه راهنما ←</a></div></article><article class="glass-panel trend-card"><span>پالت‌های محبوب</span><h2>رنگ‌های ترند استودیو</h2><div class="trend-orbs"><i style="--c:#7a101b"></i><i style="--c:#cc2738"></i><i style="--c:#d6861f"></i><i style="--c:#167d8e"></i><i style="--c:#202f58"></i><i style="--c:#d7c7af"></i></div><p>روی پالت‌ساز بالا امتحانشان کن و ترکیب شخصی خودت را بساز.</p><a href="/inks">دیدن رنگ‌ها ←</a></article><article class="glass-panel article-teaser"><span>مجله اینکورا</span><h2>چطور دستگاه مناسب دستمان را انتخاب کنیم؟</h2><p>وزن، طول کورس و فرم گریپ سه عامل اصلی در انتخاب دستگاه هستند.</p><a href="/journal">مشاهده مقاله‌ها ←</a></article></section>

<section class="idea-grid" aria-label="ابزارهای ویژه تتو آرتیست"><article class="glass-panel needle-selector"><div class="panel-heading"><span>NEEDLE SELECTOR</span><h2>انتخاب‌گر حرفه‌ای کارتریج</h2><p>بر اساس اجرای امروز، گروه و قطر مناسب را سریع پیدا کن.</p></div><div class="tool-fields"><label>نوع اجرا<select bind:value={needleTask}><option>لاین ظریف</option><option>لاین ضخیم</option><option>سایه نرم</option><option>پک رنگ</option></select></label><label>اولویت دست<select bind:value={skinTechnique}><option>کنترل بالا</option><option>سرعت بیشتر</option><option>آسیب کمتر</option></select></label></div><div class="tool-result"><small>پیشنهاد شروع</small><strong>{needleRecommendation()}</strong><span>قبل از کار روی پوست مصنوعی و طبق دستور سازنده تست شود.</span></div></article><article class="glass-panel stock-planner"><div class="panel-heading"><span>STUDIO STOCK</span><h2>هشدار موجودی مصرفی</h2><p>ببین موجودی فعلی برای چند روز کاری کافی است و چه زمانی باید سفارش بدهی.</p></div><label>جلسه در هفته: <b>{weeklySessions}</b><input type="range" min="1" max="25" bind:value={weeklySessions} /></label><label>کارتریج موجود: <b>{cartridgeStock}</b><input type="range" min="0" max="150" bind:value={cartridgeStock} /></label><label>جفت دستکش موجود: <b>{gloveStock}</b><input type="range" min="0" max="250" bind:value={gloveStock} /></label><div class="stock-result" class:urgent={stockDays() < 14}><small>پوشش موجودی</small><strong>{stockDays()} روز</strong><span>{stockDays() < 14 ? 'زمان سفارش مجدد رسیده است' : 'موجودی برای دو هفته یا بیشتر کافی است'}</span></div></article></section>

{#if compareOpen}<div class="compare-modal-backdrop"><dialog open class="compare-modal" aria-labelledby="compare-modal-title"><button class="modal-close" aria-label="بستن" onclick={() => compareOpen = false}>×</button><span>مقایسهٔ تخصصی {compareCategories.find((item) => item.id === compareCategory)?.name}</span><h2 id="compare-modal-title">{selectedModel(leftId).title} در برابر {selectedModel(rightId).title}</h2><div class="spec-table"><b>مشخصه</b><b>{selectedModel(leftId).title}</b><b>{selectedModel(rightId).title}</b>{#each [['قیمت', formatPrice(selectedModel(leftId).price), formatPrice(selectedModel(rightId).price)], ['وزن/بسته', selectedModel(leftId).weight, selectedModel(rightId).weight], ['کاربرد', selectedModel(leftId).use, selectedModel(rightId).use], ['کورس/نوع', selectedModel(leftId).stroke, selectedModel(rightId).stroke], ['ولتاژ/ساختار', selectedModel(leftId).voltage, selectedModel(rightId).voltage], ['سرعت/ویژگی', selectedModel(leftId).speed, selectedModel(rightId).speed]] as row}<span>{row[0]}</span><span>{row[1]}</span><span>{row[2]}</span>{/each}</div></dialog></div>{/if}
