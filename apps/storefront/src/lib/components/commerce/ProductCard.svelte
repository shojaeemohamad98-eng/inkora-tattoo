<script lang="ts">
  import AddToCart from './AddToCart.svelte';
  type Product = { id: number; name: string; slug: string; prices: { price: string; currency_code: string; currency_minor_unit: number }; images: Array<{ src: string; thumbnail: string; alt: string }>; is_purchasable: boolean; is_in_stock: boolean; has_options: boolean; stock_availability: { text: string } };
  let { product }: { product: Product } = $props();
  function price(p: Product['prices']) { const major = Number(p.price) / 10 ** p.currency_minor_unit; const toman = p.currency_code === 'IRR' ? major / 10 : major; return `${new Intl.NumberFormat('fa-IR').format(toman)} تومان`; }
</script>
<article class="store-card product-card">
  <a href={`/shop/${product.slug}`} class="product-image" aria-label={`مشاهده ${product.name}`}>
    {#if product.images[0]}<img src={product.images[0].thumbnail} alt={product.images[0].alt || `تصویر محصول ${product.name}`} />{:else}<span aria-label={`تصویر محصول ${product.name} موجود نیست`}>بدون تصویر محصول</span>{/if}
  </a>
  <div class="product-copy"><h2><a href={`/shop/${product.slug}`}>{product.name}</a></h2><p class="price">{price(product.prices)}</p>{#if !product.is_in_stock}<p class="stock">{product.stock_availability.text || 'ناموجود'}</p>{/if}<AddToCart id={product.id} enabled={product.is_purchasable && product.is_in_stock && !product.has_options} /></div>
</article>
