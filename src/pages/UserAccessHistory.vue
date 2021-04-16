<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-sm">
      <!-- PLDT -->
      <div
        class="col-12 col-sm-12"
        :class="brandList.length > 1 ? 'col-md-6' : ''"
        v-show="brandCheck('Pldt')"
      >
        <SUMMARY
          title="PLDT Summary"
          txtColor="text-primary"
          brand="pldt"
          :data="pldtSummary"
          :date="pldtDate"
          :dates="pldtDateList"
          :vendors="pldtVendors"
          :vendorDis="profileType === 'admin' ? false : true"
          :sites="pldtSites"
          @vendorChange="vendorChange"
          @siteChange="siteChange"
        />
      </div>

      <!-- SMART -->
      <div
        class="col-12 col-sm-12"
        :class="brandList.length > 1 ? 'col-md-6' : ''"
        v-show="brandCheck('Pldt')"
      >
        <SUMMARY
          title="SMART Summary"
          txtColor="text-secondary"
          brand="smart"
          :data="smartSummary"
          :date="smartDate"
          :dates="smartDateList"
          :vendors="smartVendors"
          :vendorDis="profileType === 'admin' ? false : true"
          :sites="smartSites"
          @vendorChange="vendorChange"
          @siteChange="siteChange"
        />
      </div>

      <!-- TABLE -->
      <div class="col-12">
        <TABLE />
      </div>
    </div>
  </q-page>
</template>

<script>
import GetRepo from 'src/repository/get'
import jsonata from 'jsonata'
import { first, includes, sortBy, indexOf, concat } from 'lodash'
import { notify } from 'boot/notifier'

export default {
  name: 'UserAccessHistory',

  components: {
    SUMMARY: () => import('components/user-access-history/summary'),
    TABLE: () => import('components/user-access-history/table')
  },

  data () {
    return {
      brandList: [],
      profileType: '',
      vendorType: '',

      smartDate: '',
      pldtDate: '',
      smartDateList: [],
      pldtDateList: [],

      smartVendor: 'All',
      pldtVendor: 'All',
      smartVendors: [],
      pldtVendors: [],

      smartSite: 'All',
      pldtSite: 'All',
      smartSites: [],
      pldtSites: [],

      smartSummary: [],
      pldtSummary: []
    }
  },

  computed: {
    pldtVendorSite () {
      return { vendor: this.pldtVendor, site: this.pldtSite }
    },

    smartVendorSite () {
      return { vendor: this.smartVendor, site: this.smartSite }
    }
  },

  watch: {
    pldtVendorSite ({ vendor, site }) {
      const ven = vendor === 'All' ? '%' : vendor
      const sit = site === 'All' ? '%' : site

      this.fetchSummaryData('pldt', ven, sit)
    },

    smartVendorSite ({ vendor, site }) {
      const ven = vendor === 'All' ? '%' : vendor
      const sit = site === 'All' ? '%' : site

      this.fetchSummaryData('smart', ven, sit)
    }
  },

  methods: {
    brandCheck (brand) {
      return this.brandList.indexOf(brand) > -1
    },

    initFetchData () {
      if (includes(this.brandList, 'Pldt')) this.fetchFilters('pldt', 'p')
      if (includes(this.brandList, 'Smart')) this.fetchFilters('smart', 's')
    },

    async fetchFilters (brand, type) {
      const { data: dates } = await GetRepo.UamDataHistoryDates(brand, type)
      this[`${brand}DateList`] = dates
      this[`${brand}Date`] = first(dates).date

      const vendor = brand === 'pldt' ? 'CompanyName' : 'Company Name'
      const { data: vendors } = await GetRepo.UamDataAgentsHistoryDistinctCol(this[`${brand}Date`], brand.toUpperCase(), vendor)
      this[`${brand}Vendors`] = concat('All', vendors.map(m => m[vendor]))

      const { data: sites } = await GetRepo.UamDataAgentsHistoryDistinctCol(this[`${brand}Date`], brand.toUpperCase(), 'Site')
      this[`${brand}Sites`] = concat('All', sites.map(m => m.Site))

      this.fetchSummaryData(brand, this.vendorType, '%')
    },

    async fetchSummaryData (brand, vendor, site) {
      let { data: summary } = await GetRepo.UamDataSummaryHistory(this[`${brand}Date`], brand, vendor, site)

      const tableOrder = ['ACTIVE', 'TRAINEES', 'INACTIVE', 'RESIGNED']
      const expression = jsonata(`
          $ { Table: $ } ~> $each(function($v1, $k1){
              {
                  'Date': $distinct($v1.Date),
                  'Name': $k1,
                  'LockedFte': '',
                  'Agents': $sum($v1.Agents),
                  'Complete': $sum($v1.Complete),
                  'Score': $round(($sum($v1.Complete)/$sum($v1.Agents)) * 100, 2),
                  '_children': $v1 { Lob: $ } ~> $each(function($v2, $k2) {
                      {
                          'Name': $k2,
                          'LockedFte': '',
                          'Agents': $sum($v2.Agents),
                          'Complete': $sum($v2.Complete),
                          'Score': $round(($sum($v2.Complete)/$sum($v2.Agents)) * 100, 2),
                          '_children': $v2 { Vendor: $ } ~> $each(function($v3, $k3) {
                              {
                                  'Name': $k3,
                                  'LockedFte': $v3.LockedFte,
                                  'Agents': $sum($v3.Agents),
                                  'Complete': $sum($v3.Complete),
                                  'Score': $round(($sum($v3.Complete)/$sum($v3.Agents)) * 100, 2)
                              }
                          })
                      }
                  })
              }
          })
        `)
      summary = expression.evaluate(sortBy(summary, obj => indexOf(tableOrder, obj.Table)))

      this[`${brand}Summary`] = summary
    },

    vendorChange ({ brand, vendor }) { this[`${brand}Vendor`] = vendor },

    siteChange ({ brand, site }) { this[`${brand}Site`] = site }
  },

  async beforeMount () {
    const { data: user } = await GetRepo.UserProfile(this.$q.localStorage.getItem('userAccnt'))

    this.brandList = first(user).brand.split(',').map(m => m.replace(/(^|\s)\S/g, l => l.toUpperCase()))
    this.profileType = first(user).profile
    this.vendorType = first(user).profile === 'admin' ? '%' : first(user).vendor

    this.initFetchData()
  },

  mounted () {
    notify('Fetching Data', 'Please wait while data loads', 'mdi-timer-sand', 'orange')
  }
}
</script>
