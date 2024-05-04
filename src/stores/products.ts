import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getProducts } from '@/api/endpoints';
import type { Product } from '@/models/Product';
import { useDebounceFn } from '@vueuse/core';

const INITIAL_LIMIT = 10;
const INITIAL_SKIP = 0;
const INITIAL_TOTAL = 0;

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([]);
  const limit = ref(INITIAL_LIMIT);
  const skip = ref(INITIAL_SKIP);
  const total = ref(INITIAL_TOTAL);
  const searchText = ref('');

  const currentPage = computed(() => Math.ceil(skip.value / limit.value) + 1);
  const pagesCount = computed(() => Math.ceil(total.value / limit.value));

  const productsLoading = ref(false);

  const loadProducts = async () => {
    try {
      productsLoading.value = true;

      const productsData = await getProducts({
        limit: limit.value,
        skip: skip.value,
        q: searchText.value
      });

      products.value = productsData.products.map(
          ({
             id,
             title,
             description,
             price,
             thumbnail,
          }) => ({
            id,
            title,
            description,
            price,
            thumbnail,
          }));
      skip.value = productsData.skip;
      total.value = productsData.total;
    } catch (e) {
      console.log(e);
    } finally {
      productsLoading.value = false;
    }
  }

  const resetPagination = () => {
    skip.value = INITIAL_SKIP;
    total.value = INITIAL_TOTAL;
  }

  const nextPage = () => {
    if (currentPage.value < pagesCount.value) {
      skip.value = skip.value + limit.value;
      loadProducts();
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      skip.value = skip.value - limit.value;
      loadProducts();
    }
  }

  const updateLimit = (newLimit: number) => {
    resetPagination();
    limit.value = newLimit;
    loadProducts()
  }

  const searchProducts = useDebounceFn(() => {
    resetPagination();
    loadProducts();
  }, 500);

  return {
    products,
    limit,
    skip,
    total,
    productsLoading,
    currentPage,
    pagesCount,
    searchText,
    loadProducts,
    nextPage,
    prevPage,
    updateLimit,
    searchProducts
  }
})
