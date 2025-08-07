<template>

    <v-stepper
      v-model="step"
      hide-actions
      class="h-75 w-100 w-md-75 w-lg-50 custom-overflow"
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
            <v-sheet class="w-100 w-md-66 mx-auto my-10">
              <form @submit.prevent="submit" class="d-flex flex-column">
                <v-text-field
                  class="text-black"
                  density="comfortable"
                  prepend-inner-icon="mdi-pencil-circle-outline"
                  color="primary"
                  v-model="scheduleName.value.value"
                  :error-messages="scheduleName.errorMessage.value"
                  label="Schedule Name"
                  variant="underlined"
                ></v-text-field>
                <v-select
                  v-model="department.value.value"
                  :error-messages="department.errorMessage.value"
                  variant="underlined"
                  density="comfortable"
                  chips
                  clearable
                  prepend-inner-icon="mdi-account-group-outline"
                  label="Department"
                  :items="['Grocery', 'Bakery', 'Deli', 'Meat', 'Produce']"
                ></v-select>
                <v-text-field
                  class="text-black"
                  v-model="organizationID.value.value"
                  :error-messages="organizationID.errorMessage.value"
                  density="comfortable"
                  prepend-inner-icon="mdi-card-account-details-outline"
                  color="primary"
                  label="Organization ID"
                  variant="underlined"
                ></v-text-field>

                <v-text-field
                  class="text-black"
                  v-model="organizationPasword.value.value"
                  :error-messages="organizationPasword.errorMessage.value"
                  density="comfortable"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="visible ? 'text' : 'password'"
                  color="primary"
                  label="Organization Password"
                  variant="underlined"
                  @click:append-inner="visible = !visible"
                ></v-text-field>

                <v-btn class="bg-primary text-body-2 mt-5" type="submit"
                  >Register</v-btn
                >
              </form>
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

</template>

<script setup>
  import { useAppStore } from '~/stores/appStore'
  import Swal from 'sweetalert2'
  import { useField, useForm } from 'vee-validate'
  import { doc, setDoc } from 'firebase/firestore'
  import { reloadNuxtApp } from 'nuxt/app'

  definePageMeta({
    layout: 'auth-layout',
  })

  const user = useCurrentUser()
  const db = useFirestore()
  const collectionName = 'users'

  const organizationIDENV = import.meta.env.VITE_ORGANIZATION_ID
  const organizationPasswordENV = import.meta.env.VITE_ORGANIZATION_PASSWORD

  const { handleSubmit } = useForm({
    validationSchema: OrganizationRegistrationSchema(
      organizationIDENV,
      organizationPasswordENV,
    ),
  })

  const scheduleName = useField('scheduleName')
  const department = useField('department')
  const organizationID = useField('organizationID')
  const organizationPasword = useField('organizationPassword')

  const step = ref(1) // Current step in the stepper
  const appStore = useAppStore()
  const disableTermsAndConditions = ref(true)
  const disablePrivacyPolicy = ref(true)

  const resetlegal = () => {
    appStore.acceptPrivacyPolicy = false
    appStore.acceptTermsAndConditions = false
  }

  const submit = handleSubmit(async (values) => {
    try {
      // Show loading alert
      Swal.fire({
        title: 'Updating Organization Info...',
        text: 'Please wait while we register your organization.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })
      //Update User Data to FireStore
      const docRef = doc(db, collectionName, user.value.uid)
      await setDoc(docRef, {
        ScheduleName: values.scheduleName.toUpperCase().trim(),
        Department: values.department,
        OrganizationID: values.organizationID,
        acceptedPrivacyPolicy: appStore.acceptPrivacyPolicy,
        acceptedTermsAndConditions: appStore.acceptTermsAndConditions,
      })

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Organization Registered!',
        text: 'Your organization has been successfully registered.',
        timer: 2500,
        showConfirmButton: false,
      }).then(() => {
        // Close the SweetAlert and redirect user
        // navigateTo('/my-account', { replace: true })
        reloadNuxtApp({
          path: '/dashboard',
          ttl: 1000, // default 10000
        })
      })
    } catch (error) {
      console.log(error.message)
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: error.message,
      })
    }
  })
</script>

<style scoped>
  /* Ensure the button remains active even when the checkbox is disabled */
  .active-btn {
    pointer-events: auto;
  }

  .custom-overflow {
    overflow-y: auto !important;
  }
</style>
