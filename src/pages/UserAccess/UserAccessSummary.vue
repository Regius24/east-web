<template>
  <q-page padding>
    <!-- SUMMARIES -->
    <div class="row justify-center q-col-gutter-md">
      <!-- PLDT -->
      <div class="col-10">
        <SUMMARY
          :title="'Summarized PLDT Data'"
          :titleClass="'text-red'"
          :data="pldtData"
        />
      </div>

      <!-- SMART -->
      <div class="col-10">
        <SUMMARY
          :title="'Summarized SMART Data'"
          :titleClass="'text-green'"
          :data="smartData"
        />
      </div>
    </div>

    <!-- UPLOAD BUTTON -->
    <!-- <q-page-sticky
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
    </q-page-sticky> -->
  </q-page>
</template>

<script>
import GetRepo from 'src/repository/get'
import { first } from 'lodash'
import { notify } from 'boot/notifier'

export default {
  name: 'UserAccessSummary',

  components: {
    SUMMARY: () => import('components/user-access/summary/summary')
  },

  data () {
    return {
      profileType: '',
      vendorType: '',
      brandList: [],

      // showUploader: false,
      // fabPos: [18, 18],
      // draggingFab: false,

      pldtData: [],
      smartData: []
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
        component: () => import('components/user-access/per-lob/uploader'),
        parent: this
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    },

    async initializeData (brand, vendor, site) {
      const { data } = await GetRepo.UamDataSummaryAll(brand, vendor, site)

      this[`${brand}Data`] = data
    },

    fetchData () {
      const vendor = this.profileType === 'admin' ? '%' : this.vendorType
      const site = '%'

      this.brandList.forEach(brand => {
        this.initializeData(brand.toLowerCase(), vendor, site)
      })
    }
  },

  async beforeMount () {
    try {
      const { data } = await GetRepo.UserProfile(this.$q.localStorage.getItem('userAccnt'))
      const { brand, profile, vendor } = first(data)

      this.brandList = brand.split(',').map(m => m.replace(/(^|\s)\S/g, l => l.toUpperCase()))
      this.profileType = profile
      this.vendorType = vendor
      // this.showUploader = upload

      this.fetchData()
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
