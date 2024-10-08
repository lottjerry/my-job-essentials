<template>
  <v-container class="d-flex h-screen">
    <v-card variant="flat" height="500" width="350">
      <v-stepper class="mt-12" v-model="step" non-linear flat>
        <v-stepper-header>
          <v-stepper-item
            :value="1"
            editable
            title="Week"
            subtitle="Previous"
            selected-class="text-primary"
            :color="step === 1 ? 'primary' : null"
            icon="mdi-calendar-blank-outline"
            edit-icon="mdi-calendar-check-outline"
          ></v-stepper-item>

          <v-divider></v-divider>

          <v-stepper-item
            :value="2"
            editable
            title="Week"
            subtitle="Current"
            selected-class="text-primary"
            :color="step === 2 ? 'primary' : null"
            icon="mdi-calendar-blank-outline"
            edit-icon="mdi-calendar-check-outline"
          ></v-stepper-item>

          <v-divider></v-divider>

          <v-stepper-item
            :value="3"
            editable
            title="Week"
            subtitle="Next"
            selected-class="text-primary"
            :color="step === 3 ? 'primary' : null"
            icon="mdi-calendar-blank-outline"
            edit-icon="mdi-calendar-check-outline"
          >
          </v-stepper-item>
        </v-stepper-header> </v-stepper
    ></v-card>
  </v-container>
</template>
<script setup>
  definePageMeta({
    layout: 'auth-layout',
  })

  const step = ref(2)
</script>
