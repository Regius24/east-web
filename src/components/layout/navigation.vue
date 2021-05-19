<template>
  <q-list>
    <!-- USER ACCESS LINKS -->
    <q-item-label
      header
      :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'"
    >
      User Access
    </q-item-label>
    <q-item
      v-for="ua in useraccess"
      :key="ua.pathName"
      clickable
      v-ripple
      exact
      :to="{ name: ua.pathName }"
      active-class="text-green"
    >
      <q-item-section avatar>
        <q-icon
          class="exact-active-class"
          :name="ua.icon"
        />
      </q-item-section>

      <q-item-section>{{ ua.label }}</q-item-section>
    </q-item>

    <q-separator />

    <!-- REPORT LINKS -->
    <q-item-label
      header
      :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'"
    >
      Reports
    </q-item-label>
    <q-item
      v-for="report in reports"
      :key="report.pathName"
      clickable
      v-ripple
      exact
      :to="{ name: report.pathName }"
      active-class="text-green"
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
      useraccess: [
        { pathName: 'user-access', label: 'Per LOBs', icon: 'mdi-account-group' },
        { pathName: 'user-access-tools', label: 'Per Tools', icon: 'mdi-tools' },
        { pathName: 'user-access-history', label: 'History', icon: 'mdi-history' },
        { pathName: 'user-access-audit', label: 'Audit', icon: 'mdi-magnify' }
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
