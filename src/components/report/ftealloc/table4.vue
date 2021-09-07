<template>
  <q-card class="overflow-auto row items-start">
    <div class="col-3">
      <JqxPivotDesigner
        style="width: 310px; height: 400px;"
        ref="pivotDesigner"
        :type="'pivotGrid'"
      >
      </JqxPivotDesigner>
    </div>
    <div class="col-9">
      <JqxPivotGrid
        style="width: 100%; height: 400px;"
        ref="pivotGrid"
        :source="pivotDataSource"
        :treeStyleRows="false"
        :autoResize="false"
        :multipleSelectionEnabled="true"
      >
      </JqxPivotGrid>
    </div>
  </q-card>
</template>

<script>
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css'
import JqxPivotGrid from 'jqwidgets-scripts/jqwidgets-vue/vue_jqxpivotgrid.vue'
import JqxPivotDesigner from 'jqwidgets-scripts/jqwidgets-vue/vue_jqxpivotdesigner.vue'

export default {
  components: { JqxPivotGrid, JqxPivotDesigner },

  props: ['data'],

  data () {
    return {
      pivotDataSource: null
    }
  },

  methods: {
    createPivotDataSource () {
      const source =
      {
        localdata: this.data,
        datatype: 'array',
        datafields:
          [
            { name: 'Subgroup', type: 'string' },
            { name: 'Vendor', type: 'string' },
            { name: 'Site', type: 'string' },
            { name: 'Agents', type: 'number' }
          ]
      }

      // eslint-disable-next-line no-undef, new-cap
      const dataAdapter = new jqx.dataAdapter(source)
      dataAdapter.dataBind()

      // eslint-disable-next-line no-undef, new-cap
      const pivotDataSource = new jqx.pivot(
        dataAdapter,
        {
          pivotValuesOnRows: false,
          rows: [{ dataField: 'Subgroup' }],
          columns: [{ dataField: 'Vendor', align: 'left' }, { dataField: 'Site', align: 'left' }],
          values: [{ dataField: 'Agents', function: 'sum' }]
        }
      )

      this.pivotDataSource = pivotDataSource

      setTimeout(() => {
        this.renderTable()
      }, 3000)
    },

    renderTable () {
      const pivotGridComponent = this.$refs.pivotGrid
      const pivotGridInstance = pivotGridComponent.getInstance()
      const pivotDesignerComponent = this.$refs.pivotDesigner

      pivotDesignerComponent.target = pivotGridInstance
      pivotDesignerComponent.refresh()
      pivotGridComponent.refresh()
    }
  },

  beforeMount () {
    this.createPivotDataSource()
  },

  mounted () {
  }
}
</script>
