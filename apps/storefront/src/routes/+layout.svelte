<script lang="ts">
  import '../app.css';
  let { children, data } = $props();
</script>
{#if data.previewOnly}
  <aside class="preview-notice" dir="rtl">پیش‌نمایش اینکورا — اتصال فروشگاه برقرار نیست؛ محصولات زنده، سبد خرید، پرداخت و حساب کاربری فعال نیستند.</aside>
{/if}
{@render children()}
<style>
  .preview-notice { background: #30231a; color: #fff1dd; padding: 12px 20px; text-align: center; font: 14px/1.8 sans-serif; }
</style>
