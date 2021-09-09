<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <div
        ref="table"
        class="fit"
        style="padding-bottom: 2.1em;"
      ></div>
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
        .map(m => { return { field: m, title: m, formatter: 'color', width: '100', headerVertical: true } })

      this.$nextTick(() => {
        this.tabulator2 = new Tabulator(this.$refs.table, {
          height: '300px',
          layout: 'fitColumns',
          data: this.data,
          placeholder: 'No data to show...',
          columns: [
            {
              field: 'tools',
              title: 'TOOLS',
              frozen: true,
              width: 150,
              formatter: (cell) => `<span class="text-weight-medium">${cell.getValue()}</span>`
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
