# تحویل فاز ۶ — محتوای AI با بازبینی انسانی

تاریخ: 2026-09-27.

## ساخته‌شده

- باکس `Inkora AI content review` روی نوشته‌های WordPress: نشان AI-assisted، تصمیم بازبینی و یادداشت خصوصی.
- نوشتهٔ AI-assisted که `approved` نیست، هنگام تلاش برای publish به draft برمی‌گردد.
- endpoint محدود `GET /wp-json/inkora/v1/journal?per_page=12` فقط عنوان، خلاصه و تاریخ نوشته‌های published + approved را می‌دهد.
- مسیر RTL `/journal` با empty/error state و بدون متن ساختگی.
- Home به مسیر واقعی مجله لینک می‌دهد، اما موضوع‌های نمایشی را به مقالهٔ واقعی جا نمی‌زند.

## بررسی‌ها

- WordPress health: HTTP 200، `inkora-core` ۰٫۲٫۰ و WooCommerce فعال.
- journal endpoint: HTTP 200 با `{"articles":[]}`؛ چون هنوز مقالهٔ تأییدشده‌ای وجود ندارد.
- مسیرهای `/journal`، `/advisor`، `/compare` و `/simulator`: HTTP 200.
- `pnpm test`: ۸ آزمون موفق.
- `pnpm check` اجرا شد اما در این محیط خروجی تکمیل‌شدهٔ ابزار Svelte بازنگشت؛ پیش از تحویل نهایی باید دوباره در ترمینال Local اجرا شود.

## محدودیت‌های عمدی

این فاز API AI، prompt، key، ارسال داده، تولید خودکار، انتشار خودکار، تصویر AI، توصیهٔ پزشکی، محتوا یا واقعیت ساختگی اضافه نمی‌کند. روند دقیق مدیر در [ai-content.md](../ai-content.md) است.
