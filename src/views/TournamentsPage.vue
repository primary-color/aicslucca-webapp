<template>
  <HomeTemplate>
    <template #navbar>
      <AppNav :items="items" @nav-item="onNavItem">
        <template #footer>
          <div class="flex w-full justify-content-center p-3">
            <DonateButton/>
          </div>
        </template>
      </AppNav>
    </template>
    <div class="p-4">
      ciap
    </div>
  </HomeTemplate>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { useStore } from "@/store/main";
import router from "@/router";
import TournamentsRoot from "@/components/pages/tournaments/TournamentsRoot.vue";
import AppSpinnner from "@/components/shared/AppSpinner.vue";
import PageHeader from "@/components/PageHeader.vue";
import PageTemplate from "@/components/layout/PageTemplate.vue";
import HomeTemplate from "@/components/layout/HomeTemplate.vue";
import AppNav from '@/components/shared/AppNav.vue';
import AppLogo from "@/components/shared/AppLogo.vue";
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

const items = ref([
  {
    label: 'Campionati',
    id: 'tournaments',
    icon: 'pi pi-fw pi-home',
  },
  {
    label: 'Tab 2',
    id: 'tab2',
    icon: 'pi pi-fw pi-user',
  },
  {
    label: 'Tab 3',
    id: 'tab3',
    icon: 'pi pi-fw pi-cog',
  },
]);

function onNavItem(id: string) {
  console.log(id);
}
</script>

<style scoped></style>
