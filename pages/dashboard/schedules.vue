<template>
  <div>
    <AdminSchedules v-if="lgAndUp" />
    <div v-else class="h-screen d-flex justify-center align-center">
      <h1 class="pa-5">Can only edit schedules on desktop.</h1>
    </div>
  </div>
</template>

<script setup>
  import { useDisplay } from 'vuetify'

    definePageMeta({
    layout: 'auth-layout',
    middleware: ['auth'],
  })

  const { lgAndUp } = useDisplay()
</script>
