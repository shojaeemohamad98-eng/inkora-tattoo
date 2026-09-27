# جامعهٔ هنرمندان Inkora — فاز ۸

به‌روزرسانی: 2026-09-27. این هسته فقط برای سایت جدید محلی `inkora.test.local` ساخته شده است. دادهٔ واقعی هنرمند، اثر و تصویر وارد نشده است؛ بنابراین مسیرهای عمومی حالت خالی صادقانه نشان می‌دهند.

## تصمیم معماری

انتخاب فعلی **هستهٔ اختصاصی کوچک در `inkora-core`** است؛ BuddyPress و BuddyBoss نصب نشده‌اند. BuddyPress ماژول‌های اختیاری از جمله profile، activity، message و group دارد و REST آن با وضعیت componentها کار می‌کند؛ BuddyBoss نیز برای اتصال WooCommerce به افزونه‌های خودش نیاز دارد. این توانایی‌ها برای مرحلهٔ بعد مفیدند، اما اکنون باعث surface بزرگ‌تری برای activity، پیام، تنظیم privacy و سازگاری headless می‌شوند، در حالی که هنوز policy عمومی، مجوز، هنرمند یا زیرساخت ضداسپم وجود ندارد.

معیار بازبینی پیش از انتخاب دوباره: حداقل ۲۰ هنرمند تأییدشده، policy حریم خصوصی/نگهداری و گزارش تخلف، تصمیم مالکیت داده و export/delete، بررسی RTL فارسی، benchmark با WooCommerce و Store API، قرارداد headless، plan برای cache/pagination و rate limit، و بودجهٔ نگه‌داری/مجوز. تا آن زمان افزونهٔ third-party سنگین اضافه نمی‌شود. مرجع بررسی فنی: [REST componentهای BuddyPress](https://developer.buddypress.org/bp-rest-api/reference/components/)، [اتصال WooCommerce در BuddyBoss](https://buddyboss.com/docs/woocommerce-buddypress-integration/) و [cookie+nonce در REST WordPress](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/).

## آنچه واقعاً فعال است

- `GET /wp-json/inkora/v1/community/artists` و `GET /wp-json/inkora/v1/community/portfolio` تنها خواندنی‌اند، page محدود ۱ تا ۱۰۰ دارند و فقط رکورد `published + public` را با allowlist برمی‌گردانند. email، شماره، نشانی، draft، status داخلی، moderation note، reviewer و secret در پاسخ نیست.
- routeهای RTL `/community`، `/artists`، `/artists/[slug]` و `/portfolio` تنها از کلاینت مرکزی server-side `src/lib/server/community.ts` استفاده می‌کنند. هیچ component مستقیماً به WordPress وصل نمی‌شود.
- `/community/apply` فقط یک entrypoint به فرم WordPress محلی پس از ورود دارد. درخواست شامل نام هنری، bio، styles/tags و visibility است؛ ثبت‌نام، email، نقش‌دهی خودکار، upload و API mutation frontend ندارد.
- درخواست با status `pending` شروع می‌شود. مدیر یا moderator مستقل می‌تواند آن را `published`، `rejected` یا `pending` کند. تأییدکردن درخواست خود ممنوع است. فقط review موفق نقش افزودهٔ `inkora_approved_artist` را می‌دهد؛ customer قبلی حذف نمی‌شود.
- حذف از UI به WordPress Trash می‌رود، پس قابل بازیابی مدیر است. نگه‌داری در Trash تابع تنظیمات WordPress است.

## مدل و نسخه‌بندی

schema version فعلی `1` در option `inkora_community_schema` و در هر record است. migration افزایشی و idempotent است: سه role `inkora_artist`، `inkora_approved_artist` و `inkora_moderator` را می‌سازد و فقط moderator capability را می‌افزاید. visitor کاربر ناشناس است؛ customer همان role WooCommerce/WordPress موجود است؛ administrator WordPress است. هیچ role موجود پاک یا replace نمی‌شود.

پروفایل، portfolio و post به‌عنوان private custom post typeهای `inkora_artist`، `inkora_portfolio` و `inkora_post` مدل شده‌اند. هر رکورد شامل owner WordPress، `status` (`draft`, `pending`, `published`, `rejected`)، `visibility` (`private`, `public`)، styles/tags، timestamp، revision و moderation reason خصوصی است. ایجاد portfolio/post و media عمداً تا pipeline review بعدی بسته است.

## مرزهای امنیت و حریم خصوصی

| تهدید | کنترل فعلی |
|---|---|
| impersonation / role escalation | ورود WordPress، nonce، same-origin، owner check، moderator capability، منع self-review؛ apply نقش approved نمی‌دهد |
| spam / duplicate relation | submit هر owner حداقل ۶۰ ثانیه فاصله دارد و lock کوتاه DB دارد؛ follow/like/comment هنوز بسته‌اند |
| اثر بدون مجوز / رضایت | upload و gallery بسته است؛ هیچ stock/placeholder به نام هنرمند نمایش داده نمی‌شود |
| metadata حساس | فایل دریافت نمی‌شود؛ projection عمومی allowlist دارد و notes/PII را برنمی‌گرداند |
| انتشار ناخواسته | index meta و policy مستقل هر دو `published + public` را بررسی می‌کنند؛ save ابتدا visibility عمومی را خاموش می‌کند |
| حذف | UI به Trash می‌رود، نه permanent delete |

برای follow/like در نسخهٔ آینده relation table اتمی با unique `(actor, target, kind)`، rate limit سمت سرور، report/ban، soft delete و moderation لازم است. contract فعلی duplicate، self-follow و عبور از ۲۰ relation در پنجره را رد می‌کند، ولی transport عمداً `requires_infrastructure` برمی‌گرداند. comment نیز به همین زیرساخت، captcha یا challenge مناسب، queue و policy نگهداری نیاز دارد.

## feature flagها

همهٔ `upload`، `follow`، `like`، `comment`، `messages`، `groups`، `marketplace`، `courses`، `notifications` و `live_feed` در پاسخ API `false` هستند. UI آن‌ها را با علت نمایش می‌دهد، اما فعال یا ساختگی نیست. پیش از فعال‌سازی upload باید allowlist MIME/اندازه، ownership، اسکن، حذف EXIF، consent، quarantine/review، delete و آزمون واقعی در WordPress تکمیل شود.

## راهنمای مشاهده برای مبتدی

1. Local را باز و سایت **Inkora Tattoo / `inkora.test.local`** را روشن کنید.
2. در ریشهٔ پروژه، `powershell -ExecutionPolicy Bypass -File .\scripts\sync-plugin.ps1` را اجرا کنید؛ این فقط افزونهٔ همین پروژه را در همان سایت جدید کپی می‌کند.
3. در WordPress همان سایت، افزونهٔ **Inkora Core** را فعال یا یک‌بار غیرفعال/فعال کنید. سپس frontend را با `powershell -ExecutionPolicy Bypass -File .\scripts\pnpm.ps1 dev` اجرا کنید.
4. `/community`، `/artists` و `/portfolio` را باز کنید. بدون دادهٔ واقعی، پیام خالی صحیح را می‌بینید.
5. از `/community/apply` وارد شوید؛ فرم فقط پس از ورود به WordPress ظاهر می‌شود. مدیر یا moderator از همان صفحهٔ خصوصی، درخواست را بررسی می‌کند. این صفحه noindex و no-store است.

## پیش‌نیاز فعال‌سازی عمومی

سیاست حریم خصوصی و retention، سازوکار report/appeal، SLA بازبینی، قواعد حق اثر و رضایت مدل، فهرست MIME/حجم و پردازش امن media، anti-spam/captcha و queue/email، متن رضایت و قوانین جامعه، و حساب‌ها/هنرمندان واقعی لازم‌اند. هیچ‌یک در این فاز ایجاد یا فعال نشده است.
