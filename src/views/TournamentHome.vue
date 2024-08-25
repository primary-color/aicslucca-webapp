<template>
  <div>
    <div class="px-4 my-2">
      <AppBreadcrumb :items="breadcrumbItems" class="my-4" @item="onClickBreadcrumbItem" />
    </div>
    <Divider style="margin: 0px;"></Divider>

    <Tabs :items="items" :active-item-key="activeItemKey" @tab:change="onChangeTab"></Tabs>
    <AppSpinnner v-if="isFetchingData" />
    <RouterView v-else></RouterView>
  </div>
</template>

<script lang="ts" setup>
import {
  IonModal,
} from "@ionic/vue";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { useStore } from "@/store/main";
import { storeToRefs } from "pinia";
import Tabs from "@/components/shared/Tabs.vue";
import type { MenuItem } from "primevue/menuitem";
import AppSpinnner from "@/components/shared/AppSpinner.vue";
import AppBreadcrumb from "@/components/shared/AppBreadcrumb.vue";


const store = useStore();
const { tournamentDetails } = storeToRefs(store);

const route = useRoute();
const id = route.params.id as string;

const isOpen = ref(false);

const items: MenuItem[] = [
  { label: "Dashboard", key: "TournamentDashboard" },
  {
    label: "Classifica",
    key: "TournamentRankingPage",
  },
  {
    label: "Giocatori",
    key: "PlayersStatsPage",
  },
  { label: "Giornate", key: "CalendarPage" },
];

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


const activeItemKey = computed(
  () => items.find((i) => i.key === route.name)?.key || ""
);

function onChangeTab(item: MenuItem) {
  router.push({ name: item.key, params: { id } });
}

const isFetchingData = ref(false);

function onNavItem(id: string) {
  router.push({ name: 'TournamentsPage' });
}

onBeforeMount(async () => {
  isFetchingData.value = true;
  await store.fecthTournamentDetails(id);
  await store.fetchPlayers(id);
  await store.fetchTournamentCalendar(id, 1);
  isFetchingData.value = false;
});

const breadcrumbItems = computed(() => {
  const items: any[] = [{ icon: 'pi pi-home' }];
  tournamentDetails.value ? items.push(...[tournamentDetails.value.category, tournamentDetails.value.name]) : []
  return items.map((item, idx) => (idx !== 0 ? { label: item, route: '/tournaments/' } : item))
})

function onClickBreadcrumbItem(item: any) {
  router.push({ name: 'TournamentsPage' });
}
</script>
