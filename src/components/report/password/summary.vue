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
        $ { ENTITY: $ } ~> $each(function($v1, $k1){
            {
                'Name': $k1,
                'COUNT': $sum($v1.COUNT),
                'AMOUNT': $sum($v1.AMOUNT),
                '_children': $v1 { \`COMPANY NAME\` : $ } ~> $each(function($v2, $k2) {
                    {
                        'Name': $k2,
                        'COUNT': $sum($v2.COUNT),
                        'AMOUNT': $sum($v2.AMOUNT),
                        '_children': $v2 { \`TOOL NAME\` : $ } ~> $each(function($v3, $k3) {
                        {
                            'Name': $k3,
                            'COUNT': $sum($v3.COUNT),
                            'AMOUNT': $sum($v3.AMOUNT)
                        }
                    })
                    }
                })
            }
        })
      `)

      this.processedData = expression.evaluate(val)
      this.renderTable()
    },
    month (val) {
      this.$emit('monthChange', val)
    }
  },

  methods: {
    renderTable () {
      const _this = this
      _this.tabulator = new Tabulator(this.$refs.table, {
        layout: 'fitColumns',
        virtualDomHoz: true,
        maxHeight: 400,
        data: this.processedData,
        dataTree: true,
        dataTreeStartExpanded: [true, false],
        index: 'Name',
        placeholder: 'No Data Set',
        columns: [
          {
            title: '',
            field: 'Name',
            sorter: 'string'
          },
          {
            title: 'COUNT',
            field: 'COUNT',
            sorter: 'number'
          },
          {
            title: 'AMOUNT',
            field: 'AMOUNT',
            sorter: 'number'
          }
        ]
      })
    }
  }
}
</script>
