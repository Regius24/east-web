<template>
  <q-page
    padding
    class="row justify-center q-col-gutter-md"
  >
    <!-- PLDT -->
    <div
      class="col-12"
      v-show="brandCheck('pldt')"
    >
      <TABLE
        :title="'PLDT Tools Matrix'"
        :data="pldtData"
        :color="'text-primary'"
      />
    </div>

    <!-- SMART -->
    <div
      class="col-12"
      v-show="brandCheck('smart')"
    >
      <TABLE
        :title="'SMART Tools Matrix'"
        :data="smartData"
        :color="'text-secondary'"
      />
    </div>
  </q-page>
</template>

<script>
import GET from 'src/repository/get'
import { negative, info } from 'boot/notifier'
import { first } from 'lodash'

import 'viewerjs/dist/viewer.min.css'

export default {
  name: 'ToolsTablePage',

  components: {
    TABLE: () => import('components/knowledgebase/toolsmapping/table.vue')
  },

  data () {
    return {
      brandList: [],

      pldtData: [],
      smartData: []
    }
  },

  methods: {
    brandCheck (brand) { return this.brandList.indexOf(brand) > -1 },

    async fetchData (brand) {
      const { data } = await GET.KBToolsMapping(brand)

      this[`${brand}Data`] = data
    }
  },

  async beforeMount () {
    try {
      const { data: user } = await GET.UserProfile(this.$q.localStorage.getItem('userAccnt'))
      const { brand } = first(user)

      this.brandList = brand.split(',')

      if (this.brandCheck('pldt')) { this.fetchData('pldt') }
      if (this.brandCheck('smart')) { this.fetchData('smart') }
    } catch (err) {
      negative('Something went wrong', '')
    }
  },

  mounted () { info('Fetching Data', 'Please wait while data loads') }
}
</script>
