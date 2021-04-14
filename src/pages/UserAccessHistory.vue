<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-sm">
      <!-- SMART -->
      <div class="col-12 col-md-6">
        <SUMMARY />
      </div>

      <!-- PLDT -->
      <div class="col-12 col-md-6">
        <SUMMARY />
      </div>

      <div class="col-12">
        <TABLE />
      </div>
    </div>
  </q-page>
</template>

<script>
import GetRepo from 'src/repository/get'
import jsonata from 'jsonata'
import { first, includes, flatten, sortBy, indexOf } from 'lodash'
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

      smartSummary: [],
      pldtSummart: []
    }
  },

  methods: {
    initFetchData () {
      if (includes(this.brandList, 'Pldt')) this.fetchDates('pldt', 'p')
      if (includes(this.brandList, 'Smart')) this.fetchDates('smart', 's')
    },
    async fetchDates (brand, type) {
      const { data: dates } = await GetRepo.UamDataHistoryDates(brand, type)
      this[`${brand}DateList`] = dates
      this[`${brand}Date`] = first(dates).date

      this.fetchSummaryData(brand, this.vendorType, '%')
    },
    async fetchSummaryData (brand, vendor, site) {
      let { data: summary } = await GetRepo.UamDataSummaryHistory(this[`${brand}Date`], brand, vendor, site)

      const tableOrder = ['ACTIVE', 'TRAINEES', 'INACTIVE', 'RESIGNED']
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
      summary = expression.evaluate(sortBy(summary, obj => indexOf(tableOrder, obj.Table)))
      this[`${brand}Summary`] = flatten(summary)
    }
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
