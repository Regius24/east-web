<template>
  <q-card>
    <q-card-section>
      <q-table
        dense
        flat
        bordered
        :title="title"
        :title-class="titleClass"
        row-key="name"
        separator="cell"
        color="accent"
        :data="data"
        :columns="columns"
        :filter="filter"
        :loading="data.length > 0 ? false : true"
        class="table-style"
      >
        <template v-slot:top-right>
          <!-- BUTTONS -->
          <q-btn-group
            outline
            class="q-mr-sm"
          >
            <q-btn
              outline
              color="accent"
              label="XLSX"
              @click="exportData2"
            />
          </q-btn-group>

          <!-- SEARCH -->
          <q-input
            dense
            standout
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import { first } from 'lodash'
import { exportFile } from 'quasar'
import { unparse } from 'papaparse'
import { info } from 'boot/notifier'
import XLSX from 'xlsx'

export default {
  props: ['title', 'titleClass', 'data'],

  data () {
    return {
      columns: [],
      filter: ''
    }
  },

  watch: {
    data (val) {
      const cols = Object
        .keys(first(val))
        .map(col => {
          let style
          switch (col) {
            case 'Agent Name':
              style = 'min-width: 200px;'
              break

            default:
              style = 'min-width: 100px;'
              break
          }

          return {
            name: col,
            field: col,
            label: col,
            align: 'left',
            style: style,
            classes: 'ellipsis',
            headerClasses: 'text-weight-bolder',
            headerStyle: 'text-align: left;'
          }
        })

      this.columns = cols.filter(f => f.field !== 'Complete Name')
    }
  },

  methods: {
    exportData () {
      const title = `Medallia Report for ${this.title}`
      this.export(title, unparse(this.data))
    },

    export (name, data) {
      info('Downloading Data', 'Please wait')
      exportFile(`${name}.xlsx`, data)
    },

    exportData2 () {
      const title = `Medallia Report for ${this.title}`
      this.exportXLSX2(title, this.data)
    },

    exportXLSX2 (name, data) {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(data)

      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
      XLSX.writeFile(wb, `${name}.xlsx`)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-style {
  max-height: 80vh;
}
</style>
