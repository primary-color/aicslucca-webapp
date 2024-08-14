<template>
  <ion-segment :value="activeItemKey" :scrollable="true" @ion-change="onTabChange">
    <ion-segment-button v-for="item in items" :key="item.key" :value="item.key">
      <ion-label>{{ item.label }}</ion-label>
    </ion-segment-button>
  </ion-segment>
</template>

<script lang="ts" setup>
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/vue";
import type { MenuItem } from "primevue/menuitem";
interface Props {
  items: MenuItem[];
  activeItemKey: string;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "tab:change", value: MenuItem): void;
}>();

function onTabChange(evt: any) {
  const key = evt.target.value;
  const item = props.items.find(i => i.key === key) as MenuItem
  emit('tab:change', item)
}
</script>


<style scoped>
ion-segment {
  --background: var(--primary-color);
}

ion-segment-button{
  --background-focused: #fff;
  --background-hover: #fff;
  --color: #fff;
  --color-checked: var(--primary-color);
  --background-checked: #fff;
  border-radius: 4px;
  margin: 8px 4px;
  --indicator-height: 0px;
}
</style>
