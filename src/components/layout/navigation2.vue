<template>
  <q-scroll-area style="height: 100%;">
    <q-list separator>
      <template v-for="(item, i) in items">
        <!-- IF ITEM HAS GROUP -->
        <q-expansion-item
          group="wowMaGroup"
          v-model="item.opened"
          class="text-weight-medium"
          :header-class="item.opened ? 'bg-secondary text-white text-uppercase' : 'text-uppercase'"
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
            active-class="text-secondary text-weight-medium"
            class="text-weight-light"
            v-for="(subitem, i2) in item.sub"
            :key="i2"
            :to="{ name: subitem.path }"
            :inset-level="1"
            :style="subitem.show ? '' : 'display: none;'"
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
import GET from 'src/repository/get'
import { first } from 'lodash'

export default {
  data () {
    return {
      items: [
        // USER ACCESS
        {
          grouped: true,
          opened: true,
          icon: 'mdi-account-group',
          label: 'User Access',
          caption: '',
          sub: [
            { icon: 'mdi-account', label: 'Provisioned Accesses', path: 'user-access-lob', code: 'pUALob', show: true },
            { icon: 'mdi-tools', label: 'Tools Inventory', path: 'user-access-tools', code: 'pUATools', show: true },
            { icon: 'mdi-view-dashboard', label: 'Tools Summary', path: 'user-access-summary', code: 'pUASummary', show: true },
            { icon: 'mdi-calendar-range', label: 'Weekly DB', path: 'user-access-history-weekly', code: 'pUAHistory', show: true },
            { icon: 'mdi-calendar-month', label: 'Monthly DB', path: 'user-access-history-monthly', code: 'pUAHistory', show: true }
          ]
        },

        // REPORTS
        {
          grouped: true,
          opened: false,
          icon: 'mdi-file-chart',
          label: 'Reports',
          caption: '',
          sub: [
            { icon: 'mdi-badge-account-horizontal', label: 'Medallia', path: 'report-medallia', code: 'pMedallia', show: true },
            { icon: 'mdi-account', label: 'Call Refusal Incidents', path: 'report-irab', code: 'pIrab', show: true },
            { icon: 'mdi-tools', label: 'Password Resetting', path: 'report-password', code: 'pPassword', show: true },

            { icon: 'mdi-account-minus', label: 'Daily Leavers', path: 'report-leavers-daily', code: 'pLeavers', show: true },
            { icon: 'mdi-account-multiple-minus', label: 'Monthly Leavers (R1)', path: 'report-leavers-monthly', code: 'pLeavers', show: true },
            { icon: 'mdi-account-alert', label: 'Non-Usage (R2)', path: 'report-non-usage', code: 'pNonUsage', show: true },

            { icon: 'mdi-magnify', label: 'UAM Audit', path: 'user-access-audit', code: 'pUAAudit', show: true },

            { icon: 'mdi-ticket-outline', label: 'ESolve', path: 'report-esolve', code: 'pEsolve', show: true },
            { icon: 'mdi-ticket-account', label: 'OneHub', path: 'report-onehub', code: 'pOnehub', show: true }
          ]
        },

        // KNOWLEDGE BASE
        {
          grouped: true,
          opened: false,
          icon: 'mdi-sitemap',
          label: 'Knowledge Base',
          caption: '',
          path: 'knowledge-base',
          sub: [
            { icon: 'mdi-table', label: 'Tools Mapping', path: 'kb-tools-mapping', code: 'pKBToolsMapping', show: true },
            { icon: 'mdi-directions', label: 'Transaction Flow', path: 'kb-transaction-flow', code: 'pKBTransacFlow', show: true },
            { icon: 'mdi-lock-question', label: 'Usernames & Passwords', path: 'kb-username-password-guidelines', code: 'pKBUnamePass', show: true }
          ]
        }
      ]
    }
  },

  async beforeMount () {
    const { data } = await GET.UserProfile(this.$q.localStorage.getItem('userAccnt'))
    const {
      pUALob,
      pUATools,
      pUASummary,
      pUAAudit,
      pUAHistory,
      pLeavers,
      pMedallia,
      pIrab,
      pPassword,
      pEsolve,
      pOnehub,
      pKB
    } = first(data)

    this.items.map(item => {
      return item.sub.map(sub => {
        if (sub.code === 'pUALob') sub.show = pUALob
        if (sub.code === 'pUATools') sub.show = pUATools
        if (sub.code === 'pUASummary') sub.show = pUASummary
        if (sub.code === 'pUAAudit') sub.show = pUAAudit
        if (sub.code === 'pUAHistory') sub.show = pUAHistory
        if (sub.code === 'pLeavers') sub.show = pLeavers
        if (sub.code === 'pMedallia') sub.show = pMedallia
        if (sub.code === 'pIrab') sub.show = pIrab
        if (sub.code === 'pPassword') sub.show = pPassword
        if (sub.code === 'pEsolve') sub.show = pEsolve
        if (sub.code === 'pOnehub') sub.show = pOnehub
        if (sub.code === 'pKB') sub.show = pKB

        return sub
      })
    })
  }
}
</script>
