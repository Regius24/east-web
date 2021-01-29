<template>
  <q-list>
    <q-item-label
      header
      :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'"
    >
      Navigation Links
    </q-item-label>

    <q-item
      v-for="route in routes"
      :key="route.pathName"
      clickable
      v-ripple
      exact
      :to="{ name: route.pathName }"
    >
      <q-item-section avatar>
        <q-icon
          color="yellow-8"
          :name="route.icon"
        />
      </q-item-section>

      <q-item-section>{{ route.label }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  data () {
    return {
      routes: [
        { pathName: 'user-access', label: 'User Access', icon: 'mdi-view-dashboard' }
        // { pathName: 'workforce-management', label: 'Workforce Management', icon: 'mdi-view-dashboard' },
        // { pathName: 'access-manager', label: 'Access Manager', icon: 'mdi-shield-account' }
        // { pathName: 'reports', label: 'Reports', icon: 'mdi-file-chart' }
      ]
    }
  }
}
</script>
