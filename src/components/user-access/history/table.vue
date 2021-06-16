<template>
  <q-card flat>
    <q-card-section>
      <!-- TABLE -->
      <q-table
        flat
        dense
        bordered
        title="Agent List"
        :data="data"
        :columns="columns"
        row-key="name"
        separator="vertical"
        :filter="filter"
        color="accent"
        :loading="(data.length > 0 ? false : true) || loading"
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
              label="CSV"
              :disable="loading"
              @click="exportData"
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
// import { first } from 'lodash'
import { exportFile } from 'quasar'
import { unparse } from 'papaparse'
import { notify } from 'boot/notifier'

export default {
  name: 'Table',

  props: ['data', 'loading'],

  data () {
    return {
      filter: '',
      columns: [
        { name: 'Subgroup3', field: 'Subgroup3', label: 'SUBGROUP3', align: 'left', headerStyle: 'text-align: left;' },
        { name: 'Agent Name', field: 'Agent Name', label: 'AGENT NAME', align: 'left', headerStyle: 'text-align: left;' },
        { name: 'Company Name', field: 'Company Name', label: 'COMPANY NAME', align: 'left', headerStyle: 'text-align: left;' },
        { name: 'Site', field: 'Site', label: 'SITE', align: 'left', headerStyle: 'text-align: left;' },
        { name: 'Employee ID', field: 'Employee ID', label: 'EMPLOYEE ID', align: 'left', headerStyle: 'text-align: left;' },
        { name: 'Agent Status', field: 'Agent Status', label: 'AGENT STATUS', align: 'left', headerStyle: 'text-align: left;' },
        { name: 'Batch Name', field: 'Batch Name', label: 'BATCH NAME', align: 'left', headerStyle: 'text-align: left;' },
        { name: 'Hired Date', field: 'Hired Date', label: 'HIRED DATE', align: 'left', headerStyle: 'text-align: left;' },
        { name: 'End Date', field: 'End Date', label: 'END DATE', align: 'left', headerStyle: 'text-align: left;' },
        { name: 'Job Level', field: 'Job Level', label: 'JOB LEVEL', align: 'left', headerStyle: 'text-align: left;' }
      ]
    }
  },

  // watch: {
  //   data (val) {
  //     const cols = Object
  //       .keys(first(val))
  //       .map(col => {
  //         return {
  //           name: col,
  //           field: col,
  //           label: col
  //         }
  //       })

  //     this.columns = cols
  //   }
  // },

  methods: {
    exportData () {
      const title = 'Agent List'
      this.export(title, unparse(this.data))
    },

    export (name, data) {
      notify('Downloading Data', 'Please wait', 'mdi-download', 'blue')
      exportFile(`${name}.csv`, data)
    }
  }
}
</script>
