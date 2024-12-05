<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <v-card
      :title="`WeekEnding: ${weekEnding}`"
      v-if="parsedData"
      class="pa-10"
    >
      <v-data-table-virtual
        class="setMinWidth w-auto"
        :items="parsedData"
        height="500"
        fixed-header=""
      ></v-data-table-virtual>
    </v-card>
    <v-btn
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
      >Upload Data</v-btn
    >
  </div>
</template>

<script setup>
  import Papa from 'papaparse'
  import { collection, setDoc, doc } from 'firebase/firestore'
  import Swal from 'sweetalert2'

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
  const weekEnding = ref(null)
  const dates = ref(null)
  const dateKeys = ref(null)

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

  const filterDepartments = async (newValue) => {
    weekEnding.value = newValue[0].Column7.replace(/\//g, '.')
    dates.value = newValue.filter((date, index) => index === 1)
    grocery.value = newValue.filter(
      (employee, index) =>
        (employee.Column1 || employee.Column2) && index > 2 && index < 44,
    )
    bakery.value = newValue.filter(
      (employee, index) => index > 45 && index < 53,
    )
    deli.value = newValue.filter((employee, index) => index > 53 && index < 62)
    meat.value = newValue.filter((employee, index) => index > 62 && index < 70)
    produce.value = newValue.filter((employee, index) => index > 70)
  }

  const getDateKeys = async (dates) => {
    dateKeys.value = dates.map((date) => {
      return {
        Sunday: 'Sunday ' + date.Column2,
        Monday: 'Monday ' + date.Column3,
        Tuesday: 'Tuesday ' + date.Column4,
        Wednesday: 'Wednesday ' + date.Column5,
        Thursday: 'Thursday ' + date.Column6,
        Friday: 'Friday ' + date.Column7,
        Saturday: 'Saturday ' + date.Column8,
      }
    })
  }

  const mapDepartmentSchedules = async (
    grocery,
    bakery,
    deli,
    meat,
    produce,
    dateKeys,
  ) => {
    grocerySchedule.value = grocery.map((employee, index) => {
      let schedule = {
        Name: employee.Column1.toUpperCase(),
        [dateKeys[0].Sunday]: employee.Column2,
        [dateKeys[0].Monday]: employee.Column3,
        [dateKeys[0].Tuesday]: employee.Column4,
        [dateKeys[0].Wednesday]: employee.Column5,
        [dateKeys[0].Thursday]: employee.Column6,
        [dateKeys[0].Friday]: employee.Column7,
        [dateKeys[0].Saturday]: employee.Column8,
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
        [dateKeys[0].Sunday]: employee.Column2,
        [dateKeys[0].Monday]: employee.Column3,
        [dateKeys[0].Tuesday]: employee.Column4,
        [dateKeys[0].Wednesday]: employee.Column5,
        [dateKeys[0].Thursday]: employee.Column6,
        [dateKeys[0].Friday]: employee.Column7,
        [dateKeys[0].Saturday]: employee.Column8,
        Hours: employee.Column9,
        Department: 'Bakery',
      }

      return schedule
    })

    deliSchedule.value = deli.map((employee, index) => {
      let schedule = {
        Name: employee.Column1.toUpperCase(),
        [dateKeys[0].Sunday]: employee.Column2,
        [dateKeys[0].Monday]: employee.Column3,
        [dateKeys[0].Tuesday]: employee.Column4,
        [dateKeys[0].Wednesday]: employee.Column5,
        [dateKeys[0].Thursday]: employee.Column6,
        [dateKeys[0].Friday]: employee.Column7,
        [dateKeys[0].Saturday]: employee.Column8,
        Hours: employee.Column9,
        Department: 'Deli',
      }
      
      return schedule
    })

    meatSchedule.value = meat.map((employee, index) => {
      let schedule = {
        Name: employee.Column1.toUpperCase(),
        [dateKeys[0].Sunday]: employee.Column2,
        [dateKeys[0].Monday]: employee.Column3,
        [dateKeys[0].Tuesday]: employee.Column4,
        [dateKeys[0].Wednesday]: employee.Column5,
        [dateKeys[0].Thursday]: employee.Column6,
        [dateKeys[0].Friday]: employee.Column7,
        [dateKeys[0].Saturday]: employee.Column8,
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
        [dateKeys[0].Sunday]: employee.Column2,
        [dateKeys[0].Monday]: employee.Column3,
        [dateKeys[0].Tuesday]: employee.Column4,
        [dateKeys[0].Wednesday]: employee.Column5,
        [dateKeys[0].Thursday]: employee.Column6,
        [dateKeys[0].Friday]: employee.Column7,
        [dateKeys[0].Saturday]: employee.Column8,
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
      for (const employee of grocerySchedule) {
        const customId = employee.Name || `custom-id-${Date.now()}`
        const docRef = doc(GroceryRef, customId)
        await setDoc(docRef, employee)
      }
      // Bakery setDoc
      for (const employee of bakerySchedule) {
        const customId = employee.Name || `custom-id-${Date.now()}`
        const docRef = doc(BakeryRef, customId)
        await setDoc(docRef, employee)
      }
      // Deli setDoc
      for (const employee of deliSchedule) {
        const customId = employee.Name || `custom-id-${Date.now()}`
        const docRef = doc(DeliRef, customId)
        await setDoc(docRef, employee)
      }
      // Meat setDoc
      for (const employee of meatSchedule) {
        const customId = employee.Name || `custom-id-${Date.now()}`
        const docRef = doc(MeatRef, customId)
        await setDoc(docRef, employee)
      }
      // Produce setDoc
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
        // Close the SweetAlert and redirect user
        navigateTo('/dashboard', { replace: true })
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
    await getDateKeys(dates.value)
    await mapDepartmentSchedules(
      grocery.value,
      bakery.value,
      deli.value,
      meat.value,
      produce.value,
      dateKeys.value,
    )
  })
</script>
