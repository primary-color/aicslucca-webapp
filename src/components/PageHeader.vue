<template>
  <div>
    <!-- Image Logo-->
    <div v-if="showImageLogo" class="flex align-items-center justify-content-center p-2">
      <img :src="image" style="width: 8rem;" />
    </div>
    <div class="grid grid-nogutter align-items-center p-2">
      <!-- Back button-->
      <div class="col">
        <Button v-if="showBackButton" icon="pi pi-arrow-left" text rounded severity="secondary" @click="onBack" />
      </div>
      <div class="col-9">
        <div class="text-color">
          <slot></slot>
        </div>
      </div>
      <div class="col flex justify-content-end">
        <Button v-if="showMenuButton" text rounded severity="secondary" type="button" icon="pi pi-ellipsis-v"
          @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { MenuItem } from "primevue/menuitem";
const image = "logo_aicslucca.png";

defineProps(["title", "showImageLogo", "showBackButton", "showMenuButton"]);
const emit = defineEmits(["onBack", "onInfoPage"]);

function onBack() {
  emit("onBack");
}

const menu = ref();
const items = ref<MenuItem[]>([
  {
    label: "Informazioni",
    icon: "pi pi-info-circle",
    command: () => {
      emit('onInfoPage')
    },
  },
]);

const toggle = (event: any) => {
  menu.value.toggle(event);
};
</script>

<style scoped></style>
