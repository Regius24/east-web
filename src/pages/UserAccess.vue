<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-md">
      <!-- SUMMARY REPORT PLDT -->
      <div
        class="col-12 col-sm-12"
        :class="brandList.length > 1 ? 'col-md-6' : ''"
        v-show="brandCheck('Pldt')"
      >
        <SUMMARY
          :data="uamDataSummaryPldt"
          :date="uamDataSummaryPldtDate"
          :vendors="uamDataSummaryPldtVendors"
          :vendorDis="profileType === 'admin' ? false : true"
          :sites="uamDataSummaryPldtSites"
          :title="'PLDT Summary'"
          :textcolor="'text-primary'"
          @vendorChange="vendorChangePldt"
          @siteChange="siteChangePldt"
        />
      </div>

      <!-- SUMMARY REPORT SMART -->
      <div
        class="col-12 col-sm-12"
        :class="brandList.length > 1 ? 'col-md-6' : ''"
        v-show="brandCheck('Smart')"
      >
        <SUMMARY
          :data="uamDataSummarySmart"
          :date="uamDataSummarySmartDate"
          :vendors="uamDataSummarySmartVendors"
          :vendorDis="profileType === 'admin' ? false : true"
          :sites="uamDataSummarySmartSites"
          :title="'SMART Summary'"
          :textcolor="'text-secondary'"
          @vendorChange="vendorChangeSmart"
          @siteChange="siteChangeSmart"
        />
      </div>

      <!-- AGENT LIST REPORT -->
      <div class="col-12 col-sm-12">
        <q-card>
          <q-card-section>
            <!-- BRAND SELECTOR -->
            <q-btn-toggle
              unelevated
              class="q-mb-sm"
              v-model="uamDataAgentsType"
              toggle-color="accent"
              :options="uamDataAgentsOptions"
            />

            <AGENTS
              :brand="uamDataAgentsType"
              :data="uamDataAgents"
              :loading="uamDataAgentsLoad"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- UPLOAD BUTTON -->
    <q-page-sticky
      position="bottom-right"
      :offset="fabPos"
    >
      <q-btn
        fab
        icon="mdi-file-upload"
        color="accent"
        :disable="draggingFab"
        :style="showUploader ? '' : 'display: none;'"
        v-touch-pan.prevent.mouse="moveFab"
        @click="openUploader"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import { concat, sortBy, indexOf } from 'lodash'
import jsonata from 'jsonata'
import GetRepo from 'src/repository/get'
import { notify } from 'boot/notifier'

export default {
  name: 'UserAccess',

  components: {
    SUMMARY: () => import('components/user-access/report-summary'),
    AGENTS: () => import('components/user-access/report-agents')
  },

  computed: {
    // ...mapState('data', ['user', 'userProfile']),
    currentDay () { return date.formatDate(Date.now(), 'ddd') === 'Mon' },
    vendorSitePldt () { return { vendor: this.uamDataSummaryPldtVendor, site: this.uamDataSummaryPldtSite } },
    vendorSiteSmart () { return { vendor: this.uamDataSummarySmartVendor, site: this.uamDataSummarySmartSite } }
  },

  data () {
    return {
      profileType: '',
      vendorType: '',
      brandList: [],

      uamDataSummaryPldt: [],
      uamDataSummarySmart: [],
      uamDataSummaryPldtDate: null,
      uamDataSummarySmartDate: null,

      uamDataSummaryPldtVendor: 'All',
      uamDataSummaryPldtVendors: [],
      uamDataSummarySmartVendor: 'All',
      uamDataSummarySmartVendors: [],
      uamDataSummaryPldtSite: 'All',
      uamDataSummaryPldtSites: [],
      uamDataSummarySmartSite: 'All',
      uamDataSummarySmartSites: [],

      uamDataAgentsType: '',
      uamDataAgentsLoad: true,
      uamDataAgentsOptions: [],
      uamDataAgents: [],

      showUploader: false,
      fabPos: [18, 18],
      draggingFab: false
    }
  },

  watch: {
    async uamDataAgentsType (val) {
      this.uamDataAgentsLoad = true

      try {
        const vendor = this.profileType === 'admin' ? '%' : this.profileType
        const { data } = await GetRepo.UamDataAgents(val, vendor)

        this.uamDataAgents = data
        this.uamDataAgentsLoad = false
      } catch (err) {
        const statusText = err.response.statusText
        notify('Something went wrong', `Error: ${statusText}`, 'mdi-alert', 'red')
      }
    },

    vendorSitePldt (val) {
      const vendor = val.vendor === 'All' ? '%' : val.vendor
      const site = val.site === 'All' ? '%' : val.site

      this.FetchUamDataSummary('Pldt', 'pldt', vendor, site)
    },
    vendorSiteSmart (val) {
      const vendor = val.vendor === 'All' ? '%' : val.vendor
      const site = val.site === 'All' ? '%' : val.site

      this.FetchUamDataSummary('Smart', 'smart', vendor, site)
    }
  },

  methods: {
    moveFab (ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    },

    openUploader () {
      this.$q.dialog({
        component: () => import('components/user-access/uploader'),
        parent: this
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    },

    brandCheck (brand) {
      return this.brandList.indexOf(brand) > -1
    },

    async FetchUamDataSummary (brand, loBrand, vendor, site) {
      try {
        // QUERY ALL TABLES
        let { data } = await GetRepo.UamDataSummary(loBrand, vendor, site)
        const tableOrder = ['ACTIVE', 'TRAINEES', 'INACTIVE', 'RESIGNED']

        this[`uamDataSummary${brand}Date`] = data[0]

        // FORMAT JSON
        const expression = jsonata(`
          $ { Table: $ } ~> $each(function($v1, $k1){
              {
                  'Date': $distinct($v1.Date),
                  'Name': $k1,
                  'LockedFte': '',
                  'Agents': $sum($v1.Agents),
                  'Complete': $sum($v1.Complete),
                  'Score': $round(($sum($v1.Complete)/$sum($v1.Agents)) * 100, 2),
                  'Table': $k1,
                  'Brand': $distinct($v1.Brand),
                  'Lob': '%',
                  'Vendor': '%',
                  '_children': $v1 { Lob: $ } ~> $each(function($v2, $k2) {
                      {
                          'Name': $k2,
                          'LockedFte': '',
                          'Agents': $sum($v2.Agents),
                          'Complete': $sum($v2.Complete),
                          'Score': $round(($sum($v2.Complete)/$sum($v2.Agents)) * 100, 2),
                          'Table': $k1,
                          'Brand': $distinct($v2.Brand),
                          'Lob': $k2,
                          'Vendor': '%',
                          '_children': $v2 { Vendor: $ } ~> $each(function($v3, $k3) {
                              {
                                  'Name': $k3,
                                  'LockedFte': $v3.LockedFte,
                                  'Agents': $sum($v3.Agents),
                                  'Complete': $sum($v3.Complete),
                                  'Score': $round(($sum($v3.Complete)/$sum($v3.Agents)) * 100, 2),
                                  'Table': $k1,
                                  'Brand': $v3.Brand,
                                  'Lob': $v3.Lob,
                                  'Vendor': $k3
                              }
                          })
                      }
                  })
              }
          })
        `)
        data = expression.evaluate(sortBy(data, obj => indexOf(tableOrder, obj.Table)))

        this[`uamDataSummary${brand}`] = data
      } catch (err) {
        const statusText = err.response.statusText
        notify('Something went wrong', `Error: ${statusText}`, 'mdi-alert', 'red')
      }
    },

    async FetchFilters () {
      try {
        const { data: pldtVendor } = await GetRepo.UamDataAgentsDistinctCol('PLDT', 'CompanyName')
        const { data: smartVendor } = await GetRepo.UamDataAgentsDistinctCol('SMART', 'Company Name')
        const { data: pldtSite } = await GetRepo.UamDataAgentsDistinctCol('PLDT', 'Site')
        const { data: smartSite } = await GetRepo.UamDataAgentsDistinctCol('SMART', 'Site')

        this.uamDataSummaryPldtVendors = concat('All', pldtVendor.map(m => m.CompanyName))
        this.uamDataSummarySmartVendors = concat('All', smartVendor.map(m => m['Company Name']))
        this.uamDataSummaryPldtSites = concat('All', pldtSite.map(m => m.Site))
        this.uamDataSummarySmartSites = concat('All', smartSite.map(m => m.Site))
      } catch (err) {
        const statusText = err.response.statusText
        notify('Something went wrong', `Error: ${statusText}`, 'mdi-alert', 'red')
      }
    },

    fetchData () {
      const _this = this
      const vendor = _this.profileType === 'admin' ? '%' : _this.vendorType
      const site = '%'

      if (_this.brandCheck('Pldt')) _this.FetchUamDataSummary('Pldt', 'pldt', vendor, site)
      if (_this.brandCheck('Smart')) _this.FetchUamDataSummary('Smart', 'smart', vendor, site)

      _this.FetchFilters()

      _this.uamDataAgentsType = _this.brandList[0]
      _this.uamDataAgentsOptions = _this.brandList.map(m => ({ label: m.toUpperCase(), value: m }))
    },

    vendorChangePldt (val) { this.uamDataSummaryPldtVendor = val },
    vendorChangeSmart (val) { this.uamDataSummarySmartVendor = val },
    siteChangePldt (val) { this.uamDataSummaryPldtSite = val },
    siteChangeSmart (val) { this.uamDataSummarySmartSite = val }
  },

  async beforeMount () {
    try {
      const { data } = await GetRepo.UserProfile(this.$q.localStorage.getItem('userAccnt'))

      this.brandList = data[0].brand.split(',').map(m => m.replace(/(^|\s)\S/g, l => l.toUpperCase()))
      this.profileType = data[0].profile
      this.vendorType = data[0].vendor
      this.showUploader = data[0].upload

      this.fetchData()
    } catch (err) {
      console.log(err)
      notify('Something went wrong', '', 'mdi-alert', 'red')
    }
  },

  mounted () {
    notify('Fetching Data', 'Please wait while data loads', 'mdi-timer-sand', 'orange')
  }
}
</script>
