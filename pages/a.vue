<template>
  <div>
    <v-file-input
      v-model="selectedFiles"
      width="370"
      label="New Schedule"
      chips
      multiple
      counter
      :class="[isError ? 'text-error' : 'text-primary']"
      show-size
      :rules="[fileRule]"
      prepend-icon="mdi-file-upload-outline"
      density="comfortable"
      variant="outlined"
    ></v-file-input>
    <v-btn @click="handleFileUpload" :disabled="!isFileValid" class="bg-primary"
      >Upload Schedule</v-btn
    >
    <div v-if="jsonData && jsonData.length">
      <h3>Converted JSON Data:</h3>
      <pre>{{ jsonData[1] }}</pre>
      <div>Week Ending: {{ weekEnding }}</div>
      <div>{{ dates }}</div>
      <button @click="copyToClipboard">Copy JSON Data</button>
      <p v-if="copySuccess" style="color: green">
        JSON data copied to clipboard!
      </p>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import csv from 'csvtojson'

  const selectedFiles = ref([]) // Store selected files
  const jsonData = ref([])
  const copySuccess = ref(false)
  const isError = ref(false)

  // **************************** Schedule Information Begin **************************************** //
  const weekEnding = ref('')
  const dates = ref([])
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const managers = ref([])

  // **************************** Schedule Information End **************************************** //

  // Validation rule for file input
  const fileRule = computed(() => {
    return (value) => {
      if (!value || !value.length) {
        isError.value = true // Set isError to true
        return 'Please select a file.' // Not empty
      }

      const isCSV = value.every((file) => file.name.endsWith('.csv')) // Check for CSV extension
      if (!isCSV) {
        isError.value = true // Set isError to true
        return 'Only CSV files are allowed.' // Error message for invalid file type
      }

      isError.value = false // Set isError to false if valid
      return true // Valid input
    }
  })

  // Computed property to check if the file is valid
  const isFileValid = computed(() => {
    const validationMessage = fileRule.value(selectedFiles.value)
    return validationMessage === true // Valid if no error message
  })

  // Function to read and convert CSV to JSON
  const readCSVFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const csvData = e.target.result
        try {
          const json = await csv().fromString(csvData)
          resolve(json)
        } catch (error) {
          reject(error)
        }
      }
      reader.readAsText(file)
    })
  }

  // Main function to handle file upload
  const handleFileUpload = async () => {
    const files = selectedFiles.value // Get all selected files
    if (files.length) {
      try {
        const allJsonData = await Promise.all(files.map(readCSVFile))
        jsonData.value = allJsonData.flat() // Flatten the array if multiple files are processed
        if (jsonData.value.length > 0) {
          weekEnding.value = jsonData.value[0].Column7
          dates.value = Object.values(jsonData.value[1]).filter((date) => date)
        }
      } catch (error) {
        console.error('Error converting CSV to JSON:', error)
      }
    } else {
      alert('Please upload a valid CSV file.')
    }
  }

  const copyToClipboard = async () => {
    if (jsonData.value.length) {
      try {
        await navigator.clipboard.writeText(
          JSON.stringify(jsonData.value, null, 2)
        )
        copySuccess.value = true
        setTimeout(() => {
          copySuccess.value = false // Reset the success message after a short delay
        }, 2000)
      } catch (error) {
        console.error('Failed to copy:', error)
      }
    }
  }
</script>

<style scoped>
  /* Add any required styles here */
  button {
    margin-top: 10px;
  }
</style>
