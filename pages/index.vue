<template>
  <div class="d-flex flex-column align-center mx-13 justify-center">
    <div class="d-flex flex-column align-center justify-center mb-5">
      <h1 class="text-h3 text-center mb-5">Work Essentials</h1>

      <div class="d-flex flex-column">
        <div class="d-flex justify-center">
          <Icon
            name="material-symbols:calendar-month-outline-sharp"
            size="28"
          />
        </div>

        <div class="d-flex ga-10 justify-center">
          <Icon name="material-symbols:qr-code-scanner" size="28" />

          <Icon name="material-symbols:barcode-scanner" size="28" />
        </div>

        <div class="d-flex justify-center">
          <Icon
            name="material-symbols:barcode-reader-outline-sharp"
            size="28"
          />
        </div>
      </div>
    </div>

    <v-sheet class="w-100 mx-auto mt-2">
      <v-form @submit="onSubmit" @submit.prevent class="d-flex flex-column">
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

        <v-btn class="bg-primary text-body-2 mt-5" type="submit">Log In</v-btn>
      </v-form>
    </v-sheet>

    <div class="my-3">
      <h5>OR</h5>
    </div>

    <v-btn class="text-body-2 w-100">
      <Icon name="logos:google-icon" class="mr-3" />

      Continue with Google
    </v-btn>

    <div class="d-flex flex-column ga-5 mt-10">
      <p class="font-weight-bold text-body-2">Forgot Password?</p>

      <div class="text-body-2 d-flex ga-1">
        <p>Don't have an account?</p>

        <p class="font-weight-bold">Create account</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Swal from 'sweetalert2'

  const visible = ref(false)

  const email = ref('')

  const password = ref('')

  const onSubmit = (values) => {
    // display form values on success

    Swal.fire({
      title: 'Success !!!',

      text: `Email: ${email.value} Password: ${password.value}`,

      icon: 'success',
    })
  }
</script>
