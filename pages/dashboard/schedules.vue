<template>
  <div class="d-flex flex-column align-center h-screen justify-center">
    <v-navigation-drawer
      location="top"
      v-model="store.newScheduleOverlay"
      class="bg-primary d-flex align-center h-screen justify-center"
    >
      <v-card class="d-flex align-center mt-10 justify-center">
        <NewSchedule v-if="lgAndUp" />
      </v-card>
    </v-navigation-drawer>
    <div>
      <v-card
        v-if="lgAndUp"
        width="500px"
        height="500px"
        class="bg-primary d-flex flex-column align-center pa-5"
      >
        <h1>Schedules</h1>

        <v-btn
          prepend-icon="mdi-calendar-plus"
          class="mt-5"
          @click="store.toggleNewScheduleOverlay"
          >Schedules</v-btn
        >
        <v-card class="pa-5 ma-5 overflow-y-auto" height="400px" width="400px">
          <div class="d-flex flex-column ga-4">
            <v-card class="pa-3" v-for="(schedule, index) in scheduleNames" :key="index">
              {{ schedule.name }}
            </v-card>
          </div>
        </v-card>
      </v-card>
      <div v-else class="d-flex align-center h-screen justify-center">
        <h1 class="pa-5">Can only edit schedules on desktop.</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: 'auth-layout',
    middleware: ['auth'],
  })

  import { useDisplay } from 'vuetify'
  import { useAppStore } from '#imports'
  import { collection, getDocs, doc } from 'firebase/firestore'
  import NewSchedule from '~/components/NewSchedule.vue'

  const store = useAppStore()
  const db = useFirestore()
  const collectionName = 'ScheduleNames'
  const scheduleNames = ref(null)

  const getAllSchedules = async () => {
    const collectionRef = collection(db, collectionName)

    try {
      const querySnapshot = await getDocs(collectionRef)

      // Create an array to store the data
      const schedules = []

      querySnapshot.forEach((doc) => {
        // Push each document's data into the array
        schedules.push(doc.data())
      })

      // Assign the collected data to a variable (for example, a reactive state or just a local variable)
      scheduleNames.value = schedules
    } catch (error) {
      console.error('Error getting documents: ', error)
    }
  }

  onMounted(async (params) => {
    await getAllSchedules()
  })

  const { lgAndUp } = useDisplay()
</script>
