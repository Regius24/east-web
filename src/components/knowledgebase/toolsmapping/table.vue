<template>
  <q-card>
    <q-card-section
      :class="color"
      class="text-h5 text-center"
    >
      {{ title }}
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div ref="table" />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        outline
        label="Download"
        color="amber"
        @click="exportXLSX"
      />

      <q-btn
        outline
        label="View Matrix"
        color="blue"
        @click="openMatrixTable"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import 'tabulator-tables/dist/css/tabulator.min.css'
import Tabulator from 'tabulator-tables'
import XLSX from 'xlsx'

export default {
  name: 'Table',

  props: ['title', 'data', 'color'],

  watch: {
    data (val) { this.renderTable() }
  },

  methods: {
    renderTable () {
      this.tabulator = new Tabulator(this.$refs.table, {
        layout: 'fitColumns',
        maxHeight: 450,
        data: this.data,
        placeholder: 'No data to show...',
        columns: [
          {
            field: 'tools',
            title: 'TOOLS',
            formatter: (cell) => `<span class="text-weight-medium">${cell.getValue()}</span>`,
            frozen: true,
            width: 200
          },
          {
            title: 'DESCRIPTION',
            field: 'description',
            formatter: 'textarea',
            cssClass: 'text-justify'
          }
        ]
      })

      this.tabulator.setSort([
        { column: 'tools', dir: 'asc' }
      ])
    },

    exportXLSX () {
      const data = this.data.map(m => {
        for (const i in m) {
          if (i !== 'tools' && i !== 'description' && m[i] === '#66bb6a') m[i] = 'primary'
          if (i !== 'tools' && i !== 'description' && m[i] === '#ffee58') m[i] = 'secondary'
          if (i !== 'tools' && i !== 'description' && m[i] === '#757575') m[i] = 'na'
        }

        return m
      })

      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(data)

      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
      XLSX.writeFile(wb, `${this.title}.xlsx`)
    },

    openMatrixTable () {
      this.$q.dialog({
        component: () => import('components/knowledgebase/toolsmapping/tableMatrix.vue'),
        parent: this,
        data: this.data
      })
    }
  }
}
</script>
