<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-xs">
      <!-- SUMMARY REPORT PLDT -->
      <div
        class="col-12"
        :class="brandList.length > 1 ? 'col-md-6' : ''"
        v-show="brandCheck('Pldt')"
      >
        <SUMMARY
          :data="uamDataSummaryPldt"
          :title="'PLDT Summary'"
        />
      </div>

      <!-- SUMMARY REPORT SMART -->
      <div
        class="col-12 col-md-6"
        :class="brandList.length > 1 ? 'col-md-6' : ''"
        v-show="brandCheck('Smart')"
      >
        <SUMMARY
          :data="uamDataSummarySmart"
          :title="'SMART Summary'"
        />
      </div>

      <!-- AGENT LIST REPORT -->
      <div class="col-12">
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
        color="primary"
        @click="openUploader"
        :disable="draggingFab"
        v-touch-pan.prevent.mouse="moveFab"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import GetRepo from 'src/repository/get'
import { notify } from 'boot/notifier'
import { groupBy, flatten } from 'lodash'
import jsonata from 'jsonata'

export default {
  name: 'UserAccess',

  components: {
    SUMMARY: () => import('components/user-access/report-summary'),
    AGENTS: () => import('components/user-access/report-agents')
  },

  computed: {
    ...mapState('data', ['user']),
    brandList () { return this.user[0].brand.split(',').map(m => m.replace(/(^|\s)\S/g, l => l.toUpperCase())) },
    vendorType () { return this.user[0].vendor }
  },

  data () {
    return {
      uamDataSummaryPldt: [],
      uamDataSummarySmart: [],
      uamDataAgentsType: '',
      uamDataAgentsOptions: [],
      uamDataAgents: [],
      fabPos: [18, 18],
      draggingFab: false
    }
  },

  watch: {
    async uamDataAgentsType (val) {
      try {
        const vendor = this.vendorType === 'all' ? '%' : this.vendorType
        const { data } = await GetRepo.UamDataAgents(val, vendor)

        this.uamDataAgents = data
      } catch (err) {
        console.log(err)
      }
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
      })
    },

    brandCheck (brand) {
      return this.brandList.indexOf(brand) > -1
    },

    async FetchUamDataSummary (brand) {
      try {
        const loBrand = brand.toLowerCase()
        const hiBrand = brand.toUpperCase()
        // QUERY ALL TABLES
        let data = await Promise.all([
          GetRepo.UamDataSummary2(loBrand, 'ACTIVE'),
          GetRepo.UamDataSummary2(loBrand, 'TRAINEES'),
          GetRepo.UamDataSummary2(loBrand, 'RESIGNED')
        ])

        // FORMAT JSON
        data = data.map((m, i) => {
          const groupedData = groupBy(m.data, 'Brand')
          const expression = jsonata(`
            ${hiBrand} { Lob: $ }
            ~> $each(function($v, $k) {
                {
                    'Name': $k,
                    'Agents': $sum($v.Agents),
                    'Complete': $sum($v.Complete),
                    'Percent': $round(($sum($v.Complete)/$sum($v.Agents)) * 100, 2),
                    '_children': $v { 
                        Vendor: $ 
                    } ~> $each(function($v2, $k2) {
                        {
                            'Name': $k2,
                            'Agents': $sum($v2.Agents),
                            'Complete': $sum($v2.Complete),
                            'Percent': $round(($sum($v.Complete)/$sum($v.Agents)) * 100, 2)
                        }
                    })
                }
            })
        `)
          return expression.evaluate(groupedData)
        })

        // ADD TABLE IDENTIFIER
        data = data.map((m, i) => m.map(m2 => {
          if (i === 0) { m2.Table = 'ACTIVE' }
          if (i === 1) { m2.Table = 'TRAINEES' }
          if (i === 2) { m2.Table = 'RESIGNED' }

          return m2
        }))
        this[`uamDataSummary${brand}`] = flatten(data)
      } catch (err) {
        console.log(err)
      }
    },

    async FetchUamDataAgents (brand) {
      try {

      } catch (err) {
        console.log(err)
      }
    }
  },

  mounted () {
    notify('Fetching Data', 'Please wait while data loads', 'mdi-timer-sand', 'orange')

    const _this = this

    if (_this.brandCheck('Pldt')) _this.FetchUamDataSummary('Pldt')
    if (_this.brandCheck('Smart')) _this.FetchUamDataSummary('Smart')

    _this.uamDataAgentsType = _this.brandList[0]
    _this.uamDataAgentsOptions = _this.brandList.map(m => ({ label: m.toUpperCase(), value: m }))
  }
}
</script>
