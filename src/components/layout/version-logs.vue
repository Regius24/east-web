<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin q-pa-sm"
      style="min-width: 45%;"
    >
      <q-scroll-area style="height: 70vh; min-width: 100%;">
        <q-card-section>
          <q-timeline>
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
      </q-scroll-area>

    </q-card>
  </q-dialog>
</template>

<script>
const logs = [
  {
    version: '1.0.46:4',
    description: 'App Update',
    timestamp: '09/08/2021',
    updates: [
      'Added page for FTE Allocation',
      'Added components for FTE Allocation',
      'Updated routings and permissions for FTE Allocation',
      'Updated API for data fetching for FTE Alloc',
      'Updated API Repository for initializing backend API',
      'Fixed table for FTE Allocation',
      'Added Percentage column based on Agents for FTE Allocation',
      'Added Export for FTE Allocation',
      'Updated navigation labels',
      'Updated Tools Matrix columns width',
      'Fixed brand component filtering',
      'Remove drafted FTE Allocation table templates'
    ]
  },

  {
    version: '1.0.45',
    description: 'App Update',
    timestamp: '09/03/2021',
    updates: [
      'Fixed components for Tools Mapping for rendering data',
      'Added download button for raw data for Tools Mapping',
      'Added actual table to render description data for Tools Mapping',
      'Added actual table to render matrix data for Tools Mapping'
    ]
  },

  {
    version: '1.0.44',
    description: 'App Update',
    timestamp: '09/02/2021',
    updates: [
      'Removed Tools Mapping from navigation',
      'Renamed Tools Table -> Tools Mapping',
      'Updated Tools Mapping fetching of data',
      'Added components for Tools Mapping for data presentation'
    ]
  },

  {
    version: '1.0.43',
    description: 'App Update',
    timestamp: '08/26/2021',
    updates: [
      'Fixed Tools Table (KB) trimmed images for description and matrix'
    ]
  },

  {
    version: '1.0.42',
    description: 'App Update',
    timestamp: '08/25/2021',
    updates: [
      'Added popup Banner message for simple advisories/notifications',
      'Added Banner details for backend API handling',
      'Added Banner to settings page for updating/modification'
    ]
  },

  {
    version: '1.0.41',
    description: 'App Update',
    timestamp: '08/24/2021',
    updates: [
      'Updated Password Resetting file for uploading',
      'Updated backend for handling new Password Resetting file schema for uploading',
      'Updated Password Resetting database schema based on new file',
      'Updated formulas for computing summary of Password Resetting',
      'Updated export table for Password Resetting to XLSX',
      'Fixed table select to standout',
      'Fixed UAM Audit table export to unelavated',
      'Fixed vendor filtering for Summary Weekly and Monthly DB'
    ]
  },

  {
    version: '1.0.40',
    description: 'App Update',
    timestamp: '08/20/2021',
    updates: [
      'Added images for Transaction Flow',
      'Added components and filters for Transaction Flow',
      'Fixed overlay issue for photo viewer the side navigation'
    ]
  },

  {
    version: '1.0.39',
    description: 'App Update',
    timestamp: '08/19/2021',
    updates: [
      'Added page for Tools Table',
      'Added components and needed libraries for Tools Table',
      'Added page for Transaction Flow',
      'Updated routing and permissions for Knowledge Base'
    ]
  },

  {
    version: '1.0.38:5',
    description: 'App Update',
    timestamp: '08/13/2021',
    updates: [
      'Added page for Non Usage',
      'Added components for Non Usage',
      'Added Navigation for Non Usage',
      'Updated routing and permisions for Non Usage',
      'Updated navigation UI and labels',
      'Updated all tables search input attributes',
      'Fixed fetching of filters for UA Per LOB',
      'Fixed fetching of filters for UA Per Tool',
      'Fixed fetching of filters for UA Weekly Historyical',
      'Fixed fetching of filters for UA Monthly Historyical',
      'Fixed data update when changing filter value for UA Historicals',
      'Fixed fechting of data for Daily Leavers',
      'Fixed fetching of data for Monthly Leavers',
      'Fixed fetching of data for Knowledge Base Tool Mapping',
      'Fixed IRAB table edit permission',
      'Fixed Toolbar text colors for dark and light mode'
    ]
  },

  {
    version: '1.0.37:2',
    description: 'App Update',
    timestamp: '08/12/2021',
    updates: [
      'Added profile label in toolbar',
      'Fixed UA Per LOB agents data loading and export',
      'Fixed UA Per Tool agents data loading and export',
      'Fixed UA Summary (All) TL columns',
      'Fixed IRAB brand and vendor data filtering',
      'Fixed IRAB to hide only the upload if not allowed',
      'Fixed Password Cases brand and vendor data filtering'
    ]
  },

  {
    version: '1.0.36:3',
    description: 'App Update',
    timestamp: '08/10/2021',
    updates: [
      'Added a prompt to refresh if a new app update is available',
      'Hidden navigations tabs based on profiles',
      'Hidden release note option based on profiles',
      'Fixed historical summary table for smart even in pldt profile',
      'Fixed IRAB not correctly using profile data for filtering data',
      'Fixed UI visibility issues for some reports due to profiling'
    ]
  },

  {
    version: '1.0.35',
    description: 'App Update',
    timestamp: '08/06/2021',
    updates: [
      'Added User List page for Settings',
      'Added an insert feature for User List',
      'Added a delete feature for User List',
      'Added an update feature for User List',
      'Updated toolbar menu for dashboard layout',
      'Updated toolbar menu for settings layout',
      'Fixed fetching user data due to changes from profilings'
    ]
  },

  {
    version: '1.0.34',
    description: 'App Update',
    timestamp: '08/05/2021',
    updates: [
      'Adjusted page routings due to changes in profilings',
      'Adjusted permissions due to changes in profilings'
    ]
  },

  {
    version: '1.0.33',
    description: 'App Update',
    timestamp: '08/04/2021',
    updates: [
      'Added a new page for Medallia report',
      'Added a new component for Medallia page',
      'Added a new routing for Medallia report',
      'Added a new navigation guard for Medallia report',
      'Added a new repository for Medallia report',
      'Added navigation guards for Knowledgebase',
      'Added navigation to settings page',
      'Updated routing when error page encountered',
      'Fixed navigation width and typography',
      'Fixed fetching of user data from all pages',
      'Fixed routing to settings page and vice versa'
    ]
  },

  {
    version: '1.0.32',
    description: 'App Update',
    timestamp: '08/03/2021',
    updates: [
      'Updated leavers daily table',
      'Updated leavers monthly table',
      'Fixed leavers monthly uploader label'
    ]
  },

  {
    version: '1.0.31',
    description: 'App Update',
    timestamp: '07/30/2021',
    updates: [
      'Added weekly breakdown for each vendor for user access monthly historical',
      'Added Username and Password Guidelines for Knowledge Base',
      'Updated EAST icon'
    ]
  },

  {
    version: '1.0.30',
    description: 'App Update',
    timestamp: '07/27/2021',
    updates: [
      'Added color checking for user access summary (all) when access are less',
      'Updated navigation interface',
      'Moved Knowledge Base from dropdown menu to navigation',
      'Fixed Knowledge Base User Access Tools Page routing',
      'Fixed Leavers (R2) -> Leavers (R1)'
    ]
  },

  {
    version: '1.0.29',
    description: 'App Update',
    timestamp: '07/22/2021',
    updates: [
      'Added persistance to ticket popups',
      'Added ticket popup block when score is 100',
      'Updated columns for leavers report',
      'Updated Leavers -> Leavers (R2) from the navigation panel',
      'Updated agent table columns',
      'Fixed popup tickets to load only data from the previous and up',
      'Removed column visibility for daily leavers report'
    ]
  },

  {
    version: '1.0.28',
    description: 'App Update',
    timestamp: '07/21/2021',
    updates: [
      'Added download button for User Access Audit Summary Table',
      'Updated User Access Summary (All) table and column width',
      'Updated ESolve stage column',
      'Fixed User Access Audit Summary Accuracy with %',
      'Fixed Password Cases Summary Table Merged Cells to be Centered',
      'Fixed User Access Monthly Historical Computation',
      'Fixed popup ticket loading to load data faster'
    ]
  },

  {
    version: '1.0.27',
    description: 'App Update',
    timestamp: '07/19/2021',
    updates: [
      'Added filters for User Access Audit Summary table',
      'Fixed filters for User Access Audit Summary table',
      'Fixed popup ticket stage sequence',
      'Fixed onehub uploading to accommodate new column',
      'Fixed user access history monthly computation'
    ]
  },

  {
    version: '1.0.26',
    description: 'App Update',
    timestamp: '07/11/2021',
    updates: [
      'Added new Summary tables for User Access Audit',
      'Fixed User Access next update to count only by Mondays',
      'Fixed popup ticket slow data loading',
      'Fixed popup ticket PLDT data not showing',
      'Fixed ESolve table outline for Justification'
    ]
  },

  {
    version: '1.0.25',
    description: 'App Update',
    timestamp: '07/01/2021',
    updates: [
      'Added download button for knowledge base User Access Tools',
      'Updated ticket popup table column widths',
      'Updated ESolve table columns'
    ]
  },

  {
    version: '1.0.24',
    description: 'App Update',
    timestamp: '06/22/2021',
    updates: [
      'Added loading when clicking for User Access Summary table',
      'Updated table for User Access Summary All',
      'Updated click to double click for User Access Summary table',
      'Updated API to handle long query execution',
      'Updated ticket popup to include ESolve tickets (previously onehub only)',
      'Updated Password Cases export and removed MONTH column'
    ]
  },
  {
    version: '1.0.23',
    description: 'App Update',
    timestamp: '06/18/2021',
    updates: [
      'Added components for User Access History Monthly; SMART and PLDT',
      'Added DB schema for User Access History Monthly; SMART and PLDT',
      'Added backend API for schema User Access History Monthly; SMART and PLDT',
      'Updated navigation for User Access History Monthly',
      'Updated routes for User Access History Monthly'
    ]
  },
  {
    version: '1.0.22',
    description: 'App Update',
    timestamp: '06/16/2021',
    updates: [
      'Added popup ticket list for User Access Per Tool',
      'Updated all uploaders with notes',
      'Fixed Monthly Leavers\' report uploader',
      'Fixed Monthly Leavers\' report table',
      'Fixed User Access and Knowledge Base',
      'Fixed backend API for monthly leavers',
      'Fixed DB schema for monthly leavers',
      'Fixed User Access summary table company name filter',
      'Fixed all table alignment',
      'Reverted User Access\'s Resigned query to previous version due to performance impact'
    ]
  },
  {
    version: '1.0.21',
    description: 'App Update',
    timestamp: '06/15/2021',
    updates: [
      'Added Leavers Monthly Report for PLDT and SMART',
      'Added Leavers Monthly Report DB Schema for PLDT and SMART',
      'Added Leavers Monthly Report Backend API for PLDT and SMART',
      'Added Knowledge Base User Access Tools',
      'Added Knowledge Base User Access Tools DB Schema',
      'Added Knowledge Base User Access Tools Backend API',
      'Updated IRAB for filtering DEACTIVATED only',
      'Updated ESolve Report to show non-resolved tickets',
      'Updated ESolve Report to include new columns',
      'Updated Password Cases Report Summary headers',
      'Updated layout toolbar dropdown menu'
    ]
  },
  {
    version: '1.0.20',
    description: 'App Update',
    timestamp: '06/11/2021',
    updates: [
      'Added Leavers Daily Report and DB Schema',
      'Updated User Access SMART Resigned formula',
      'Updated app routing for Leavers Daily Report',
      'Updated app API for Leavers Daily Report',
      'Updated Leavers Daily table',
      'Updated Leavers Daily uploader',
      'Updated navigation layout',
      'Fixed reversed columns for User Access Summary'
    ]
  },
  {
    version: '1.0.19',
    description: 'App Update',
    timestamp: '06/04/2021',
    updates: [
      'Added "Next Update" for the Summary',
      'Updated all table configuration for columns and headers'
    ]
  },
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
      'Updated UA agents UI',
      'Updated UA agents detailed component',
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
      'Updated UA agents popup',
      'Updated navigation colors',
      'Fixed UA summary click/popup feature',
      'Fixed IRAB download for deactivated only',
      'Fixed date change for UA history',
      'Fixed OneHub uploader',
      'Removed tooltip for all tables'
    ]
  },
  {
    version: '1.0.14',
    description: 'App Update',
    timestamp: '04/16/2021',
    updates: [
      'Added UA history page',
      'Added loading for table reports',
      'Added new columns for IRAB unique agents',
      'Updated routes',
      'Updated UA history',
      'Updated UA history agents table',
      'Updated table settings',
      'Updated layout',
      'Fixed UA sumamry report',
      'Fixed UA date mapping',
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
      'Updated UA summary report',
      'Updated IRAB report',
      'Updated UI layout',
      'Fixed UA data sorting'
    ]
  },
  {
    version: '1.0.11',
    description: 'App Update',
    timestamp: '03/31/2021',
    updates: [
      'Added month filter for IRAB report',
      'Added IRAB blacklisting',
      'Added site and vendor filters for UA summary report',
      'Updated IRAB report',
      'Updated routings',
      'Updated UA data processing',
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
      'Added as of for UA report summary',
      'Updated UA summary formula',
      'Updated UA agents report loading',
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
      'Updated UA summary report',
      'Updated app layout'
    ]
  },
  {
    version: '1.0.8',
    description: 'App Update',
    timestamp: '01/29/2021',
    updates: [
      'Updated UA data loading sequence',
      'Updated UA report summary',
      'Updated global notifications'
    ]
  },
  {
    version: '1.0.7',
    description: 'App Update',
    timestamp: '01/27/2021',
    updates: [
      'Added app navigation guards',
      'Updated UA summary report',
      'Updated UA summary notification'
    ]
  },
  {
    version: '1.0.6',
    description: 'App Update',
    timestamp: '01/25/2021',
    updates: [
      'Updated login functions',
      'Updated UA summary report',
      'Updated UA uploader',
      'Updated UA agent report',
      'Updated login page'
    ]
  },
  {
    version: '1.0.5',
    description: 'App Update',
    timestamp: '01/22/2021',
    updates: [
      'Updated UA summary report'
    ]
  },
  {
    version: '1.0.4',
    description: 'App Update',
    timestamp: '01/19/2021',
    updates: [
      'Updated UA dashboard'
    ]
  },
  {
    version: '1.0.3',
    description: 'App Update',
    timestamp: '01/13/2021',
    updates: [
      'Updated layout',
      'Updated routes',
      'Added UA page',
      'Added UA file uploader',
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
