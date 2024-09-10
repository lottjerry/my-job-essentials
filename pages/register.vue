<template>
  <div class="d-flex flex-column align-center justify-center border">
    <div class="d-flex align-center ga-16 justify-center">
      <div class="d-flex flex-column align-start">
        <h1 class="text-center">Work</h1>
        <h1 class="text-center">Essentials</h1>
      </div>

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
    <h2 class="align-self-start mt-5">Register</h2>
    <v-stepper :items="['Step 1', 'Step 2', 'Step 3']">
      <template v-slot:item.1>
        <v-card title="Step One" flat>...</v-card>
      </template>

      <template v-slot:item.2>
        <v-card title="Step Two" flat>...</v-card>
      </template>

      <template v-slot:item.3>
        <v-card title="Step Three" flat>...</v-card>
      </template>
    </v-stepper>
    <div class="text-body-2 d-flex ga-1">
      <p>Already have an account?</p>
      <NuxtLink to="/" class="font-weight-bold">Sign In</NuxtLink>
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
