<template>
  <product-card
    v-if="productInfo"
    :is-loading="productLoading"
    :product="productInfo as Product"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import { useProduct } from '@/compsables/useProduct';
import { useRouter } from 'vue-router';
import type { Product } from '@/models/Product';

export interface Props {
  productId: string;
}

const props = withDefaults(defineProps<Props>(), {
  productId: '',
});

const router = useRouter();

const productInfo = ref<Product>();

const {
  productLoading,
  loadProduct,
  onError,
} = useProduct();

onError(() => {
  router.push({ name: 'not-found' })
})

onMounted(async () => {
  if (props.productId) {
    productInfo.value = await loadProduct(props.productId)
  } else {
    await router.push({ name: 'products' });
  }
})
</script>
<style scoped>

</style>
