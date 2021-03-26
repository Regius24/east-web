<template>
  <q-list>

    <!-- NAVIGATION LINKS -->
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

    <!-- REPORT LINKS -->
    <q-item-label
      header
      :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'"
    >
      Report Links
    </q-item-label>
    <q-item
      v-for="report in reports"
      :key="report.pathName"
      clickable
      v-ripple
      exact
      :to="{ name: report.pathName }"
    >
      <q-item-section avatar>
        <q-icon
          color="yellow-8"
          :name="report.icon"
        />
      </q-item-section>

      <q-item-section>{{ report.label }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script>
// import GetRepo from 'src/repository/get'

export default {
  data () {
    return {
      routes: [
        { pathName: 'user-access', label: 'User Access', icon: 'mdi-view-dashboard' }
      ],
      reports: [
        { pathName: 'report-irab', label: 'IRAB', icon: 'mdi-file-chart' }
      ]
    }
  }

  // async beforeMount () {
  //   const { data } = await GetRepo.UserProfile(this.$q.localStorage.getItem('userAccnt'))

  //   console.log(data[0])
  // }
}
</script>
