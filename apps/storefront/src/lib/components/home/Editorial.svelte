<script lang="ts">
  import { styles, articles } from './data';
  import Media from './Media.svelte';
  import FutureButton from './FutureButton.svelte';
</script>
<section class="home-section" id="inspiration" aria-labelledby="styles-title">
  <div class="section-heading"><div><p class="eyebrow">زبانِ شخصی تو</p><h2 id="styles-title">الهام بگیر، سبک خودت را پیدا کن</h2></div><p>گالری مفهومی؛ تصاویر، نمونهٔ واقعی سبک‌ها نیستند.</p></div>
  <div class="style-grid">{#each styles as style}<article class="home-card style-card"><Media kind={style.kind} /><div><h3>{style.title}</h3><p dir="ltr">{style.english}</p></div></article>{/each}</div>
</section>
<section class="home-section support-grid" aria-label="مشاوره، مراقبت و رنگ">
  <article class="home-card support-card"><p class="eyebrow">پرسش، شروعِ یک انتخاب خوب است</p><h2>مشاورهٔ تخصصی تتو</h2><p>فضای معرفی مشاوران؛ پس از تأیید تیم و خدمات تکمیل می‌شود.</p><FutureButton label="مشاوره · فاز بعد" icon="chat" primary /></article>
  <article class="home-card support-card"><p class="eyebrow">بعد از آخرین خط</p><h2>راهنمای مراقبت و ترمیم</h2><p>محتوای مراقبتی پس از بازبینی تخصصی منتشر خواهد شد.</p><FutureButton label="راهنمای مراقبت · فاز بعد" icon="arrow" /></article>
  <article class="home-card support-card"><p class="eyebrow">دنیایی فراتر از مشکی</p><h2>رنگ‌های ترند</h2><div class="color-swatches" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><p>پالت صرفاً نمایشی؛ ادعای محبوبیت یا موجودی ندارد.</p><FutureButton label="کشف پالت‌ها · فاز بعد" icon="arrow" /></article>
</section>
<section class="home-section" id="journal" aria-labelledby="journal-title">
  <div class="section-heading"><div><p class="eyebrow">مجلهٔ اینکورا</p><h2 id="journal-title">پشت هر خط، یک داستان</h2></div><a class="home-action" href="/journal">مشاهدهٔ مقاله‌های بازبینی‌شده</a></div>
  <div class="article-grid">{#each articles as article}<article class="home-card article-card"><Media kind={article.kind} /><div><span class="sample-tag">{article.tag} · موضوع پیشنهادی</span><h3>{article.title}</h3><p class="fineprint">تا پیش از بازبینی انسانی، هیچ مقاله‌ای منتشر نمی‌شود.</p></div></article>{/each}</div>
</section>
<section class="home-section brands-row" aria-labelledby="brands-title"><div><p class="eyebrow">نام‌های پشت ابزار</p><h2 id="brands-title">برندها</h2></div><p>پس از تأیید تأمین‌کنندگان و مجوز نشان‌ها معرفی می‌شوند.</p><span class="brand-placeholder" dir="ltr">INKORA / CURATED SELECTION — COMING LATER</span></section>
