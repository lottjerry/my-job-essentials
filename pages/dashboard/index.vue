<template>
  <v-container class="d-flex h-screen">
    <v-card variant="flat" height="500" width="350">
      <v-stepper class="mt-12" v-model="step" non-linear flat hide-actions>
        <!-- V Stepper Header Start -->
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
        </v-stepper-header>
        <!-- V Stepper Header End -->
         <!-- ************************************************************ -->
        <!-- V Stepper Window Start -->
        <v-stepper-window>
          <!-- Step 1 -->
          <v-stepper-window-item :value="1">
            <v-card title="Previous" flat class="d-flex flex-column ga-5">
              <p>
                In order to view your schedule, you will have to register with
                your organization. This information can be obtained from your
                office personal.
              </p>
            </v-card>
          </v-stepper-window-item>
          <!-- Step 2 -->
          <v-stepper-window-item :value="2">
            <v-card title="Current" flat class="d-flex flex-column ga-5">
              <p>
                In order to view your schedule, you will have to register with
                your organization. This information can be obtained from your
                office personal.
              </p>
            </v-card>
          </v-stepper-window-item>
          <!-- Step 3 -->
          <v-stepper-window-item :value="3">
            <v-card title="Next" flat class="d-flex flex-column ga-5">
              <p>
                In order to view your schedule, you will have to register with
                your organization. This information can be obtained from your
                office personal.
              </p>
            </v-card>
          </v-stepper-window-item>
        </v-stepper-window>
        <!-- V Stepper Window End -->
      </v-stepper></v-card
    >
  </v-container>
</template>
<script setup>
  definePageMeta({
    layout: 'auth-layout',
  })

  const step = ref(2)
</script>
