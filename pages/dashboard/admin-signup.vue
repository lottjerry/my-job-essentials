<template>
  <div
    class="d-flex flex-column align-centerjustify-center pa-5 w-md-50 w-lg-25 mx-3 rounded-xl border bg-white"
  >
    <div class="d-flex flex-column align-center mb-5 justify-center">
      <h1 class="text-h3 mb-5 text-center">Work Essentials</h1>
      <Logo size="28" />
    </div>
    <h2 class="align-self-center">Admin Sign up</h2>
    <v-sheet eet class="w-100 w-md-75 mx-auto mt-10">
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
  </div>
</template>

<script setup>

  import Swal from 'sweetalert2'
  import { doc, updateDoc  } from 'firebase/firestore'

  const db = useFirestore()
  const user = useCurrentUser()
  const collectionName = 'users'

  const visible = ref(false)
  const password = ref('')
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD

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

        // Success case: Password matches
        await Swal.fire({
          icon: 'success',
          title: 'You are now an admin!',
          timer: 1500,
          showConfirmButton: false,
        })

        // Redirect the user
        navigateTo('/dashboard/admin-schedules', { replace: true })
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
