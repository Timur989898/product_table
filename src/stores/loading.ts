import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', () => {
    const isLoading = ref<boolean>(false);

    const setLoading = (status: boolean) => {
        isLoading.value = status;
    }

    return {
        isLoading,
        setLoading,
    }
});
