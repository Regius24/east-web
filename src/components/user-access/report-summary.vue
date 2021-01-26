<template>
  <q-card class="overflow-hidden">
    <!-- TABLE -->
    <q-card-section>
      <div class="text-h5 text-weight-light text-center q-mb-xs">{{ title }}</div>
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
      >
        <q-tooltip content-class="bg-accent">
          Raw Data
        </q-tooltip>
      </q-btn>

      <!-- <q-btn
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
// import XLSX from 'xlsx/dist/xlsx.full.min.js'
import Tabulator from 'tabulator-tables'
import { flatten } from 'lodash'
import { exportFile } from 'quasar'
import { unparse } from 'papaparse'
import GetRepo from 'src/repository/get'

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
      const _this = this
      _this.tabulator = new Tabulator(this.$refs.table, {
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
        { column: 'Table', dir: 'asc' },
        { column: 'Name', dir: 'asc' }
      ])
    },

    async FetchUamDataSummary () {
      try {
        const brand = this.title.split(' ')[0]
        const loBrand = brand.toLowerCase()
        // QUERY ALL TABLES
        let data = await Promise.all([
          GetRepo.UamDataSummary2(loBrand, 'ACTIVE'),
          GetRepo.UamDataSummary2(loBrand, 'TRAINEES'),
          GetRepo.UamDataSummary2(loBrand, 'RESIGNED')
        ])

        // ADD TABLE IDENTIFIER
        data = data
          .map(m => m.data)
          .map((m, i) => {
            return m.map((m2) => {
              if (i === 0) m2.Table = 'ACTIVE'
              if (i === 1) m2.Table = 'TRAINEES'
              if (i === 2) m2.Table = 'RESIGNED'

              return m2
            })
          })

        return flatten(data)
      } catch (err) {
        console.log(err)
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

      try {
        const { data } = await GetRepo.UamDataAgentsDetailed(payload)

        console.log(data)
      } catch (err) {
        console.log(err)
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
      // this.tabulator.download(XLSX, 'data.xlsx')
    },

    copyTable () {
      this.tabulator.copyToClipboard()
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
