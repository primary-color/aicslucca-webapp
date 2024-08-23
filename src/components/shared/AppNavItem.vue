<template>
  <li>
    <a v-ripple
      class="text-white flex align-items-center gap-2 cursor-pointer p-3 border-round text-700 hover:bg-primary-800 transition-duration-150 transition-colors p-ripple">
      <Icon :icon="icon"  style="font-size: 1.5rem;"/>
      <span class="font-medium">{{ label }}</span>
    </a>
  </li>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

interface IProps {
  icon: string,
  label: string,
}

defineProps<IProps>()
</script>