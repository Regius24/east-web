<template>
  <q-card>
    <q-card-section class="row justify-end">
      <!-- FILTER -->
      <!-- <q-select
        dense
        outlined
        label="Month Filter"
        class="col-4 q-mb-sm"
        style="max-width: 30%;"
        v-model="month"
        :options="months"
      /> -->

      <!-- TABLE -->
      <div class="col-12">
        <div
          ref="table"
          class="rounded-borders"
        ></div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import 'tabulator-tables/dist/css/tabulator.min.css'
import Tabulator from 'tabulator-tables'

export default {
  name: 'Summary',

  props: ['data'],

  data () {
    return {
      processedData: []
    }
  },

  watch: {
    data (val) {
      this.renderTable()
    }
  },

  methods: {
    renderTable () {
      this.tabulator = new Tabulator(this.$refs.table, {
        layout: 'fitDataFill',
        virtualDomHoz: true,
        maxHeight: 400,
        data: this.processedData,
        dataTree: true,
        dataTreeStartExpanded: [true, false],
        index: 'Name',
        placeholder: 'No data to show...',
        columns: [
          {
            title: 'SUBGROUP',
            field: 'Subgroup',
            sorter: 'string',
            formatter: (cell) => `<span class="text-weight-medium">${cell.getValue()}</span>`
          },
          {
            title: 'Company Name',
            field: 'Company Name',
            sorter: 'string'
          }
        ]
      })
    }
  }
}
</script>
