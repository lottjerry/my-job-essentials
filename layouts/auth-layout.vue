<template>
  <v-card>
    <v-layout>
      <v-app-bar
        color="primary"
        prominent
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        :density="$vuetify.display.mobile ? 'compact' : undefined"
      >
        <v-toolbar-title>Work Essentials</v-toolbar-title>

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
            prepend-icon="mdi-calendar-multiple"
            color="primary"
            title="Admin Schedules"
            to="/dashboard/schedules"
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

  const drawer = ref(false)
  const group = ref(null)
  const user = useCurrentUser()

  const auth = useFirebaseAuth()

  const logout = async () => {
    await signOut(auth)
    await navigateTo('/', { replace: true })
  }

  watch(group, () => {
    drawer.value = false
  })
</script>
