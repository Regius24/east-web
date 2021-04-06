<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-sm">
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
import { mapActions } from 'vuex'
import { flatten, concat } from 'lodash'
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

      uamDataSummaryPldtVendor: '',
      uamDataSummaryPldtVendors: [],
      uamDataSummarySmartVendor: '',
      uamDataSummarySmartVendors: [],
      uamDataSummaryPldtSite: '',
      uamDataSummaryPldtSites: [],
      uamDataSummarySmartSite: '',
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
      const vendor = val.vendor === '' ? '%' : val.vendor
      const site = val.site === '' ? '%' : val.site

      this.FetchUamDataSummary('Pldt', 'pldt', vendor, site)
    },
    vendorSiteSmart (val) {
      const vendor = val.vendor === '' ? '%' : val.vendor
      const site = val.site === '' ? '%' : val.site

      this.FetchUamDataSummary('Smart', 'smart', vendor, site)
    }
  },

  methods: {
    ...mapActions('data', ['SET_USERPROFILE']),
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
        let { data } = await GetRepo.UamDataSummary2(loBrand, vendor, site)

        this[`uamDataSummary${brand}Date`] = data[0]

        // FORMAT JSON
        const expression = jsonata(`
          $ { Table: $ } ~> $each(function($v1, $k1){
            $v1 { Lob: $ } ~> $each(function($v2, $k2){ 
                {
                    'Table': $distinct($v2.Table),
                    'Date': $distinct($v2.Date),
                    'Name': $k2,
                    'Agents': $sum($v2.Agents),
                    'Complete': $sum($v2.Complete),
                    'Percent': $round(($sum($v2.Complete)/$sum($v2.Agents)) * 100, 2),
                    '_children': $v2 { 
                        Vendor: $ 
                    } ~> $each(function($v3, $k3) {
                        {
                            'Name': $k3,
                            'LockedFte': $v3.LockedFte,
                            'Agents': $sum($v3.Agents),
                            'Complete': $sum($v3.Complete),
                            'Percent': $round(($sum($v3.Complete)/$sum($v3.Agents)) * 100, 2)
                        }
                    })
                }
            })
          })
        `)
        data = expression.evaluate(data)

        this[`uamDataSummary${brand}`] = flatten(data)
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

        this.uamDataSummaryPldtVendors = concat('', pldtVendor.map(m => m.CompanyName))
        this.uamDataSummarySmartVendors = concat('', smartVendor.map(m => m['Company Name']))
        this.uamDataSummaryPldtSites = concat('', pldtSite.map(m => m.Site))
        this.uamDataSummarySmartSites = concat('', smartSite.map(m => m.Site))
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

      // this.SET_USERPROFILE(data)
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
