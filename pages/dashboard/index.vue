<template>
  <div>
    <MobileSchedule v-if="sm" />
    <DesktopSchedule v-else />
  </div>
</template>
<script setup>
  import { useDisplay } from 'vuetify'

  definePageMeta({
    layout: 'auth-layout',
    middleware: ['auth'],
  })

  const { sm } = useDisplay()
</script>
