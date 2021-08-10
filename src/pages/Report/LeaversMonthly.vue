<template>
  <q-page padding>
    <!-- SUMMARIES -->
    <div class="row justify-center q-col-gutter-md">
      <!-- PLDT -->
      <div class="col-12">
        <SUMMARY
          :title="'Monthly Leavers for PLDT'"
          :titleClass="'text-red'"
          :data="pldtData"
          v-show="brandCheck('Pldt')"
        />
      </div>

      <!-- SMART -->
      <div class="col-12">
        <SUMMARY
          :title="'Monthly Leavers for SMART'"
          :titleClass="'text-green'"
          :data="smartData"
          v-show="brandCheck('Smart')"
        />
      </div>
    </div>

    <!-- UPLOAD BUTTON -->
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
        <q-fab-action
          label-position="left"
          color="red"
          icon="mdi-file-upload"
          label="Upload data for PLDT"
          v-show="brandCheck('Pldt')"
          @click="openUploader('Pldt')"
        />
        <q-fab-action
          label-position="left"
          color="green"
          icon="mdi-file-upload"
          label="Upload data for SMART"
          v-show="brandCheck('Smart')"
          @click="openUploader('Smart')"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import GetRepo from 'src/repository/get'
import { first } from 'lodash'
import { notify } from 'boot/notifier'

export default {
  name: 'UserAccessSummary',

  components: {
    SUMMARY: () => import('components/report/leavers-monthly/table')
  },

  data () {
    return {
      profileType: '',
      vendorType: '',
      brandList: [],

      showUploader: false,
      fabRight: false,
      fabPos: [18, 18],
      draggingFab: false,

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

    openUploader (brand) {
      this.$q.dialog({
        component: () => import('components/report/leavers-monthly/uploader.vue'),
        parent: this,
        brand: brand
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

    async initializeData (brand) {
      const { data } = await GetRepo.LeaversMonthly(brand)

      this[`${brand}Data`] = data
    },

    fetchData () {
      this.brandList.forEach(brand => {
        this.initializeData(brand.toLowerCase())
      })
    }
  },

  async beforeMount () {
    try {
      const { data } = await GetRepo.UserProfile(this.$q.localStorage.getItem('userAccnt'))
      const { brand, profile, vendor, uLeavers } = first(data)

      this.brandList = brand.split(',').map(m => m.replace(/(^|\s)\S/g, l => l.toUpperCase()))
      this.profileType = profile
      this.vendorType = vendor === '' || vendor === null ? '%' : vendor
      this.showUploader = uLeavers

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
