<template>
  <div
    ref="table"
    class="text-black"
  ></div>
</template>

<script>
import 'tabulator-tables/dist/css/tabulator.min.css'
import Tabulator from 'tabulator-tables'

export default {
  components: {
  },

  props: ['data'],

  watch: {
    data (val) {
      this.renderTable()
    }
  },

  data () {
    return {
      tabulator: null
    }
  },

  methods: {
    renderTable () {
      this.tabulator = new Tabulator(this.$refs.table, {
        layout: 'fitDataStretch',
        height: 300,
        data: this.data,
        dataTree: true,
        dataTreeStartExpanded: false,
        index: 'Name',
        groupBy: 'Table',
        columns: [
          {
            title: 'Name',
            field: 'Name',
            sorter: 'string'
          },
          {
            title: 'Agents',
            field: 'Agents',
            sorter: 'string'
          },
          {
            title: 'Complete',
            field: 'Complete',
            sorter: 'string'
          },
          {
            title: '%',
            field: 'Percent',
            sorter: 'string'
          }
        ]
      })
    }
  },

  mounted () {
    this.renderTable()
  }
}
</script>
