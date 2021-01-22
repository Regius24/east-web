<template>
  <q-card class="overflow-hidden">
    <!-- TABLE -->
    <q-card-section>
      <div class="text-h5">{{ title }}</div>
      <div
        ref="table"
        class="rounded-borders"
      ></div>
    </q-card-section>

    <q-card-actions align="right">
      <!-- DOWNLOAD BTN -->
      <q-btn
        flat
        label="CSV"
        color="accent"
        @click="csvTable"
      />

      <!-- COPY BTN -->
      <q-btn
        flat
        label="copy"
        color="accent"
        @click="copyTable"
      />

      <!-- PRINT BTN -->
      <q-btn
        flat
        label="print"
        color="accent"
        @click="printTable"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import 'tabulator-tables/dist/css/tabulator.min.css'
import Tabulator from 'tabulator-tables'

export default {
  components: {},

  props: ['data', 'title'],

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
        maxHeight: 300,
        data: this.data,
        dataTree: true,
        index: 'Name',
        dataTreeStartExpanded: false,
        groupBy: 'Table',
        groupStartOpen: false,
        groupClosedShowCalcs: true,
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
            sorter: 'number',
            topCalc: 'sum'
          },
          {
            title: 'Complete',
            field: 'Complete',
            sorter: 'number',
            topCalc: 'sum'
          },
          {
            title: '%',
            field: 'Percent',
            sorter: 'number',
            topCalc: 'sum'
          }
        ],
        clipboard: true,
        clipboardPasteAction: 'replace',
        printAsHtml: true
      })

      this.tabulator.setSort([
        { column: 'Table', dir: 'asc' },
        { column: 'Name', dir: 'asc' }
      ])
    },

    csvTable () {
      this.tabulator.download('csv', 'data.csv')
    },

    copyTable () {
      this.tabulator.copyToClipboard('all')
    },

    printTable () {
      this.tabulator.print(false, true)
    }
  },

  mounted () {
    this.renderTable()
  }
}
</script>
