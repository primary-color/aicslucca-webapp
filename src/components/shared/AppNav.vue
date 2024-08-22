<template>
  <div class="flex flex-column h-full text-white">
    <template v-if="slots['header']">
      <div class="flex align-items-center px-5 flex-shrink-0" style="height:60px">
        <slot name="header" />
      </div>
    </template>

    <div class="overflow-y-auto">
      <ul class="list-none p-3 m-0">
        <AppNavItem v-for="(item) in items" :key="item.id" :label="item.label" :icon="item.icon"
          @click="emit('nav-item', item.id)" />
      </ul>
    </div>

    <div class="mt-auto">
      <template v-if="slots['footer']">
        <hr class="border-top-2 border-none border-white-100" />
        <slot name="footer" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots } from 'vue';
import AppNavItem from './AppNavItem.vue';
const slots = useSlots()

interface IProps {
  items: { label: string; icon: string, id: string }[]
}

defineProps<IProps>()


const emit = defineEmits<{
  (e: 'nav-item', id: string): void
}>()

</script>