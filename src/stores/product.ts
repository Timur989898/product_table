import { getProduct } from '@/api/endpoints';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Product } from '@/models/Product';

export const useProductStore = defineStore('product', () => {
    const product = ref<Product>();

    const productLoading = ref<boolean>(false);

    const loadProduct = async (id: string) => {
        try {
            productLoading.value = true;

            product.value = await getProduct(id);

            return product.value;
        } catch (e) {
            console.log(e);
        } finally {
            productLoading.value = false;
        }
    }

    return {
        product,
        productLoading,
        loadProduct,
    }
});
