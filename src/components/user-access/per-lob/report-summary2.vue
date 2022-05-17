<template>
  <q-card>
    <q-card-section>
      <div
        class="text-h5 text-weight-light text-center"
        :class="textcolor"
      >{{ title }}</div>
      <div class="text-caption text-weight-light text-center">updated as of: {{ dateCheck }}</div>
      <div class="text-caption text-weight-light text-center">next update on: {{ nextDateCheck }}</div>
      <div
        ref="table"
        class="rounded-borders"
      ></div>
    </q-card-section>

    <q-card-section>
      <DxPivotGrid
        ref="grid"
        show-totals-prior="rows"
        :data-source="pivotGridDataSource"
        :row-header-layout="'tree'"
        @exporting="onExporting"
        @cell-click="onCellClick"
      >
        <DxExport :enabled="true" />
      </DxPivotGrid>
    </q-card-section>

    <q-inner-loading :showing="showLoading">
      <q-spinner-gears
        size="50px"
        color="grey-10"
      />
    </q-inner-loading>
  </q-card>
</template>

<script>
import 'devextreme/dist/css/dx.dark.css'
import { DxPivotGrid, DxExport } from 'devextreme-vue/pivot-grid'
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source'
import { exportPivotGrid } from 'devextreme/excel_exporter'
import { Workbook } from 'exceljs'
import saveAs from 'file-saver'
import { date } from 'quasar'

export default {
  components: { DxPivotGrid, DxExport },

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
      this.pivotGridDataSource = new PivotGridDataSource({
        fields: [
          { caption: 'Table', dataField: 'Table', area: 'row', width: 100 },
          { caption: 'Lob', dataField: 'Lob', area: 'row', width: 200 },
          { caption: 'Vendor', dataField: 'Vendor', area: 'row' },
          { caption: 'Locked FTE', dataField: 'LockedFTE', area: 'data' },
          { caption: 'Access', dataField: 'Access', area: 'data', dataType: 'number', summaryType: 'sum' },
          {
            caption: 'Agents',
            dataField: 'EE Number',
            area: 'data',
            summaryType: 'custom',
            calculateCustomSummary: (options) => {
              switch (options.summaryProcess) {
                case 'start':
                  // Initializing "totalValue" here
                  break
                case 'calculate':
                  // Modifying "totalValue" here
                  break
                case 'finalize':
                  // Assigning the final value to "totalValue" here
                  break
              }
            }
          },
          {
            caption: 'Complete',
            dataField: 'Access',
            area: 'data',
            dataType: 'number',
            summaryType: 'sum',
            calculateSummaryValue: (summaryCell) => {
              const access = summaryCell.value('Access')
              const count = summaryCell.value('Count')

              return access === count ? 1 : 0
            }
          },
          {
            caption: 'Score',
            area: 'data',
            calculateSummaryValue: (summaryCell) => {
              const agents = summaryCell.value('EE Number')
              const complete = summaryCell.value('Complete')

              if (agents !== undefined && complete !== undefined) {
                return ((complete / agents) * 100).toFixed(2) + '%'
              }
            }
          }
        ],
        store: this.data
      })
    },

    vendor (val) { this.$emit('vendorChange', val) },

    site (val) { this.$emit('siteChange', val) }
  },

  data () {
    return {
      pivotGridDataSource: null,
      vendor: 'All',
      site: 'All',
      showLoading: false
    }
  },

  methods: {
    onExporting (e) {
      const title = this.title
      const workbook = new Workbook()
      const worksheet = workbook.addWorksheet('Main sheet')

      exportPivotGrid({
        component: e.component,
        worksheet: worksheet
      }).then(function () {
        workbook.xlsx.writeBuffer()
          .then(function (buffer) {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${title}.xlsx`)
          })
      })
      e.cancel = true
    },

    onCellClick (e) {
      if (e.area === 'data') {
        const row = e.rowFields

        row.map(field => {
          console.log(field.dataField)
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
