<template>
  <div>
    <div v-if="OrganizationID">
      <MobileSchedule v-if="sm" />
      <DesktopSchedule v-else />
    </div>
    <OrganizationRegister v-else />
  </div>
</template>

<script setup>
  import { useDisplay } from 'vuetify'
  import { doc, getDoc } from 'firebase/firestore'

  // Firebase setup
  const db = useFirestore()
  const user = useCurrentUser()
  const collectionName = 'users'
  const OrganizationID = ref('')

  // Page meta
  definePageMeta({
    layout: 'auth-layout',
    middleware: ['auth'],
  })

  // Function to fetch Firestore document
  const fetchDocument = async () => {
    const docRef = doc(db, collectionName, user.value.uid) // Updated Firestore syntax
    try {
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        OrganizationID.value = docSnap.data().OrganizationID
      } else {
        console.log('No such document!')
      }
    } catch (error) {
      console.error('Error getting document:', error)
    }
  }

  // Fetch the document on component mount
  onMounted(async () => {
    await fetchDocument()
  })

  // Vuetify display logic
  const { sm } = useDisplay()
</script>
