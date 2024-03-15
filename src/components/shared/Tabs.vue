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
