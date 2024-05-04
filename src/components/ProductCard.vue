<template>
  <v-progress-circular
    v-if="isLoading"
    indeterminate
  />
  <v-card v-else class="product-card">
    <img v-if="product.thumbnail" :src="product.thumbnail" :alt="product.title">
    <div>{{ product.title }}</div>
    <div>{{ product.description }}</div>
    <div>{{ product.price }}</div>
  </v-card>
</template>
<script setup lang="ts">
import type { Product } from '@/models/Product';

export interface Props {
  product: Product;
  isLoading: boolean;
}

defineProps<Props>()
</script>
<style lang="scss">
.product-card {
  padding: 24px;
}
</style>
