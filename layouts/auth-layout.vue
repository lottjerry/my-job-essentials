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
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="jijfjifjeijfeifjifjeifje@gmail.com"
            title="Sandra Adams"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item
            prepend-icon="mdi-calendar-month"
            title="
            Schedule"
            value="myfiles"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account"
            title="My Profile"
            value="shared"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-exit-to-app"
            title="Sign Out"
            value="starred"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <div>
        <slot />
      </div>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    setup() {
      const drawer = ref(false)
      const group = ref(null)

      watch(group, () => {
        drawer.value = false
      })

      return {
        drawer,
        group,
      }
    },
  }
</script>
