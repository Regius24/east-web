<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-md">
      <div class="col-12 col-md-6">
        <SUMMARY
          :title="'PLDT Audit Summary'"
          :data="pldtSummary"
          :textcolor="'text-primary'"
          v-show="brandCheck('Pldt')"
        />
      </div>

      <div class="col-12 col-md-6">
        <SUMMARY
          :title="'SMART Audit Summary'"
          :data="smartSummary"
          :textcolor="'text-secondary'"
          v-show="brandCheck('Pldt')"
        />
      </div>

      <div class="col-12">
        <TABLE :data="weeklyAuditList" />
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
import GetRepo from 'src/repository/get'
import { notify } from 'boot/notifier'

export default {
  name: 'UserAccessTools',

  components: {
    SUMMARY: () => import('components/user-access/audit/summary'),
    TABLE: () => import('components/user-access/audit/table')
  },

  data () {
    return {
      profileType: '',
      vendorType: '',
      brandList: [],

      showUploader: false,
      fabPos: [18, 18],
      draggingFab: false,

      pldtSummary: [],
      smartSummary: [],
      weeklyAuditList: []
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
        component: () => import('components/user-access/audit/uploader'),
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

    async fetchSummaryData (brand) {
      const { data } = await GetRepo.UamDataAuditSummary(brand)

      this[`${brand.toLowerCase()}Summary`] = data
    },

    async fetchWeeklyData () {
      const { data: weekly } = await GetRepo.UamDataAuditWeekly()

      this.weeklyAuditList = weekly
    }
  },

  async beforeMount () {
    try {
      const { data } = await GetRepo.UserProfile(this.$q.localStorage.getItem('userAccnt'))

      this.brandList = data[0].brand.split(',').map(m => m.replace(/(^|\s)\S/g, l => l.toUpperCase()))
      this.profileType = data[0].profile
      this.vendorType = data[0].vendor
      this.showUploader = data[0].upload

      this.brandList.forEach(brand => {
        this.fetchSummaryData(brand.toUpperCase())
      })

      this.fetchWeeklyData()
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
