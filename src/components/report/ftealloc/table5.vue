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
      />
    </q-card-section>
  </q-card>
</template>

<script>
import 'devextreme/dist/css/dx.material.teal.dark.css'
import { DxPivotGrid } from 'devextreme-vue/pivot-grid'
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source'

export default {
  components: { DxPivotGrid },

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
          { caption: 'Agents', dataField: 'Agents', area: 'data', dataType: 'num', summaryType: 'sum' }
        ],
        store: this.data
      })
    }
  }
}
</script>
