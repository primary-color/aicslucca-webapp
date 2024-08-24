<template>
  <div>
    <Breadcrumb :model="items" style="padding: 0">
      <template #item="{ item, props }">
        <a :target="item.target" v-bind="props.action" @click="emit('item', item)">
          <i :class="item.icon" class="text-primary font-semibold cursor-pointer white-space-nowrap" v-if="item.icon"></i>
          <span class="text-primary font-semibold cursor-pointer white-space-nowrap">{{ item.label }}</span>
        </a>
      </template>
    </Breadcrumb>
  </div>

</template>
<script lang="ts" setup>
import { MenuItem } from 'primevue/menuitem';
type Props = {
  items: MenuItem[]
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'item', item: MenuItem): void
}>()
</script>