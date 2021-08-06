<template>
  <q-page padding>
    <div class="row q-col-gutter-md justify-center">
      <!-- PLDT -->
      <div class="col-12 col-md-11">
        <TABLE
          :title="'PLDT Medallia'"
          :titleClass="'text-primary'"
          :data="pldtData"
        />
      </div>

      <!-- SMART -->
      <div class="col-12 col-md-11">
        <TABLE
          :title="'SMART Medallia'"
          :titleClass="'text-secondary'"
          :data="smartData"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import GetRepo from 'src/repository/get'
import { first } from 'lodash'
import { notify } from 'boot/notifier'

export default {
  name: 'MedalliaReport',

  components: {
    TABLE: () => import('components/report/medallia/table.vue')
  },

  data () {
    return {
      profileType: '',
      vendorType: '',
      brandList: [],

      pldtData: [],
      smartData: []
    }
  },

  methods: {
    async initializeData (brand) {
      const { data } = await GetRepo.Medallia(brand)

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
      const { brand, profile, vendor } = first(data)

      this.brandList = brand.split(',').map(m => m.replace(/(^|\s)\S/g, l => l.toUpperCase()))
      this.profileType = profile
      this.vendorType = vendor === '' || vendor === null ? '%' : vendor

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
