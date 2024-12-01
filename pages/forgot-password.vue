<template>
  <div
    class="d-flex flex-column align-centerjustify-center pa-5 w-md-50 w-lg-25 mx-3 rounded-xl border bg-white"
  >
    <div class="d-flex flex-column align-center mb-5 justify-center">
      <h1 class="mb-5 text-center">Forgot Password</h1>
      <h3>Let us help you sign in to your account.</h3>
    </div>

    <v-sheet @submit.prevent="submit" class="w-100 w-md-75 mx-auto mt-2">
      <form class="d-flex flex-column">
        <v-text-field
          class="text-black"
          density="comfortable"
          prepend-inner-icon="mdi-email-outline"
          color="primary"
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          label="Email"
          variant="outlined"
        ></v-text-field>
        <v-btn class="bg-primary text-body-2 mt-5" type="submit"
          >Send instructions</v-btn
        >
      </form>
    </v-sheet>
    <div class="align-self-center my-3">
      <h5>OR</h5>
    </div>
    <v-btn class="text-body-2 w-100 w-md-75 align-self-center">
      <NuxtLink class="text-decoration-none text-black" to="/"
        >Go to sign in</NuxtLink
      >
    </v-btn>
  </div>
</template>

<script setup>
  import Swal from 'sweetalert2'
  import { sendPasswordResetEmail } from 'firebase/auth'
  import { useField, useForm } from 'vee-validate'

  definePageMeta({
    middleware: ['already-logged-in'],
  })

  // get auth instance
  const auth = useFirebaseAuth()

  const { handleSubmit } = useForm({
    validationSchema: ForgotPasswordSchema,
  })

  const email = useField('email')

  // Send Password Reset Email
  const submit = handleSubmit(async (values) => {
    try {
      // Show loading alert
      Swal.fire({
        title: 'We are sending the instructions to your email...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      await sendPasswordResetEmail(auth, values.email, {
        url: 'http://localhost:3000',
      })

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Please check your email!',
        subtitle: 'We have sent you instructions to reset your password.',
        timer: 2500,
        showConfirmButton: false,
      }).then(() => {
        // Close the SweetAlert and redirect user
        navigateTo('/', { replace: true })
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
