<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import useTheme from "@/composables/useTheme";
const { initializeTheme } = useTheme();
initializeTheme();
</script>

<style scoped>
.app{
  padding-top: 48px;
  height: 100%;
}
</style>
