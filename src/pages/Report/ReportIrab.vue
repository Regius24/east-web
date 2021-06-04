<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-md">
      <!-- SUMMARY -->
      <div class="col-12">
        <SUMMARY
          :data="summary"
          :months="months"
          @monthChange="monthChange"
        />
      </div>

      <!-- TABLE -->
      <div class="col-12">
        <TABLE :data="raw" />
      </div>
    </div>

    <!-- MENU BUTTON -->
    <q-page-sticky
      position="bottom-right"
      :offset="fabPos"
    >
      <q-fab
        v-model="fabRight"
        vertical-actions-align="right"
        color="accent"
        icon="mdi-menu"
        direction="up"
        :disable="draggingFab"
        :style="showUploader ? '' : 'display: none;'"
        v-touch-pan.prevent.mouse="moveFab"
      >
        <!-- IRAB UPLOAD -->
        <q-fab-action
          label-position="left"
          color="blue-grey"
          icon="mdi-file-upload"
          label="Upload Data"
          @click="openUploader"
        />

        <!-- BLACKLIST UPLOAD -->
        <q-fab-action
          label-position="left"
          color="blue-grey"
          icon="mdi-account-cancel"
          label="Check for Blacklist"
          @click="openUploaderBlacklist"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import GET from 'src/repository/get'
import { notify } from 'boot/notifier'
import { first, flatten, uniq } from 'lodash'

export default {
  name: 'ReportIrab',

  components: {
    SUMMARY: () => import('components/report/irab/summary'),
    TABLE: () => import('components/report/irab/table')
  },

  data () {
    return {
      months: [],
      summary: [],
      raw: [],

      profileType: '',
      showUploader: false,
      fabRight: false,
      fabPos: [18, 18],
      draggingFab: false
    }
  },

  watch: {
    profileType (val) {
      this.fetchRaw(val)
    },
    months (val) {
      const vendor = this.profileType === 'admin' ? '%' : this.profileType
      this.fetchSummary(first(val), vendor)
    }
  },

  async beforeMount () {
    try {
      const { data: user } = await GET.UserProfile(this.$q.localStorage.getItem('userAccnt'))

      this.showUploader = first(user).upload
      this.profileType = first(user).profile
    } catch (err) {
      console.log(err)
      notify('Something went wrong', '', 'mdi-alert', 'red')
    }
  },

  methods: {
    async fetchSummary (month, vendor) {
      const { data: summary } = await GET.IrabDataSummary(month, vendor)
      this.summary = summary
    },
    async fetchRaw (profile) {
      const vendor = profile === 'admin' ? '%' : profile
      const { data: raw } = await GET.IrabData(vendor)

      this.raw = raw
      this.months = uniq(flatten(raw.map(m => m.MONTH)))
      this.months.unshift('YTD')
    },

    async monthChange (val) {
      const vendor = this.profileType === 'admin' ? '%' : this.profileType
      this.fetchSummary(val === 'All' ? '%' : val, vendor)
    },

    moveFab (ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    },
    openUploader () {
      this.$q.dialog({
        component: () => import('components/report/irab/uploader'),
        parent: this
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    },
    openUploaderBlacklist () {
      this.$q.dialog({
        component: () => import('components/report/irab/uploader-blacklist'),
        parent: this
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    }
  },

  mounted () {
    notify('Fetching Data', 'Please wait while data loads', 'mdi-timer-sand', 'orange')
  }
}
</script>
