<template>
  <div class="d-flex align-center h-screen justify-center">
    <v-stepper
      v-model="step"
      hide-actions
      class="h-75 w-100 w-md-75 w-lg-50 mx-2"
    >
      <!-- V Stepper Header Start -->
      <v-stepper-header>
        <v-stepper-item
          :value="1"
          subtitle="Start"
          selected-class="text-primary"
          :class="step > 1 ? 'text-success' : null"
          :color="step === 1 ? 'primary' : step > 1 ? 'success' : null"
          icon="mdi-sign-direction"
          edit-icon="mdi-pencil"
          :editable="step === 1"
          :complete="step > 1"
        ></v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          :value="2"
          subtitle="Legal"
          :selected-class="
            (!disablePrivacyPolicy && !appStore.acceptPrivacyPolicy) ||
            (!disableTermsAndConditions && !appStore.acceptTermsAndConditions)
              ? 'text-error'
              : 'text-primary'
          "
          :class="step > 2 ? 'text-success' : null"
          :color="step === 2 ? 'primary' : step > 2 ? 'success' : null"
          icon="mdi-scale-balance"
          edit-icon="mdi-pencil"
          :editable="step === 2"
          :complete="step > 2"
          :error="
            (!disablePrivacyPolicy && !appStore.acceptPrivacyPolicy) ||
            (!disableTermsAndConditions && !appStore.acceptTermsAndConditions)
          "
        ></v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          :value="3"
          subtitle="Organization Information"
          selected-class="text-primary"
          :color="step === 3 ? 'primary' : null"
          icon="mdi-account-group"
          edit-icon="mdi-pencil"
          :editable="step === 3"
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
            title="Let's Get Started !!!"
            flat
            class="d-flex flex-column ga-5"
          >
            <p>
              In order to view your schedule, you will have to register with
              your organization. This information can be obtained from your
              office personal.
            </p>
            <v-btn
              class="mt-10"
              append-icon="mdi-arrow-right"
              @click="step++"
              color="primary"
              >next</v-btn
            >
          </v-card>
        </v-stepper-window-item>

        <!-- Step 2 -->
        <v-stepper-window-item :value="2">
          <v-card
            title="Policy & Conditions"
            flat
            class="d-flex flex-column ga-5"
          >
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
            <v-overlay
              persistent
              scroll-strategy="block"
              v-model="appStore.privacyPolicyOverlay"
              class="align-center justify-center"
              ><PrivacyPolicy
            /></v-overlay>
            <v-form ref="form" class="mt-5">
              <v-checkbox
                :disabled="disableTermsAndConditions"
                :rules="[(v) => !!v || 'You must agree to the Terms & !']"
                color="success"
                v-model="appStore.acceptTermsAndConditions"
                ><template v-slot:label>
                  <v-btn
                    class="active-btn"
                    variant="plain"
                    @click="
                      (appStore.termsAndConditionsOverlay = true),
                        (disableTermsAndConditions = false)
                    "
                    :color="appStore.acceptTermsAndConditions ? 'green' : null"
                    >Terms & Conditions</v-btn
                  ></template
                >
              </v-checkbox>
              <v-checkbox
                :disabled="disablePrivacyPolicy"
                :rules="[(v) => !!v || 'You must agree to the Terms & !']"
                color="success"
                v-model="appStore.acceptPrivacyPolicy"
                ><template v-slot:label>
                  <v-btn
                    class="active-btn"
                    variant="plain"
                    @click="
                      (appStore.privacyPolicyOverlay = true),
                        (disablePrivacyPolicy = false)
                    "
                    :color="appStore.acceptPrivacyPolicy ? 'green' : null"
                    >Privacy Policy</v-btn
                  ></template
                >
              </v-checkbox>
            </v-form>
            <div class="d-flex justify-space-between mt-5">
              <v-btn
                prepend-icon="mdi-arrow-left"
                @click="step--, resetlegal()"
                color="primary"
                width="120"
                >Previous</v-btn
              >
              <v-btn
                :disabled="
                  !(
                    appStore.acceptTermsAndConditions &&
                    appStore.acceptPrivacyPolicy
                  )
                "
                :color="
                  appStore.acceptTermsAndConditions &&
                  appStore.acceptPrivacyPolicy
                    ? 'success'
                    : 'primary'
                "
                append-icon="mdi-arrow-right"
                width="120"
                @click="step++"
                color="primary"
                >next</v-btn
              >
            </div>
          </v-card>
        </v-stepper-window-item>

        <!-- Step 3 -->
        <v-stepper-window-item :value="3">
          <v-card title="Organization Register" flat class="d-flex flex-column">
            <v-sheet eet class="w-100 w-md-66 mx-auto my-10">
              <v-form
                @submit="onSubmit"
                @submit.prevent
                class="d-flex flex-column"
              >
                <v-text-field
                  class="text-black"
                  density="comfortable"
                  prepend-inner-icon="mdi-card-account-details-outline"
                  color="primary"
                  v-model="organizationID"
                  label="Organization ID"
                  variant="underlined"
                ></v-text-field>

                <v-text-field
                  class="text-black"
                  density="comfortable"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="visible ? 'text' : 'password'"
                  color="primary"
                  v-model="organizationPassword"
                  label="Organization Password"
                  variant="underlined"
                  @click:append-inner="visible = !visible"
                ></v-text-field>

                <v-btn class="bg-primary text-body-2 mt-5" type="submit"
                  >Register</v-btn
                >
              </v-form>
            </v-sheet></v-card
          >
          <v-btn
            class="mt-10"
            prepend-icon="mdi-arrow-left"
            @click="step--, resetlegal()"
            color="primary"
            width="120"
            >Previous</v-btn
          >
        </v-stepper-window-item>
      </v-stepper-window>
      <!-- V Stepper Window End -->
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
  const disableTermsAndConditions = ref(true)
  const disablePrivacyPolicy = ref(true)

  const resetlegal = () => {
    appStore.acceptPrivacyPolicy = false
    appStore.acceptTermsAndConditions = false
  }
</script>

<style scoped>
  /* Ensure the button remains active even when the checkbox is disabled */
  .active-btn {
    pointer-events: auto;
  }
</style>
