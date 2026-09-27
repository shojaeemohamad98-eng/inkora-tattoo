# تحویل آماده‌سازی Vercel Preview

تاریخ: 2026-09-27؛ فقط پروژه Inkora Tattoo تغییر کرده است.

## وضعیت واقعی

- شاخه: `codex/vercel-preview`؛ commit آماده‌سازی در تاریخچهٔ همین شاخه ثبت می‌شود.
- URL آنلاین: هنوز وجود ندارد/تأیید نشده است.
- ورود کاربر: هنوز تأیید نشده؛ تب مرورگر Vercel صفحه Login با `account_not_found` نشان می‌داد. هیچ رمز، کلید، cookie یا session خوانده یا منتقل نشده است.
- CLI سراسری Vercel در PATH موجود نبود؛ deployment یا import انجام نشده است.
- production، دامنه inkora.ir، DNS و WordPress تغییر نکرده‌اند.

## تغییرات و شواهد

adapter رسمی 6.3.4 با peer requirement سازگار با SvelteKit فعلی نصب شد. frameworkها downgrade نشدند. Node 24 و pnpm 11.19.0 ثابت‌اند. تنظیمات قدیمی pnpm به schema نسخه 11 منتقل شدند؛ نصب frozen-lockfile موفق شد.

`pnpm check`: صفر خطا/هشدار. `pnpm test`: ۱۱ آزمون موفق. `node scripts/verify-preview.mjs`: ۱۹ صفحه HTTP 200 با پیام preview و noindex، ۸ مسیر داخلی/data با 404، GET/POST سبد با 503 و بدون cookie. در HTML این صفحات لینک `.local`/`.test`، تصویر مرجع داخلی یا portal مدیریت دیده نشد. جست‌وجوی bundle عمومی نیز مرجع logo-04 و URL محلی حساب را پیدا نکرد. خانه و فروشگاه در مرورگر مشاهده شدند؛ unavailable state فروشگاه صریح است.

`pnpm build`: کامپایل SSR/client کامل شد. بسته‌بندی نهایی Vercel روی Windows با خطای زیر متوقف شد؛ این موفقیت build نهایی محسوب نمی‌شود:

```text
Using @sveltejs/adapter-vercel
Error: EPERM: operation not permitted, symlink
... -> apps/storefront/.vercel/output/functions/![-]/catchall.func/apps/storefront/node_modules/@sveltejs/kit
plugin: vite-plugin-sveltekit-compile
hook: closeBundle
```

اجرای محدود اولیه readlink والد را هم رد می‌کرد؛ اجرای مجدد با دسترسی لازم از آن گذشت و محدودیت واقعی Windows symlink را نشان داد. log کامل محلی در `docs/vercel-build-local.log` (ignored) نگهداری شده؛ متن علت بالا برای Git ثبت شده است. تنظیم امنیتی سیستم تغییر نکرد و adapter patch نشد. سرور `vite preview` از خروجی SSR/client تولیدشده برای آزمون HTTP استفاده کرد؛ این آزمون جای اجرای serverless در Vercel نیست.

## ادامه پس از ورود

تنظیمات دقیق، environment policy و جلوگیری از production ناخواسته در [deployment.md](../deployment.md) آمده است. هیچ متغیر خصوصی برای preview لازم نیست. ابتدا push شاخه را تأیید کن، سپس پروژه Vercel را بدون انتشار production تنظیم کن و فقط target Preview از همین commit بساز. پس از build موفق، URL، SHA و نتیجهٔ آزمون روی URL ابری را به این فایل اضافه کن. اگر dashboard فقط import همراه Production ارائه کرد، آن را اجرا نکن؛ مسیر Preview-only لازم است.

تا WordPress عمومی و تأیید مرحله production، محصول زنده، سبد، حساب، ثبت درخواست جامعه و پرداخت فعال نمی‌شوند. راه‌اندازی production علاوه بر backend عمومی به کالای واقعی، دارایی مجاز، سیاست امنیت/جامعه و آزمون کامل درگاه نیاز دارد.
