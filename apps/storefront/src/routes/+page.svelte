<script lang="ts">
  import '$lib/design/tokens.css';
  import '$lib/components/home/home.css';
  import Header from '$lib/components/home/Header.svelte';
  import Hero from '$lib/components/home/Hero.svelte';
  import Categories from '$lib/components/home/Categories.svelte';
  import Tools from '$lib/components/home/Tools.svelte';
  import Editorial from '$lib/components/home/Editorial.svelte';
  import Footer from '$lib/components/home/Footer.svelte';
</script>
<svelte:head>
  <title>اینکورا | از ایده تا یک تتوی ماندگار</title>
  <meta name="description" content="دنیای تجهیزات و الهام تتو در اینکورا؛ پیش‌نمایش دسته‌بندی‌ها، راهنمای انتخاب و مجله. خرید و خدمات در این نسخه فعال نیستند." />
</svelte:head>
<div class="inkora-theme inkora-home" dir="rtl" id="top">
  <a class="home-skip" href="#main">رفتن به محتوای اصلی</a>
  <Header />
  <main class="home-container" id="main"><Hero /><Categories /><Tools /><Editorial /></main>
  <Footer />
</div>
