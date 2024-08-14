<template>
  <PageTemplate>
    <template #header>
      <PageHeader :show-back-button="true" :show-image-logo="true" :show-menu-button="true"
        @on-back="router.push({ name: 'TournamentsPage' })" @on-info-page="isOpen = true">
        <div class="mb-2">
          <div class="text-color text-2xl font-bold mb-2">
          {{ tournamentDetails?.category }}
        </div>
        <div class="text-color text-xl font-bold">
          {{ tournamentDetails?.name }}
        </div>
        </div>

        
      </PageHeader>
      <Tabs :items="items" :active-item-key="activeItemKey" @tab:change="onChangeTab"></Tabs>

    </template>
    <AppSpinnner v-if="isFetchingData" />
    <RouterView v-else></RouterView>
    <ion-modal :is-open="isOpen">
      <InfoPage @on-back="isOpen = false" />
    </ion-modal>
  </PageTemplate>
</template>

<script lang="ts" setup>
import {
  IonModal,
} from "@ionic/vue";
import { computed, onBeforeMount, ref } from "vue";
import PageTemplate from "@/components/layout/PageTemplate.vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { useStore } from "@/store/main";
import { storeToRefs } from "pinia";
import Tabs from "@/components/shared/Tabs.vue";
import PageHeader from "@/components/PageHeader.vue";
import type { MenuItem } from "primevue/menuitem";
import AppSpinnner from "@/components/shared/AppSpinner.vue";
import InfoPage from "@/components/pages/info-page/InfoPage.vue";

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

const activeItemKey = computed(
  () => items.find((i) => i.key === route.name)?.key || ""
);

function onChangeTab(item: MenuItem) {
  router.push({ name: item.key, params: { id } });
}

const isFetchingData = ref(false);

onBeforeMount(async () => {
  isFetchingData.value = true;
  await store.fecthTournamentDetails(id);
  await store.fetchPlayers(id);
  await store.fetchTournamentCalendar(id, 1);
  isFetchingData.value = false;
});
</script>
