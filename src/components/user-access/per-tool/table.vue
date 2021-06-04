<template>
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
    :loading="loading"
    color="accent"
  >
    <template v-slot:top-right>
      <!-- BUTTONS -->
      <q-btn-group
        flat
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
</template>

<script>
import { exportFile } from 'quasar'
import { unparse } from 'papaparse'
import { notify } from 'boot/notifier'

export default {
  props: ['brand', 'data', 'loading'],

  data () {
    return {
      filter: '',
      columns: [
        { name: 'Subgroup3', field: 'Subgroup3', label: 'Sub Group3', align: 'left', headerStyle: 'text-align: center;' },
        { name: 'Agent Name', field: 'Agent Name', label: 'Agent Name', align: 'left', headerStyle: 'text-align: center;' },
        { name: 'Company Name', field: 'Company Name', label: 'Company Name', align: 'center', headerStyle: 'text-align: center;' },
        { name: 'Site', field: 'Site', label: 'Site', align: 'center', headerStyle: 'text-align: center;' },
        { name: 'Employee ID', field: 'Employee ID', label: 'Employee ID', headerStyle: 'text-align: center;' },
        { name: 'Agent Status', field: 'Agent Status', label: 'Agent Status', align: 'center', headerStyle: 'text-align: center;' },
        { name: 'Batch Name', field: 'Batch Name', label: 'Batch Name', align: 'left', headerStyle: 'text-align: center;' },
        { name: 'Hired Date', field: 'Hired Date', label: 'Hired Date', headerStyle: 'text-align: center;' },
        { name: 'End Date', field: 'End Date', label: 'End Date', headerStyle: 'text-align: center;' },
        { name: 'Job Level', field: 'Job Level', label: 'Job Level', align: 'left', headerStyle: 'text-align: center;' }
      ]
    }
  },

  methods: {
    exportData () {
      const title = `${this.brand} Agent List`
      this.export(title, unparse(this.data))
    },

    export (name, data) {
      notify('Downloading Data', 'Please wait', 'mdi-download', 'blue')
      exportFile(`${name}.csv`, data)
    }
  }
}
</script>
