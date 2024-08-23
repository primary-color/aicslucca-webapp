<template>
  <HomeTemplate>
    <template #navbar>
      <AppNav :items="itemsNav" @nav-item="onNavItem">
        <template #header>
          <h1 class="text-xl">Aics Lucca</h1>
        </template>
        <template #footer>
          <div class="flex w-full justify-content-center p-3">
            <DonateButton/>
          </div>
        </template>
      </AppNav>
    </template>
    <div>
      <TournamentsRoot @select:tournament="onSelectTournament"  />
    </div>
    <AppSpinnner v-if="isFetchingData" />
  </HomeTemplate>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { useStore } from "@/store/main";
import router from "@/router";
import TournamentsRoot from "@/components/pages/tournaments/TournamentsRoot.vue";
import AppSpinnner from "@/components/shared/AppSpinner.vue";
import HomeTemplate from "@/components/layout/HomeTemplate.vue";
import AppNav from '@/components/shared/AppNav.vue';
import DonateButton from "@/components/shared/DonateButton.vue";


const mainStore = useStore();

function onSelectTournament(id: number) {
  router.push({ name: "TournamentHome", params: { id } });
}

const isFetchingData = ref(false);

onBeforeMount(async () => {
  isFetchingData.value = true;
  await mainStore.fecthTournaments();
  isFetchingData.value = false;
});

const itemsNav = ref([
  {
    label: 'Campionati',
    id: 'tournaments',
    icon: 'ion:football-outline',
  },
  {
    label: 'Informazioni',
    id: 'info',
    icon: 'material-symbols:info-outline',
  },
]);

function onNavItem(id: string) {
  router.push({ name: 'TournamentsPage' });
}
</script>

<style scoped></style>
