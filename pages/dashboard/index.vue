<template>
  <div>
    <MobileSchedule v-if="mobile" />
    <DesktopSchedule else />
  </div>
</template>
<script setup>
  import { useDisplay } from 'vuetify'

  definePageMeta({
    layout: 'auth-layout',
    middleware: ['auth'],
  })

  const { mobile } = useDisplay()
</script>
