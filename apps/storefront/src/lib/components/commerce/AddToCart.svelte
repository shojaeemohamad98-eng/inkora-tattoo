<script lang="ts">
  import { announceCart, cartRequest } from '$lib/client/cart';
  let { id, enabled = true }: { id: number; enabled?: boolean } = $props(); let busy = $state(false); let message = $state('');
  async function add() { busy = true; message = ''; try { announceCart(await cartRequest({ action: 'add', id, quantity: 1 })); message = 'به سبد خرید افزوده شد.'; } catch (e) { message = e instanceof Error ? e.message : 'افزودن به سبد ناموفق بود.'; } finally { busy = false; } }
</script>
{#if enabled}<button class="button primary" onclick={add} disabled={busy} aria-busy={busy}>{busy ? 'در حال افزودن…' : 'افزودن به سبد'}</button>{:else}<p class="stock">این کالا فعلاً قابل خرید نیست.</p>{/if}
{#if message}<p class="notice" role="status">{message}</p>{/if}
