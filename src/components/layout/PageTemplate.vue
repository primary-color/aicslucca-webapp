<template>
  <div class="h-full overflow-hidden flex flex-column">
    <div ref="elRefHeader" v-if="$slots.header" class="relative z-2">
      <slot name="header" />
    </div>
    <div class="overflow-y-auto overflow-x-hidden h-full">
      <div class="w-full" style="display: flex; flex-direction: column; align-items: center;">
        <div class="w-full" style="max-width: 1200px">
        <slot/>
      </div>
      </div>

    </div>
    <div ref="elRefFooter" class="sticky bottom-0 bg-primary-50 border-top-1 surface-border">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
