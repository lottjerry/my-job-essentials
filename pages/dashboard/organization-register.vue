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
          <v-overlay
            persistent
            scroll-strategy="block"
            v-model="appStore.termsAndConditionsOverlay"
            class="align-center justify-center"
            ><TermsAndConditions
          /></v-overlay>
          <v-form ref="form">
            <v-checkbox
              :disabled="!appStore.acceptTermsAndConditions && !Error"
              :rules="[(v) => !!v || 'You must agree to the Terms & !']"
              color="success"
              v-model="appStore.acceptTermsAndConditions"
              ><template v-slot:label>
                <v-btn
                  class="active-btn"
                  variant="plain"
                  @click="appStore.termsAndConditionsOverlay = true"
                  :color="appStore.acceptTermsAndConditions ? 'green' : null"
                  >Terms & Conditions</v-btn
                ></template
              >
            </v-checkbox>
          </v-form>

          <v-btn color="primary">Privacy Policy</v-btn>
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
  import { useAppStore } from '~/stores/appStore'
  definePageMeta({
    layout: 'auth-layout',
  })

  const step = ref(1) // Current step in the stepper
  const appStore = useAppStore()

  // Function to move to the next step
  const nextStep = () => {
    if (step.value === 1 && !checkbox.value) {
      return // Prevent moving to the next step if checkbox is not checked
    }

    step.value++
  }
</script>

<style scoped>
  /* Ensure the button remains active even when the checkbox is disabled */
  .active-btn {
    pointer-events: auto;
  }
</style>
