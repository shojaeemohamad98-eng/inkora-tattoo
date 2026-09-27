# تحویل اجرایی فاز ۲ — کامل

تاریخ: 2026-09-27. چت مدیریت: `01a0defa-f975-7c32-addc-760b1fd52ddf`.

**فاز ۲ کامل است.** محدودهٔ آن طراحی سیستم و دارایی‌های موقت بود، نه ساخت صفحهٔ اصلی، فروشگاه، پرداخت، AI یا شبیه‌ساز. تأیید سلیقه‌ای نهایی کاربر هنوز ثبت نشده؛ این مرحله می‌تواند پیش از فاز ۳ انجام شود، ولی مانع تحویل اجرایی قرارداد طراحی نیست.

## ساخته‌شده

- `apps/storefront/src/lib/design/tokens.css`: توکن‌های CSS عملی و opt-in برای رنگ، typography، spacing، radius، border، shadow، motion، focus و reduced motion. تم فقط با `.inkora-theme` فعال می‌شود و صفحهٔ آزمون فاز ۱ را تغییر نمی‌دهد.
- `apps/storefront/src/lib/design/PreviewCard.svelte`: کارت نمونه با جای‌نگهدار صریح یا prop تصویر محلی، alt و حالت محصول غیرفعال.
- `apps/storefront/src/routes/design-system/+page.svelte`: دفتر طراحی محلی RTL با پالت، typography، logo lock، کارت‌ها، button/input states و توضیح responsive. این route `noindex,nofollow` دارد و home page نیست.
- `apps/storefront/static/assets/brand/inkora-wordmark-temporary.svg`: نوشتار سادهٔ موقت؛ هیچ ادعایی برای لوگوی نهایی ندارد.
- `docs/assets/reference/logo-04-preview.png`: برش مرجع داخلی طرح ۰۴ انتخاب کاربر؛ نه فایل چاپ، نه دارایی عمومی. بازطراحی جمجمه یا حذف watermark انجام نشده است.
- `apps/storefront/static/assets/fonts/Vazirmatn-variable.woff2` و `OFL.txt`: وزیرمتن محلی با مجوز کامل OFL.
- `docs/design-system.md`: قرارداد کامل اجزا، states، دسترس‌پذیری، RTL و responsive.
- `docs/asset-manifest.md`: منبع، شرایط مجوز، attribution، وضعیت، جایگزین و روش دریافت هر دستهٔ تصویر.

## نتیجهٔ تحقیق دارایی

منابع Pexels و مجوز رسمی آن بررسی شدند. نامزدهای hero، تجهیزات، جوهر، استنسیل، هنرمند، پوست و texture در manifest لینک شده‌اند. هیچ تصویر stock در repo دانلود یا hotlink نشده است: اتصال به سرور تصاویر Pexels برای دریافت فایل در این محیط رد شد و نامزدها هنوز از نظر لوگوی قابل‌تشخیص و حقوق اثر تتو بازبینی پیکسلی نشده‌اند. بنابراین همه placeholder یا فقط لینک‌اند، نه ready-for-production.

تصویر aftercare دارای نامزد قابل‌تأیید نبود و placeholder باقی ماند. پس‌زمینهٔ dark abstract با CSS تولید شده و نیاز به تصویر خارجی ندارد. عکس محصول برندهای ثالث، تصویر بدون مجوز روشن، محصول واقعی، قیمت و موجودی واقعی وارد preview نشدند.

## آنچه باید از کاربر یا کسب‌وکار دریافت شود

1. لوگوی اصلی مجاز: SVG/PDF یا PNG شفاف باکیفیت، نسخهٔ تک‌رنگ و نسخهٔ کوچک نشان، به همراه اجازه استفاده.
2. عکس‌های واقعی تجهیزات، دسته‌ها و محصولات با حق انتشار؛ هر فایل باید منبع/اجازه و نام محصول تأییدشده داشته باشد.
3. عکس‌های استودیو و هنرمند با رضایت افراد و حق استفاده از آثار تتو.
4. برای فاز ۵، عکس دست/ساعد در چند رنگ پوست با رضایت و قرارداد کاربرد شبیه‌ساز.

## آزمون‌های واقعاً اجراشده

- `pnpm check`: موفق؛ صفر خطا و صفر هشدار Svelte.
- `pnpm build`: موفق با adapter-node. پیام timing افزونه‌ها اطلاع‌رسانی بود و خطا نبود.
- `pnpm test`: چهار آزمون موجود تبدیل واحد پول، همگی موفق. این آزمون‌ها متعلق به فاز ۱‌اند؛ برای تغییر نمایشی فاز ۲ آزمون واحد جدید لازم نبود.
- بررسی مرورگر محلی route `/design-system`: HTML معنایی، altهای مرجع/wordmark، skip link، label ورودی، aria-invalid و button state مشاهده شدند. toggle انتخاب و reset ورودی با نتیجهٔ واقعی آزمایش شد.
- بررسی دیداری با مرورگر داخلی در 1440px، 768px، 390px و 320px: بدون overflow افقی در 320px؛ کارت‌ها در breakpointها 4/2/1 ستون شدند. تصویر QA موبایل در `docs/assets/qa/phase-02-mobile.png` نگه‌داری شده است.

## اجرای پیش‌نمایش

در PowerShell، در ریشهٔ پروژه:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\pnpm.ps1 dev
```

سپس `http://127.0.0.1:5173/design-system` را در مرورگر باز کنید. برای توقف server، در همان پنجره `Ctrl+C` بزنید. مسیر `/` همچنان آزمون اتصال فاز ۱ است.

## کار فاز ۳

فاز ۳ از `docs/design-system.md` و preview شروع کند؛ ابتدا header و hero با ساختار واقعی، سپس دسته‌ها و بخش‌ها براساس ترتیب responsive. دارایی‌ها از manifest فقط پس از تأیید/دریافت به `static/assets/production` وارد شوند و هر دادهٔ محصول از WooCommerce بیاید. قابلیت‌های AI، شبیه‌ساز، پرداخت، محصول جعلی و ادعاهای خدماتی وارد فاز ۳ نشوند.
