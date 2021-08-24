<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-md">
      <div class="col-12">
        <SUMMARY
          :data="summary"
          :months="months"
          @monthChange="monthChange"
        />
      </div>

      <div class="col-12">
        <TABLE :data="raw" />
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
import GET from 'src/repository/get'
import { first, flatten, uniq } from 'lodash'
import { notify } from 'boot/notifier'

export default {
  name: 'ReportPassword',

  components: {
    SUMMARY: () => import('components/report/password/summary'),
    TABLE: () => import('components/report/password/table')
  },

  data () {
    return {
      months: [],
      summary: [],
      raw: [],

      brandList: [],
      profileType: '',
      vendorType: '',
      showUploader: false,
      fabPos: [18, 18],
      draggingFab: false
    }
  },

  watch: {
    async months (val) {
      try {
        if (this.brandList.length > 1) {
          const { data: summary } = await GET.PasswordDataSummary('%', this.vendorType)
          this.summary = summary
        } else {
          const { data: summary } = await GET.PasswordDataSummary(first(this.brandList), this.vendorType)
          this.summary = summary
        }
      } catch (err) {
        notify('Something went wrong', '', 'mdi-alert', 'red')
      }
    }
  },

  methods: {
    async monthChange (val) {
      try {
        if (this.brandList.length > 1) {
          const { data: summary } = await GET.PasswordDataSummary(val, '%', this.vendorType)
          this.summary = summary
        } else {
          const { data: summary } = await GET.PasswordDataSummary(val, first(this.brandList), this.vendorType)
          this.summary = summary
        }
      } catch (err) {
        notify('Something went wrong', '', 'mdi-alert', 'red')
      }
    },

    async FetchRaw (vendor) {
      try {
        if (this.brandList.length > 1) {
          const { data: raw } = await GET.PasswordData('%', vendor)

          this.raw = raw
          this.months = uniq(flatten(raw.map(m => m.MONTH)))
          this.months.unshift('YTD')
        } else {
          const { data: raw } = await GET.PasswordData(first(this.brandList), vendor)

          this.raw = raw
          this.months = uniq(flatten(raw.map(m => m.MONTH)))
          this.months.unshift('YTD')
        }
      } catch (err) {
        notify('Something went wrong', '', 'mdi-alert', 'red')
      }
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
        component: () => import('components/report/password/uploader2'),
        parent: this
      })
    }
  },

  async beforeMount () {
    try {
      const { data: user } = await GET.UserProfile(this.$q.localStorage.getItem('userAccnt'))
      const { uPassword, profile, brand, vendor } = first(user)

      this.showUploader = uPassword
      this.brandList = brand.split(',').map(m => m.toUpperCase())
      this.profileType = profile
      this.vendorType = vendor === '' || vendor === null ? '%' : vendor

      this.FetchRaw(this.vendorType)
    } catch (err) {
      notify('Something went wrong', '', 'mdi-alert', 'red')
    }
  },

  mounted () {
    notify('Fetching Data', 'Please wait while data loads', 'mdi-timer-sand', 'orange')
  }
}
</script>
