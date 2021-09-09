<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin overflow-auto"
      style="min-width: 80%; height: 60vh;"
    >
      <q-card-section class="fit">
        <div
          ref="table"
          class="fit"
          style="padding-bottom: 2.1em;"
        ></div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import 'tabulator-tables/dist/css/tabulator.min.css'
import Tabulator from 'tabulator-tables'
import { first, keys } from 'lodash'

export default {
  props: ['data', 'columns'],

  methods: {
    renderTable () {
      const cols = keys(first(this.data))
        .filter(f => f !== 'description' && f !== 'tools')
        .map(m => { return { field: m, title: m, formatter: 'color', width: '200' } })

      this.$nextTick(() => {
        this.tabulator2 = new Tabulator(this.$refs.table, {
          height: 'auto',
          layout: 'fitDataStretch',
          data: this.data,
          placeholder: 'No data to show...',
          columns: [
            {
              field: 'tools',
              title: 'TOOLS',
              formatter: (cell) => `<span class="text-weight-medium">${cell.getValue()}</span>`,
              frozen: true
            },
            ...cols
          ]
        })
      })
    },

    show () {
      this.$refs.dialog.show()

      this.renderTable()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    onOKClick () {
      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      this.hide()
    }
  }
}
</script>
