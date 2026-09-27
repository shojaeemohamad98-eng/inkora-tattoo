<script lang="ts">
  import Icon, { type IconName } from './Icon.svelte';
  let { label, icon, primary = false }: { label: string; icon?: IconName; primary?: boolean } = $props();
  let announced = $state(false);
</script>
<div class="future-control">
  <button class:primary class="home-action" onclick={() => announced = true}>{label}{#if icon}<Icon name={icon} />{/if}</button>
  <p class="future-message" role="status">{announced ? 'در فاز بعد آماده می‌شود؛ این بخش اکنون نمایشی است.' : ''}</p>
</div>
