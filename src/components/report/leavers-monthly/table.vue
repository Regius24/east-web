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
        virtual-scroll
        :data="data"
        :columns="columns"
        :filter="filter"
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        :loading="data.length > 0 ? false : true"
        class="table-style"
        :id="title"
      >
        <template v-slot:top-right>
          <!-- BUTTONS -->
          <q-btn-group class="q-mr-sm">
            <q-btn
              outline
              color="accent"
              label="XLSX"
              @click="exportData2"
            />
          </q-btn-group>

          <!-- SEARCH -->
          <q-input
            borderless
            dense
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
import XLSX from 'xlsx'
import { notify } from 'boot/notifier'

window.XLSX = XLSX

export default {
  props: ['title', 'titleClass', 'data'],

  data () {
    return {
      columns: [],
      filter: '',
      pagination: {
        rowsPerPage: 0
      }
    }
  },

  watch: {
    data (val) {
      const cols = Object
        .keys(first(val))
        .map(col => {
          return {
            name: col,
            field: col,
            label: col,
            align: 'center',
            style: 'max-width: 300px;',
            classes: 'ellipsis',
            headerClasses: 'text-weight-bolder',
            headerStyle: 'text-align: center;'
          }
        })

      this.columns = cols
    }
  },

  methods: {
    exportData () {
      const title = `Leavers Daily for ${this.title}`
      this.export(title, unparse(this.data))
    },

    export (name, data) {
      notify('Downloading Data', 'Please wait', 'mdi-download', 'blue')
      exportFile(`${name}.csv`, data)
    },

    exportData2 () {
      const title = `Leavers Daily for ${this.title}`
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
  max-height: 50vh;
}
</style>
