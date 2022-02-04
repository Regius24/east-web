<template>
  <q-page
    padding
    class="row justify-center content-start q-col-gutter-md"
  >
    <div class="col-10 col-md-5">
      <q-select
        standout
        v-model="brandOption.model"
        :options="brandOption.list"
      />
    </div>
    <div class="col-10 col-md-5">
      <q-select
        standout
        emit-value
        map-options
        v-model="lobOption[brandOption.model].model"
        :options="lobOption[brandOption.model].list"
      />
    </div>
    <div class="col-10">
      <q-card>
        <q-img
          :src="getImage(lobOption[brandOption.model].model)"
          v-if="lobOption[brandOption.model].model !==''"
        />

        <q-img
          src="no-image"
          style="height: 140px;"
          v-else
        >
          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-red-9 text-h5 text-white text-weight-light">
              NOTHING TO LOAD YET
            </div>
          </template>
        </q-img>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import GET from 'src/repository/get'
import { info, negative } from 'boot/notifier'
import { first } from 'lodash'

const pldtImages = [
  { label: 'BILLING', value: 'pldt billing.jpg' },
  { label: 'BPO BILLING', value: 'pldt bpo billing.jpg' },
  { label: 'BPO REPAIR', value: 'pldt bpo repair.jpg' },
  { label: 'HOMEBRO', value: 'pldt homebro.jpg' },
  { label: 'REPAIR', value: 'pldt repair.jpg' },
  { label: 'SOCMED TECH', value: 'pldt socmed tech.jpg' },
  { label: 'SOCMED NONTECH', value: 'pldt socmend nontech.jpg' }
]

const smartImages = [
  { label: 'EBG', value: 'smart ebg.jpg' },
  { label: 'EXPERT CARE', value: 'smart expert care.jpg' },
  { label: 'POSTPAID/INFINITY', value: 'smart postpaid infinity.jpg' },
  { label: 'PREPAID', value: 'smart prepaid.jpg' },
  { label: 'SOCMED NONTECH', value: 'smart socmed nontech.jpg' },
  { label: 'SOCMED TECH', value: 'smart socmed tech.jpg' },
  { label: 'TRADE', value: 'smart trade.jpg' }
]

export default {
  name: 'TransactionFlowPage',

  data () {
    return {
      brandList: [],

      brandOption: {
        model: 'PLDT',
        list: ['PLDT', 'SMART']
      },

      lobOption: {
        PLDT: {
          model: '',
          list: pldtImages
        },
        SMART: {
          model: '',
          list: smartImages
        }
      }
    }
  },

  methods: {
    brandCheck (brand) { return this.brandList.indexOf(brand) > -1 },

    getImage (filename) { return require('../../assets/others/transaction flow/' + filename) }
  },

  async beforeMount () {
    try {
      const { data: user } = await GET.UserProfile(this.$q.localStorage.getItem('userAccnt'))
      const { brand } = first(user)

      this.brandList = brand.split(',')
      this.brandOption.model = first(brand.split(',')).toUpperCase()
      this.brandOption.list = brand.split(',').map(m => m.toUpperCase())
    } catch (err) {
      negative('Something went wrong', '')
    }
  },

  mounted () {
    info('Fetching Data', 'Please wait while data loads')
  }
}
</script>
