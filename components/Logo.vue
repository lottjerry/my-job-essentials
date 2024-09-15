<template>
  <div class="d-flex flex-column">
    <div class="d-flex justify-center">
      <Icon name="material-symbols:calendar-month-outline-sharp" :size="size" />
    </div>

    <div class="d-flex ga-10 justify-center">
      <Icon name="material-symbols:qr-code-scanner" :size="size" />

      <Icon name="material-symbols:barcode-scanner" :size="size" />
    </div>

    <div class="d-flex justify-center">
      <Icon name="material-symbols:barcode-reader-outline-sharp" :size="size" />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    size: {
      type: String,
      default: "24"
    }
  })
</script>
