<template>
  <v-progress-circular
    v-if="productLoading"
    indeterminate
  />
  <v-card v-else-if="product" class="product-card">
    <img
      v-if="product.thumbnail"
      :src="product.thumbnail"
      :alt="product.title"
    >
    <div v-if="product.title">
      {{ product.title }}
    </div>
    <div v-if="product.description">
      {{ product.description }}
    </div>
    <div v-if="product.price">
      {{ product.price }}
    </div>
  </v-card>
</template>
<script setup lang="ts">
import { useProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';

const productStore = useProductStore();
const {
  product,
  productLoading,
} = storeToRefs(productStore);
</script>
<style lang="scss">
.product-card {
  padding: 24px;
}
</style>
