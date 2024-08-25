<template>
  <div class="app">
    <HomeTemplate>
      <template #navbar="{closeSidebar}">
        <AppNav :items="itemsNav" @nav-item="(evt) =>onNavItem(evt, closeSidebar)">
          <template #header>
            <h1 class="text-xl">Aics Lucca</h1>
          </template>
          <template #footer>
            <div class="flex w-full justify-content-center p-3">
              <DonateButton />
            </div>
          </template>
        </AppNav>
      </template>
      <RouterView />
    </HomeTemplate>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HomeTemplate from './components/layout/HomeTemplate.vue';
import AppNav from './components/shared/AppNav.vue';
import { RouterView } from 'vue-router';
import DonateButton from './components/shared/DonateButton.vue';
import router from './router';

const itemsNav = ref([
  {
    label: 'Campionati',
    id: 'tournaments',
    icon: 'ion:football-outline',
    routeName: 'TournamentsPage',
  },
  {
    label: 'Informazioni',
    id: 'info',
    icon: 'material-symbols:info-outline',
    routeName: 'InfoPage',
  },
]);

function onNavItem(evt: any, closeSidebar: () => void) {
  closeSidebar();
  const item = itemsNav.value.find((i) => i.id === evt) as any;
  router.push({ name: item.routeName });
}
</script>

<style scoped>
.app {
  height: 100%;
}
</style>
