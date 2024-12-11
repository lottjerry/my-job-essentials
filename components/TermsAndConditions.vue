<template>
  <v-card
    class="mx-auto"
    prepend-icon="mdi-file-document"
    subtitle="Please Read to the bottom to accept."
    width="350"
  >
    <template v-slot:title nav>
      <span class="font-weight-black"> Terms & Conditions </span>
    </template>
    <v-card-text
      class="bg-surface-light pa-5 overflow-y-auto"
      style="max-height: 500px"
      v-scroll.self="onScroll"
    >
      <Terms />
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn
        @click="haveReadandAccept"
        :disabled="offSetTop < 575"
        color="primary"
        variant="plain"
        >I accept</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { useAppStore } from '~/stores/appStore'

  const appStore = useAppStore()
  const offSetTop = ref(0)

  const haveReadandAccept = () => {
    appStore.termsAndConditionsOverlay = false
    appStore.acceptTermsAndConditions = true
  }

  const onScroll = (e) => {
    offSetTop.value = e.target.scrollTop
  }
</script>
