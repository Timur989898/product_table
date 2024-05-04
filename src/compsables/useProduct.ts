import { getProduct } from '@/api/endpoints';
import { ref } from 'vue';
import { createEventHook } from '@vueuse/core';

export const useProduct = () => {
    const errorEvent = createEventHook();

    const productLoading = ref<boolean>(false);

    const loadProduct = async (id: string) => {
        try {
            productLoading.value = true;

            return await getProduct(id);
        } catch (e) {
            await errorEvent.trigger(e);
        } finally {
            productLoading.value = false;
        }
    }

    return {
        productLoading,
        loadProduct,
        onError: errorEvent.on,
    }
}
