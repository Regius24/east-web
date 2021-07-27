<template>
  <q-scroll-area style="height: 100%;">
    <q-list separator>
      <template v-for="(item, i) in items">
        <!-- IF ITEM HAS GROUP -->
        <q-expansion-item
          expand-separator
          group="wowMaGroup"
          v-model="item.opened"
          :header-class="item.opened ? 'text-secondary' : ''"
          :default-opened="item.opened"
          :icon="item.icon"
          :label="item.label"
          :caption="item.caption"
          :key="i"
          v-if="item.grouped"
        >
          <q-item
            exact
            clickable
            v-ripple
            inset-level="1"
            active-class="bg-green"
            class="text-weight-thin"
            v-for="(subitem, i2) in item.sub"
            :key="i2"
            :to="{ name: subitem.path }"
          >
            <q-item-section avatar>
              <q-icon
                class="exact-active-class"
                :name="subitem.icon"
              />
            </q-item-section>

            <q-item-section>{{ subitem.label }}</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- IF ITEM DOES NOT HAVE GROUP -->
        <q-item
          clickable
          v-ripple
          exact
          active-class="bg-green"
          :to="{ name: item.path }"
          :key="i"
          v-else
        >
          <q-item-section avatar>
            <q-icon
              class="exact-active-class"
              :name="item.icon"
            />
          </q-item-section>

          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-scroll-area>
</template>

<script>
// import GetRepo from 'src/repository/get'

export default {
  data () {
    return {
      items: [
        {
          grouped: true,
          opened: true,
          icon: 'mdi-account-group',
          label: 'User Access',
          caption: '',
          sub: [
            { icon: 'mdi-account', label: 'Per LOB', path: 'user-access' },
            { icon: 'mdi-tools', label: 'Per Tool', path: 'user-access-tools' },
            { icon: 'mdi-view-dashboard', label: 'Summary', path: 'user-access-summary' },
            { icon: 'mdi-magnify', label: 'Audit', path: 'user-access-audit' },
            { icon: 'mdi-calendar-range', label: 'Weekly', path: 'user-access-history' },
            { icon: 'mdi-calendar-month', label: 'Monthly', path: 'user-access-history-monthly' }
          ]
        },
        {
          grouped: true,
          opened: false,
          icon: 'mdi-minus-circle',
          label: 'Leavers (R1)',
          caption: '',
          sub: [
            { icon: 'mdi-account-minus', label: 'Daily', path: 'report-leavers-daily' },
            { icon: 'mdi-account-multiple-minus', label: 'Monthly', path: 'report-leavers-monthly' }
          ]
        },
        {
          grouped: true,
          opened: false,
          icon: 'mdi-file-chart',
          label: 'Reports',
          caption: '',
          sub: [
            { icon: 'mdi-account', label: 'IRAB', path: 'report-irab' },
            { icon: 'mdi-tools', label: 'Password Cases', path: 'report-password' },
            { icon: 'mdi-ticket-outline', label: 'ESolve', path: 'report-esolve' },
            { icon: 'mdi-ticket-account', label: 'Onehub', path: 'report-onehub' }
          ]
        },
        {
          grouped: true,
          opened: false,
          icon: 'mdi-sitemap',
          label: 'Knowledge Base',
          caption: '',
          path: 'knowledge-base',
          sub: [
            { icon: 'mdi-transit-connection', label: 'Tools Mapping', path: 'kb-user-access-tools' }
          ]
        }
      ]
    }
  }

  // async beforeMount () {
  //   const { data } = await GetRepo.UserProfile(this.$q.localStorage.getItem('userAccnt'))

  //   console.log(data[0])
  // }
}
</script>
