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
        class="col-12"
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
        color="primary"
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
import { flatten } from 'lodash'
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
    currentDay () { return date.formatDate(Date.now(), 'ddd') === 'Mon' }
  },

  data () {
    return {
      brandList: [],
      profileType: '',
      showUploader: false,
      uamDataSummaryPldt: [],
      uamDataSummarySmart: [],
      uamDataAgentsType: '',
      uamDataAgentsLoad: true,
      uamDataAgentsOptions: [],
      uamDataAgents: [],
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
      })
    },

    brandCheck (brand) {
      return this.brandList.indexOf(brand) > -1
    },

    async FetchUamDataSummary (brand) {
      try {
        const loBrand = brand.toLowerCase()
        const vendor = this.profileType === 'admin' ? '%' : this.user[0].vendor

        // QUERY ALL TABLES
        let { data } = await GetRepo.UamDataSummary2(loBrand, vendor)

        // FORMAT JSON
        const expression = jsonata(`
            $ { Table: $ } ~> $each(function($v1, $k1){
            $v1 { Lob: $ } ~> $each(function($v2, $k2){ 
                {
                    'Table': $distinct($v2.Table),
                    'Name': $k2,
                    'Agents': $sum($v2.Agents),
                    'Complete': $sum($v2.Complete),
                    'Percent': $round(($sum($v2.Complete)/$sum($v2.Agents)) * 100, 2),
                    '_children': $v2 { 
                        Vendor: $ 
                    } ~> $each(function($v3, $k3) {
                        {
                            'Name': $k3,
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

    fetchData () {
      const _this = this

      if (_this.brandCheck('Pldt')) _this.FetchUamDataSummary('Pldt')
      if (_this.brandCheck('Smart')) _this.FetchUamDataSummary('Smart')

      _this.uamDataAgentsType = _this.brandList[0]
      _this.uamDataAgentsOptions = _this.brandList.map(m => ({ label: m.toUpperCase(), value: m }))
    }
  },

  async beforeMount () {
    const { data } = await GetRepo.UserProfile(this.$q.localStorage.getItem('userAccnt'))

    this.brandList = data[0].brand.split(',').map(m => m.replace(/(^|\s)\S/g, l => l.toUpperCase()))
    this.profileType = data[0].profile
    this.showUploader = data[0].upload

    // this.SET_USERPROFILE(data)
    this.fetchData()
  },

  mounted () {
    notify('Fetching Data', 'Please wait while data loads', 'mdi-timer-sand', 'orange')
  }
}
</script>
