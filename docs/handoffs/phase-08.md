# تحویل اجرایی فاز ۸ — جامعهٔ هنرمندان

تاریخ: 2026-09-27. ریشه: `C:\Users\moham\Local Sites\inkora tattoo`.

## خروجی

- افزونهٔ `inkora-core` نسخهٔ ۰٫۳٫۰: migration افزایشی schema v1، roleهای محدود، custom post typeهای private برای artist/portfolio/post، درخواست پروفایل در سایت local، بازبینی مستقل moderator/admin، Trash recoverable، و API عمومی read-only با allowlist.
- routeهای فارسی RTL و responsive: `/community`، `/artists`، `/artists/[slug]`، `/portfolio` و `/community/apply`. این routeها فقط profile/portfolio عمومی و approved را می‌بینند؛ دادهٔ فعلی صفر است و empty state صادقانه دارند.
- درخواست هنرمند تنها برای حساب WordPress موجود، روی فرم same-origin و nonce-protected انجام می‌شود. درخواست نقش approved، ثبت‌نام، ایمیل یا upload خودکار ندارد. تصویب مستقل، role افزودهٔ approved artist می‌دهد و customer موجود را حفظ می‌کند.
- روابط follow/like/comment، upload گالری، messages، groups، marketplace، courses، notifications و live feed با feature flag false باقی ماندند. برای هرکدام علت و پیش‌نیاز در `docs/community.md` ثبت شده است.

## انتخاب محصول

BuddyPress/BuddyBoss نصب نشد. در نبود policy، هنرمند واقعی، مجوز محتوا، media pipeline و anti-spam، یک domain کوچک و قابل آزمون کمتر از یک platform اجتماعی آماده feature دارد. معیار بازبینی و سازگاری WooCommerce/headless/RTL/Store API/privacy در `docs/community.md` ثبت شده است.

## بررسی‌های انجام‌شده

- `php -n -l` برای سه فایل افزونه: بدون خطای نحو؛ `tests/community-policy.test.php` با ۱۳ assertion موفق شد.
- آزمون policy: visibility/status filtering، allowlistِ بدون moderation note، ownership/moderator/self-review، duplicate/rate-limit relation و validation درخواست.
- `pnpm check`: صفر خطا و صفر هشدار؛ `pnpm test`: 11 آزمون موجود موفق؛ `pnpm build`: موفق.
- پس از sync افزونه، health نسخهٔ `0.3.0` و هر دو endpoint community HTTP 200 دادند؛ هر دو دقیقاً `items: []` و feature flagهای false برگرداندند.
- HTTP 200 برای مسیرهای چهارگانهٔ جدید و `/shop`، `/journal`، `/machines` و `/about`. QA مرورگر واقعی در 1440، 768، 390 و 320 بدون overflow افقی و با zero console error بود.

اگر یک مورد محیط Local اجرا نشد، در گزارش نهایی دقیقاً جداگانه ثبت می‌شود و ادعای موفقیت جای آن نمی‌نشیند.

## ادامهٔ امن

برای فعال‌سازی عمومی، سیاست privacy/retention و appeal، rules حق اثر/رضایت، pipeline media با حذف EXIF و review، anti-spam/rate limit/reporting، plan queue/email، دارایی‌های واقعی و آزمون load لازم است. فقط Git محلی استفاده شد؛ push/deploy/hosting یا تغییر سایت قدیمی انجام نشده است.
