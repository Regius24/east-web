<template>
  <q-card class="overflow-hidden">
    <q-card-section>
      <pivot
        :data="data"
        :fields="fields"
        :row-field-keys="rowFieldKeys"
        :col-field-keys="colFieldKeys"
        :reducer="reducer"
      >
        <!-- Optional slots can be used for formatting table headers and values, see documentation below -->
      </pivot>
    </q-card-section>
  </q-card>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import { Pivot } from '@click2buy/vue-pivot-table'

export default {
  name: 'table2',

  props: ['data'],

  components: {
    Pivot
  },

  data () {
    return {
      fields: [
        {
          key: 'Subgroup',
          getter: item => item.Subgroup,
          label: 'Subgroup'
        },
        {
          key: 'Vendor',
          getter: item => item.Vendor,
          label: 'Vendor'
        },
        {
          key: 'Site',
          getter: item => item.Site,
          label: 'Site'
        },
        {
          key: 'Agents',
          getter: item => item.Agents,
          label: 'Agents'
        }
      ],
      rowFieldKeys: ['Subgroup'],
      colFieldKeys: ['Vendor', 'Site'],
      reducer: (sum, item) => sum + item.Agents
    }
  },

  watch: {
    data (val) {
    }
  },

  methods: {
  }
}
</script>
