<template>
  <q-card>
    <!-- TABLE -->
    <q-card-section>
      <div
        class="text-h5 text-weight-light text-center"
        :class="txtColor"
      >{{ title }}</div>
      <div
        ref="table"
        class="rounded-borders q-mt-sm"
      ></div>
    </q-card-section>

    <!-- FILTERS -->
    <q-card-section class="row justify-center q-col-gutter-sm">
      <!-- VENDORS -->
      <div class="col-12 col-md-3">
        <q-select
          dense
          outlined
          v-model="vendor"
          :options="vendors"
          :display-value="`Vendor: ${vendor}`"
          :disable="vendorDis"
        />
      </div>

      <!-- SITES -->
      <div class="col-12 col-md-3">
        <q-select
          dense
          outlined
          v-model="site"
          :options="sites"
          :display-value="`Site: ${site}`"
        />
      </div>

      <!-- DATES -->
      <div class="col-12 col-md-4">
        <q-select
          dense
          outlined
          v-model="dateChange"
          :options="dates"
          :display-value="`Date: ${dateChange}`"
          @input="dateChanged"
        />
      </div>

      <!-- DOWNLOAD -->
      <div class="col-12 col-md-2">
        <q-btn-dropdown
          outline
          color="accent"
          dropdown-icon="mdi-file-download"
          class="fit"
        >
          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="xlsxTable"
            >
              <q-item-section>
                <q-item-label>XLSX</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-close-popup
              @click="pdfTable"
            >
              <q-item-section>
                <q-item-label>PDF</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </q-card-section>
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
  props: ['title', 'txtColor', 'brand', 'data', 'date', 'dates', 'vendors', 'vendorDis', 'sites'],

  data () {
    return {
      tabulator: null,
      vendor: 'All',
      site: 'All',
      dateChange: ''
    }
  },

  watch: {
    data (val) {
      this.renderTable()
    },

    date (val) { this.dateChange = val },

    vendor (val) { this.$emit('vendorChange', { brand: this.brand, vendor: val }) },

    site (val) { this.$emit('siteChange', { brand: this.brand, site: val }) }
  },

  methods: {
    renderTable () {
      this.tabulator = new Tabulator(this.$refs.table, {
        layout: 'fitDataStretch',
        maxHeight: 310,
        data: this.data,
        dataTree: true,
        dataTreeStartExpanded: false,
        placeholder: 'No data to show...',
        columns: [
          {
            title: 'Name',
            field: 'Name',
            sorter: 'string',
            width: '35px',
            frozen: true,
            formatter: (cell) => `<span class="text-weight-medium">${cell.getValue()}</span>`
          },
          {
            title: 'Agents',
            field: 'Agents',
            sorter: 'number',
            topCalc: 'sum'
            // formatter: (cell) => cell.getValue().toFixed(2),
            // topCalcFormatter: (cell) => cell.getValue().toFixed(2)
          },
          {
            title: 'Complete',
            field: 'Complete',
            sorter: 'number',
            topCalc: 'sum'
            // formatter: (cell) => cell.getValue().toFixed(2),
            // topCalcFormatter: (cell) => cell.getValue().toFixed(2)
          },
          {
            title: 'Score',
            field: 'Score',
            sorter: 'number',
            formatter: (cell) => {
              if (cell.getRow().getData().Table === 'RESIGNED') {
                return `${(100 - cell.getValue()).toFixed(2)}%`
              } else {
                return `${cell.getValue().toFixed(2)}%`
              }
            },
            // topCalc: 'avg'
            topCalc: (values, data) => {
              const Agents = data.reduce((x, y) => x + y.Agents, 0)
              const Complete = data.reduce((x, y) => x + y.Complete, 0)
              const Computed = (Complete / Agents) * 100
              return `${Computed.toFixed(2)}%`
            }
          }
        ],
        downloadConfig: {
          rowGroups: true,
          dataTree: true
        }
      })

      this.tabulator.setSort([
        { column: 'Table', dir: 'asc' }
      ])
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
    },

    dateChanged () {
      this.$emit('dateChange', { brand: this.brand, date: this.dateChange })
    }
  },

  mounted () {
    this.renderTable()
  }
}
</script>
