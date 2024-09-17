<template>
  <div class="d-flex justify-center">
    <v-stepper
      v-model="step"
      :items="['Start', 'Legal', 'Organization Info']"
      hide-actions
    >
      <!-- Step 1 -->
      <template v-slot:item.1>
        <v-card title="Let's Get Started !!!" flat class="d-flex flex-column">
          <p>
            In order to view your schedule, you will have to register with your
            organization. This information can be obtained from your office
            personal.
          </p>
          <v-btn append-icon="mdi-arrow-right" @click="step++" color="primary"
            >next</v-btn
          >
        </v-card>
      </template>

      <!-- Step 2 -->
      <template v-slot:item.2>
        <v-card title="Policy & Conditions" flat>
          <p>
            Please read and accept the Terms & Conditions and Privacy Policy.
          </p>
          <v-overlay persistent scroll-strategy="block" v-model="termsAndConditionsOverlay"
          class="justify-center align-center"
            ><TermsAndConditions
          /></v-overlay>

          <v-btn
            @click="termsAndConditionsOverlay = !termsAndConditionsOverlay"
            color="primary"
            >Terms & Conditions</v-btn
          >
          <v-btn color="primary">Privacy Policy</v-btn>

          <v-form ref="form">
            <v-checkbox
              v-model="checkbox"
              :rules="[(v) => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
            ></v-checkbox>
          </v-form>
          <v-btn prepend-icon="mdi-arrow-left" @click="step--" color="primary"
            >Previous</v-btn
          >
          <v-btn
            :disabled="!checkbox"
            append-icon="mdi-arrow-right"
            @click="step++"
            color="primary"
            >next</v-btn
          >
        </v-card>
      </template>

      <!-- Step 3 -->
      <template v-slot:item.3>
        <v-card title="Organization Register" flat
          >Organization Form Here</v-card
        >
      </template>
    </v-stepper>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  definePageMeta({
    layout: 'auth-layout',
  })

  const step = ref(1) // Current step in the stepper
  const checkbox = ref(false) // Checkbox status
  const termsAndConditionsOverlay = ref(false)

  // Function to move to the next step
  const nextStep = () => {
    if (step.value === 1 && !checkbox.value) {
      return // Prevent moving to the next step if checkbox is not checked
    }

    step.value++
  }
</script>
