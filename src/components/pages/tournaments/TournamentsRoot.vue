<template>
  <div class="flex flex-column h-full p-4">
    <div>
      <div v-if="!selectedCategory">
        <div class="flex align-items-center justify-content-center mb-4">
          <div class="text-xl font-bold text-color">
            SCEGLI IL TUO CAMPIONATO
          </div>
        </div>
        <div v-ripple v-for="category in categories" :key="category"
          class="p-ripple surface-ground hover:surface-hover cursor-pointer w-full py-3 px-4 surface-border border-1 border-round mb-2"
          @click="selectedCategory = category">
          <div class="flex justify-content-between align-items-center gap-6">
            <div class="flex flex-column">
              {{ category }}
            </div>
            <div>
              <i class="pi pi-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="flex align-items-center justify-content-center mb-4">
          <div class="text-xl font-bold text-color">
            SCEGLI IL TUO GIRONE DI INTERESSE
          </div>
        </div>
        <div v-ripple v-for="tournament in tournamentsFiltered" :key="tournament.id"
          class="p-ripple surface-ground hover:surface-hover cursor-pointer w-full py-3 px-4 surface-border border-1 border-round mb-2"
          @click="onClickTournament(tournament)">
          <div class="flex justify-content-between align-items-center gap-6">
            <div class="flex flex-column">
              <small class="mb-2 text-color-secondary" v-if="tournament.location">
                {{ tournament.location }}
              </small>
              <div class="font-bold">{{ tournament.name }}</div>
            </div>
            <div>
              <i class="pi pi-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "@/store/main";
import { storeToRefs } from "pinia";
import { watchDebounced } from "@vueuse/core";

const mainStore = useStore();
const { tournaments } = storeToRefs(mainStore);
const emit = defineEmits<{
  (e: "select:tournament", id: number): void;
}>();

const searchTerm = ref("");
const searchTermDebounced = ref("");

const selectedCategory = ref<string | null>(null);
const categories = ref(["CALCIO A 5", "CALCIO A 7", "CALCIO A 11"]);

watchDebounced(
  searchTerm,
  () => {
    searchTermDebounced.value = searchTerm.value;
  },
  { debounce: 200, maxWait: 1000 }
);

const tournamentsFiltered = computed(() =>
  tournaments.value.filter((t) => t.category === selectedCategory.value && t.path.toLowerCase().includes(searchTermDebounced.value.toLowerCase()))
);

function onClickTournament(t: any) {
  emit("select:tournament", t.id);
}
</script>

<style scoped></style>
