<template>
  <v-data-table
    :headers="headers"
    :items="products"
    :loading="productsLoading"
    :items-per-page="limit"
    class="product-table"
    @click:row="productClickedHandler"
  >
    <template #top>
      <div class="product-table__top">
        <v-text-field
          v-model="searchText"
          label="Search text"
          @input="searchProducts"
        />
      </div>
    </template>
    <template #bottom>
      <div v-if="products.length && !productsLoading" class="product-table__footer">
        <div>
          Page: {{ pageCounter }}
        </div>
        <div>
          Total: {{ total }}
        </div>
        <v-select
          v-model="limit"
          label="Items per page"
          :items="itemsPerPageSelectItems"
          @update:model-value="updateLimit"
        />
        <v-btn
          :disabled="currentPage <= 1"
          @click="prevPage"
        >
          Prev
        </v-btn>
        <v-btn
          :disabled="currentPage >= pagesCount"
          @click="nextPage"
        >
          Next
        </v-btn>
      </div>
    </template>
  </v-data-table>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '@/stores/products';
import { useRouter } from 'vue-router';

const headers = [
    { title: 'ID', value: 'id' },
    { title: 'Product name', value: 'title' },
    { title: 'Description', value: 'description' },
];

const itemsPerPageSelectItems = [10, 30, 60];

const router = useRouter();

const productsStore = useProductsStore();
const {
  loadProducts,
  nextPage,
  prevPage,
  updateLimit,
  searchProducts,
} = productsStore;
const {
  products,
  limit,
  total,
  productsLoading,
  currentPage,
  pagesCount,
  searchText,
} = storeToRefs(productsStore);

const productClickedHandler = (e: Event, row: any) => {
  router.push({ name: 'product', params: { productId: row.item.id }});
}

const pageCounter = computed(() => {
  return `${ currentPage.value }/${ pagesCount.value }`;
});

onMounted(() => {
  loadProducts();
})
</script>
<style lang="scss">
.product-table {
  &__top {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 24px;
  }

  &__footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    padding: 16px;
  }
}
</style>
