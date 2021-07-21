<template>
  <q-card>
    <q-card-section class="row justify-end">
      <!-- FILTER -->
      <!-- <q-select
        dense
        outlined
        label="Month Filter"
        class="col-4 q-mb-sm"
        style="max-width: 30%;"
        v-model="month"
        :options="months"
      /> -->

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
import { date } from 'quasar'
import { take } from 'lodash'

export default {
  name: 'Summary',

  props: ['data', 'months'],

  data () {
    return {
      month: 'YTD',
      processedData: [],
      columns: [
        {
          title: 'JAN',
          headerHozAlign: 'center',
          columns: [
            {
              title: 'CNT',
              field: 'JANCo',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            },
            {
              title: 'AMT',
              field: 'JANAm',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            }
          ]
        },
        {
          title: 'FEB',
          headerHozAlign: 'center',
          columns: [
            {
              title: 'CNT',
              field: 'FEBCo',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            },
            {
              title: 'AMT',
              field: 'FEBAm',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            }
          ]
        },
        {
          title: 'MAR',
          headerHozAlign: 'center',
          columns: [
            {
              title: 'CNT',
              field: 'MARCo',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            },
            {
              title: 'AMT',
              field: 'MARAm',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            }
          ]
        },
        {
          title: 'APR',
          headerHozAlign: 'center',
          columns: [
            {
              title: 'CNT',
              field: 'APRCo',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            },
            {
              title: 'AMT',
              field: 'APRAm',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            }
          ]
        },
        {
          title: 'MAY',
          headerHozAlign: 'center',
          columns: [
            {
              title: 'CNT',
              field: 'MAYCo',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            },
            {
              title: 'AMT',
              field: 'MAYAm',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            }
          ]
        },
        {
          title: 'JUN',
          headerHozAlign: 'center',
          columns: [
            {
              title: 'CNT',
              field: 'JUNCo',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            },
            {
              title: 'AMT',
              field: 'JUNAm',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            }
          ]
        },
        {
          title: 'JUL',
          headerHozAlign: 'center',
          columns: [
            {
              title: 'CNT',
              field: 'JULCo',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            },
            {
              title: 'AMT',
              field: 'JULAm',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            }
          ]
        },
        {
          title: 'AUG',
          headerHozAlign: 'center',
          columns: [
            {
              title: 'CNT',
              field: 'AUGCo',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            },
            {
              title: 'AMT',
              field: 'AUGAm',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            }
          ]
        },
        {
          title: 'SEP',
          headerHozAlign: 'center',
          columns: [
            {
              title: 'CNT',
              field: 'SEPCo',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            },
            {
              title: 'AMT',
              field: 'SEPAm',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            }
          ]
        },
        {
          title: 'OCT',
          headerHozAlign: 'center',
          columns: [
            {
              title: 'CNT',
              field: 'OCTCo',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            },
            {
              title: 'AMT',
              field: 'OCTAm',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            }
          ]
        },
        {
          title: 'NOV',
          headerHozAlign: 'center',
          columns: [
            {
              title: 'CNT',
              field: 'NOVCo',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            },
            {
              title: 'AMT',
              field: 'NOVAm',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            }
          ]
        },
        {
          title: 'DEC',
          headerHozAlign: 'center',
          columns: [
            {
              title: 'CNT',
              field: 'DECCo',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            },
            {
              title: 'AMT',
              field: 'DECAm',
              formatter: 'money',
              formatterParams: { precision: false },
              topCalc: 'sum',
              topCalcFormatter: 'money',
              topCalcFormatterParams: { precision: false }
            }
          ]
        }
      ]
    }
  },

  computed: {
    monthCols () {
      const monthNo = date.formatDate(Date.now(), 'M')
      return take(this.columns, monthNo)
    }
  },

  watch: {
    data (val) {
      const expression = jsonata(`
        $ { ENTITY: $ } ~> $each(function($v1, $k1){
            {
                'NAME': $k1,
                'YTDCo': $sum($v1.YTDCo),
                'JANCo': $sum($v1.JanCo),
                'FEBCo': $sum($v1.FebCo),
                'MARCo': $sum($v1.MarCo),
                'APRCo': $sum($v1.AprCo),
                'MAYCo': $sum($v1.MayCo),
                'JUNCo': $sum($v1.JunCo),
                'JULCo': $sum($v1.JulCo),
                'AUGCo': $sum($v1.AugCo),
                'SEPCo': $sum($v1.SepCo),
                'OCTCo': $sum($v1.OctCo),
                'NOVCo': $sum($v1.NovCo),
                'DECCo': $sum($v1.DecCo),
                'YTDAm': $sum($v1.YTDAm),
                'JANAm': $sum($v1.JanAm),
                'FEBAm': $sum($v1.FebAm),
                'MARAm': $sum($v1.MarAm),
                'APRAm': $sum($v1.AprAm),
                'MAYAm': $sum($v1.MayAm),
                'JUNAm': $sum($v1.JunAm),
                'JULAm': $sum($v1.JulAm),
                'AUGAm': $sum($v1.AugAm),
                'SEPAm': $sum($v1.SepAm),
                'OCTAm': $sum($v1.OctAm),
                'NOVAm': $sum($v1.NovAm),
                'DECAm': $sum($v1.DecAm),
                '_children': $v1 { \`COMPANY NAME\`: $ } ~> $each(function($v2, $k2) {
                    {
                        'NAME': $k2,
                        'YTDCo': $sum($v2.YTDCo),
                        'JANCo': $sum($v2.JanCo),
                        'FEBCo': $sum($v2.FebCo),
                        'MARCo': $sum($v2.MarCo),
                        'APRCo': $sum($v2.AprCo),
                        'MAYCo': $sum($v2.MayCo),
                        'JUNCo': $sum($v2.JunCo),
                        'JULCo': $sum($v2.JulCo),
                        'AUGCo': $sum($v2.AugCo),
                        'SEPCo': $sum($v2.SepCo),
                        'OCTCo': $sum($v2.OctCo),
                        'NOVCo': $sum($v2.NovCo),
                        'DECCo': $sum($v2.DecCo),
                        'YTDAm': $sum($v2.YTDAm),
                        'JANAm': $sum($v2.JanAm),
                        'FEBAm': $sum($v2.FebAm),
                        'MARAm': $sum($v2.MarAm),
                        'APRAm': $sum($v2.AprAm),
                        'MAYAm': $sum($v2.MayAm),
                        'JUNAm': $sum($v2.JunAm),
                        'JULAm': $sum($v2.JulAm),
                        'AUGAm': $sum($v2.AugAm),
                        'SEPAm': $sum($v2.SepAm),
                        'OCTAm': $sum($v2.OctAm),
                        'NOVAm': $sum($v2.NovAm),
                        'DECAm': $sum($v2.DecAm),
                        '_children': $v2 { \`TOOL NAME\`: $ } ~> $each(function($v3, $k3) {
                            {
                                'NAME': $k3,
                                'YTDCo': $sum($v3.YTDCo),
                                'JANCo': $sum($v3.JanCo),
                                'FEBCo': $sum($v3.FebCo),
                                'MARCo': $sum($v3.MarCo),
                                'APRCo': $sum($v3.AprCo),
                                'MAYCo': $sum($v3.MayCo),
                                'JUNCo': $sum($v3.JunCo),
                                'JULCo': $sum($v3.JulCo),
                                'AUGCo': $sum($v3.AugCo),
                                'SEPCo': $sum($v3.SepCo),
                                'OCTCo': $sum($v3.OctCo),
                                'NOVCo': $sum($v3.NovCo),
                                'DECCo': $sum($v3.DecCo),
                                'YTDAm': $sum($v3.YTDAm),
                                'JANAm': $sum($v3.JanAm),
                                'FEBAm': $sum($v3.FebAm),
                                'MARAm': $sum($v3.MarAm),
                                'APRAm': $sum($v3.AprAm),
                                'MAYAm': $sum($v3.MayAm),
                                'JUNAm': $sum($v3.JunAm),
                                'JULAm': $sum($v3.JulAm),
                                'AUGAm': $sum($v3.AugAm),
                                'SEPAm': $sum($v3.SepAm),
                                'OCTAm': $sum($v3.OctAm),
                                'NOVAm': $sum($v3.NovAm),
                                'DECAm': $sum($v3.DecAm)
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
      this.tabulator = new Tabulator(this.$refs.table, {
        layout: 'fitDataFill',
        virtualDomHoz: true,
        maxHeight: 400,
        data: this.processedData,
        dataTree: true,
        dataTreeStartExpanded: [true, false],
        index: 'Name',
        placeholder: 'No data to show...',
        columns: [
          {
            title: 'NAME',
            field: 'NAME',
            sorter: 'string',
            frozen: true,
            formatter: (cell) => `<span class="text-weight-medium">${cell.getValue()}</span>`
          },
          {
            title: 'YTD',
            headerHozAlign: 'center',
            frozen: true,
            columns: [
              {
                title: 'CNT',
                field: 'YTDCo',
                formatter: 'money',
                formatterParams: { precision: false },
                topCalc: 'sum',
                topCalcFormatter: 'money',
                topCalcFormatterParams: { precision: false }
              },
              {
                title: 'AMT',
                field: 'YTDAm',
                formatter: 'money',
                formatterParams: { precision: false },
                topCalc: 'sum',
                topCalcFormatter: 'money',
                topCalcFormatterParams: { precision: false }
              }
            ]
          },
          ...this.monthCols
        ]
      })

      this.tabulator.setSort([
        { column: 'COUNT', dir: 'desc' }
      ])
    }
  }
}
</script>
