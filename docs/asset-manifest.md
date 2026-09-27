# فهرست دارایی‌های فاز ۲

بررسی: 2026-09-26. **تمام عکس‌های وب در این فاز فقط لینک نامزد هستند؛ هیچ عکس stock در repo دانلود نشده است.** سرور images.pexels.com هنگام دریافت عکس hero اتصال را رد کرد. صفحات منبع و مجوز با ابزار جست‌وجوی وب بررسی شدند، اما بازبینی پیکسلی نبود لوگو برای نامزدها تأیید نشده است. در نتیجه هیچ نامزدی ready-for-production نیست. تصویر اصلی انتخاب برند و مرجع صفحه فقط از فایل کاربر خوانده شدند.

## قواعد منبع و دریافت

[مجوز رسمی Pexels](https://www.pexels.com/license/) استفاده و تغییر عکس را مجاز می‌داند؛ attribution الزامی نیست، ولی نام عکاس را نگه می‌داریم. [راهنمای رسمی استفاده تجاری](https://help.pexels.com/hc/en-us/articles/360042295174-What-is-the-license-of-the-photos-and-videos-on-Pexels) این کاربرد را صریح توضیح می‌دهد. استفاده نباید تأیید برند توسط شخص/شرکت تصویر را القا کند؛ عکس stock نشان تجاری نیست و فروش نسخهٔ دست‌نخورده یا بازتوزیع stock مجاز نیست. حقوق اشخاص، آثار تتو و علائم داخل عکس باید برای کاربرد نهایی بررسی شوند. صفحهٔ جست‌وجو مجوز یک فایل مشخص محسوب نمی‌شود.

برای دریافت: صفحهٔ دقیق هر نامزد را باز کنید، مجوز روز دریافت و نام عکاس را ثبت کنید، Free download همان عکس (نه تبلیغ یا محتوای sponsored) را انتخاب کنید. ابتدا فایل در پوشهٔ موقت خارج repo بررسی شود؛ اگر برند قابل تشخیص، watermark یا ابهام حقوقی دارد وارد repo نشود. پس از تأیید، نسخهٔ بهینه در `static/assets/temporary` با نام ID ذخیره و مسیر، ابعاد، checksum و تاریخ دانلود به manifest افزوده شود. هیچ hotlink در برنامه وجود ندارد. فایل پس‌زمینهٔ خارجی لازم نیست؛ CSS خود پروژه جایگزین دارد.

## نامزدهای تصویر و وضعیت هر کاربرد

برای تمام ردیف‌های Pexels، مجوز و شرایط همان دو لینک رسمی بالاست؛ attribution اجباری نیست و اعتبار پیشنهادی در ستون جدا آمده. «فقط لینک» یعنی هنوز فایل محلی مجاز و بازبینی‌شده نداریم.

| ID / نام / کاربرد | منبع دقیق یا تحقیق | اعتبار پیشنهادی | وضعیت موقت / دلیل | جایگزین نهایی و مشخصات دریافت |
|---|---|---|---|---|
| hero-studio / استودیو و دستگاه / hero | [Hands in Gloves Holding Tattoo Machine, 19474848](https://www.pexels.com/photo/hands-in-gloves-holding-tattoo-machine-19474848/) | Guto Macedo / Pexels | فقط لینک؛ دریافت فایل ناموفق؛ برش افقی و نبود لوگو نیازمند بررسی | عکس اختصاصی استودیو با رضایت افراد، دستکش و دستگاه بی‌نشان؛ 1920×1080 و نسخه 900×1200 با جای متن |
| category-machine / دستگاه تتو | [همان نامزد 19474848](https://www.pexels.com/photo/hands-in-gloves-holding-tattoo-machine-19474848/) | Guto Macedo / Pexels | placeholder؛ عکس درحال استفاده است، جای عکس محصول واقعی نیست | عکاسی محصول موجود توسط برند/تأمین‌کننده با اجازه کتبی؛ 800×800 و crop=contain |
| category-cartridge / کارتریج و سوزن | [Equipment 6593382](https://www.pexels.com/photo/close-up-shot-of-tattoo-equipment-6593382/)؛ جست‌وجوی اختصاصی cartridge نتیجهٔ مناسب قطعی نداشت | Pavel Danilyuk / Pexels برای نامزد عمومی | placeholder؛ نامزد تجهیزات عمومی برای نمای نزدیک کارتریج تأیید نشده | عکاسی بسته‌بندی و کارتریج واقعی مجاز یا سفارش تصویر عمومی بی‌برند؛ 800×800 |
| category-ink / جوهر | [Ink Bottle 34155037](https://www.pexels.com/photo/tattoo-ink-bottle-and-equipment-close-up-34155037/) | Slava Kol / Pexels | فقط لینک/placeholder؛ نوشته و برند بطری بررسی نشده؛ دانلود به repo ممنوع تا بررسی | عکس محصول واقعی با اجازه؛ برای mockup بطری بدون نشان به‌صورت تولید مجاز؛ 800×800 |
| category-consumables / لوازم مصرفی | [Equipment 6593382](https://www.pexels.com/photo/close-up-shot-of-tattoo-equipment-6593382/) | Pavel Danilyuk / Pexels | فقط لینک؛ بسته‌بندی‌ها از نظر لوگو باید بررسی شوند | عکس دستکش، کاپ و روکش بدون لوگو؛ 800×600 |
| category-aftercare / مراقبت بعد | [تحقیق Pexels aftercare](https://www.pexels.com/search/tattoo%20aftercare/) | ندارد؛ فایل نهایی انتخاب نشده | placeholder؛ عکس محصول مناسب با مجوز و هویت روشن پیدا نشد؛ صفحه جست‌وجو مجوز نیست | عکاسی محصول واقعی با اجازه یا خرید stock بی‌برند با ثبت مجوز؛ 800×800؛ بدون ادعای پزشکی |
| category-stencil / استنسیل و انتقال | [Cutting Out a Design 7147759](https://www.pexels.com/photo/close-up-of-a-tattoo-artist-cutting-out-a-design-7147759/) | Michael Burrows / Pexels | فقط لینک؛ طرح تتو و قیچی/ابزار نیازمند بررسی حقوق و لوگو | کاغذ انتقال و طرح اختصاصی مجاز؛ 800×600 |
| category-accessories / اکسسوری | [Equipment 6593382](https://www.pexels.com/photo/close-up-shot-of-tattoo-equipment-6593382/) | Pavel Danilyuk / Pexels | placeholder؛ تصویر دستگاه برق/لوازم مشخص تأیید نشده | عکس مجاز محصول واقعی؛ بدون استفاده از برندهای مرجع؛ 800×800 |
| editorial-artist / هنرمند و تتو | [A Person Doing a Tattoo 6593383](https://www.pexels.com/photo/a-person-doing-a-tattoo-6593383/) | Pavel Danilyuk / Pexels | فقط لینک؛ فرد، اثر و نبود برند نیازمند بررسی؛ به عنوان هنرمند Inkora معرفی نشود | هنرمند همکار واقعی با اجازه انتشار عکس و اثر؛ 1200×900 |
| simulator-skin / دست یا پوست / مرجع آینده | [Person’s Hand 7479530](https://www.pexels.com/photo/close-up-photo-of-a-person-s-hand-7479530/) | Angela Roma / Pexels | فقط لینک؛ نمای macro شاید برای نمایش کامل دست مناسب نباشد؛ شبیه‌ساز ساخته نشده | عکاسی اختصاصی دست/ساعد بدون طرح در چند رنگ پوست، رضایت و حق استفاده؛ 1200×1600 |
| dark-texture / پس‌زمینه انتزاعی | [Marble Texture 32604787](https://www.pexels.com/photo/abstract-marble-texture-artwork-on-black-background-32604787/) | Landiva Weber / Pexels | فقط لینک؛ در preview استفاده نشده | گرادیان CSS خود پروژه (اکنون موجود)؛ در صورت عکس: 1600×900 و جزئیات کم |

نامزد [بطری و تجهیزات 4123711](https://www.pexels.com/photo/white-and-black-pump-bottle-4123711/) در تحقیق پیدا شد، اما توضیحاتش شامل labels و studio branding بود؛ انتخاب نشد و دانلود نشد. خرید stock یا تولید raster در این فاز انجام نشده است؛ هیچ هزینه‌ای ایجاد نشد.

## دارایی‌های واقعاً محلی

| ID / فایل | کاربرد و منبع | مجوز / attribution | وضعیت و جایگزینی |
|---|---|---|---|
| brand-reference / `docs/assets/reference/logo-04-preview.png` | crop مستقیم طرح ۰۴ از JPEG کاربر؛ مختصات در design-system.md | مالکیت/اجازه انتشار نهایی تأیید نشده؛ فقط مرجع داخلی انتخاب کاربر | پیش‌نمایش، نه چاپ/لوگوی نهایی؛ جایگزینی فقط با فایل مجاز برند |
| brand-temporary / `static/assets/brand/inkora-wordmark-temporary.svg` | نوشتار سادهٔ SVG ساخته‌شده در این پروژه؛ بدون جمجمه | وابسته به stock نیست؛ متن برند کاربر؛ نام فونت سیستمی Arial | موقت، بدون ادعای نشان نهایی؛ برای انتشار نهایی جایگزین شود |
| font-vazirmatn / `static/assets/fonts/Vazirmatn-variable.woff2` | [فایل رسمی نسخه v33.003](https://github.com/rastikerdar/vazirmatn/blob/v33.003/fonts/webfonts/Vazirmatn%5Bwght%5D.woff2) | OFL-1.1؛ Copyright 2015 The Vazirmatn Project Authors؛ متن کامل `fonts/OFL.txt` همراه فایل | محلی، دریافت‌شده و قابل استفاده؛ حذف مجوز هنگام بازتوزیع ممنوع |
| placeholder-card / `src/lib/design/PreviewCard.svelte` | گرافیک سادهٔ دایره و شماره با CSS داخل پروژه | اثر کدنویسی پروژه؛ دارایی stock یا عکس محصول نیست؛ attribution خارجی ندارد | موقت؛ image=null؛ تعویض از prop image و alt |
| background-css / `src/lib/design/tokens.css` و route preview | گرادیان تیره و لایهٔ سطح به کمک CSS | کد پروژه؛ منبع ثالث ندارد | آمادهٔ استفاده به عنوان زمینه؛ فاقد عکس یا لوگوی ثالث |

مسیرهای `static` و `src` در جدول نسبت به `apps/storefront` هستند. برش مرجع با import در preview بسته‌بندی می‌شود تا مسیر فایل شخصی کاربر داخل مرورگر درخواست نشود. تا وقتی حق انتشار مرجع مشخص نیست، مسیر design-system برای انتشار عمومی مناسب نیست؛ noindex محدودیت دسترسی ایجاد نمی‌کند. این فاز فقط محلی است.

## ساختار و تحویل دارایی نهایی

```text
docs/assets/reference/            # برش مرجع برند، نه دارایی تولید
apps/storefront/static/assets/
  brand/                         # SVG موقت؛ فایل اصلی بعداً جداگانه افزوده شود
  fonts/                         # WOFF2 محلی + OFL
  temporary/                     # فعلاً README؛ عکس دانلودشده ندارد
  production/                    # هنوز ساخته نشده؛ فقط دارایی واقعی تأییدشدهٔ آینده
```

برای هر دارایی آینده: id، usage، sourceUrl، creator، licenseUrl، attribution، localPath، dimensions، checksum، reviewedAt، temporary و replacementOwner ثبت شود. لینک CDN خارجی جای localPath قرار نگیرد. نامزدهای جدول بالا به معنی تأیید کیفیت، نبود لوگو یا مجوز برای هر نوع کاربرد نیستند.

دریافتی لازم از کاربر: لوگوی اصلی SVG/PDF یا PNG شفاف باکیفیت و اجازه استفاده؛ عکس واقعی تجهیزات و دسته‌ها با حق استفاده؛ عکس استودیو/هنرمند/اثر و رضایت لازم؛ برای فاز شبیه‌ساز عکس دست/پوست مناسب. تأیید این دارایی‌ها پیش‌شرط انتشار واقعی است، نه پیش‌شرط تکمیل نمونهٔ موقت فاز ۲.
