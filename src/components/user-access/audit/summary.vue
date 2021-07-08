<template>
  <q-card class="overflow-hidden">
    <!-- TABLE -->
    <q-card-section>
      <div
        class="text-h5 text-weight-light text-center"
        :class="textcolor"
      >{{ title }}</div>
      <div
        ref="table"
        class="rounded-borders q-mt-sm"
      ></div>
    </q-card-section>

    <!-- <q-card-actions align="right">
      <q-btn
        flat
        label="PDF"
        color="accent"
        @click="pdfTable"
      />
    </q-card-actions> -->

    <q-inner-loading :showing="showLoading">
      <q-spinner-gears
        size="50px"
        color="grey-10"
      />
    </q-inner-loading>
  </q-card>
</template>

<script>
import 'tabulator-tables/dist/css/tabulator.min.css'
import XLSX from 'xlsx/dist/xlsx.full.min.js'
import Tabulator from 'tabulator-tables'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

window.jsPDF = jsPDF
window.XLSX = XLSX

export default {
  props: ['data', 'title', 'textcolor'],

  watch: {
    data (val) {
      this.renderTable()
    }
  },

  data () {
    return {
      tabulator: null,
      showLoading: true
    }
  },

  methods: {
    renderTable () {
      this.tabulator = new Tabulator(this.$refs.table, {
        layout: 'fitDataFill',
        maxheight: 240,
        data: this.data,
        dataTree: true,
        dataTreeStartExpanded: false,
        placeholder: 'No data to show...',
        columns: [
          {
            title: 'VENDOR',
            field: 'VENDOR',
            sorter: 'string'
          },
          {
            title: 'ACTIVE AGENTS',
            field: 'ACTIVE AGENTS',
            sorter: 'number',
            topCalc: 'sum'
          },
          {
            title: 'USERS W/ CORRECTION',
            field: 'USERS W/ CORRECTION',
            sorter: 'number',
            topCalc: 'sum'
          },
          {
            title: 'ACCURACY',
            field: 'ACCURACY',
            sorter: 'number',
            topCalc: 'avg',
            formatter: (cell) => cell.getValue().toFixed(2)
          }
        ],
        downloadConfig: {
          rowGroups: true,
          dataTree: true
        }
      })

      // this.tabulator.setSort([
      //   { column: 'Table', dir: 'asc' }
      // ])

      this.showLoading = false
    },

    xlsxTable () {
      this.tabulator.download('xlsx', `${this.title}.xlsx`)
    },

    pdfTable () {
      this.tabulator.setGroupStartOpen(true)
      this.tabulator.setGroupBy('Table')

      this.tabulator.download('pdf', `${this.title}.pdf`, {
        orientation: 'landscape',
        title: `${this.title}`,
        autoTable: function (doc) {
          return {
            includeHiddenHtml: true
          }
        }
      })
    }
  },

  mounted () {
    this.renderTable()
  }
}
</script>
