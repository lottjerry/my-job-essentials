<template>
  <div
    class="d-flex flex-column align-center pa-5 w-md-50 w-lg-25 w-100 mx-3 justify-center rounded-xl border bg-white"
  >
    <div class="d-flex align-center mb-2 justify-center">
      <h1 class="text-h4">Create Account</h1>
    </div>

    <v-sheet class="w-100 w-md-75 mx-auto mt-2">
      <form @submit.prevent="submit" class="d-flex flex-column ga-3">
        <v-text-field
          class="text-black"
          density="comfortable"
          prepend-inner-icon="mdi-account-outline"
          color="primary"
          v-model="displayName.value.value"
          :error-messages="displayName.errorMessage.value"
          label="Display Name"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          class="text-black"
          density="comfortable"
          prepend-inner-icon="mdi-email-outline"
          color="primary"
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          label="Email"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          class="text-black"
          density="comfortable"
          prepend-inner-icon="mdi-lock-outline"
          type="password"
          color="primary"
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"
          label="Password"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          class="text-black"
          density="comfortable"
          prepend-inner-icon="mdi-lock-outline"
          type="password"
          color="primary"
          v-model="confirmPassword.value.value"
          :error-messages="confirmPassword.errorMessage.value"
          label="Confirm Password"
          variant="underlined"
        ></v-text-field>

        <v-btn class="bg-primary text-body-2 mt-5" type="submit"
          >Create account</v-btn
        >
      </form>
    </v-sheet>

    <div class="my-3">
      <h5>OR</h5>
    </div>

    <v-btn
      @click="signUpWithGoogle"
      class="text-body-2 w-100 w-md-75 align-self-center"
    >
      <Icon name="logos:google-icon" class="mr-3" />

      Sign up with Google
    </v-btn>

    <div class="d-flex flex-column ga-5 align-self-center mt-10">
      <div class="text-body-2 d-flex ga-1">
        <p>Already have an account?</p>
        <NuxtLink to="/" class="font-weight-bold">Sign In</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
  // import Swal from 'sweetalert2'
  import { useField, useForm } from 'vee-validate'
  import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithPopup,
  } from 'firebase/auth'
  import { GoogleAuthProvider } from 'firebase/auth'
  import Swal from 'sweetalert2'
  import { doc, setDoc } from 'firebase/firestore'

  definePageMeta({
    middleware: ['already-logged-in'],
  })

  const { handleSubmit } = useForm({
    validationSchema: CreateAccountSchema,
  })

  const displayName = useField('displayName')
  const email = useField('email')
  const password = useField('password')
  const confirmPassword = useField('confirmPassword')
  const googleAuthProvider = new GoogleAuthProvider()

  const auth = useFirebaseAuth()
  const db = useFirestore()
  const collectionName = 'users'

  // Sign up with email and password
  const submit = handleSubmit(async (values) => {
    try {
      // Show loading alert
      Swal.fire({
        title: 'Creating Account...',
        text: 'Please wait while we create your account',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      // Create User
      const { user } = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      )
      // Update User Display Name
      await updateProfile(user, { displayName: values.displayName })

      // Add User Data to FireStore
      const docRef = doc(db, collectionName, user.uid)
      await setDoc(docRef, {
        OrganizationID: null,
      })

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Account Created!',
        text: 'Your account was successfully created.',
        timer: 2500,
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
  })

  // Sign up with Google
  const signUpWithGoogle = async () => {
    // Show loading alert
    Swal.fire({
      title: 'Creating Account...',
      text: 'Please wait while we create your account',
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
        title: 'Account Created!',
        text: 'Your account was successfully created.',
        timer: 2500,
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
