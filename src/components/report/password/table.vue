<template>
  <q-card>
    <q-card-section>
      <!-- TABLE -->
      <q-table
        flat
        dense
        bordered
        title="Password Resetting List"
        :data="data"
        :columns="columns"
        row-key="name"
        separator="vertical"
        :filter="filter"
        color="accent"
        :loading="data.length > 0 ? false : true"
      >
        <template v-slot:top-right>
          <!-- BUTTONS -->
          <q-btn-group
            flat
            class="q-mr-sm"
          >
            <q-btn
              flat
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
  name: 'Table',

  props: ['data'],

  data () {
    return {
      filter: '',
      columns: []
    }
  },

  watch: {
    data (val) {
      const cols = Object.keys(first(val)).map(col => {
        let align, headerStyle

        switch (col) {
          default:
            align = 'left'
            headerStyle = 'left'
            break
        }

        return {
          name: col,
          field: col,
          label: col.toUpperCase(),
          align: align,
          headerStyle: headerStyle
        }
      })

      this.columns = cols
    }
  },

  methods: {
    exportData () {
      const title = 'Password Resetting List'
      this.export(title, unparse(this.data))
    },

    export (name, data) {
      info('Downloading Data', 'Please wait')
      exportFile(`${name}.csv`, data)
    },

    exportData2 () {
      const title = 'Password Resetting List'
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
