<template>
  <v-container class="d-flex h-screen">
    <v-card variant="flat" width="350">
      <v-stepper v-model="step" non-linear flat hide-actions>
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
            <v-card
              prepend-icon="$vuetify"
              subtitle="The #1 Vue UI Library"
              class="bg-primary rounded-lg"
            >
              <template v-slot:title>
                <span class="font-weight-black">Welcome to Vuetify</span>
              </template>
              <v-virtual-scroll
                class="ma-1 pa-1 rounded-lg border bg-white"
                :height="400"
                :items="[
                  '1',
                  '2',
                  '3',
                  '4',
                  '5',
                  '6',
                  '7',
                  '8',
                  '9',
                  '10',
                  '11',
                  '12',
                  '13',
                  '14',
                  '15',
                  '16',
                  '17',
                  '18',
                  '19',
                  '20',
                  '21',
                  '22',
                  '23',
                  '24',
                  '25',
                  '26',
                  '27',
                  '28',
                  '29',
                  '30',
                ]"
              >
                <template v-slot:default="{ item }"> Item {{ item }} </template>
              </v-virtual-scroll>
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

  const schedule = {
    Sunday: {
      day: 'Sunday',
      position: 'Cashier',
      date: Date,
    },
    Monday: {
      day: 'Monday',
      position: 'Cashier',
      date: Date,
    },
    Tuesday: {
    day: "Tuesday",
    position: "Cashier",
    date: Date 
  },
  }
</script>
