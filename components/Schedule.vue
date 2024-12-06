<template>
  <v-card
    class="pa-5 d-flex flex-column align-center bg-primary justify-center"
  >
    <div class="pb-4" v-if="mobile">
      <h3 class="mt-5">Schedule</h3>
      <h4>Week Ending: {{ weekEnding }}</h4>
    </div>
    <div class="pb-10" v-else>
      <h1 class="mt-5">My Schedule</h1>
      <h2>Week Ending: {{ weekEnding }}</h2>
    </div>

    <v-select
      v-model="selectSchedule"
      :width="!mobile ? '500' : '80dvw'"
      :density="!mobile ? 'default' : 'compact'"
      clearable
      chips
      label="Select Schedule"
      :items="NameOfUserScheduleByDepartment"
      variant="outlined"
    ></v-select>
    <v-checkbox
      density="compact"
      v-model="isUserSchedule"
      label="Show only my schedule"
    />
    <v-data-table-virtual
      v-if="schedules"
      class="setMinWidth pa-5"
      :density="!mobile ? 'default' : 'compact'"
      :mobile="mobile"
      :items="displayedSchedules"
      :height="!mobile ? '500' : '60dvh'"
      fixed-header=""
    ></v-data-table-virtual>
  </v-card>
</template>
<script setup>
  import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
  import { getAuth, onAuthStateChanged } from 'firebase/auth' // To handle authentication
  import { useDisplay } from 'vuetify'

  const { mobile } = useDisplay()

  const db = useFirestore()
  const userInfo = ref('')
  const schedules = ref([])
  const scheduleInfo = ref([])
  const userScheduleByDepartment = ref('')
  const NameOfUserScheduleByDepartment = ref('')
  const selectSchedule = ref(null)
  const weekEnding = ref(null)
  const dates = ref([])
  const userSchedule = ref([])
  const isUserSchedule = ref(false)

  const extractAndFormatDate = async (scheduleName) => {
    // Split the string by the underscore character
    const parts = scheduleName.split('_')

    // Check if the second part exists (contains the date)
    if (parts.length > 1) {
      const rawDate = parts[1] // Get the part after the underscore

      // Replace periods with slashes to format as MM/DD/YYYY
      weekEnding.value = rawDate.replace(/\./g, '/')
    }
  }

  const getLast7Days = async (weekEnding) => {
    const start = new Date(weekEnding) // Parse the given start date
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]

    for (let i = 6; i >= 0; i--) {
      const date = new Date(start) // Clone the starting date
      date.setDate(start.getDate() - i) // Subtract days

      // Format as Day MM/DD
      const dayName = daysOfWeek[date.getDay()]
      const formattedDate = `${dayName} ${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`
      dates.value.push(formattedDate)
    }
  }

  async function getUser(userId) {
    try {
      const userDocRef = doc(db, 'users', userId)
      const userDocSnap = await getDoc(userDocRef)

      if (userDocSnap.exists()) {
        userInfo.value = userDocSnap.data()
      } else {
        console.log('No such user!')
      }
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  async function getSchedule(collectionName) {
    try {
      const colRef = collection(db, collectionName)
      const snapshot = await getDocs(colRef)

      schedules.value = snapshot.docs.map((doc) => {
        const data = doc.data()

        // Rearrange the keys into the desired order
        return {
          Name: data.Name,
          [dates.value[0]]: data.Sunday,
          [dates.value[1]]: data.Monday,
          [dates.value[2]]: data.Tuesday,
          [dates.value[3]]: data.Wednesday,
          [dates.value[4]]: data.Thursday,
          [dates.value[5]]: data.Friday,
          [dates.value[6]]: data.Saturday,
          Hours: data.Hours,
          // Add other keys here if needed, or spread remaining keys
        }
      })
    } catch (error) {
      alert(error)
    }
  }

  async function getScheduleInfo(collectionName) {
    try {
      const colRef = collection(db, collectionName)
      const snapshot = await getDocs(colRef)
      scheduleInfo.value = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }))
    } catch (error) {
      alert(error)
    }
  }

  const filterUserSchedule = async () => {
    userScheduleByDepartment.value = scheduleInfo.value.filter((schedule) => {
      return schedule.department === userInfo.value.Department
    })
    NameOfUserScheduleByDepartment.value = userScheduleByDepartment.value.map(
      (schedule) => schedule.name,
    )
  }

  const getUserSchedule = async () => {
    userSchedule.value = schedules.value.filter((schedule) => {
      return schedule.Name === userInfo.value.ScheduleName
    })
  }

  const displayedSchedules = computed(() => {
    return isUserSchedule.value ? userSchedule.value : schedules.value
  })

  watch(selectSchedule, async (newValue) => {
    if (newValue) {
      await extractAndFormatDate(newValue)
      await getLast7Days(weekEnding.value)
      await getSchedule(newValue)
      await getUserSchedule()
      console.log(userSchedule.value)
    } else {
      schedules.value = []
      userSchedule.value = []
      weekEnding.value = null
      dates.value = []
    }
  })

  onMounted(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await getUser(user.uid)
        await getScheduleInfo('ScheduleInfo')
        filterUserSchedule()
      } else {
        console.log('No user is logged in.')
      }
    })
  })
</script>
