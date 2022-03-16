<template>
  <q-card class="overflow-hidden">
    <DxPivotGrid
      :data-source="dataSource"
      :show-borders="true"
      :hover-state-enabled="true"
      @exporting="onExporting"
    >
      <DxExport :enabled="true" />
    </DxPivotGrid>
  </q-card>
</template>

<script>
import 'devextreme/dist/css/dx.dark.css'
import { DxPivotGrid, DxExport } from 'devextreme-vue/pivot-grid'
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source'
import { exportPivotGrid } from 'devextreme/excel_exporter'
import { Workbook } from 'exceljs'
import saveAs from 'file-saver'

export default {
  props: ['data'],

  components: {
    DxPivotGrid,
    DxExport
  },

  data () {
    return {
      dataSource: null
    }
  },

  watch: {
    data (val) {
      this.dataSource = new PivotGridDataSource({
        fields: [
          { caption: 'YEAR', dataField: 'YEAR', area: 'row', expanded: false },
          { caption: 'BRAND', dataField: 'BRAND', area: 'row', expanded: true },
          { caption: 'VENDOR', dataField: 'VENDOR', area: 'row' },
          { caption: 'AGENTS', dataField: 'NAME', area: 'data', summaryType: 'count' },
          { caption: 'INCIDENTS', dataField: 'TOTAL', area: 'data', summaryType: 'sum' },
          { caption: 'QH', dataField: 'QH', area: 'data', summaryType: 'sum' },
          { caption: 'QW', dataField: 'QW', area: 'data', summaryType: 'sum' },
          { caption: 'FRAUD', dataField: 'FRAUD', area: 'data', summaryType: 'sum' },
          { caption: 'XFERS', dataField: 'XFERS', area: 'data', summaryType: 'sum' },
          { caption: 'CORDER_CRITICAL', dataField: 'CORDER_CRITICAL', area: 'data', summaryType: 'sum' },
          { caption: 'CORDER_NON_CRITICAL', dataField: 'CORDER_NON_CRITICAL', area: 'data', summaryType: 'sum' },
          { caption: 'RETAINED', dataField: 'RETAINED', area: 'data', summaryType: 'sum' },
          { caption: 'DEACTIVATED', dataField: 'DEACTIVATED', area: 'data', summaryType: 'sum' }
        ],
        store: this.data
      })
    }
  },

  methods: {
    onExporting (e) {
      const title = 'Redlist Summary'
      const workbook = new Workbook()
      const worksheet = workbook.addWorksheet('Sheet1')

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
    }
  }
}
</script>
