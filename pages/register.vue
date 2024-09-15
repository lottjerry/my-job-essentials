<template>
  <div class="d-flex flex-column align-center mx-13 justify-center">
    <div class="d-flex align-center mb-2 justify-center">
      <h1 class="text-h4">Create Account</h1>
    </div>

    <v-sheet class="mx-auto mt-2" width="280">
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

    <v-btn class="text-body-2 w-100">
      <Icon name="logos:google-icon" class="mr-3" />

      Sign up with Google
    </v-btn>

    <div class="d-flex flex-column ga-5 align-self-start mt-10">
      <p class="font-weight-bold text-body-2">Forgot Password?</p>

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

  const { handleSubmit } = useForm({
    validationSchema: CreateAccountSchema,
  })

  const displayName = useField('displayName')
  const email = useField('email')
  const password = useField('password')
  const confirmPassword = useField('confirmPassword')

  const submit = handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2))
  })
</script>
