<template>
  <q-scroll-area style="height: 100%;">
    <q-list>
      <!-- USER ACCESS -->
      <q-item-label
        header
        :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'"
        class="text-weight-bold text-uppercase"
      >
        User Access
      </q-item-label>
      <q-item
        v-for="item in userAccess"
        :key="item.pathName"
        clickable
        v-ripple
        exact
        :to="{ name: item.pathName }"
        active-class="text-green"
      >
        <q-item-section avatar>
          <q-icon
            class="exact-active-class"
            :name="item.icon"
          />
        </q-item-section>

        <q-item-section>{{ item.label }}</q-item-section>
      </q-item>

      <q-separator size="4px" />

      <!-- REPORT -->
      <q-item-label
        header
        :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'"
        class="text-weight-bold text-uppercase"
      >
        Reports
      </q-item-label>
      <q-item
        v-for="item in reports"
        :key="item.pathName"
        clickable
        v-ripple
        exact
        :to="{ name: item.pathName }"
        active-class="text-green"
      >
        <q-item-section avatar>
          <q-icon
            class="exact-active-class"
            :name="item.icon"
          />
        </q-item-section>

        <q-item-section>{{ item.label }}</q-item-section>
      </q-item>

      <q-separator inset="item" />

      <!-- LEAVERS -->
      <q-item-label
        header
        :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'"
      >
        Leavers
      </q-item-label>
      <q-item
        v-for="item in leavers"
        :key="item.pathName"
        clickable
        v-ripple
        exact
        :to="{ name: item.pathName }"
        active-class="text-green"
      >
        <q-item-section avatar>
          <q-icon
            class="exact-active-class"
            :name="item.icon"
          />
        </q-item-section>

        <q-item-section>{{ item.label }}</q-item-section>
      </q-item>

      <q-separator size="4px" />

      <!-- OTHER REPORT -->
      <q-item-label
        header
        :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'"
        class="text-weight-bold text-uppercase"
      >
        Other Reports
      </q-item-label>
      <q-item
        v-for="item in otherReports"
        :key="item.pathName"
        clickable
        v-ripple
        exact
        :to="{ name: item.pathName }"
        active-class="text-green"
      >
        <q-item-section avatar>
          <q-icon
            class="exact-active-class"
            :name="item.icon"
          />
        </q-item-section>

        <q-item-section>{{ item.label }}</q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script>
// import GetRepo from 'src/repository/get'

export default {
  data () {
    return {
      userAccess: [
        { pathName: 'user-access', label: 'Per LOB', icon: 'mdi-account-group' },
        { pathName: 'user-access-tools', label: 'Per Tool', icon: 'mdi-tools' },
        { pathName: 'user-access-summary', label: 'Summary', icon: 'mdi-view-dashboard' },
        { pathName: 'user-access-history', label: 'History', icon: 'mdi-history' },
        { pathName: 'user-access-audit', label: 'Audit', icon: 'mdi-magnify' }
      ],
      reports: [
        { pathName: 'report-irab', label: 'IRAB', icon: 'mdi-account-lock' },
        { pathName: 'report-password', label: 'Password Cases', icon: 'mdi-lock-alert' }
      ],
      leavers: [
        { pathName: 'report-leavers-daily', label: 'Daily', icon: 'mdi-account-minus' }
      ],
      otherReports: [
        { pathName: 'report-esolve', label: 'ESolve', icon: 'mdi-ticket-outline' },
        { pathName: 'report-onehub', label: 'OneHub', icon: 'mdi-ticket-account' }
      ]
    }
  }

  // async beforeMount () {
  //   const { data } = await GetRepo.UserProfile(this.$q.localStorage.getItem('userAccnt'))

  //   console.log(data[0])
  // }
}
</script>
