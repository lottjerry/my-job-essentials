<template>
  <div class="d-flex flex-column align-center h-screen justify-center bg-primary">
    <div v-if="!mobile">
      <v-card class="pa-5">
        <div class="d-flex flex-column align-center mb-5 justify-center">
          <h1 class="text-h3 mb-5 text-center">Work Essentials</h1>
          <Logo size="28" />
          <h2 class="align-self-center">Admin Sign up</h2>
        </div>
        <v-sheet class="w-100 w-md-75 mx-auto mt-10">
          <v-form @submit.prevent="submit" class="d-flex flex-column">
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

            <v-btn class="bg-primary text-body-2 mt-10" type="submit"
              >Sign Up</v-btn
            >
          </v-form>
        </v-sheet>
      </v-card>
    </div>
    <div v-else class="d-flex align-center h-screen justify-center">
      <h1 class="pa-5">Can only sign up for admin on desktop.</h1>
    </div>
  </div>
</template>

<script setup>
  import Swal from 'sweetalert2'
  import { useDisplay } from 'vuetify'
  import { doc, updateDoc } from 'firebase/firestore'
  import { signOut } from 'firebase/auth'

  definePageMeta({
    layout: 'auth-layout',
    middleware: ['auth'],
  })

  const { mobile } = useDisplay()
  const db = useFirestore()
  const user = useCurrentUser()
  const collectionName = 'users'
  const auth = useFirebaseAuth()

  const visible = ref(false)
  const password = ref('')
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD

  const logout = async () => {
    await signOut(auth)
    await navigateTo('/', { replace: true })
  }

  const submit = async () => {
    try {
      // Show loading alert
      Swal.fire({
        title: 'Checking password...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      // Simulated password verification logic
      if (password.value === adminPassword) {
        // Add Admin to Current User
        const docRef = doc(db, collectionName, user.value.uid)
        await updateDoc(docRef, {
          Admin: true,
        })

        Swal.fire({
          icon: 'success',
          title: 'You are now an admin!',
          text: 'Please sign back in for changes to take effect.',
          confirmButtonText: 'Sign Out',
        }).then(() => {
          // Run logout when the confirmation button is clicked
          logout()
        })
      } else {
        // Password does not match
        throw new Error('Invalid password')
      }
    } catch (error) {
      // Handle error (invalid password)
      Swal.fire({
        icon: 'error',
        title: 'Admin password is incorrect!',
      })
    }
  }
</script>
