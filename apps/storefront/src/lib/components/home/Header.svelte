<script lang="ts">
  import Icon, { type IconName } from './Icon.svelte';
  import { navigation } from './data';
  let open = $state(false);
  let opener: HTMLButtonElement;
  let message = $state('');
  const actions: { name: IconName; label: string }[] = [
    { name: 'user', label: 'حساب کاربری' }, { name: 'heart', label: 'علاقه‌مندی‌ها' }, { name: 'bag', label: 'سبد خرید' }
  ];
  function close() { open = false; opener?.focus(); }
</script>
<svelte:window onkeydown={(event) => { if (event.key === 'Escape' && open) close(); }} />
<header class="home-header">
  <div class="home-container header-main">
    <a class="home-brand" href="/" aria-label="اینکورا — صفحه اصلی" aria-current="page">
      <img src="/assets/brand/inkora-wordmark-temporary.svg" width="164" height="52" alt="اینکورا؛ نوشتار موقت برند" />
      <span>نشان نوشتاری موقت</span>
    </a>
    <div class="header-search">
      <label for="home-search">جست‌وجوی تجهیزات <span>· در فاز بعد</span></label>
      <div><input id="home-search" placeholder="دستگاه، رنگ، سوزن…" disabled /><Icon name="search" /></div>
    </div>
    <div class="header-actions">
      {#each actions as action}<button class="icon-button" class:desktop-action={action.name !== 'bag'} aria-label={`${action.label}؛ در فاز بعد`} onclick={() => message = `${action.label}: در فاز بعد آماده می‌شود.`}><Icon name={action.name} /></button>{/each}
      <button bind:this={opener} class="icon-button menu-toggle" aria-label={open ? 'بستن منو' : 'باز کردن منو'} aria-expanded={open} aria-controls="home-navigation" onclick={() => open = !open}><Icon name={open ? 'close' : 'menu'} /></button>
    </div>
  </div>
  <div class="home-container"><p class="header-status" role="status">{message}</p></div>
  <div class="header-nav-shell">
    <nav id="home-navigation" class="home-container home-nav" class:open aria-label="منوی اصلی">
      <a href="/" aria-current="page" onclick={() => open = false}>صفحه اصلی</a>
      {#each navigation as link}<a href={link.href} onclick={() => open = false}>{link.label}</a>{/each}
      <div class="mobile-actions">{#each actions.slice(0, 2) as action}<button class="home-action" onclick={() => message = `${action.label}: در فاز بعد آماده می‌شود.`}>{action.label}</button>{/each}</div>
      <span class="nav-note">نسخهٔ نمایشی · خرید غیرفعال</span>
    </nav>
  </div>
</header>
