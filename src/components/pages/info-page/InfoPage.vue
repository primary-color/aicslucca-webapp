<template>
  <ion-content >
    <PageTemplate>
      <template #header>
        <PageHeader
          title="Informazioni"
          :show-back-button="true"
          @on-back="emit('onBack')"
          class="header"
        />
      </template>
      <div class="surface-ground p-4 h-full">
        <Card class="mb-4">
          <template #content>
            <div
              class="flex flex-column align-items-center justify-content-center p-4 mb-6"
            >
              <img :src="image" style="width: 100%" class="mb-4" />
              <div class="text-xl font-bold text-color-secondary">
                Versione App: {{ appVersion }}
              </div>
            </div>

            <div class="flex align-items-center justify-content-center w-full">
              <form
                action="https://www.paypal.com/donate"
                method="post"
                target="_top"
              >
                <input type="hidden" name="business" value="6GTDV7EJ83LR6" />
                <input type="hidden" name="currency_code" value="EUR" />
                <input
                  type="image"
                  src="https://www.paypalobjects.com/en_US/IT/i/btn/btn_donateCC_LG.gif"
                  border="0"
                  name="submit"
                  title="PayPal - The safer, easier way to pay online!"
                  alt="Donate with PayPal button"
                />
                <img
                  alt=""
                  border="0"
                  src="https://www.paypal.com/en_IT/i/scr/pixel.gif"
                  width="1"
                  height="1"
                />
              </form>
            </div>
          </template>
        </Card>
        <Card>
          <template #content>
            <div class="flex align-items-center justify-content-center pb-6">
              <span class="mr-2">Toggle theme</span>
              <InputSwitch
                :model-value="isDark"
                @update:model-value="onchange"
              />
            </div>
          </template>
        </Card>
      </div>
    </PageTemplate>
  </ion-content>
</template>
<script setup lang="ts">
import { IonContent } from "@ionic/vue";
import PageTemplate from "@/components/layout/PageTemplate.vue";
import PageHeader from "@/components/PageHeader.vue";
const image = "logo_aicslucca.png";
import { useStore } from "@/store/main";
import { storeToRefs } from "pinia";
import useTheme from "@/composables/useTheme";

const { isDark, toggleTheme } = useTheme();

const emit = defineEmits(['onBack'])

function onchange() {
  toggleTheme();
}

const { appVersion } = storeToRefs(useStore());
</script>

<style scoped>
.header{
  padding-top: 48px;
}
</style>
