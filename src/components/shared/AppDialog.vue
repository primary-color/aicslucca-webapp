<template>
  <Dialog v-bind="attrs" :draggable="props.draggable" :modal="props.modal" :pt="pt">
    <template v-for="slotName in slotNamesArray" :key="slotName" #[slotName]="scope">
      <slot :name="slotName" :slotProps="scope" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { useAttrs } from 'vue';
import type { DialogProps, DialogPassThroughOptions } from 'primevue/dialog';
import type { PassThrough } from 'primevue/ts-helpers';
import { mergeWith } from 'lodash';

const attrs = useAttrs();
const emit = defineEmits();

enum SlotNames {
  Default = 'default',
  Header = 'header',
  Footer = 'footer',
  CloseIcon = 'closeicon',
  MaximizeIcon = 'maximizeicon',
  Container = 'container'
}

export interface MoveDialogProps extends /* @vue-ignore */ DialogProps {
  fullscreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  draggable?: boolean;
  modal?: boolean;
  severity?: 'primary' | 'secondary';
  extendedPt?: PassThrough<DialogPassThroughOptions>;
}

const props = withDefaults(defineProps<MoveDialogProps>(), {
  fullscreen: false,
  size: 'md',
  draggable: false,
  modal: true,
  severity: 'primary'
});

const slots = useSlots();
const slotNamesArray = Object.keys(slots) as SlotNames[];

const fullScreenClasses = 'min-h-screen h-screen min-w-screen w-screen';
const noBorderClasses = 'border-none shadow-none';

const getSizeClasses = computed(() => {
  if (props.fullscreen) {
    return `${fullScreenClasses} ${noBorderClasses}`;
  }

  if (props.size === 'sm') {
    return 'w-8 sm:w-6 md:w-3';
  }
  if (props.size === 'md') {
    return 'w-12 md:w-8 ';
  }
  if (props.size === 'lg') {
    return 'w-12 md:w-10';
  }
});

const rootClasses = computed(() => `p-0 m-0 ${getSizeClasses.value}`);

const contentClasses = `h-full p-0 round-none shadow-none border-noround`;

const headerContrast = {
  primary: 'bg-primary text-primary',
  secondary: 'bg-primary-reverse text-color'
};

const closeButtonClasses = {
  primary: 'text-white hover:text-primary',
  secondary: 'text-primary hover:text-secondary'
};

const headerClasses = computed(() => `p-4 m-0 border-bottom-1 ${headerContrast[props.severity]}`);

const defaultPt = {
  root: {
    class: rootClasses.value
  },
  content: {
    class: contentClasses
  },
  header: {
    class: headerClasses.value
  },
  closeButton: {
    class: closeButtonClasses[props.severity]
  }
};

function customizer(objValue: any, srcValue: any) {
  if (typeof objValue === 'string') {
    return objValue.concat(` ${srcValue}`);
  }
}

const pt = computed(() => {
  const result = props.extendedPt ? mergeWith(defaultPt, props.extendedPt, customizer) : defaultPt;
  return result;
});
</script>
