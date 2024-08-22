<template>
  <li>
    <a v-ripple
      class="text-white flex align-items-center cursor-pointer p-3 border-round text-700 hover:bg-primary-800 transition-duration-150 transition-colors p-ripple">
      <i class="mr-2" :class="`${icon}`" ></i>
      <span class="font-medium">{{ label }}</span>
    </a>
  </li>
</template>

<script lang="ts" setup>

interface IProps {
  icon: string,
  label: string,
}

defineProps<IProps>()
</script>