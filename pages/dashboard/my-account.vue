<template>
  <div>
    <v-container class="d-flex justify-center align-center h-screen">
      <v-card variant="outlined" class="w-100 w-md-50 w-lg-25">
        <div class="d-flex pa-5 ga-5 bg-primary">
          <!-- Logo Begin -->

          <div class="d-flex flex-column ">
            <div class="d-flex justify-center">
              <v-icon size="x-small" icon="mdi-calendar-month-outline"></v-icon>
            </div>

            <div class="d-flex ga-5 justify-center">
              <v-icon size="x-small" icon="mdi-qrcode-scan"></v-icon>

              <v-icon size="x-small" icon="mdi-barcode-scan"></v-icon>
            </div>

            <div class="d-flex justify-center">
              <v-icon size="x-small" icon="mdi-cellphone"></v-icon>
            </div>
          </div>

          <!-- Logo End -->

          <div>
            <h4>Work</h4>

            <h4>Essentials</h4>
          </div>
        </div>

        <!-- Profile Picture -->

        <div class="d-flex align-center pa-2 ma-2 justify-center">
          <v-icon icon="mdi-account" size="75"></v-icon>
        </div>

        <!-- Profile End -->

        <!-- Name and Title -->

        <div
          class="d-flex flex-column align-center ga-2 pa-2 mb-5 justify-center"
        >
          <p class="text-h4">Display Name</p>

          <p density="compact" variant="text" class="text-h6">
            {{ user.displayName }}
          </p>
        </div>

        <!-- Name and Title End-->

        <!-- User Info Begin -->

        <div
          class="d-flex flex-column pa-10 ga-5 bg-primary justify-center border"
        >
          <div class="d-flex flex-column align-center justify-center">
            <p class="text-h6">Email</p>

            <p class="text-body-2">{{ user.email }}</p>
          </div>

          <div class="d-flex flex-column align-center justify-center">
            <p class="text-h6">Organization ID</p>

            <p class="text-body-2">CM-6065</p>
          </div>
        </div>

        <!-- User Info End -->
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { shallowRef } from 'vue'

  definePageMeta({
    layout: 'auth-layout',
  })

  const user = useCurrentUser()
</script>
