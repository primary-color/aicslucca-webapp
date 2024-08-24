<template>
  <!--Root container-->
  <div class="relative flex h-full w-full overflow-hidden z-0">
    <!--Sidebar container-->
    <div class="flex-shrink-0 hidden lg:block overflow-x-hidden surface-border bg-primary-900" style="width: 18rem">
      <slot name="navbar"></slot>
    </div>
    <!-- Main container -->
    <div class="relative flex flex-column h-full max-w-full flex-1 flex-col overflow-hidden">
      <!--Header container-->
      <div style="height: 4rem; min-height: 4rem;;" class="w-full flex align-items-center gap-4 lg:hidden border-bottom-1 surface-border">
        <div class="block lg:hidden px-2 py-2">
          <Button icon="pi pi-bars" @click="visible = true" severity="secondary" text aria-label="Menu" />
        </div>
      </div>
      <div class="overflow-y-auto">
        <!--Content container-->
        <slot />
      </div>
    </div>
  </div>
  <!--Mobile Sidebar container-->
  <Sidebar v-model:visible="visible" class="block lg:hidden" :show-close-icon="false" style="width: 18rem" :pt="{
    root: {
      class: 'bg-primary-900 border-none'
    },
    header: {
      class: 'p-0'
    },
    content: {
      class: 'p-0'
    }
  }">
    <slot name="navbar"></slot>
  </Sidebar>
</template>

<script setup lang="ts">
import { ref } from "vue"

const visible = ref(false);


</script>