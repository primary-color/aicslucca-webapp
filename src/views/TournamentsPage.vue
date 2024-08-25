<template>
  <div>
    <AppSpinnner v-if="isFetchingData" />
    <TournamentsRoot v-else @select:tournament="onSelectTournament" />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { useStore } from "@/store/main";
import router from "@/router";
import TournamentsRoot from "@/components/pages/tournaments/TournamentsRoot.vue";
import AppSpinnner from "@/components/shared/AppSpinner.vue";


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

function onNavItem(evt: any) {
  router.push({ name: 'TournamentsPage' });
}
</script>

<style scoped></style>
