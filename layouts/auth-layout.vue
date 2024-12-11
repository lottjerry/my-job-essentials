<template>
  <v-card>
    <v-layout>
      <v-app-bar
        color="primary"
        prominent
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        :density="$vuetify.display.mobile ? 'compact' : undefined"
      >
        <v-toolbar-title>My Job Essentials</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-app-bar-nav-icon
          variant="plain"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : 'right'"
        :width="$vuetify.display.mobile ? undefined : '350'"
      >
        <v-list>
          <v-list-item
            prepend-icon="mdi-account-circle"
            :subtitle="user.email"
            :title="user.displayName"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item
            prepend-icon="mdi-calendar-month"
            color="primary"
            title="
            Schedules"
            to="/dashboard"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account"
            color="primary"
            title="My Account"
            to="/dashboard/my-account"
          ></v-list-item>
          <v-list-item
            :prepend-icon="
              isAdmin ? 'mdi-calendar-multiple' : 'mdi-shield-account-outline'
            "
            color="primary"
            :title="!isAdmin ? 'Admin SignUp' : 'Admin Schedules'"
            :to="
              !isAdmin
                ? '/dashboard/admin-signup'
                : '/dashboard/admin-schedules'
            "
          ></v-list-item>
          <v-list-item
            @click="logout"
            prepend-icon="mdi-exit-to-app"
            color="primary"
            title="Sign Out"
            to="/dashboard"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="bg-white">
        <slot />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
  import { signOut } from 'firebase/auth'
  import { doc, getDoc } from 'firebase/firestore'

  // Firebase setup
  const db = useFirestore()
  const user = useCurrentUser()
  const collectionName = 'users'
  const isAdmin = ref(false)

  const drawer = ref(false)
  const group = ref(null)

  const auth = useFirebaseAuth()

  const logout = async () => {
    await signOut(auth)
    await navigateTo('/', { replace: true })
  }

  // Function to fetch Firestore document
  const fetchDocument = async () => {
    const docRef = doc(db, collectionName, user.value.uid) // Updated Firestore syntax
    try {
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        isAdmin.value = docSnap.data().Admin
      } else {
        console.log('No such document!')
      }
    } catch (error) {
      console.error('Error getting document:', error)
    }
  }

  watch(group, () => {
    drawer.value = false
  })

  // Fetch the document on component mount
  onMounted(async () => {
    await fetchDocument()
  })
</script>
