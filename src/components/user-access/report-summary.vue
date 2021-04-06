<template>
  <q-card class="overflow-hidden">
    <!-- TABLE -->
    <q-card-section>
      <div
        class="text-h5 text-weight-light text-center"
        :class="textcolor"
      >{{ title }}</div>
      <div class="text-caption text-weight-light text-center">updated as of: {{ dateCheck }}</div>
      <div
        ref="table"
        class="rounded-borders"
      ></div>
    </q-card-section>

    <!-- FILTERS -->
    <q-card-section class="row q-col-gutter-sm">
      <q-select
        dense
        outlined
        class="col-12 col-md-6"
        v-model="vendor"
        :options="vendors"
        :display-value="`Company Name: ${vendor ? vendor : '*none*'}`"
        :disable="vendorDis"
      />
      <q-select
        dense
        outlined
        class="col-12 col-md-6"
        v-model="site"
        :options="sites"
        :display-value="`Site: ${site ? site : '*none*'}`"
      />
    </q-card-section>

    <!-- DOWNLOAD BTN -->
    <q-card-actions align="right">
      <!-- <q-btn
        flat
        label="CSV"
        color="accent"
        @click="csvTable"
      >
        <q-tooltip content-class="bg-accent">
          Raw Data
        </q-tooltip>
      </q-btn> -->

      <!-- <q-btn
        flat
        label="Copy"
        color="accent"
        @click="htmlTable"
      >
        <q-tooltip content-class="bg-accent">
          HTML Table
        </q-tooltip>
      </q-btn> -->

      <!--<q-btn
        flat
        label="XLSX"
        color="accent"
        @click="xlsxTable"
      /> -->

      <!-- COPY BTN -->
      <!-- <q-btn
        flat
        label="copy"
        color="accent"
        @click="copyTable"
      /> -->

      <!-- PRINT BTN -->
      <!-- <q-btn
        flat
        label="print"
        color="accent"
        @click="printTable"
      /> -->
    </q-card-actions>
  </q-card>
</template>

<script>
import 'tabulator-tables/dist/css/tabulator.min.css'
// import 'tabulator-tables/dist/css/tabulator_midnight.min.css'
import XLSX from 'xlsx/dist/xlsx.full.min.js'
import Tabulator from 'tabulator-tables'
import { exportFile } from 'quasar'
import { unparse } from 'papaparse'
import GetRepo from 'src/repository/get'
import { notify } from 'boot/notifier'

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
      vendor: '',
      site: ''
    }
  },

  methods: {
    renderTable () {
      const _this = this
      _this.tabulator = new Tabulator(this.$refs.table, {
        layout: 'fitData',
        maxHeight: 310,
        data: this.data,
        dataTree: true,
        index: 'Name',
        dataTreeStartExpanded: false,
        groupBy: 'Table',
        groupHeader: (value, count) => `${value} (${count} items)`,
        groupStartOpen: false,
        groupClosedShowCalcs: true,
        placeholder: 'No Data Set',
        columns: [
          {
            title: 'LOB',
            field: 'Name',
            sorter: 'string',
            width: '30px'
          },
          {
            title: 'Locked FTE',
            field: 'LockedFte',
            sorter: 'number'
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
            title: '% of Agents with Compelete Tools',
            field: 'Percent',
            sorter: 'number',
            formatter: (cell) => `${cell.getValue().toFixed(2)}%`,
            topCalc: (values, data) => {
              const Agents = data.reduce((x, y) => x + y.Agents, 0)
              const Complete = data.reduce((x, y) => x + y.Complete, 0)
              const Computed = (Complete / Agents) * 100
              return `${Computed.toFixed(2)}%`
            }
          }
        ],
        clipboard: true,
        printAsHtml: true,
        rowClick: (e, row) => {
          if (row.getTreeParent()) {
            const Vendor = row.getIndex()
            const { Name: Lob, Table } = row.getTreeParent().getData()

            _this.FetchUamDataFiltered(Lob, Vendor, Table)
          } else {
            const { Name: Lob, Table } = row.getData()

            _this.FetchUamDataFiltered(Lob, '%', Table)
          }
        }
      })

      this.tabulator.setSort([
        { column: 'Table', dir: 'asc' }
      ])
    },

    async FetchUamDataSummary () {
      try {
        const brand = this.title.split(' ')[0]
        const loBrand = brand.toLowerCase()

        const { data } = await GetRepo.UamDataSummary2(loBrand)

        return data
      } catch (err) {
        const statusText = err.response.statusText
        notify('Something went wrong', `Error: ${statusText}`, 'mdi-alert', 'red')
      }
    },

    async FetchUamDataFiltered (lob, vendor, table) {
      const brand = this.title.split(' ')[0].toUpperCase()
      const payload = {
        brand: brand,
        lob: lob,
        vendor: vendor,
        table: table
      }

      this.$q.loadingBar.start()
      notify('Fetching Data', 'Please wait while data loads', 'mdi-timer-sand', 'orange')

      try {
        const { data } = await GetRepo.UamDataAgentsDetailed(payload)

        this.$q.dialog({
          component: () => import('./report-agents-detailed'),
          parent: this,
          data: data,
          title: `${brand} ${lob}`
        })

        this.$q.loadingBar.stop()
      } catch (err) {
        console.log(err)
        this.$q.loadingBar.stop()
      }
    },

    csvTable () {
      // this.tabulator.download('csv', 'data.csv')
      this.FetchUamDataSummary()
        .then(data => {
          exportFile(`${this.title} Raw.csv`, unparse(data))
        })
    },

    xlsxTable () {
      this.tabulator.download('xlsx', `${this.title}.xlsx`)
    },

    copyTable () {
      this.tabulator.copyToClipboard()
    },

    printTable () {
      this.tabulator.print(false, true)
    },

    htmlTable () {
      this.tabulator.getHtml()
    }
  },

  mounted () {
    this.renderTable()
  }
}
</script>
