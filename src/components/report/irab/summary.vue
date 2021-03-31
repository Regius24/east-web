<template>
  <q-card>
    <q-card-section class="row justify-end">
      <!-- FILTER -->
      <q-select
        dense
        outlined
        label="Month Filter"
        class="col-4 q-mb-sm"
        style="max-width: 30%;"
        v-model="month"
        :options="months"
      />

      <!-- TABLE -->
      <div class="col-12">
        <div
          ref="table"
          class="rounded-borders"
        ></div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import 'tabulator-tables/dist/css/tabulator.min.css'
import jsonata from 'jsonata'
import Tabulator from 'tabulator-tables'
import { isArray } from 'lodash'

export default {
  name: 'Summary',

  props: ['data', 'months'],

  data () {
    return {
      month: '',
      processedData: []
    }
  },

  watch: {
    data (val) {
      const expression = jsonata(`
        $ { BRAND: $ } ~> $each(function($v1, $k1){
            {
                'Name': $k1,
                'QH': $sum($v1.QH),
                'QW': $sum($v1.QW),
                'VH': $sum($v1.VH),
                'XFERS': $sum($v1.XFERS),
                'CORDER_CRITICAL': $sum($v1.CORDER_CRITICAL),
                'CORDER_NON_CRITICAL': $sum($v1.CORDER_NON_CRITICAL),
                'RETAINED': $sum($v1.RETAINED),
                'DEACTIVATED': $sum($v1.DEACTIVATED),
                '_children': $v1 { VENDOR: $ } ~> $each(function($v2, $k2) {
                    {
                        'Name': $k2,
                        'QH': $sum($v2.QH),
                        'QW': $sum($v2.QW),
                        'VH': $sum($v2.VH),
                        'XFERS': $sum($v2.XFERS),
                        'CORDER_CRITICAL': $sum($v2.CORDER_CRITICAL),
                        'CORDER_NON_CRITICAL': $sum($v2.CORDER_NON_CRITICAL),
                        'RETAINED': $sum($v2.RETAINED),
                        'DEACTIVATED': $sum($v2.DEACTIVATED),
                        '_children': $v2 { NAME: $ } ~> $each(function($v3, $k3){
                            {
                                'Name': $k3,
                                'QH': $sum($v3.QH),
                                'QW': $sum($v3.QW),
                                'VH': $sum($v3.VH),
                                'XFERS': $sum($v3.XFERS),
                                'CORDER_CRITICAL': $sum($v3.CORDER_CRITICAL),
                                'CORDER_NON_CRITICAL': $sum($v3.CORDER_NON_CRITICAL),
                                'RETAINED': $sum($v3.RETAINED),
                                'DEACTIVATED': $sum($v3.DEACTIVATED)
                            }
                        })
                    }
                })
            }
        })
      `)

      const procData = expression.evaluate(val)

      if (isArray(procData)) {
        this.processedData = procData
        this.renderTable()
      } else {
        this.processedData = [procData]
        this.renderTable()
      }
    },
    month (val) {
      this.$emit('monthChange', val)
    }
  },

  methods: {
    renderTable () {
      const _this = this
      _this.tabulator = new Tabulator(this.$refs.table, {
        layout: 'fitDataFill',
        virtualDomHoz: true,
        maxHeight: 400,
        data: this.processedData,
        dataTree: true,
        dataTreeStartExpanded: [true],
        index: 'Name',
        placeholder: 'No Data Set',
        columns: [
          {
            title: '',
            field: 'Name',
            sorter: 'string'
          },
          {
            title: 'QH',
            field: 'QH',
            sorter: 'number',
            topCalc: 'sum'
          },
          {
            title: 'QW',
            field: 'QW',
            sorter: 'number',
            topCalc: 'sum'
          },
          {
            title: 'VH',
            field: 'VH',
            sorter: 'number',
            topCalc: 'sum'
          },
          {
            title: 'XFERS',
            field: 'XFERS',
            sorter: 'number',
            topCalc: 'sum'
          },
          {
            title: 'CORDER_CRITICAL',
            field: 'CORDER_CRITICAL',
            sorter: 'number',
            topCalc: 'sum'
          },
          {
            title: 'CORDER_NON_CRITICAL',
            field: 'CORDER_NON_CRITICAL',
            sorter: 'number',
            topCalc: 'sum'
          },
          {
            title: 'RETAINED',
            field: 'RETAINED',
            sorter: 'number',
            topCalc: 'sum'
          },
          {
            title: 'DEACTIVATED',
            field: 'DEACTIVATED',
            sorter: 'number',
            topCalc: 'sum'
          }
        ]
      })
    }
  }
}
</script>
