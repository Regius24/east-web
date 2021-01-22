<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-xs">
      <!-- SUMMARY REPORT PLDT -->
      <div class="col-12 col-md-6">
        <SUMMARY
          :data="uamDataSummaryPldt"
          :title="'PLDT Summary'"
        />
      </div>

      <!-- SUMMARY REPORT SMART -->
      <div class="col-12 col-md-6">
        <SUMMARY
          :data="uamDataSummarySmart"
          :title="'SMART Summary'"
        />
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
import { notify } from 'boot/notifier'
import { groupBy, flatten } from 'lodash'
import jsonata from 'jsonata'
import GetRepo from 'src/repository/get'
import UPLOADER from 'components/user-access/uploader'

export default {
  name: 'UserAccess',

  components: {
    SUMMARY: () => import('components/user-access/report-summary')
    // SUMMARY2: () => import('components/user-access/report-summary-fgv.vue')
  },

  data () {
    return {
      uamDataSummaryPldt: [],
      uamDataSummarySmart: [],
      fabPos: [18, 18],
      draggingFab: false
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
        component: UPLOADER,
        parent: this
      })
    },

    async FetchUamDataSummaryPldt () {
      try {
        // QUERY ALL TABLES
        let data = await Promise.all([
          GetRepo.UamDataSummary2('pldt', 'ACTIVE'),
          GetRepo.UamDataSummary2('pldt', 'TRAINEES'),
          GetRepo.UamDataSummary2('pldt', 'RESIGNED')
        ])

        // FORMAT JSON
        data = data.map((m, i) => {
          const groupedData = groupBy(m.data, 'Brand')
          const expression = jsonata(`
            PLDT { Lob: $ }
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

          console.log(m2)

          return m2
        }))
        this.uamDataSummaryPldt = flatten(data)

        // console.log(flatten(data))
      } catch (err) {
        console.log(err)
      }
    },

    async FetchUamDataSummarySmart () {
      try {
        // QUERY ALL TABLES
        let data = await Promise.all([
          GetRepo.UamDataSummary2('smart', 'ACTIVE'),
          GetRepo.UamDataSummary2('smart', 'TRAINEES'),
          GetRepo.UamDataSummary2('smart', 'RESIGNED')
        ])

        // FORMAT JSON
        data = data.map((m, i) => {
          const groupedData = groupBy(m.data, 'Brand')
          const expression = jsonata(`
            SMART { Lob: $ }
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
        this.uamDataSummarySmart = flatten(data)
      } catch (err) {
        console.log(err)
      }
    }
  },

  mounted () {
    notify('Fetching Data', 'Please wait while data loads', 'mdi-timer-sand', 'orange')

    this.FetchUamDataSummaryPldt()
    this.FetchUamDataSummarySmart()
  }
}
</script>
