<template>
  <q-card class="overflow-hidden">
    <!-- TABLE -->
    <q-card-section>
      <div
        class="text-h5 text-weight-light text-center"
        :class="textcolor"
      >{{ title }}</div>
      <div class="text-caption text-weight-light text-center">updated as of: {{ dateCheck }}</div>
      <div class="text-caption text-weight-light text-center">next update: {{ nextDateCheck }}</div>
      <div
        ref="table"
        class="rounded-borders q-mt-sm"
      ></div>
    </q-card-section>

    <!-- FILTERS -->
    <q-card-section class="row justify-center q-col-gutter-sm">
      <div class="col-12 col-md-5">
        <q-select
          dense
          standout
          v-model="vendor"
          :options="vendors"
          :display-value="`Company Name: ${vendor}`"
          :disable="vendorDis"
        />
      </div>

      <div class="col-12 col-md-5">
        <q-select
          dense
          standout
          v-model="site"
          :options="sites"
          :display-value="`Site: ${site}`"
        />
      </div>

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

import GetRepo from 'src/repository/get'
import { notify } from 'boot/notifier'
import { date } from 'quasar'

window.jsPDF = jsPDF
window.XLSX = XLSX

export default {
  props: ['data', 'title', 'date', 'textcolor', 'vendors', 'sites', 'vendorDis'],

  computed: {
    dateCheck () {
      if (this.date == null) {
        return 'N/A'
      } else {
        return this.date.Date
      }
    },
    nextDateCheck () {
      if (this.date == null) {
        return 'N/A'
      } else {
        return date.formatDate(date.addToDate(this.date.Date, { days: 8 - date.getDayOfWeek(this.date.Date) }), 'MMM DD YYYY')
      }
    }
  },

  watch: {
    data (val) {
      this.renderTable()
    },

    vendor (val) { this.$emit('vendorChange', val) },

    site (val) { this.$emit('siteChange', val) }
  },

  data () {
    return {
      tabulator: null,
      vendor: 'All',
      site: 'All',
      showLoading: false
    }
  },

  methods: {
    renderTable () {
      const _this = this
      this.tabulator = new Tabulator(this.$refs.table, {
        layout: 'fitDataStretch',
        maxHeight: 310,
        data: this.data,
        dataTree: true,
        dataTreeStartExpanded: [true, false],
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
            title: 'Tool',
            field: 'Tool',
            sorter: 'string',
            visible: false
          },
          {
            title: 'Locked FTE',
            field: 'LockedFte',
            sorter: 'number'
          },
          {
            title: 'Agents',
            field: 'Agents',
            sorter: 'number'
          },
          {
            title: 'With Tools',
            field: 'Access',
            sorter: 'number'
          }
        ],
        downloadConfig: {
          rowGroups: true,
          dataTree: true
        },
        rowDblClick: (e, row) => {
          const { Table, Brand, Lob, Vendor } = row.getData()

          console.log(row.getData())

          _this.fetchOnehub(Brand, Lob, Vendor, Table)
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

    async fetchOnehub (brand, lob, vendor, table) {
      this.showLoading = true
      try {
        notify('Fetching Data', 'Please wait while data loads', 'mdi-timer-sand', 'orange')
        const { data } = await GetRepo.UamDataAgentsDetailed(brand, lob, vendor, table)

        this.openAgentsDetailed(data)
        this.showLoading = false
      } catch (err) {
        notify('Something went wrong', 'Error: no data found', 'mdi-alert', 'red')
        this.showLoading = false
      }
    },

    openAgentsDetailed (data) {
      this.$q.dialog({
        component: () => import('components/user-access/per-tool/report-agents-detailed'),
        parent: this,
        agentData: data
      })
        .onOk(() => (console.log('OK')))
        .onCancel(() => (console.log('Cancel')))
        .onDismiss(() => (console.log('Called on OK or Cancel')))
    }
  },

  mounted () {
    this.renderTable()
  }
}
</script>
