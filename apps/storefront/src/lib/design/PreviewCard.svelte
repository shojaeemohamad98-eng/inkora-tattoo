<script lang="ts">
  let { title, english, index, image = null, alt = '', kind = 'category' }: {
    title: string; english: string; index: string; image?: string | null; alt?: string; kind?: 'category' | 'product';
  } = $props();
</script>

<article class="ink-panel sample-card">
  <div class="media">
    {#if image}
      <img src={image} {alt} width="640" height="480" loading="lazy" />
    {:else}
      <div class="orbit" aria-hidden="true"><span>{index}</span></div>
      <span class="placeholder-label">جای تصویر {kind === 'product' ? 'محصول' : 'دسته'}</span>
    {/if}
    <span class="badge">نمونهٔ طراحی</span>
  </div>
  <div class="copy">
    <p lang="en" dir="ltr">{english}</p>
    <h3>{title}</h3>
    {#if kind === 'product'}
      <p class="note">قیمت و موجودی واقعی هنوز متصل نیست.</p>
      <button class="ink-button secondary" disabled>خرید در این پیش‌نمایش فعال نیست</button>
    {:else}
      <span class="note">دارایی موقت · قابل جایگزینی</span>
    {/if}
  </div>
</article>

<style>
  .sample-card { overflow: hidden; min-width: 0; }
  .media { position: relative; aspect-ratio: 4/3; display: grid; place-content: center; overflow: hidden; background: radial-gradient(ellipse at 50% 70%, #6c293b44, transparent 65%), linear-gradient(135deg, #272830, #101115); }
  .media img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
  .orbit { width: 112px; height: 112px; border: 1px solid #73727d; border-radius: 50%; display: grid; place-content: center; transform: rotate(-24deg); box-shadow: 0 0 0 18px #ffffff03, 0 0 0 19px #ffffff0b; }
  .orbit span { font-size: 2rem; font-weight: 200; transform: rotate(24deg); color: var(--ink-muted); }
  .placeholder-label { text-align: center; font-size: var(--ink-text-xs); color: var(--ink-muted); margin-top: 24px; }
  .badge { position: absolute; top: 12px; inset-inline-start: 12px; font-size: var(--ink-text-xs); border: 1px solid var(--ink-border); padding: 2px 10px; border-radius: var(--ink-radius-pill); background: var(--ink-bg); }
  .copy { padding: var(--ink-space-6); }
  .copy p[lang] { color: var(--ink-muted); font-size: .7rem; letter-spacing: .13em; text-align: start; margin: 0; }
  h3 { font-size: var(--ink-text-lg); margin: 6px 0; }
  .note { font-size: var(--ink-text-sm); color: var(--ink-muted); }
  button { margin-top: 12px; width: 100%; font-size: var(--ink-text-sm) !important; }
</style>
