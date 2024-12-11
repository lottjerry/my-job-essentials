<template>
  <div
    class="d-flex flex-column align-centerjustify-center pa-5 w-md-50 w-lg-25 mx-3 rounded-xl border bg-white"
  >
    <div class="d-flex flex-column align-center mb-5 justify-center">
      <h1 class="text-h3 mb-5 text-center">My Job Essentials</h1>
      <Logo size="28" />
    </div>

    <v-sheet eet class="w-100 w-md-75 mx-auto mt-2">
      <v-form @submit.prevent="submit" class="d-flex flex-column">
        <v-text-field
          class="text-black"
          density="comfortable"
          prepend-inner-icon="mdi-email-outline"
          color="primary"
          v-model="email"
          label="Email"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          class="text-black"
          density="comfortable"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          color="primary"
          v-model="password"
          label="Password"
          variant="underlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn class="bg-primary text-body-2 mt-5" type="submit">Sign In</v-btn>
      </v-form>
    </v-sheet>

    <div class="align-self-center my-3">
      <h5>OR</h5>
    </div>

    <v-btn
      @click="signInWithGoogle"
      class="text-body-2 w-100 w-md-75 align-self-center"
    >
      <Icon name="logos:google-icon" class="mr-3" />

      Continue with Google
    </v-btn>

    <div class="d-flex flex-column ga-5 align-self-center mt-10">
      <div class="font-weight-bold text-body-2">
        <NuxtLink to="/forgot-password">Forgot Password?</NuxtLink>
      </div>

      <div class="text-body-2 d-flex ga-1">
        <p>Don't have an account?</p>
        <NuxtLink to="/register" class="font-weight-bold"
          >Create account</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: ['already-logged-in'],
  })

  import Swal from 'sweetalert2'
  import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
  import { GoogleAuthProvider } from 'firebase/auth'

  const googleAuthProvider = new GoogleAuthProvider()
  const auth = useFirebaseAuth()

  const visible = ref(false)
  const email = ref('')
  const password = ref('')

  // Sign in with email and password
  const submit = async () => {
    try {
      // Show loading alert
      Swal.fire({
        title: 'We are signing you in...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      const { user } = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value,
      )

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Signed in successfully!',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        // Close the SweetAlert and redirect user
        navigateTo('/dashboard', { replace: true })
      })
    } catch (error) {
      console.log(error.message)
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: error.message,
      })
    }
  }

  // Sign In With Google
  const signInWithGoogle = async () => {
    // Show loading alert
    Swal.fire({
      title: 'We are signing you in...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })
    try {
      await signInWithPopup(auth, googleAuthProvider)
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Signed in successfully!',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        // Close the SweetAlert and redirect user
        navigateTo('/dashboard', { replace: true })
      })
    } catch (error) {
      console.log(error.message)
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: error.message,
      })
    }
  }
</script>
