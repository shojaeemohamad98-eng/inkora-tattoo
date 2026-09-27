# معماری مصوب Inkora

به‌روزرسانی: 2026-09-27. زیرساخت فاز ۱ حفظ شده و صفحه اصلی نمایشی فاز ۳ اضافه شده است.

## مسیرها و مرزها

ریشه منبع: `C:\Users\moham\Local Sites\inkora tattoo`.

- `apps/storefront`: SvelteKit، TypeScript، Tailwind و Bits UI. صفحهٔ اصلی در `/`؛ آزمون واقعی محصول با server load مستقل در `/integration-check`؛ ابزارهای داده‌محور در `/advisor` و `/compare`؛ شبیه‌ساز client-only در `/simulator`؛ دفتر طراحی در `/design-system`.
- `wordpress/plugins/inkora-core`: منبع افزونه اختصاصی. هسته WordPress و WooCommerce دست‌نخورده می‌مانند.
- `runtime/wordpress`: مسیر صریح سایت جدید LocalWP با نام Inkora Tattoo و دامنه پیشنهادی inkora-tattoo.local. کل این پوشه از Git خارج است: هسته، uploads، تنظیمات، دیتابیس و لاگ‌ها.
- `docs` و `scripts`: مستندات مشترک و ابزارهای موردنیاز فعلی.

پوشه packages، Docker، Redis، UI library اختصاصی و اسکلت فازهای آینده تا نیاز واقعی ایجاد نمی‌شوند. API client مرکزی فعلاً در `apps/storefront/src/lib/server/commerce.ts` است و در صورت داشتن مصرف‌کننده دوم قابل استخراج است.

## جریان داده

Home فقط دادهٔ نمایشی typeدار محلی در `src/lib/components/home/data.ts` دارد و هیچ API فروش، فرم ارسال اطلاعات یا نتیجهٔ توصیه تولید نمی‌کند. `Media.svelte` composition موقت CSS با شناسهٔ دارایی و توضیح دسترس‌پذیر می‌سازد. `FutureButton.svelte` فقط پیام زندهٔ محلی نشان می‌دهد. CSS خانه زیر `.inkora-home` و کلاس‌های اجزای آن است و توکن‌های فاز ۲ را تغییر نمی‌دهد. تمام دادهٔ محصول و تبدیل پول در route تشخیصی باقی مانده است.

مرورگر ← بارگذاری سروری SvelteKit ← WooCommerce Store API ← محصول منتشرشده در دیتابیس WordPress.

کلاینت مرکزی زمان انتظار محدود، بررسی HTTP و قرارداد پاسخ دارد. داده جعلی جایگزین خطا نمی‌شود. آدرس WordPress در متغیر خصوصی WORDPRESS_URL است. Store API محصول عمومی به کلید نیاز ندارد؛ کلیدهای مدیریتی، پرداخت و AI در آینده فقط سمت سرور نگهداری می‌شوند.

فاز ۵ قرارداد `SmartMetadata` را در `src/lib/smart-shopping.ts` و parsing آن را در client مرکزی `src/lib/server/commerce.ts` نگه می‌دارد. افزونه فقط metadata اعتبارسنجی‌شدهٔ کالاهای منتشرشده و موجود را در namespace `extensions.inkora_smart` Store API می‌گذارد. frontend مستقیماً endpoint یا WordPress را صدا نمی‌زند. شبیه‌ساز هیچ API ندارد و `URL.createObjectURL` مرورگر را برای پیش‌نمایش فایل محلی به کار می‌برد.

فاز ۶ workflow محتوای AI-assisted را در خود WordPress نگه می‌دارد: نوشتهٔ دارای meta `AI-assisted` پیش از تصمیم انسانی `approved` نمی‌تواند منتشر شود. endpoint محدود `inkora/v1/journal` فقط دادهٔ public و کمینهٔ مقاله‌های published+approved را بازمی‌گرداند؛ `getReviewedJournalArticles` در کلاینت مرکزی تنها مصرف‌کنندهٔ frontend است. کلید، prompt، متن تولیدی خصوصی، یادداشت بازبین و خروجی سرویس AI در repo یا API عمومی وجود ندارد.

فاز ۷ صفحات ویژه را در `src/lib/components/experiences` به‌صورت data-driven نگه می‌دارد؛ هر route تنها بارگذار server و کامپوننت مشترک است. `src/lib/server/experiences.ts` از کلاینت مرکزی فروش استفاده می‌کند و با `eligibleExperienceProducts` فقط محصولات واقعی و موجودِ دارای گروه smart یا دستهٔ قابل‌تشخیص را عبور می‌دهد. visualهای CSS محلی progressive enhancement هستند؛ خواندن محتوا و navigation به hover، mouse، WebGL یا انیمیشن وابسته نیست.

inkora-core یک endpoint عمومی کم‌اطلاعات `/wp-json/inkora/v1/health` دارد. ابزار ساخت محصول فقط در محیط local و برای مدیر دارای manage_woocommerce با nonce قابل استفاده است؛ روی فعال‌سازی خودکار داده نمی‌سازد. محصول آزمایشی ناموجود است تا قابل خرید نباشد. گزینه مخفی‌کردن محصولات ناموجود باید برای این آزمون خاموش باشد.

فاز ۸ domain جامعه را در `inkora-core` نگه می‌دارد. افزونهٔ سنگین شبکهٔ اجتماعی نصب نشده است: API عمومی محدود `/inkora/v1/community/{artists|portfolio}` صرفاً projection allowlist از profile/portfolioهای `published + public` می‌دهد. `src/lib/server/community.ts` تنها مصرف‌کنندهٔ frontend است. mutation فقط فرم same-origin WordPress با session، nonce، owner/moderator capability، optimistic revision و محیط `local` دارد؛ frontend به admin API وصل نیست. portfolio/post و interactionها schema/feature flag دارند، اما upload، follow، like، comment و message تا تکمیل privacy، media و anti-abuse transport ندارند. جزئیات و معیار انتخاب BuddyPress/BuddyBoss در `docs/community.md` است.

## محتوا و پول

برای فاز ۱، فیلدهای استاندارد WooCommerce کافی‌اند؛ ACF نصب نمی‌شود. مدل‌های پیشرفته دستگاه، سوزن، رنگ و هنرمند در فاز مربوط بررسی می‌شوند و انتخاب ACF براساس نیاز واقعی و هزینه انجام خواهد شد.

مبنای آزمون IRR در WooCommerce و نمایش تومان در رابط است. قیمت Store API ابتدا با currency_minor_unit تفسیر و سپس ریال بر ۱۰ تقسیم می‌شود. IRT دوباره تقسیم نمی‌شود؛ ارز ناشناخته خطاست. این آزمون واحد جای آزمون واقعی درگاه را نمی‌گیرد. در ابتدای مسیر فروشگاه فاز ۴ سازگاری درگاه ایرانی با headless بررسی و تبدیل ریال/تومان، callback، امضا و خرید کامل آزمایش می‌شود. درگاه هنوز انتخاب نشده است.

## میزبانی

منبع در GitHub موجود است؛ تنظیمات Vercel Preview با adapter رسمی `adapter-vercel` آماده شده، اما هنوز deployment آنلاین تأیید نشده است. WordPress به سرور جدا نیاز دارد. Preview همواره backend را غیرفعال می‌کند؛ buildهای عمومی بدون opt-in صریح production نیز غیرفعال می‌مانند. hook سرور مسیرهای طراحی، تست اتصال و درخواست جامعه را بیرون از dev مسدود می‌کند. Node 24 و pnpm 11.19.0 انتخاب شده‌اند. بسته‌بندی Vercel در ویندوز به محدودیت symlink برخورد کرد؛ نتیجه build ابری هنوز نامعلوم است. جزئیات در `docs/deployment.md`.

## منابع و تقدم تصمیم‌ها

مرجع تصویری فاز ۲: `C:\Users\moham\OneDrive\Desktop\b8c9fc82-a927-4897-9890-57d40de0f069.jpg`؛ لوگو و عکس‌های کاربر در همان فاز بررسی می‌شوند.

سند اولیه خوانده شد: `C:\Users\moham\.codex\attachments\62ea0f59-8853-4ebc-8d37-06e973a62dcf\Pasted text.txt`. دستورهای Docker/Mac، استقرار قطعی Vercel و الزام GitHub آن با تصمیم‌های جدید جایگزین شده‌اند.

مراجع فنی بررسی‌شده:
- https://svelte.dev/docs/cli/sv-create
- https://tailwindcss.com/docs/installation/framework-guides/sveltekit
- https://bits-ui.com/docs/components/accordion
- https://developer.woocommerce.com/docs/apis/store-api/resources-endpoints/products
- https://localwp.com/help-docs/advanced/change-the-location-of-a-sites-folder/
