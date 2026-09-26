# تحویل اجرایی فاز ۱ — در انتظار تکمیل Local

تاریخ 2026-09-26. چت مدیریت: `01a0defa-f975-7c32-addc-760b1fd52ddf`.

اتوماسیون پیگیری: **Inkora phase handoff monitor** فعال است. پایش روزانه است و شرط شروع فاز بعدی، تکمیل واقعی فاز و تأیید صریح است؛ برای وضعیت‌های بدون تغییر اعلان نمی‌دهد.

**این گزارش پایان موفق فاز نیست.** ساخت سایت جدید Local اکنون تأیید شده، اما نصب WooCommerce، فعال‌سازی افزونه و آزمون محصول واقعی هنوز باقی‌اند. وارد فاز ۲ نشوید.

## ساخته‌شده

Monorepo کوچک با apps/storefront و wordpress/plugins/inkora-core؛ صفحه فارسی RTL آزمون؛ Tailwind و Accordion از Bits UI؛ API client مرکزی server-only با timeout و اعتبارسنجی پاسخ؛ تبدیل صریح IRR/IRT به تومان؛ endpoint سلامت افزونه و ابزار nonce-protected ساخت محصول واقعی local-only؛ اسکریپت‌های pnpm، کپی افزونه و verify:live؛ معماری، راهنمای اجرا و وضعیت ۸ فاز.

runtime، .env، node_modules، خروجی build، cache و لاگ‌ها در Git نخواهند بود. هسته وردپرس و سایت قدیمی تغییر داده نشدند. GitHub، hosting و deployment انجام نشده‌اند. ACF برای فیلدهای استاندارد فاز ۱ لازم نیست.

## بررسی‌های واقعاً اجراشده

- بررسی پوشه و والدها: AGENTS.md موجود نبود؛ پروژه در آغاز خالی و فاقد Git بود.
- بررسی فقط‌خواندنی رجیستری Local: تنها سایت Inkora با مسیر `~\Local Sites\inkora` وجود داشت؛ سایت Inkora Tattoo موجود نبود.
- Node 24.19.0، Git 2.53.0.windows.3 و pnpm 11.19.0 موجود بودند؛ مجدداً نصب نشدند. PHP 8.2.29 همراه Local استفاده شد.
- نصب وابستگی‌ها موفق. TypeScript 7 ناسازگار بود و با نسخه 6.0.3 جایگزین شد؛ تمام نسخه‌های manifest و lockfile ثابت‌اند. `pnpm peers check`: بدون ناسازگاری.
- `pnpm check`: صفر خطا و صفر هشدار Svelte. پیام غیرمسدودکننده override root از Vite هنگام sync دیده شد.
- `pnpm build`: موفق با adapter-node؛ پیام‌های زمان‌بندی افزونه‌ها صرفاً اطلاع‌رسانی بودند.
- `node --test tests/*.test.mjs`: چهار آزمون موفق: ریال، minor unit، تومان بدون تقسیم دوباره، رد ارز/قیمت نامعتبر.
- `php -n -l wordpress/plugins/inkora-core/inkora-core.php`: موفق. این فقط نحو PHP است و اثبات اجرای افزونه در WordPress نیست.
- frontend در `http://127.0.0.1:5173/` اجرا شد. HTTP 200، lang=fa و dir=rtl بررسی شدند؛ متن عدم اتصال موجود و متن موفقیت غایب بود. مرورگر داخلی همین وضعیت را نمایش داد.
- تا این تحویل WordPress/API واقعی آزمایش موفق نداشته‌اند. `verify:live` برای ادامه آماده است؛ نباید با داده ساختگی پاس شود.

## مانع و مسیر ادامه

ابزار مرورگر کنترل بومی Windows نداشت. مهارت computer-use و @oai/sky جداگانه بررسی شدند؛ پنجره Local با عنوان Choose site path پیدا شد. پوشه خالی `runtime\wordpress` ساخته و مقدار کادر Folder روی مسیر کامل آن تنظیم شد. کلیک Select Folder با `coordinate input geometry is unavailable` شکست خورد؛ بازیابی capture نیز `FrameArrived timed out: timed out waiting on channel` داد. انتخاب نهایی پوشه/ساخت سایت تأیید نشده است. ابزار امنیت Windows دستکاری نشد.

اقدام ساده بعدی اکنون: در پنل سایت جدید `http://inkora.test.local/wp-admin/` افزونه WooCommerce را نصب و فعال کنید؛ جدول افزونه‌ها در بررسی اخیر خالی بود. رمز در چت ارسال نشود.

پس از پاسخ «ساخته شد»، عامل اجرایی ابتدا ثبت سایت و مسیر واقعی را دوباره بررسی کند؛ سایت تکراری نسازد. سپس فقط در سایت جدید:

1. WooCommerce رسمی را نصب و فعال کند؛ IRR، کشور ایران و عدم مخفی‌کردن محصول ناموجود را تنظیم کند.
2. scripts/sync-plugin.ps1 را اجرا و inkora-core را فعال کند.
3. محیط WP_ENVIRONMENT_TYPE=local را بررسی کند. محصول با ابزار افزونه ساخته شود؛ قیمت ۱٬۲۵۰٬۰۰۰ ریال، نامک inkora-phase-01-test و SKU INKORA-PHASE-01.
4. سلامت افزونه و Store API را بخواند؛ صفحه frontend را باز و تطابق id/نام/۱۲۵٬۰۰۰ تومان را اثبات کند. `pnpm verify:live` همین زنجیره واقعی را بررسی می‌کند.
5. نتیجه واقعی، نسخه WordPress/WooCommerce و شناسه محصول را در این گزارش ثبت کند؛ فقط پس از تکمیل همه شروط وضعیت فاز را کامل کند.

## مسیرهای مهم

- ریشه: `C:\Users\moham\Local Sites\inkora tattoo`
- سایت جدید موردنظر: `runtime\wordpress`؛ public موردنظر: `runtime\wordpress\app\public`
- دامنه پیشنهادی: `http://inkora-tattoo.local`
- frontend: `http://127.0.0.1:5173/`؛ دستور راه‌اندازی: `powershell -ExecutionPolicy Bypass -File .\scripts\pnpm.ps1 dev`
- تنظیم private: `apps/storefront/.env` (از .env.example ساخته شده؛ در Git نیست)
- گزارش‌های مشترک: `docs/architecture.md`، `docs/status.md`، همین فایل؛ راهنمای مبتدی: `docs/local-development.md`.

مهارت استفاده‌شده برای بررسی UI: `C:\Users\moham\.codex\plugins\cache\openai-bundled\computer-use\26.924.22138\skills\computer-use\SKILL.md`. توقف به علت خطای واقعی ابزار است، نه درخواست تأیید مجدد برای کار مجاز.
