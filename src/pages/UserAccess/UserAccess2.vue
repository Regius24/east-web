<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-md">
      <div class="col-12 col-sm-12">
        <SUMMARY
          :data="uamDataSummaryPldt"
          :date="uamDataSummaryPldtDate"
          :sites="uamDataSummaryPldtSites"
          :title="'PLDT Summary'"
          :textcolor="'text-primary'"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import GetRepo from 'src/repository/get'
import { first } from 'lodash'

export default {
  components: {
    SUMMARY: () => import('components/user-access/per-lob/report-summary2')
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

  methods: {
    brandCheck (brand) {
      return this.brandList.indexOf(brand) > -1
    },

    fetchData () {
      const _this = this
      const vendor = _this.profileType === 'admin' ? '%' : _this.vendorType
      const site = '%'

      if (_this.brandCheck('Pldt')) {
        _this.fetchSummary('Pldt', 'pldt', vendor, site)
      }
      if (_this.brandCheck('Smart')) {
        _this.fetchSummary('Smart', 'smart', vendor, site)
      }
    },

    async fetchSummary (brand, lobrand, vendor, site) {
      const { data } = await GetRepo.UamDataSummaryV2(lobrand, vendor, site)

      this[`uamDataSummary${brand}`] = data
    }
  },

  async beforeMount () {
    const { data } = await GetRepo.UserProfile(
      this.$q.localStorage.getItem('userAccnt')
    )
    const { brand, profile, vendor, uUALob } = first(data)

    this.brandList = brand
      .split(',')
      .map(m => m.replace(/(^|\s)\S/g, l => l.toUpperCase()))
    this.profileType = profile
    this.vendorType = vendor === '' || vendor === null ? '%' : vendor
    this.showUploader = uUALob

    this.fetchData()
  }
}
</script>
