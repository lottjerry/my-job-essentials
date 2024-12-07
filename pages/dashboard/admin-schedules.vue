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
        width="800px"
        height="800px"
        class="bg-primary d-flex flex-column align-center pa-5"
      >
        <h1>Schedules</h1>

        <v-btn
          prepend-icon="mdi-calendar-plus"
          class="mt-5"
          @click="store.toggleNewScheduleOverlay"
          >New Schedule</v-btn
        >
        <v-card class="pa-5 ma-5 overflow-y-auto" height="500px" width="600px">
          <div class="d-flex flex-column ga-4">
            <v-card
              class="pa-3 d-flex justify-space-between align-center"
              v-for="(schedule, index) in scheduleNames"
              :key="index"
            >
              <p class="font-weight-bold">{{ schedule.name }}</p>
              <v-btn
                @click="deleteSchedule(schedule.name)"
                append-icon="mdi-close-outline"
                color="error"
                >Delete</v-btn
              >
            </v-card>
          </div>
        </v-card>
        <v-btn
          class="font-weight-bold mt-10"
          size="x-large"
          @click="confirmDeletion()"
          append-icon="mdi-delete-empty-outline"
          color="error"
          >Delete All</v-btn
        >
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
  import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
  import NewSchedule from '~/components/NewSchedule.vue'
  import Swal from 'sweetalert2'

  const store = useAppStore()
  const db = useFirestore()
  const collectionName = 'ScheduleInfo'
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

  const deleteSchedule = async (scheduleName) => {
    Swal.fire({
      title: 'Deleting Schedule...',
      text: 'Please wait while we delete your store schedule.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })
    try {
      const colRef = collection(db, scheduleName)
      const snapshot = await getDocs(colRef)
      const deletePromises = snapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, scheduleName, docSnap.id)),
      )
      await Promise.all(deletePromises) // Wait for all deletions
      const docRef = doc(db, 'ScheduleInfo', scheduleName)
      await deleteDoc(docRef)
      Swal.fire({
        icon: 'success',
        title: 'Schedule Deleted!',
        text: 'Your schedule was successfully deleted.',
        timer: 2500,
        showConfirmButton: false,
      })
      scheduleNames.value = scheduleNames.value.filter(
        (schedule) => schedule.name !== scheduleName,
      )
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: error.message,
      })
    }
  }

  const deleteAllSchedules = async () => {
    Swal.fire({
      title: 'Deleting All Schedule...',
      text: 'Please wait while we delete all your store schedules.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })
    try {
      for (const schedule of scheduleNames.value) {
        const colRef = collection(db, schedule.name)
        const snapshot = await getDocs(colRef)
        const deletePromises = snapshot.docs.map((docSnap) =>
          deleteDoc(doc(db, schedule.name, docSnap.id)),
        )
        await Promise.all(deletePromises) // Wait for all deletions
        const docRef = doc(db, 'ScheduleInfo', schedule.name)
        await deleteDoc(docRef)
      }

      Swal.fire({
        icon: 'success',
        title: 'All Schedules Deleted!',
        text: 'All Your schedules was successfully deleted.',
        timer: 2500,
        showConfirmButton: false,
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: error.message,
      })
    }
  }

  const confirmDeletion = async () => {
    // Check if schedules exist
    if (!scheduleNames.value || scheduleNames.value.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'No Schedules Found',
        text: 'There are no schedules to delete.',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-confirm-button',
        },
      })
      return
    }

    // Show confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete them!',
      reverseButtons: true,
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAllSchedules()
      }
    })
  }

  onMounted(async (params) => {
    await getAllSchedules()
  })

  watch(scheduleNames, async () => {
    await getAllSchedules()
  })

  const { lgAndUp } = useDisplay()
</script>

<style>
  .custom-confirm-button {
    color: white; /* White text */
  }

  .custom-cancel-button {
    color: white; /* Orange text */
  }
</style>
