# قرارداد فروشگاه محلی Inkora — فاز ۴

به‌روزرسانی: 2026-09-27. این فروشگاه فقط در محیط Local اجرا می‌شود و منتشر نشده است.

## داده و API

- فهرست، دسته، جزئیات و موجودی از WooCommerce Store API خوانده می‌شوند. هیچ قیمت، عکس، موجودی، تخفیف یا بررسی ساختگی نداریم.
- محصول `inkora-phase-01-test` محصول تست اتصال است؛ در Home، فروشگاه و صفحهٔ محصول عمومی پنهان است. حذف نشده است.
- عکس فقط از media واقعی WooCommerce نمایش داده می‌شود. بدون عکس، جای‌نگهدار با توضیح صادقانه نمایش داده می‌شود.
- `apps/storefront/src/lib/server/commerce.ts` تنها کلاینت Store API است. UI مستقیماً به WordPress یا API مدیریتی وصل نمی‌شود.

## سبد و نشست

`/api/cart` واسطهٔ هم‌مبدأ SvelteKit برای `GET /cart` و عملیات add/update/remove است. Cart Token که WooCommerce می‌دهد فقط در cookie `HttpOnly`, `SameSite=Lax` نگه‌داری می‌شود و به JavaScript یا repo نمی‌رود. POST هم‌مبدأ بررسی و شناسه، کلید و تعداد اعتبارسنجی می‌شوند. Store API مسئول اعتبار نهایی موجودی، قیمت، مالیات و تحویل است.

قیمت‌های `IRR` با `currency_minor_unit` یک بار به تومان تبدیل می‌شوند؛ `IRT` دوباره تقسیم نمی‌شود. تابع آزموده‌شده در `src/lib/money.mjs` است.

## مسیرها

| مسیر | رفتار واقعی |
|---|---|
| `/shop` | جست‌وجو، دسته‌بندی و فهرست کالای واقعی، با empty/error state |
| `/shop/[slug]` | جزئیات، قیمت، عکس و قابلیت خرید همان محصول |
| `/cart` | سبد، افزایش/کاهش/حذف و مبلغ‌های WooCommerce |
| `/checkout` | خلاصه واقعی سبد؛ ثبت سفارش و پرداخت عمداً تا انتخاب درگاه غیرفعال |
| `/account` | ورودی امن به صفحهٔ My Account خود WordPress؛ توکن یا حساب سفارشی ندارد |

## درگاه و افتتاح

WooCommerce Store API برای cart و checkout headless از Cart Token پشتیبانی می‌کند؛ عملیات نوشتن سبد و checkout به Cart Token یا nonce نیاز دارد. منابع رسمی: [Store API](https://developer.woocommerce.com/docs/apis/store-api/)، [Cart Tokens](https://developer.woocommerce.com/docs/apis/store-api/cart-tokens)، [Cart API](https://developer.woocommerce.com/docs/apis/store-api/resources-endpoints/cart/)، [Checkout API](https://developer.woocommerce.com/docs/apis/store-api/resources-endpoints/checkout/).

درگاه ایرانی هنوز انتخاب نشده است. پیش از فعال‌کردن پرداخت باید نام درگاه، افزونهٔ سازگار با Checkout Block/Store API و حساب sandbox مشخص شود؛ سپس پرداخت موفق و ناموفق sandbox، بازگشت، امضا و تبدیل ریال/تومان آزمایش خواهد شد. هیچ کلید یا رمز در چت یا Git ثبت نکنید.
