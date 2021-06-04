<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin q-pa-sm"
      style="min-width: 50%;"
    >
      <q-card-section>
        <q-timeline layout="comfortable">
          <q-timeline-entry
            v-for="log in logs"
            :key="log.version"
            :title="`${log.version} - ${log.timestamp}`"
            :subtitle="log.description"
          >
            <ul>
              <li
                v-for="update in log.updates"
                :key="update"
              >{{ update }}</li>
            </ul>
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
const logs = [
  {
    version: '1.0.18',
    description: 'App Update',
    timestamp: '05/31/2021',
    updates: [
      'Added Summary (All) User Access Dashboard',
      'Added ESolve Report',
      'Updated navigation icons'
    ]
  },
  {
    version: '1.0.17',
    description: 'App Update',
    timestamp: '05/20/2021',
    updates: [
      'Added new pages and components for User Access Audit',
      'Updated Routes for User Access Audit',
      'Updated database for User Access Audit',
      'Fixed Popup onehub tix to show only NA accounts'
    ]
  },
  {
    version: '1.0.16',
    description: 'App Update',
    timestamp: '05/04/2021',
    updates: [
      'Added new pages and components for User Access Tools',
      'Added new columns for IRAB raw',
      'Updated IRAB file uploading due to new columns',
      'Updated database schema and procedures due to new columns',
      'Updated IRAB Summary',
      'Updated IRAB fields',
      'Updated UAM agents UI',
      'Updated UAM agents detailed component',
      'Updated Password Cases Layout',
      'Updated toolbar color when in light mode',
      'Fixed Password Cases months being shown',
      'Removed month filter for Password Cases'
    ]
  },
  {
    version: '1.0.15',
    description: 'App Update',
    timestamp: '04/22/2021',
    updates: [
      'Updated UAM agents popup',
      'Updated navigation colors',
      'Fixed UAM summary click/popup feature',
      'Fixed IRAB download for deactivated only',
      'Fixed date change for UAM history',
      'Fixed OneHub uploader',
      'Removed tooltip for all tables'
    ]
  },
  {
    version: '1.0.14',
    description: 'App Update',
    timestamp: '04/16/2021',
    updates: [
      'Added UAM history page',
      'Added loading for table reports',
      'Added new columns for IRAB unique agents',
      'Updated routes',
      'Updated UAM history',
      'Updated UAM history agents table',
      'Updated table settings',
      'Updated layout',
      'Fixed UAM sumamry report',
      'Fixed UAM date mapping',
      'Fixed table issues'
    ]
  },
  {
    version: '1.0.13',
    description: 'App Update',
    timestamp: '04/13/2021',
    updates: [
      'Updated OneHub report',
      'Updated OneHub uploader',
      'Fixed IRAB uploading issues'
    ]
  },
  {
    version: '1.0.12',
    description: 'App Update',
    timestamp: '04/08/2021',
    updates: [
      'Added OneHub report',
      'Added uploader for OneHub report',
      'Added profiling for IRAB report',
      'Added .csv download for IRAB blacklist',
      'Updated UAM summary report',
      'Updated IRAB report',
      'Updated UI layout',
      'Fixed UAM data sorting'
    ]
  },
  {
    version: '1.0.11',
    description: 'App Update',
    timestamp: '03/31/2021',
    updates: [
      'Added month filter for IRAB report',
      'Added IRAB blacklisting',
      'Added site and vendor filters for UAM summary report',
      'Updated IRAB report',
      'Updated routings',
      'Updated UAM data processing',
      'Updated global/theme colors',
      'Fixed IRAB data filter issue',
      'Fixed uploader notifications',
      'Minor UI changes'
    ]
  },
  {
    version: '1.0.10',
    description: 'App Update',
    timestamp: '03/16/2021',
    updates: [
      'Added as of for UAM report summary',
      'Updated UAM summary formula',
      'Updated UAM agents report loading',
      'Updated profile checking',
      'Updated login page for interactivity',
      'Updated WEST logo to EAST logo',
      'Minor syntax updates'
    ]
  },
  {
    version: '1.0.9',
    description: 'App Update',
    timestamp: '02/05/2021',
    updates: [
      'Updated login syntax',
      'Updated UAM summary report',
      'Updated app layout'
    ]
  },
  {
    version: '1.0.8',
    description: 'App Update',
    timestamp: '01/29/2021',
    updates: [
      'Updated UAM data loading sequence',
      'Updated UAM report summary',
      'Updated global notifications'
    ]
  },
  {
    version: '1.0.7',
    description: 'App Update',
    timestamp: '01/27/2021',
    updates: [
      'Added app navigation guards',
      'Updated UAM summary report',
      'Updated UAM summary notification'
    ]
  },
  {
    version: '1.0.6',
    description: 'App Update',
    timestamp: '01/25/2021',
    updates: [
      'Updated login functions',
      'Updated UAM summary report',
      'Updated UAM uploader',
      'Updated UAM agent report',
      'Updated login page'
    ]
  },
  {
    version: '1.0.5',
    description: 'App Update',
    timestamp: '01/22/2021',
    updates: [
      'Updated UAM summary report'
    ]
  },
  {
    version: '1.0.4',
    description: 'App Update',
    timestamp: '01/19/2021',
    updates: [
      'Updated UAM dashboard'
    ]
  },
  {
    version: '1.0.3',
    description: 'App Update',
    timestamp: '01/13/2021',
    updates: [
      'Updated layout',
      'Updated routes',
      'Added UAM page',
      'Added UAM file uploader',
      'Added fullscreen mode'
    ]
  },
  {
    version: '1.0.2',
    description: 'App Update',
    timestamp: '01/11/2021',
    updates: [
      'Updated routes',
      'Added dark mode'
    ]
  },
  {
    version: '1.0.1',
    description: 'App Update',
    timestamp: '01/08/2021',
    updates: [
      'Added new background',
      'Updated login page'
    ]
  },
  {
    version: '1.0.0',
    description: 'First Draft Layout for EAST',
    timestamp: '01/07/2021',
    updates: [
      'Initialized frontend',
      'Initialized backend',
      'Initialized database'
    ]
  }
]

export default {
  data () {
    return {
      logs
    }
  },

  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    onOKClick () {
      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      this.hide()
    }
  }
}
</script>
