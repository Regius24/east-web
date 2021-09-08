<template>
  <q-card>
    <q-card-section
      class="text-h5 text-center q-pb-none"
      :class="textColor"
    >{{ title }}</q-card-section>

    <q-card-section>
      <DxPivotGrid
        ref="grid"
        :data-source="pivotGridDataSource"
        @exporting="onExporting"
      >
        <DxExport :enabled="true" />
      </DxPivotGrid>
    </q-card-section>
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
  components: { DxPivotGrid, DxExport },

  props: ['title', 'textColor', 'data'],

  data () {
    return {
      pivotGridDataSource: null
    }
  },

  watch: {
    data (val) {
      this.pivotGridDataSource = new PivotGridDataSource({
        fields: [
          { caption: 'Subgroup', dataField: 'Subgroup', area: 'row', width: '200' },
          { caption: 'Vendor', dataField: 'Vendor', area: 'column' },
          { caption: 'Site', dataField: 'Site', area: 'column' },
          { caption: 'Agents', dataField: 'Agents', area: 'data', dataType: 'num', summaryType: 'sum' },
          { caption: 'Percentage', dataField: 'Agents', area: 'filter', dataType: 'num', summaryType: 'sum', summaryDisplayMode: 'percentOfRowGrandTotal' }
        ],
        store: this.data
      })
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
    }
  }
}
</script>

<style scoped>
</style>
