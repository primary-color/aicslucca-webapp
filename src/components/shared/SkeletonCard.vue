<template>

  <div class="flex gap-3 align-items-end">
    <Skeleton width="2rem" height="2rem" class="mb-4"></Skeleton>
    <Skeleton width="15rem" height="1.5rem" class="mb-4"></Skeleton>
  </div>
  <AppCard>
    <Skeleton width="12rem" class="mb-2"></Skeleton>
    <Divider/>
    <div v-for="i in 6" :key="i" class="flex gap-3 justify-content-between">
      <div class="flex gap-3">
        <Skeleton width="1rem" height="1rem" class="mb-2"></Skeleton>
        <Skeleton width="10rem" class="mb-2"></Skeleton>
      </div>
      <Skeleton width="2rem" class="mb-2"></Skeleton>
    </div>
    <div class="flex justify-content-end mt-2">
      <Skeleton width="10rem" class="mb-2"></Skeleton>
    </div>
  </AppCard>

</template>
<script setup lang="ts">
import AppCard from './AppCard.vue';
</script>
