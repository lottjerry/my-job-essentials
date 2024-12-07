<template>
  <div class="d-flex flex-column align-center text-h5 justify-center">
    <h1 class="mt-5">New Schedule</h1>
    <v-card
      class="pa-5 d-flex flex-column align-center justify-center"
      :title="`WeekEnding: ${week}`"
    >
      <v-file-input
        width="500"
        @change="handleFileChange"
        clearable
        label="New Schedule"
        variant="outlined"
      ></v-file-input>
      <v-btn
        append-icon="mdi-calendar-import"
        @click="
          uploadSchedules(
            grocerySchedule,
            bakerySchedule,
            deliSchedule,
            meatSchedule,
            produceSchedule,
          )
        "
        color="primary"
        >Upload Schedule</v-btn
      >
      <v-btn class="mt-5" @click="store.toggleNewScheduleOverlay" color="error"
        >Close</v-btn
      >
      <v-data-table-virtual
        v-if="parsedData"
        class="setMinWidth w-auto"
        :items="parsedData"
        height="500"
        fixed-header=""
      ></v-data-table-virtual>
    </v-card>
  </div>
</template>

<script setup>
  import Papa from 'papaparse'
  import { collection, setDoc, doc } from 'firebase/firestore'
  import Swal from 'sweetalert2'
  import { useAppStore } from '#imports'

  const store = useAppStore()
  const parsedData = ref(null)
  const grocery = ref(null)
  const grocerySchedule = ref(null)
  const bakery = ref(null)
  const bakerySchedule = ref(null)
  const deli = ref(null)
  const deliSchedule = ref(null)
  const meat = ref(null)
  const meatSchedule = ref(null)
  const produce = ref(null)
  const produceSchedule = ref(null)
  const weekEnding = ref('None')
  const week = ref('none')

  const db = useFirestore()

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        parsedData.value = result.data
      },
      error: (error) => {
        console.error('Error parsing CSV:', error)
      },
    })
  }

  const addCollectionInfo = async (collectionName, department) => {
    const collectionRef = collection(db, 'ScheduleInfo')
    try {
      const docRef = doc(collectionRef, collectionName)
      await setDoc(docRef, {
        name: collectionName,
        weekEnding: week.value,
        department: department,
      })
    } catch (error) {
      console.error('Error adding collection name:', error)
    }
  }

  const filterDepartments = async (newValue) => {
    weekEnding.value = newValue[0].Column7.replace(/\//g, '.')
    week.value = newValue[0].Column7
    grocery.value = newValue.filter(
      (employee, index) =>
        (employee.Column1 || employee.Column2) && index > 2 && index < 44,
    )
    bakery.value = newValue.filter(
      (employee, index) => index > 45 && index < 53,
    )
    deli.value = newValue.filter((employee, index) => index > 53 && index < 62)
    meat.value = newValue.filter((employee, index) => index > 62 && index < 70)
    produce.value = newValue.filter(
      (employee, index) => index > 70 && index < 75,
    )
  }

  const mapDepartmentSchedules = async (
    grocery,
    bakery,
    deli,
    meat,
    produce,
  ) => {
    grocerySchedule.value = grocery.map((employee, index) => {
      let schedule = {
        Name: employee.Column1.toUpperCase(),
        Sunday: employee.Column2,
        Monday: employee.Column3,
        Tuesday: employee.Column4,
        Wednesday: employee.Column5,
        Thursday: employee.Column6,
        Friday: employee.Column7,
        Saturday: employee.Column8,
        Hours: employee.Column9,
        Department: 'Grocery',
      }
      if (employee.Column10) {
        schedule.Total_Hours = employee.Column10
      }

      return schedule
    })

    bakerySchedule.value = bakery.map((employee, index) => {
      let schedule = {
        Name: employee.Column1.toUpperCase(),
        Sunday: employee.Column2,
        Monday: employee.Column3,
        Tuesday: employee.Column4,
        Wednesday: employee.Column5,
        Thursday: employee.Column6,
        Friday: employee.Column7,
        Saturday: employee.Column8,
        Hours: employee.Column9,
        Department: 'Bakery',
      }

      return schedule
    })

    deliSchedule.value = deli.map((employee, index) => {
      let schedule = {
        Name: employee.Column1.toUpperCase(),
        Sunday: employee.Column2,
        Monday: employee.Column3,
        Tuesday: employee.Column4,
        Wednesday: employee.Column5,
        Thursday: employee.Column6,
        Friday: employee.Column7,
        Saturday: employee.Column8,
        Hours: employee.Column9,
        Department: 'Deli',
      }

      return schedule
    })

    meatSchedule.value = meat.map((employee, index) => {
      let schedule = {
        Name: employee.Column1.toUpperCase(),
        Sunday: employee.Column2,
        Monday: employee.Column3,
        Tuesday: employee.Column4,
        Wednesday: employee.Column5,
        Thursday: employee.Column6,
        Friday: employee.Column7,
        Saturday: employee.Column8,
        Hours: employee.Column9,
        Department: 'Meat',
      }

      if (!employee.Column1) {
        schedule.Total_Hours = employee.Column10
      }

      return schedule
    })

    produceSchedule.value = produce.map((employee, index) => {
      let schedule = {
        Name: employee.Column1.toUpperCase(),
        Sunday: employee.Column2,
        Monday: employee.Column3,
        Tuesday: employee.Column4,
        Wednesday: employee.Column5,
        Thursday: employee.Column6,
        Friday: employee.Column7,
        Saturday: employee.Column8,
        Hours: employee.Column9,
        Department: 'Bakery',
      }

      if (employee.Column1 === 'ANN') {
        schedule.Total_Hours = employee.Column10
      }

      return schedule
    })
  }

  // Upload Schedules
  const uploadSchedules = async (
    grocerySchedule,
    bakerySchedule,
    deliSchedule,
    meatSchedule,
    produceSchedule,
  ) => {
    // Grocery Collection and Ref
    const collectionGroceryName = 'Grocery_' + weekEnding.value
    const GroceryRef = collection(db, collectionGroceryName)
    // Bakery Collection and Ref
    const collectionBakeryName = 'Bakery_' + weekEnding.value
    const BakeryRef = collection(db, collectionBakeryName)
    // Deli Collection and Ref
    const collectionDeliName = 'Deli_' + weekEnding.value
    const DeliRef = collection(db, collectionDeliName)
    // Meat Collection and Ref
    const collectionMeatName = 'Meat_' + weekEnding.value
    const MeatRef = collection(db, collectionMeatName)
    // Produce Collection and Ref
    const collectionProduceName = 'Produce_' + weekEnding.value
    const ProduceRef = collection(db, collectionProduceName)
    // Show loading alert
    Swal.fire({
      title: 'Uploading Schedules...',
      text: 'Please wait while we upload your store schedules.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })
    try {
      // Grocery setDoc
      await addCollectionInfo(collectionGroceryName, 'Grocery')
      for (const employee of grocerySchedule) {
        const customId = employee.Name || `custom-id-${Date.now()}`
        const docRef = doc(GroceryRef, customId)
        await setDoc(docRef, employee)
      }
      // Bakery setDoc
      await addCollectionInfo(collectionBakeryName, 'Bakery')
      for (const employee of bakerySchedule) {
        const customId = employee.Name || `custom-id-${Date.now()}`
        const docRef = doc(BakeryRef, customId)
        await setDoc(docRef, employee)
      }
      // Deli setDoc
      await addCollectionInfo(collectionDeliName, 'Deli')
      for (const employee of deliSchedule) {
        const customId = employee.Name || `custom-id-${Date.now()}`
        const docRef = doc(DeliRef, customId)
        await setDoc(docRef, employee)
      }
      // Meat setDoc
      await addCollectionInfo(collectionMeatName, 'Meat')
      for (const employee of meatSchedule) {
        const customId = employee.Name || `custom-id-${Date.now()}`
        const docRef = doc(MeatRef, customId)
        await setDoc(docRef, employee)
      }
      // Produce setDoc
      await addCollectionInfo(collectionProduceName, 'Produce')
      for (const employee of produceSchedule) {
        const customId = employee.Name || `custom-id-${Date.now()}`
        const docRef = doc(ProduceRef, customId)
        await setDoc(docRef, employee)
      }
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Schedules Uploaded!',
        text: 'Your store schedules was successfully uploaded.',
        timer: 2500,
        showConfirmButton: false,
      }).then(() => {
        store.toggleNewScheduleOverlay()
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: error.message,
      })
    }
  }

  watch(parsedData, async (newValue) => {
    await filterDepartments(newValue)
    await mapDepartmentSchedules(
      grocery.value,
      bakery.value,
      deli.value,
      meat.value,
      produce.value,
    )
  })
</script>
