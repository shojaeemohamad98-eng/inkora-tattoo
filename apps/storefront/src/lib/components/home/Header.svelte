<script lang="ts">
  import Icon, { type IconName } from './Icon.svelte';
  import { navigation } from './data';
  let open = $state(false);
  let scrolled = $state(false);
  let opener: HTMLButtonElement;
  const actions: { name: IconName; label: string; href: string }[] = [
    { name: 'user', label: 'حساب کاربری', href: '/account' }, { name: 'bag', label: 'سبد خرید', href: '/cart' }
  ];
  function close() { open = false; opener?.focus(); }
</script>
<svelte:window onscroll={() => scrolled = window.scrollY > 28} onkeydown={(event) => { if (event.key === 'Escape' && open) close(); }} />
<header class="home-header" class:scrolled>
  <div class="home-container header-main">
    <a class="home-brand" href="/" aria-label="اینکورا — صفحه اصلی">
      <img src="/assets/brand/inkora-skull-badge-selected.png" width="56" height="56" alt="نشان اسکلت انتخاب‌شدهٔ اینکورا" />
      <span><b dir="ltr">INKORA</b><small>TATTOO SUPPLY</small></span>
    </a>
    <form class="header-search" action="/shop" method="GET"><label for="home-search">جست‌وجوی تجهیزات</label><div><input id="home-search" name="q" placeholder="نام کالا…" /><Icon name="search" /></div></form>
    <div class="header-actions">
      {#each actions as action}<a class="icon-button" class:desktop-action={action.name !== 'bag'} aria-label={action.label} href={action.href}><Icon name={action.name} /></a>{/each}
      <button bind:this={opener} class="icon-button menu-toggle" aria-label={open ? 'بستن منو' : 'باز کردن منو'} aria-expanded={open} aria-controls="home-navigation" onclick={() => open = !open}><Icon name={open ? 'close' : 'menu'} /></button>
    </div>
  </div>
  <div class="header-nav-shell">
    <nav id="home-navigation" class="home-container home-nav" class:open aria-label="منوی اصلی">
      <a href="/" aria-current="page" onclick={() => open = false}>صفحه اصلی</a><a href="/shop" onclick={() => open = false}>فروشگاه</a>
      {#each navigation as link}<a href={link.href} onclick={() => open = false}>{link.label}</a>{/each}
      <div class="mobile-actions">{#each actions as action}<a class="home-action" href={action.href}>{action.label}</a>{/each}</div>
      <span class="nav-note">فروشگاه محلی · فقط کالاهای واقعی</span>
    </nav>
  </div>
</header>
