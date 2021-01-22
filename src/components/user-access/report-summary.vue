<template>
  <q-card class="overflow-hidden">
    <!-- TABLE -->
    <q-card-section>
      <div
        ref="table"
        class="rounded-borders"
      ></div>
    </q-card-section>

    <q-card-actions align="right">
      <!-- COPY BTN -->
      <q-btn
        flat
        label="Copy Table"
        color="accent"
        @click="copyTable"
      />

      <!-- PRINT BTN -->
      <q-btn
        flat
        label="Print Table"
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
      const _this = this
      _this.tabulator = new Tabulator(this.$refs.table, {
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
