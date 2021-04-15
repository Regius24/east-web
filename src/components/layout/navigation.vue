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
          class="exact-active-class"
          :name="route.icon"
        />
      </q-item-section>

      <q-item-section>{{ route.label }}</q-item-section>
    </q-item>

    <q-separator />

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
          class="exact-active-class"
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
        { pathName: 'user-access', label: 'User Access', icon: 'mdi-account-details' },
        { pathName: 'user-access-history', label: 'User Access History', icon: 'mdi-account-clock' }
      ],
      reports: [
        { pathName: 'report-irab', label: 'IRAB', icon: 'mdi-account-lock' },
        { pathName: 'report-password', label: 'Password Cases', icon: 'mdi-lock-alert' },
        { pathName: 'report-onehub', label: 'Onehub', icon: 'mdi-ticket-confirmation' }
      ]
    }
  }

  // async beforeMount () {
  //   const { data } = await GetRepo.UserProfile(this.$q.localStorage.getItem('userAccnt'))

  //   console.log(data[0])
  // }
}
</script>
