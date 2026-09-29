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
    { name: 'سفید', hex: '#ece9df' }, { name: 'مشکی', hex: '#111217' }, { name: 'بنفش', hex: '#713b78' },
    { name: 'سبز', hex: '#3a9b59' }, { name: 'نارنجی', hex: '#ef6f27' }, { name: 'صورتی', hex: '#e7649f' },
    { name: 'فیروزه‌ای', hex: '#20b7aa' }, { name: 'قهوه‌ای', hex: '#74452f' }, { name: 'اُخرایی', hex: '#bb7b24' }
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
    { ...products[0], image: '/assets/products/pen-pro-transparent.png', id: 'pen-pro', category: 'machine', title: 'Pen Pro X', stroke: '۴.۰ میلی‌متر', voltage: '۶–۹ ولت', speed: '۱۱۰۰۰ دور' },
    { ...products[0], image: '/assets/products/rotary-air-transparent.png', id: 'rotary-air', category: 'machine', title: 'Rotary Air', price: 10800000, weight: '۱۷۲ گرم', use: 'شید و رنگ', stroke: '۳.۵ میلی‌متر', voltage: '۵–۸ ولت', speed: '۹۵۰۰ دور' },
    { ...products[1], id: 'rl3', category: 'needle', title: 'کارتریج 3RL', stroke: 'لاین ظریف', voltage: '۰.۳۰ میلی‌متر', speed: 'بسته ۲۰ عددی' },
    { ...products[1], id: 'm1-9', category: 'needle', title: 'کارتریج 9M1', price: 980000, weight: 'بسته ۲۰ عددی', use: 'سایه و پک رنگ', stroke: 'مگنوم خمیده', voltage: '۰.۳۵ میلی‌متر', speed: 'ممبران نرم' },
    { ...products[2], id: 'ink-black', category: 'ink', title: 'مشکی عمیق ۳۰ml', stroke: 'پیگمنت بالا', voltage: 'وگان', speed: 'لاین و بلک‌ورک' },
    { ...products[2], id: 'ink-color', category: 'ink', title: 'ست رنگی ۵ عددی', price: 3900000, weight: '۵ × ۳۰ میل', use: 'رئالیسم رنگی', stroke: 'قابل ترکیب', voltage: 'وگان', speed: 'پک رنگ' }
  ];
  const compareCategories = [{ id: 'machine', name: 'دستگاه‌ها' }, { id: 'needle', name: 'سوزن‌ها' }, { id: 'ink', name: 'رنگ‌ها' }];
  const inspirationStyles = [
    { name: 'رئالیسم', image: '/assets/styles/realism.png' },
    { name: 'فاین‌لاین', image: '/assets/styles/fine-line.png' },
    { name: 'اورنامنتال', image: '/assets/styles/ornamental.png' },
    { name: 'ژاپنی', image: '/assets/styles/japanese.png' },
    { name: 'بلک‌ورک', image: '/assets/styles/blackwork.png' },
    { name: 'رنگی', image: '/assets/styles/color.png' }
  ];

  let rail: HTMLDivElement;
  let inspirationRail: HTMLDivElement;
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
  let draggingTattoo = $state(false);
  let compareCategory = $state('machine');
  let leftId = $state('pen-pro');
  let rightId = $state('rotary-air');
  let compareOpen = $state(false);
  let compareAngle = $state(12);
  let compareDrag = $state<{ clientX: number; angle: number } | null>(null);
  let quoteSize = $state(14);
  let quoteDetail = $state(2);
  let quoteColor = $state('رنگی');
  let quoteImage = $state('');
  let quoteAnalysis = $state('برای تحلیل اولیه، تصویر طرح را بارگذاری کن.');
  let quoteAnalyzing = $state(false);

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
  const startDrag = (event: PointerEvent) => { if (!currentTattoo()) return; (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId); draggingTattoo = true; dragStart = { clientX: event.clientX, clientY: event.clientY, x: tattooX, y: tattooY }; };
  const dragTattoo = (event: PointerEvent) => { if (!dragStart || !stage) return; const rect = stage.getBoundingClientRect(); tattooX = Math.max(8, Math.min(92, dragStart.x + ((event.clientX - dragStart.clientX) / rect.width) * 100)); tattooY = Math.max(10, Math.min(90, dragStart.y + ((event.clientY - dragStart.clientY) / rect.height) * 100)); };
  const endDrag = () => { dragStart = null; draggingTattoo = false; };
  const changeCategory = () => { const models = modelsForCategory(); leftId = models[0].id; rightId = models[1]?.id ?? models[0].id; };
  const startCompareDrag = (event: PointerEvent) => { (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId); compareDrag = { clientX: event.clientX, angle: compareAngle }; };
  const moveCompareDrag = (event: PointerEvent) => { if (!compareDrag) return; compareAngle = Math.round(((compareDrag.angle + (event.clientX - compareDrag.clientX) * .8) % 360 + 360) % 360); };
  const endCompareDrag = () => { compareDrag = null; };
  const analyzeQuoteUpload = (event: Event) => {
    const file = (event.currentTarget as HTMLInputElement).files?.[0];
    if (!file) return;
    if (quoteImage) URL.revokeObjectURL(quoteImage);
    quoteImage = URL.createObjectURL(file);
    quoteAnalyzing = true;
    quoteAnalysis = 'در حال بررسی رنگ و تراکم خطوط…';
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = Math.min(96 / image.width, 96 / image.height, 1);
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) return;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      let saturation = 0; let contrast = 0; let previous = 0; let count = 0;
      for (let index = 0; index < pixels.length; index += 16) {
        const red = pixels[index] / 255; const green = pixels[index + 1] / 255; const blue = pixels[index + 2] / 255;
        const max = Math.max(red, green, blue); const min = Math.min(red, green, blue);
        saturation += max ? (max - min) / max : 0;
        const light = (red + green + blue) / 3;
        if (count) contrast += Math.abs(light - previous);
        previous = light; count++;
      }
      const averageSaturation = saturation / Math.max(1, count);
      const edgeDensity = contrast / Math.max(1, count - 1);
      quoteColor = averageSaturation > .18 ? 'رنگی' : 'مشکی و خاکستری';
      quoteDetail = edgeDensity > .18 ? 3 : edgeDensity > .09 ? 2 : 1;
      quoteAnalysis = `تحلیل اولیه: ${quoteColor} با جزئیات ${quoteDetail === 3 ? 'زیاد' : quoteDetail === 2 ? 'متوسط' : 'ساده'}. اندازهٔ واقعی را از گزینه‌های زیر تأیید کن.`;
      quoteAnalyzing = false;
    };
    image.onerror = () => { quoteAnalyzing = false; quoteAnalysis = 'خواندن این تصویر ممکن نبود؛ یک فایل JPG، PNG یا WebP امتحان کن.'; };
    image.src = quoteImage;
  };
  const quoteHours = () => Math.max(1, Math.ceil((quoteSize / 7) * quoteDetail * (quoteColor === 'رنگی' ? 1.25 : 1)));
  const quotePrice = () => Math.round((900000 + quoteSize * 185000 * quoteDetail * (quoteColor === 'رنگی' ? 1.22 : 1)) / 100000) * 100000;
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
    <div class="mix-workspace"><div class="mix-surface" style={`--mixed:${displayedColor()}`}><img src="/assets/products/tattoo-inks-v1.jpg" alt="میز آزمایشگاهی ترکیب رنگ تتو" /><div class="lab-shelf" aria-hidden="true"><i></i><i></i><i></i></div><div class="mix-vessel"><div class="ink-drops" aria-hidden="true">{#each chosenColors as color, index}<i style={`--drop:${color};--drop-index:${index}`}></i>{/each}</div><div class="paint-puddle"></div><i class="mix-stick" aria-hidden="true"></i></div><div class="mix-readout"><b>{recipeName}</b><small>{displayedColor()} · {chosenColors.length} پیگمنت داخل ظرف</small><button onclick={() => { chosenColors = []; targetColor = ''; recipeName = 'ظرف خالی'; }}>خالی کردن ظرف</button></div></div><div class="pigment-panel"><div class="pigment-panel-title"><b>قفسه پیگمنت‌ها</b><span>برای افزودن یا حذف، روی بطری بزن</span></div><div class="pigments">{#each pigments as pigment}<button class:active={chosenColors.includes(pigment.hex)} style={`--pigment:${pigment.hex}`} onclick={() => togglePigment(pigment.hex)} aria-pressed={chosenColors.includes(pigment.hex)}><i><u></u></i><span>{pigment.name}</span><small>{chosenColors.includes(pigment.hex) ? 'داخل ترکیب' : 'افزودن'}</small></button>{/each}</div></div></div>
  </article>

  <article class="glass-panel simulator-lab">
    <div class="panel-heading"><span>SKIN PREVIEW</span><h2>شبیه‌سازی و جای‌گذاری طرح</h2><p>طرح خودت را بارگذاری کن یا بر اساس محل، اندازه و ایده چند پیشنهاد بساز.</p></div>
    <div class="tool-tabs" role="tablist" aria-label="روش انتخاب طرح"><button class:active={simulatorMode === 'upload'} onclick={() => simulatorMode = 'upload'}>۱. آپلود طرح</button><button class:active={simulatorMode === 'suggested'} onclick={() => simulatorMode = 'suggested'}>۲. طرح پیشنهادی</button></div>
    <div class="body-area-row"><label>عضو بدن<select bind:value={bodyArea} onchange={changeBodyArea} aria-label="عضو بدن">{#each Object.keys(bodyAreas) as area}<option>{area}</option>{/each}</select></label><span>با تغییر عضو، عکس و جای اولیهٔ طرح عوض می‌شود.</span></div>
    {#if simulatorMode === 'suggested'}<div class="suggestion-form"><input bind:value={tattooPrompt} aria-label="ایده طرح" placeholder="ایده؛ مثلاً گل رئالیسم" /><button onclick={generateTattooSuggestions}>ساخت ۳ پیشنهاد</button></div>{#if suggestionsReady}<div class="tattoo-suggestions">{#each tattooSuggestions as suggestion, index}<button class:active={selectedTattoo === index} onclick={() => selectedTattoo = index}><img src={suggestion.image} alt="" /><span>{suggestion.name}</span></button>{/each}</div>{/if}{/if}
    <div class="skin-preview" bind:this={stage}>{#key bodyArea}<img class="arm-image skin-swap" src={bodyAreas[bodyArea].image} alt={`پیش‌نمایش ${bodyArea}`} />{/key}{#if currentTattoo()}<img class="tattoo-overlay draggable" class:dragging={draggingTattoo} src={currentTattoo()} alt="طرح قابل جابه‌جایی روی پوست" style={`left:${tattooX}%;top:${tattooY}%;width:${tattooSize}%;opacity:${tattooOpacity / 100}`} onpointerdown={startDrag} onpointermove={dragTattoo} onpointerup={endDrag} onpointercancel={endDrag} />{:else}<div class="upload-hint">طرح شما<br /><small>اینجا نمایش داده می‌شود</small></div>{/if}{#if currentTattoo()}<span class="drag-tip">با ماوس یا لمس جابه‌جا کن</span>{/if}</div>
    <div class="sim-controls"><label class="upload-button">آپلود طرح<input type="file" accept="image/png,image/jpeg,image/webp" onchange={onUpload} /></label><label>اندازه <input type="range" min="18" max="72" bind:value={tattooSize} /></label><label>شفافیت <input type="range" min="25" max="100" bind:value={tattooOpacity} /></label></div><small class="privacy-note">آپلود و جابه‌جایی در همین مرورگر انجام می‌شود. پیشنهادها فعلاً نمونهٔ تعاملی‌اند.</small>
  </article>
</section>

<section class="commerce-grid">
  <article class="glass-panel compare-panel"><div class="compare-top"><div class="panel-heading"><span>COMPARE 360</span><h2>مقایسهٔ تعاملی محصولات</h2><p>محصول‌ها را انتخاب کن و برای چرخش، صحنه را با موس یا لمس بکش.</p></div><label class="compare-category">دسته محصول<select bind:value={compareCategory} onchange={changeCategory}>{#each compareCategories as category}<option value={category.id}>{category.name}</option>{/each}</select></label><div class="compare-selects"><select bind:value={leftId} aria-label="محصول اول">{#each modelsForCategory() as model}<option value={model.id}>{model.title}</option>{/each}</select><b>VS</b><select bind:value={rightId} aria-label="محصول دوم">{#each modelsForCategory() as model}<option value={model.id}>{model.title}</option>{/each}</select></div></div><div class="compare-stage" class:dragging={compareDrag !== null} role="application" aria-label="صحنه مقایسه؛ برای چرخاندن محصول‌ها بکش" onpointerdown={startCompareDrag} onpointermove={moveCompareDrag} onpointerup={endCompareDrag} onpointercancel={endCompareDrag}><i class="orbit orbit-one"></i><i class="orbit orbit-two"></i>{#each [selectedModel(leftId), selectedModel(rightId)] as model, index}<div class="product-360" style={`--turn:${compareAngle + (index ? -8 : 8)}deg`}><img src={model.image} alt={model.title} draggable="false" /><h3>{model.title}</h3><strong>{formatPrice(model.price)}</strong><span>{model.weight} · {model.use}</span></div>{/each}<b class="versus">VS</b><span class="drag-360">↔ بکش برای چرخش · {compareAngle}°</span></div><button class="compare-open" onclick={() => compareOpen = true}>باز کردن مشخصات کامل</button></article>
</section>

<section class="quote-calculator glass-panel" aria-labelledby="quote-title"><div class="quote-copy"><span>PROJECT QUOTE</span><h2 id="quote-title">برآورد زمان و قیمت پروژه</h2><p>تصویر طرح را بفرست تا رنگ و تراکم خطوط روی همین دستگاه تحلیل شود؛ سپس اندازهٔ واقعی را انتخاب کن.</p><div class="quote-upload"><label><input type="file" accept="image/png,image/jpeg,image/webp" onchange={analyzeQuoteUpload} /><span>{quoteAnalyzing ? 'در حال تحلیل…' : 'آپلود و تحلیل طرح'}</span><small>JPG، PNG یا WebP</small></label>{#if quoteImage}<img src={quoteImage} alt="پیش‌نمایش طرح بارگذاری‌شده" />{:else}<div class="quote-upload-placeholder" aria-hidden="true">＋</div>{/if}<p>{quoteAnalysis}</p></div><div class="size-choices" aria-label="اندازه تقریبی طرح">{#each [{size:5,label:'خیلی کوچک'},{size:10,label:'کوچک'},{size:15,label:'متوسط'},{size:25,label:'بزرگ'},{size:35,label:'پروژه‌ای'}] as choice}<button class:active={quoteSize === choice.size} onclick={() => quoteSize = choice.size}><i style={`--size:${choice.size}px`}></i><span>{choice.label}</span><small>{choice.size} cm</small></button>{/each}</div><div class="quote-options"><fieldset><legend>تراکم جزئیات</legend><button class:active={quoteDetail === 1} onclick={() => quoteDetail = 1}>ساده</button><button class:active={quoteDetail === 2} onclick={() => quoteDetail = 2}>متوسط</button><button class:active={quoteDetail === 3} onclick={() => quoteDetail = 3}>پر جزئیات</button></fieldset><fieldset><legend>نوع اجرا</legend><button class:active={quoteColor === 'مشکی و خاکستری'} onclick={() => quoteColor = 'مشکی و خاکستری'}>مشکی و خاکستری</button><button class:active={quoteColor === 'رنگی'} onclick={() => quoteColor = 'رنگی'}>رنگی</button></fieldset></div></div><div class="quote-result"><small>تخمین پروژه</small><b>{quoteHours()} ساعت کار</b><strong>{formatPrice(quotePrice())}</strong><p>پیشنهاد: {quoteHours() > 5 ? 'تقسیم به دو جلسه برای کیفیت و استراحت پوست' : 'قابل انجام در یک جلسه با زمان استراحت'}</p><small>این مبلغ برآورد اولیه است و پس از بررسی پوست و محل اجرا نهایی می‌شود.</small></div></section>

<section class="content-grid"><article class="glass-panel editorial-card care-article"><span>راهنمای نگهداری</span><h2>سه روز اول ترمیم</h2><p>شست‌وشوی ملایم، بالم و محافظت از نور مستقیم.</p><a href="/aftercare">مطالعه راهنما ←</a></article><article class="glass-panel editorial-card color-article"><span>پالت‌های محبوب</span><h2>رنگ‌های ترند استودیو</h2><p>پالت مناسب پروژهٔ بعدی را از ترکیب‌های تازه پیدا کن.</p><a href="/inks">دیدن رنگ‌ها ←</a></article><article class="glass-panel editorial-card machine-article"><span>مجله اینکورا</span><h2>انتخاب دستگاه مناسب</h2><p>وزن، کورس و فرم گریپ را برای انتخاب دقیق بررسی کن.</p><a href="/journal">مشاهده مقاله‌ها ←</a></article><article class="glass-panel editorial-card stencil-article"><span>آموزش استودیو</span><h2>انتقال تمیز استنسیل</h2><p>از آماده‌سازی پوست تا ثبات خطوط اولیهٔ طرح.</p><a href="/journal">ادامه مقاله ←</a></article><article class="glass-panel editorial-card skin-article"><span>دانش رنگ</span><h2>رنگ روی تناژهای پوست</h2><p>کنتراست و انتخاب پیگمنت برای تناژهای متفاوت.</p><a href="/journal">ادامه مقاله ←</a></article><article class="glass-panel editorial-card comfort-article"><span>ارگونومی</span><h2>کاهش خستگی دست</h2><p>گریپ، زاویه و استراحت‌های کوتاه در جلسه‌های طولانی.</p><a href="/journal">ادامه مقاله ←</a></article></section>

<section class="style-discovery" aria-labelledby="style-discovery-title"><div class="section-title-row"><div><span>سبک خودت را پیدا کن</span><h2 id="style-discovery-title">الهام بگیر و مسیر هنری‌ات را انتخاب کن</h2></div><div class="rail-actions"><button aria-label="سبک قبلی" onclick={() => inspirationRail.scrollBy({ left: 300, behavior: 'smooth' })}>→</button><button aria-label="سبک بعدی" onclick={() => inspirationRail.scrollBy({ left: -300, behavior: 'smooth' })}>←</button></div></div><div class="inspiration-row" bind:this={inspirationRail}>{#each inspirationStyles as style}<a href="/shop" class="inspiration-card"><img src={style.image} alt={`نمونه سبک ${style.name}`} /><span>{style.name}</span></a>{/each}</div><div class="consultation-banner glass-panel"><div><span>مشاورهٔ تخصصی Inkora</span><h2>برای انتخاب ابزار و مسیر اجرا مطمئن نیستی؟</h2><p>سبک، سطح تجربه و بودجه‌ات را بگو تا مسیر مناسب را با هم پیدا کنیم.</p></div><a class="home-action primary" href="/contact">درخواست مشاوره</a></div></section>

{#if compareOpen}<div class="compare-modal-backdrop"><dialog open class="compare-modal" aria-labelledby="compare-modal-title"><button class="modal-close" aria-label="بستن" onclick={() => compareOpen = false}>×</button><span>مقایسهٔ تخصصی {compareCategories.find((item) => item.id === compareCategory)?.name}</span><h2 id="compare-modal-title">{selectedModel(leftId).title} در برابر {selectedModel(rightId).title}</h2><div class="spec-table"><b>مشخصه</b><b>{selectedModel(leftId).title}</b><b>{selectedModel(rightId).title}</b>{#each [['قیمت', formatPrice(selectedModel(leftId).price), formatPrice(selectedModel(rightId).price)], ['وزن/بسته', selectedModel(leftId).weight, selectedModel(rightId).weight], ['کاربرد', selectedModel(leftId).use, selectedModel(rightId).use], ['کورس/نوع', selectedModel(leftId).stroke, selectedModel(rightId).stroke], ['ولتاژ/ساختار', selectedModel(leftId).voltage, selectedModel(rightId).voltage], ['سرعت/ویژگی', selectedModel(leftId).speed, selectedModel(rightId).speed]] as row}<span>{row[0]}</span><span>{row[1]}</span><span>{row[2]}</span>{/each}</div></dialog></div>{/if}
