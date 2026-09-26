# تحویل اجرایی فاز ۱ — کامل

تاریخ 2026-09-26. چت مدیریت: `01a0defa-f975-7c32-addc-760b1fd52ddf`.

اتوماسیون پیگیری: **Inkora phase handoff monitor** فعال است. پایش روزانه است و شرط شروع فاز بعدی، تکمیل واقعی فاز و تأیید صریح است؛ برای وضعیت‌های بدون تغییر اعلان نمی‌دهد.

**فاز ۱ با موفقیت تکمیل شد.** سایت جدید Local، WooCommerce، افزونه و مسیر API تا نمایش در frontend آزمون شدند. فاز ۲ فقط پس از تأیید مدیر پروژه شروع شود.

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
- frontend در `http://127.0.0.1:5173/` با HTTP 200، lang=fa و dir=rtl اجرا شد و نتیجه موفق اتصال را نمایش داد.
- WordPress `inkora.test.local` با WooCommerce 11.1.2 فعال بررسی شد؛ تنظیمات ایران/تهران، IRR و صفر رقم اعشار تأیید شد.
- Inkora Core نسخه 0.1.0 فعال شد و health endpoint پاسخ `woocommerce: true` داد.
- محصول واقعی WooCommerce با شناسه 13، SKU `INKORA-PHASE-01`، slug `inkora-phase-01-test` و قیمت 1,250,000 ریال/125,000 تومان منتشر و خارج از موجودی شد.
- Store API، frontend در `http://127.0.0.1:5173/` و `pnpm verify:live` موفق شدند؛ frontend همان محصول و شناسه 13 را نمایش داد.

## محدودیت‌های باقی‌مانده برای فازهای بعد

در فاز ۱ درگاه پرداخت، خرید واقعی، ACF و انتشار عمومی انجام نشده‌اند؛ این موارد برای فاز ۴ هستند. رمز یا کلید API در چت ثبت نشده است.

## مسیرهای مهم

- ریشه: `C:\Users\moham\Local Sites\inkora tattoo`
- سایت جدید موردنظر: `runtime\wordpress`؛ public موردنظر: `runtime\wordpress\app\public`
- دامنه واقعی: `http://inkora.test.local`
- frontend: `http://127.0.0.1:5173/`؛ دستور راه‌اندازی: `powershell -ExecutionPolicy Bypass -File .\scripts\pnpm.ps1 dev`
- تنظیم private: `apps/storefront/.env` (از .env.example ساخته شده؛ در Git نیست)
- گزارش‌های مشترک: `docs/architecture.md`، `docs/status.md`، همین فایل؛ راهنمای مبتدی: `docs/local-development.md`.

مهارت استفاده‌شده برای بررسی UI: `C:\Users\moham\.codex\plugins\cache\openai-bundled\computer-use\26.924.22138\skills\computer-use\SKILL.md`. توقف به علت خطای واقعی ابزار است، نه درخواست تأیید مجدد برای کار مجاز.
