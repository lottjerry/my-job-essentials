<template>
  <div>
    <v-carousel
      class="bg-primary"
      height="850"
      show-arrows="hover"
      hide-delimiter-background
    >
      <!-- ------ Previous Week ------ -->
      <v-carousel-item :key="previousWeekKey" class="pa-5">
        <v-card class="pa-5 d-flex flex-column align-center justify-center">
          <v-file-input
            v-model="previousWeekFiles"
            width="370"
            label="New Schedule"
            chips
            multiple
            counter
            :class="[isPreviousError ? 'text-error' : 'text-primary']"
            show-size
            :rules="[previousFileRule]"
            prepend-icon="mdi-file-upload-outline"
            density="comfortable"
            variant="outlined"
          ></v-file-input>
          <div class="d-flex ga-5">
            <v-btn
              @click="previousWeekUpload"
              :disabled="!isPreviousWeekFileValid"
              class="bg-primary"
              >Upload Schedule</v-btn
            >
            <v-btn class="bg-error" @click="deletePreviousSchedule"
              >Delete Schedule</v-btn
            >
          </div>
        </v-card>
        <h1>Previous Week</h1>
        <div class="d-flex justify-center">
          <v-card class="pa-10">
            <v-data-table-virtual
              class="setMinWidth w-auto"
              :items="appStore.previousSchedule"
              height="500"
            ></v-data-table-virtual>
          </v-card>
        </div>
      </v-carousel-item>
      <!-- ------ Current Week ------ -->
      <v-carousel-item :key="currentWeekKey" class="pa-5">
        <v-card class="pa-5 d-flex flex-column align-center justify-center">
          <v-file-input
            v-model="currentWeekFiles"
            width="370"
            label="New Schedule"
            chips
            multiple
            counter
            :class="[isCurrentError ? 'text-error' : 'text-primary']"
            show-size
            :rules="[currentFileRule]"
            prepend-icon="mdi-file-upload-outline"
            density="comfortable"
            variant="outlined"
          ></v-file-input>
          <div class="d-flex ga-5">
            <v-btn
              @click="currentWeekUpload"
              :disabled="!isCurrentWeekFileValid"
              class="bg-primary"
              >Upload Schedule</v-btn
            >
            <v-btn class="bg-error" @click="deleteCurrentSchedule"
              >Delete Schedule</v-btn
            >
          </div>
        </v-card>
        <h1>Current Week</h1>
        <div>
          <v-card class="pa-10">
            <v-data-table-virtual
              class="setMinWidth w-auto"
              :items="appStore.currentSchedule"
              height="500"
            ></v-data-table-virtual>
          </v-card>
        </div>
      </v-carousel-item>
      <!-- ------ Next Week ------ -->
      <v-carousel-item :key="nextWeekKey" class="pa-5">
        <v-card class="pa-5 d-flex flex-column align-center justify-center">
          <v-file-input
            v-model="nextWeekFiles"
            width="370"
            label="New Schedule"
            chips
            multiple
            counter
            :class="[isNextError ? 'text-error' : 'text-primary']"
            show-size
            :rules="[nextFileRule]"
            prepend-icon="mdi-file-upload-outline"
            density="comfortable"
            variant="outlined"
          ></v-file-input>
          <div class="d-flex ga-5">
            <v-btn
              @click="nextWeekUpload"
              :disabled="!isNextWeekFileValid"
              class="bg-primary"
              >Upload Schedule</v-btn
            >
            <v-btn class="bg-error" @click="deleteNextSchedule"
              >Delete Schedule</v-btn
            >
          </div>
        </v-card>
        <h1>Next Week</h1>
        <div>
          <v-card class="pa-10">
            <v-data-table-virtual
              class="setMinWidth w-auto"
              :items="appStore.nextSchedule"
              height="500"
            ></v-data-table-virtual>
          </v-card>
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: 'auth-layout',
  })

  import { ref, computed } from 'vue'
  import csv from 'csvtojson'
  import { useAppStore } from '~/stores/appStore'

  const previousWeekFiles = ref([])
  const currentWeekFiles = ref([])
  const nextWeekFiles = ref([]) // Store selected files
  const isPreviousError = ref(false)
  const isCurrentError = ref(false)
  const isNextError = ref(false)
  const appStore = useAppStore()

  // Reactive keys for carousel items
  const previousWeekKey = ref(0)
  const currentWeekKey = ref(0)
  const nextWeekKey = ref(0)

  // Validation rules for file input and computed properties
  const previousFileRule = computed(() => (value) => {
    if (!value || !value.length) {
      isPreviousError.value = true
      return 'Please select a file.'
    }
    const isCSV = value.every((file) => file.name.endsWith('.csv'))
    isPreviousError.value = !isCSV
    return isCSV ? true : 'Only CSV files are allowed.'
  })

  const currentFileRule = computed(() => (value) => {
    if (!value || !value.length) {
      isCurrentError.value = true
      return 'Please select a file.'
    }
    const isCSV = value.every((file) => file.name.endsWith('.csv'))
    isCurrentError.value = !isCSV
    return isCSV ? true : 'Only CSV files are allowed.'
  })

  const nextFileRule = computed(() => (value) => {
    if (!value || !value.length) {
      isNextError.value = true
      return 'Please select a file.'
    }
    const isCSV = value.every((file) => file.name.endsWith('.csv'))
    isNextError.value = !isCSV
    return isCSV ? true : 'Only CSV files are allowed.'
  })

  const isPreviousWeekFileValid = computed(
    () => previousFileRule.value(previousWeekFiles.value) === true,
  )
  const isCurrentWeekFileValid = computed(
    () => currentFileRule.value(currentWeekFiles.value) === true,
  )
  const isNextWeekFileValid = computed(
    () => nextFileRule.value(nextWeekFiles.value) === true,
  )

  // File upload and deletion functions with key updates
  const deletePreviousSchedule = () => {
    appStore.previousSchedule = []
    previousWeekKey.value-- // Update key to rerender
  }
  const deleteCurrentSchedule = () => {
    appStore.currentSchedule = []
    currentWeekKey.value-- // Update key to rerender
  }
  const deleteNextSchedule = () => {
    appStore.nextSchedule = []
    nextWeekKey.value-- // Update key to rerender
  }

  const previousWeekUpload = async () => {
    if (previousWeekFiles.value.length) {
      try {
        const allJsonData = await Promise.all(
          previousWeekFiles.value.map(readCSVFile),
        )
        appStore.previousSchedule = allJsonData.flat()
        previousWeekKey.value++ // Update key to rerender
      } catch (error) {
        console.error('Error converting CSV to JSON:', error)
      }
    } else {
      alert('Please upload a valid CSV file.')
    }
  }

  const currentWeekUpload = async () => {
    if (currentWeekFiles.value.length) {
      try {
        const allJsonData = await Promise.all(
          currentWeekFiles.value.map(readCSVFile),
        )
        appStore.currentSchedule = allJsonData.flat()
        currentWeekKey.value++ // Update key to rerender
      } catch (error) {
        console.error('Error converting CSV to JSON:', error)
      }
    } else {
      alert('Please upload a valid CSV file.')
    }
  }

  const nextWeekUpload = async () => {
    if (nextWeekFiles.value.length) {
      try {
        const allJsonData = await Promise.all(
          nextWeekFiles.value.map(readCSVFile),
        )
        appStore.nextSchedule = allJsonData.flat()
        nextWeekKey.value++ // Update key to rerender
      } catch (error) {
        console.error('Error converting CSV to JSON:', error)
      }
    } else {
      alert('Please upload a valid CSV file.')
    }
  }

  const readCSVFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const json = await csv().fromString(e.target.result)
          resolve(json)
        } catch (error) {
          reject(error)
        }
      }
      reader.readAsText(file)
    })
  }
</script>

<style>
  .setMinWidth {
    min-width: 1550px;
  }
</style>
