<template>
  <div>
    <q-btn
      round
      icon="download"
      color="accent"
      class="absolute-top-right z-top"
      @click="downloadTable"
    />
    <!-- <div
      ref="table"
      class="text-black"
    ></div> -->
    <AwesomeLocalTable
      v-model="data"
      :options="options"
    />
  </div>
</template>

<script>
// import 'tabulator-tables/dist/css/tabulator.min.css'
// import Tabulator from 'tabulator-tables'
// import XLSX from 'xlsx'
// import 'xlsx/dist/xlsx.full.min.js'

import 'vue-tabulator/dist/scss/tabulator.scss'
import { TabulatorComponent } from 'vue-tabulator'

export default {
  components: {
    AwesomeLocalTable: TabulatorComponent
  },

  props: ['data'],

  watch: {
    data (val) {
      this.renderTable()
    }
  },

  data () {
    return {
      tabulator: null,
      options: {
        layout: 'fitDataStretch',
        height: 300,
        data: this.data,
        dataTree: true,
        dataTreeStartExpanded: false,
        index: 'Name',
        groupBy: 'Table',
        placeholder: 'No Data Set',
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
      }
    }
  },

  methods: {
    renderTable () {
      // this.tabulator = new Tabulator(this.$refs.table, {
      //   layout: 'fitDataStretch',
      //   height: 300,
      //   data: this.data,
      //   dataTree: true,
      //   dataTreeStartExpanded: false,
      //   index: 'Name',
      //   groupBy: 'Table',
      //   placeholder: 'No Data Set',
      //   columns: [
      //     {
      //       title: 'Name',
      //       field: 'Name',
      //       sorter: 'string'
      //     },
      //     {
      //       title: 'Agents',
      //       field: 'Agents',
      //       sorter: 'string'
      //     },
      //     {
      //       title: 'Complete',
      //       field: 'Complete',
      //       sorter: 'string'
      //     },
      //     {
      //       title: '%',
      //       field: 'Percent',
      //       sorter: 'string'
      //     }
      //   ]
      // })

      // this.tabulator.setSort([
      //   { column: 'Table', dir: 'asc' },
      //   { column: 'Name', dir: 'asc' }
      // ])
    },

    downloadTable () {
      // this.tabulator.download(XLSX, 'data.xlsx', { sheetName: 'My Data' })
      // TableExport(this.$refs.table)
    }
  },

  mounted () {
    this.renderTable()
  }
}
</script>
