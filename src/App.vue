<template>
  <v-progress-circular
    v-if="isLoading"
    indeterminate
  />
  <RouterView v-else />
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useLoadingStore } from '@/stores/loading';
import { storeToRefs } from 'pinia';

const loadingStore = useLoadingStore();
const {
  isLoading,
} = storeToRefs(loadingStore);
</script>
