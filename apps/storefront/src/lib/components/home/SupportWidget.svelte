<script lang="ts">
  let open = $state(false);
  let sent = $state(false);
  let message = $state('');
  const submit = () => {
    if (!message.trim()) return;
    sent = true;
    message = '';
  };
</script>

<aside class="support-widget" dir="rtl">
  {#if open}
    <section class="support-popover" aria-labelledby="support-title">
      <header><div><span><i></i> پشتیبانی آنلاین</span><h2 id="support-title">چطور می‌توانیم کمک کنیم؟</h2></div><button aria-label="بستن پشتیبانی" onclick={() => open = false}>×</button></header>
      {#if sent}<div class="support-sent"><b>پیام ثبت شد</b><p>این نسخه نمایشی است؛ اتصال مستقیم به اپراتور هنگام انتشار فعال می‌شود.</p></div>{:else}<p>سؤال خود را درباره محصول، انتخاب ابزار یا سفارش بنویس.</p><form onsubmit={(event) => { event.preventDefault(); submit(); }}><label for="support-message">پیام شما</label><textarea id="support-message" bind:value={message} rows="3" placeholder="مثلاً برای شروع چه دستگاهی مناسب است؟"></textarea><button type="submit">ارسال درخواست</button></form>{/if}
    </section>
  {/if}
  <button class="support-launch" aria-expanded={open} onclick={() => { open = !open; sent = false; }}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15a4 4 0 0 1-4 4H8l-5 2 1.7-4A7 7 0 0 1 4 14V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v7Z"/><path d="M8 10h8M8 14h5"/></svg><span>{open ? 'بستن گفتگو' : 'پشتیبانی آنلاین'}</span></button>
</aside>

<style>
  .support-widget{position:fixed;left:20px;bottom:20px;z-index:80;display:grid;justify-items:start;gap:12px;font-family:inherit}.support-launch{display:flex;align-items:center;gap:9px;min-height:50px;padding:10px 17px;border:1px solid #ff8290b8;border-radius:999px;background:linear-gradient(135deg,#e22e46,#991a2d);color:#fff;box-shadow:0 14px 35px #0009,0 0 24px #df334944;font:700 .82rem inherit;cursor:pointer}.support-launch svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.8}.support-popover{width:min(340px,calc(100vw - 32px));padding:18px;border:1px solid #ffffff35;border-radius:20px;background:linear-gradient(145deg,#242027e8,#090a0ff2);box-shadow:0 24px 70px #000c,inset 0 1px #ffffff20;backdrop-filter:blur(20px);color:#fff}.support-popover header{display:flex;justify-content:space-between;gap:14px;align-items:start}.support-popover header span{color:#ff8c99;font-size:.7rem}.support-popover header i{display:inline-block;width:7px;height:7px;border-radius:50%;background:#42d77d;box-shadow:0 0 10px #42d77d}.support-popover h2{margin:4px 0 8px;font-size:1rem}.support-popover header button{width:30px;height:30px;border:1px solid #ffffff2d;border-radius:50%;background:#ffffff0b;color:#fff;font:1.2rem inherit;cursor:pointer}.support-popover p{margin:0 0 12px;color:#b9b4b7;font-size:.76rem;line-height:1.8}.support-popover form{display:grid;gap:8px}.support-popover label{font-size:.7rem;color:#ddd}.support-popover textarea{resize:none;border:1px solid #ffffff2b;border-radius:12px;background:#07080c99;color:#fff;padding:10px;font:inherit;outline:0}.support-popover textarea:focus{border-color:#ff7181}.support-popover form button{min-height:42px;border:0;border-radius:12px;background:#d82a42;color:#fff;font:700 .78rem inherit;cursor:pointer}.support-sent{padding:16px;border:1px solid #42d77d45;border-radius:14px;background:#42d77d0d}.support-sent b{color:#66e99a}.support-sent p{margin:6px 0 0}@media(max-width:600px){.support-widget{left:12px;bottom:12px}.support-launch span{display:none}.support-launch{width:50px;padding:0;justify-content:center}}
</style>
