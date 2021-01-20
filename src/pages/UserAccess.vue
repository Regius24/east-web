<template>
  <q-page padding>
    <div class="row">
      <!-- SUMMARY REPORT -->
      <q-card class="col-12 overflow-auto">
        <q-card-section>
          <SUMMARY :data="uamDataSummaryPldt" />
        </q-card-section>
      </q-card>
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
    SUMMARY: () => import('components/user-access/report-summary')
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
            PLDT {
                'Total': {
                    'Agents': $sum($.Agents),
                    '${type}': $sum($.${type}),
                    '%': ($sum($.${type}) / $sum($.Agents)) * 100
                },
                Lob: {
                    'Agents': $sum(Agents),
                    '${type}': $sum(${type}),
                    '%': ($sum($.${type}) / $sum($.Agents)) * 100,
                    'Vendors': Vendor.{
                        'Name': $,
                        'Agents': %.Agents,
                        'Comelete': %.${type},
                        '%': ($sum(%.${type}) / $sum(%.Agents)) * 100
                    }
                }
            }
        `)

          // console.log(JSON.stringify(groupedData, null, ' '))
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
