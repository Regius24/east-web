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

    <!-- FILTERS -->
    <q-card-section class="row justify-center q-col-gutter-sm">
      <div class="col-12 col-md-6">
        <q-select
          dense
          outlined
          v-model="category"
          :options="categories"
          :display-value="`Category: ${category}`"
        />
      </div>

      <div class="col-12 col-md-6">
        <q-select
          dense
          outlined
          v-model="catVal"
          :options="catValues"
          :display-value="`Value: ${catVal}`"
          :disable="category === 'All'"
        />
      </div>

      <!-- <div class="col-12 col-md-2">
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
      </div> -->
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
  props: ['data', 'months', 'weeks', 'title', 'textcolor'],

  watch: {
    data (val) {
      this.renderTable()
    },

    filters (val) { this.$emit('filterChange', val) }
  },

  computed: {
    catValues () {
      if (this.category === 'Monthly') { return this.months } else if (this.category === 'Weekly') { return this.weeks } else return []
    },

    filters () {
      return { brand: this.title.split(' ')[0], category: this.category, value: this.catVal }
    }
  },

  data () {
    return {
      tabulator: null,
      showLoading: true,

      category: 'All',
      categories: ['All', 'Monthly', 'Weekly'],

      catVal: 'All'
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
