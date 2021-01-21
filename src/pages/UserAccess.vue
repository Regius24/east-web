<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-xs">
      <!-- SUMMARY REPORT -->
      <div
        class="col-12 col-md-4 overflow-auto"
        v-for="(table, i) in uamDataSummaryPldt"
        :key="i"
      >
        <q-card>
          <PLDTSUMMARY :data="table" />
        </q-card>
      </div>
    </div>

    <!-- UPLOAD BUTTON -->
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        fab
        icon="mdi-file-upload"
        color="primary"
        @click="openUploader"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { notify } from 'boot/notifier'
import { groupBy } from 'lodash'
import jsonata from 'jsonata'
import GetRepo from 'src/repository/get'
import UPLOADER from 'components/user-access/uploader'

export default {
  name: 'UserAccess',

  components: {
    PLDTSUMMARY: () => import('components/user-access/report-summary')
  },

  data () {
    return {
      uamDataSummaryPldt: []
    }
  },

  methods: {
    openUploader () {
      this.$q.dialog({
        component: UPLOADER,
        parent: this
      })
    },

    async FetchUamDataSummaryPldt () {
      try {
        let data = await Promise.all([
          GetRepo.UamDataSummary2('pldt', 'ACTIVE'),
          GetRepo.UamDataSummary2('pldt', 'TRAINEES'),
          GetRepo.UamDataSummary2('pldt', 'RESIGNED')
        ])

        data = data.map((m, i) => {
          const type = i === 2 ? 'Access' : 'Complete'
          const groupedData = groupBy(m.data, 'Brand')
          const expression = jsonata(`
            PLDT { Lob: $ }
            ~> $each(function($v, $k) {
                {
                    'Name': $k,
                    'Agents': $sum($v.Agents),
                    '${type}': $sum($v.${type}),
                    'Percent': $round(($sum($v.${type})/$sum($v.Agents)) * 100, 2),
                    '_children': $v { 
                        Vendor: $ 
                    } ~> $each(function($v2, $k2) {
                        {
                            'Name': $k2,
                            'Agents': $sum($v2.Agents),
                            '${type}': $sum($v2.${type}),
                            'Percent': $round(($sum($v.${type})/$sum($v.Agents)) * 100, 2)
                        }
                    })
                }
            })
        `)
          return expression.evaluate(groupedData)
        })

        this.uamDataSummaryPldt = data
      } catch (err) {
        console.log(err)
      }
    }
  },

  mounted () {
    notify('Fetching Data', 'Please wait while data loads', 'mdi-timer-sand', 'orange')

    this.FetchUamDataSummaryPldt()
  }
}
</script>
