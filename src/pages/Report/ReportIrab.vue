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
        v-touch-pan.prevent.mouse="moveFab"
      >
        <!-- IRAB UPLOAD -->
        <q-fab-action
          label-position="left"
          color="blue-grey"
          icon="mdi-file-upload"
          label="Upload Data"
          @click="openUploader"
          v-show="showUploader"
        />

        <!-- BLACKLIST UPLOAD -->
        <q-fab-action
          label-position="left"
          color="blue-grey-7"
          icon="mdi-account-cancel"
          label="Check for Redlist"
          @click="openUploaderBlacklist"
        />

        <!-- SHOW DEACTIVATED ONLY -->
        <!-- <q-fab-action color="blue-grey-8">
          <q-toggle
            dense
            v-model="deactivatedOnly"
            label="DEACTIVATED"
            color="orange"
          />
        </q-fab-action> -->
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import GET from 'src/repository/get'
import { info, negative } from 'boot/notifier'
import { first, flatten, uniq } from 'lodash'

export default {
  name: 'ReportIrab',

  components: {
    SUMMARY: () => import('components/report/irab/summary2'),
    TABLE: () => import('components/report/irab/table')
  },

  data () {
    return {
      deactivatedOnly: false,
      months: [],
      summary: [],
      raw: [],

      profileType: '',
      brandList: [],
      vendorType: '',
      showUploader: false,
      fabRight: false,
      fabPos: [18, 18],
      draggingFab: false
    }
  },

  watch: {
    profileType (val) {
      this.fetchRaw()
      this.deactivatedOnly = false
    },
    months (val) {
      this.fetchSummary(first(val), this.vendorType)
      this.deactivatedOnly = false
    },
    deactivatedOnly (val) {
      if (val) {
        this.summary = this.summary.filter(f => f.DEACTIVATED === 1)
        this.raw = this.raw.filter(f => f.STATUS === 'DEACTIVATED')
      } else {
        this.fetchRaw()
      }
    }
  },

  methods: {
    async fetchSummary (month, vendor) {
      const { data: summary } = await GET.IrabDataSummary(month, vendor)

      if (this.brandList.length > 1) {
        this.summary = summary
      } else {
        this.summary = summary.filter(f => f.BRAND === first(this.brandList).toUpperCase())
      }
    },
    async fetchRaw () {
      const vendor = this.vendorType
      const { data: raw } = await GET.IrabData(vendor)

      if (this.brandList.length > 1) {
        this.raw = raw
      } else {
        this.raw = raw.filter(f => f.BRAND === first(this.brandList).toUpperCase())
      }

      this.months = uniq(flatten(raw.map(m => m.MONTH)))
      this.months.unshift('YTD')
    },

    async monthChange (val) {
      this.fetchSummary(val, this.vendorType)
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
      })
    },
    openUploaderBlacklist () {
      this.$q.dialog({
        component: () => import('components/report/irab/uploader-blacklist'),
        parent: this
      })
    }
  },

  async beforeMount () {
    try {
      const { data: user } = await GET.UserProfile(this.$q.localStorage.getItem('userAccnt'))
      const { uIrab, profile, brand, vendor } = first(user)

      this.showUploader = uIrab
      this.brandList = brand.split(',').map(m => m.replace(/(^|\s)\S/g, l => l.toUpperCase()))
      this.profileType = profile
      this.vendorType = vendor === '' || vendor === null ? '%' : vendor
    } catch (err) {
      negative('Something went wrong', '')
    }
  },

  mounted () {
    info('Fetching Data', 'Please wait while data loads')
  }
}
</script>
