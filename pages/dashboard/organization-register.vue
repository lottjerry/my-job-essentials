<template>
  <div class="h-screen">
    <v-stepper

      v-model="step"
      :items="['Start', 'Legal', 'Organization Info']"
      hide-actions
      class="mt-10 mx-3 h-75"
    >
      <!-- Step 1 -->
      <template v-slot:item.1>
        <v-card
          title="Let's Get Started !!!"
          flat
          class="d-flex flex-column ga-5"
        >
          <p>
            In order to view your schedule, you will have to register with your
            organization. This information can be obtained from your office
            personal.
          </p>
          <v-btn
            class="mt-10"
            append-icon="mdi-arrow-right"
            @click="step++"
            color="primary"
            >next</v-btn
          >
        </v-card>
      </template>

      <!-- Step 2 -->
      <template v-slot:item.2>
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
      </template>

      <!-- Step 3 -->
      <template v-slot:item.3>
        <v-card title="Organization Register" flat class="d-flex flex-column">
          <v-sheet eet class="mx-auto my-10" width="280">
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
