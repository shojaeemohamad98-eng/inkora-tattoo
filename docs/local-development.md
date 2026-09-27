# اجرای محلی — راهنمای ساده

## اجرای روزمره پس از فاز ۳

سایت موجود **Inkora Tattoo** قبلاً ساخته شده و دامنهٔ واقعی آن `inkora.test.local` است؛ برای ادامه سایت تازه نسازید. در ریشهٔ پروژه فقط دستور زیر را اجرا کنید:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\pnpm.ps1 dev
```

- صفحه اصلی: `http://127.0.0.1:5173/`؛ مستقل از روشن‌بودن WordPress.
- دفتر طراحی: `http://127.0.0.1:5173/design-system`.
- آزمون اتصال: `http://127.0.0.1:5173/integration-check`؛ در برنامه Local همان سایت **Inkora Tattoo** را Start کنید. سایت قدیمی Inkora را تغییر ندهید.
- تأیید زنده: `powershell -ExecutionPolicy Bypass -File .\scripts\pnpm.ps1 verify:live`.

در بررسی فاز ۳، frontend سالم بود اما WordPress پاسخ نداد؛ دیدن HTTP 200 صفحهٔ آزمون به‌تنهایی به معنی اتصال موفق محصول نیست. مراحل زیر تاریخچهٔ نصب اولیه‌اند؛ برای اجرای روزمره نصب مجدد یا کپی مجدد `.env` لازم نیست.

## ۱. ساخت سایت جدید با Local

Local برنامه اجرای WordPress روی رایانه است. در بررسی اولیه فقط سایت قدیمی Inkora ثبت شده بود. سایت قدیمی را تغییر ندهید.

1. دکمه + و سپس Create a new site را بزنید.
2. نام: **Inkora Tattoo**.
3. در Advanced options، Local site path را دقیقاً `C:\Users\moham\Local Sites\inkora tattoo\runtime\wordpress` و domain را `inkora-tattoo.local` بگذارید. اگر سایت هم‌نام یا این مسیر از قبل ایجاد شده است، دوباره سایت نسازید؛ همان سایت را بررسی کنید.
4. Preferred را انتخاب و حساب مدیریت دلخواه بسازید. رمز را در چت یا Git ننویسید.
5. Add site و سپس Start site. اگر Local برای دسترسی ویندوز اجازه خواست، مربوط به اجرای همین سایت جدید است.

## ۲. نصب WooCommerce و افزونه اختصاصی

در سایت جدید، WP Admin را باز کنید. افزونه‌ها ← افزودن، **WooCommerce** رسمی را نصب و فعال کنید. سرویس پولی، Jetpack یا درگاه برای فاز ۱ لازم نیست.

در WooCommerce ← تنظیمات ← عمومی، کشور ایران و ارز **ریال ایران (IRR)** را انتخاب کنید؛ مالیات و ارسال فعلاً پیکربندی نهایی ندارند. در محصولات ← انبار، مخفی‌کردن محصولات ناموجود برای این آزمون خاموش باشد.

PowerShell را در ریشه پروژه باز کنید و اجرا کنید:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\sync-plugin.ps1
```

این دستور فقط فایل افزونه اختصاصی را به سایت جدید کپی می‌کند. سپس در WP Admin افزونه **Inkora Core** را فعال کنید. در ابزارها ← Inkora test دکمه Create / find test product را بزنید. اگر پیام محیط local آمد، تنظیم WP_ENVIRONMENT_TYPE را در wp-config.php همین سایت بررسی کنید؛ باید local باشد. هیچ رمز یا محتوای wp-config را در چت منتشر نکنید.

محصول با نامک `inkora-phase-01-test`، SKU `INKORA-PHASE-01` و قیمت ۱٬۲۵۰٬۰۰۰ ریال ساخته می‌شود؛ خروجی frontend باید ۱۲۵٬۰۰۰ تومان باشد. ابزار چندباره محصول تکراری ایجاد نمی‌کند.

## ۳. اجرای ظاهر سایت با PowerShell

همه دستورها در ریشه `C:\Users\moham\Local Sites\inkora tattoo` اجرا شوند. اسکریپت از pnpm موجود یا نسخه همراه محیط توسعه استفاده می‌کند.

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\pnpm.ps1 install --frozen-lockfile
Copy-Item .\apps\storefront\.env.example .\apps\storefront\.env
powershell -ExecutionPolicy Bypass -File .\scripts\pnpm.ps1 dev
```

فایل .env را فقط بار اول کپی کنید تا تنظیم قبلی جایگزین نشود. آدرس WORDPRESS_URL باید دامنه واقعی سایت **جدید** باشد. مرورگر: `http://127.0.0.1:5173`. با Ctrl+C اجرای frontend متوقف می‌شود؛ روشن‌بودن Local جداگانه لازم است.

## ۴. بررسی

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\pnpm.ps1 check
powershell -ExecutionPolicy Bypass -File .\scripts\pnpm.ps1 test
powershell -ExecutionPolicy Bypass -File .\scripts\pnpm.ps1 build
```

API سلامت: `http://inkora-tattoo.local/wp-json/inkora/v1/health`

محصول: `http://inkora-tattoo.local/wp-json/wc/store/v1/products?slug=inkora-phase-01-test`

برای پذیرش نهایی فاز ۱، id و نام محصول در API و frontend باید یکسان باشند. در صورت 404، تنظیمات ← پیوندهای یکتا را روی نام نوشته ذخیره کنید. اگر محصول خالی است انتشار، نامک و نمایش محصولات ناموجود را بررسی کنید. صفحه «اتصال تأیید نشده» به معنی موفقیت آزمون نیست.
