<template>
  <q-card>
    <q-card-section
      :class="color"
      class="text-h5 text-center"
    >
      {{ title }} {{ showDesription }}
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
import { first, keys } from 'lodash'

export default {
  name: 'Table',

  props: ['title', 'data', 'color'],

  data () {
    return {
      showDesription: true
    }
  },

  watch: {
    data (val) { this.renderTable() }
  },

  methods: {
    renderTable () {
      const cols = keys(first(this.data))
        .filter(f => f !== 'description' && f !== 'tools')
        .map(m => { return { field: m, title: m, formatter: 'color', width: '120', headerSort: false, visible: !this.showDesription } })

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
            width: 180
          },
          {
            title: 'DESCRIPTION',
            field: 'description',
            formatter: 'textarea',
            cssClass: 'text-justify',
            visible: this.showDesription
          },
          ...cols
        ]
      })

      this.tabulator.setSort([
        { column: 'tools', dir: 'asc' }
      ])
    },

    exportXLSX () {
      const data = this.data.map(m => {
        for (const i in m) {
          if (i !== 'tools' && i !== 'description' && m[i] === '#6ab04c') m[i] = '1'
          if (i !== 'tools' && i !== 'description' && m[i] === '#f9ca24') m[i] = '2'
          if (i !== 'tools' && i !== 'description' && m[i] === '#4b4b4b') m[i] = 'na'
        }

        return m
      })

      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(data)

      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
      XLSX.writeFile(wb, `${this.title}.xlsx`)
    },

    openMatrixTable () {
      // this.$q.dialog({
      //   component: () => import('components/knowledgebase/toolsmapping/tableMatrix.vue'),
      //   parent: this,
      //   data: this.data
      // })

      this.showDesription = !this.showDesription
      this.renderTable()
    }
  }
}
</script>
