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
              title="Week 45"
              subtitle="10/06 - 10/12"
              class="d-flex flex-column bg-primary"
            >
              <v-card-text>
                <v-virtual-scroll :items="items" height="500">
                  <template v-slot:default="{ item, index }">
                    <v-card :title="days[index]" subtitle="10/06" class="ma-2">
                      <v-card-text
                        class="d-flex justify-space-around font-weight-bold"
                      >
                        <p>6-00 am - 9:00 pm</p>
                        <p>Cashier</p>
                      </v-card-text>
                    </v-card>
                  </template>
                </v-virtual-scroll>
              </v-card-text>
            </v-card></v-stepper-window-item
          >
          <!-- Step 2 -->
          <v-stepper-window-item :value="2">
            <v-card
              title="Week 45"
              subtitle="10/06 - 10/12"
              class="d-flex flex-column bg-primary"
            >
              <v-card-text>
                <v-virtual-scroll :items="items" height="400">
                  <template v-slot:default="{ item, index }">
                    <v-card :title="days[index]" subtitle="10/06" class="ma-2">
                      <v-card-text
                        class="d-flex justify-space-around font-weight-bold"
                      >
                        <p>6-00 am - 9:00 pm</p>
                        <p>Cashier</p>
                      </v-card-text>
                    </v-card>
                  </template>
                </v-virtual-scroll>
              </v-card-text>
            </v-card>
          </v-stepper-window-item>
          <!-- Step 3 -->
          <v-stepper-window-item :value="3">
            <v-card
              title="Week 45"
              subtitle="10/06 - 10/12"
              class="d-flex flex-column bg-primary"
            >
              <v-card-text>
                <v-virtual-scroll :items="items" height="400">
                  <template v-slot:default="{ item, index }">
                    <v-card :title="days[index]" subtitle="10/06" class="ma-2">
                      <v-card-text
                        class="d-flex justify-space-around font-weight-bold"
                      >
                        <p>6-00 am - 9:00 pm</p>
                        <p>Cashier</p>
                      </v-card-text>
                    </v-card>
                  </template>
                </v-virtual-scroll>
              </v-card-text>
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
  const items = ref(Array.from({ length: 7 }, (v, k) => k + 1))

  const days = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ]
</script>
