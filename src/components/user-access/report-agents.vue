<template>
  <q-table
    dense
    flat
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
          flat
          color="accent"
          label="CSV"
          @click="exportData"
        >
          <q-tooltip content-class="bg-accent">
            Download Data
          </q-tooltip>
        </q-btn>
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
  props: ['brand', 'data'],

  data () {
    return {
      filter: '',
      columns: [
        { name: 'Agent Name', field: 'Agent Name', label: 'Agent Name' },
        { name: 'Company Name', field: 'Company Name', label: 'Company Name' },
        { name: 'Site', field: 'Site', label: 'Site' },
        { name: 'Domain', field: 'Domain', label: 'Domain' },
        { name: 'Employee ID', field: 'Employee ID', label: 'Employee ID' },
        { name: 'Agent Status', field: 'Agent Status', label: 'Agent Status' },
        { name: 'Batch Name', field: 'Batch Name', label: 'Batch Name' },
        { name: 'Hired Date', field: 'Hired Date', label: 'Hired Date' },
        { name: 'End Date', field: 'End Date', label: 'End Date' },
        { name: 'Job Level', field: 'Job Level', label: 'Job Level' }
      ]
    }
  },

  computed: {
    loading () { return !(this.data.length > 0) }
  },

  methods: {
    exportData () {
      const title = `${this.brand} Agent List`
      this.export(title, unparse(this.data))
    },

    export (name, data) {
      notify('Downloading Data', 'Please wait', 'mdi-download', 'primary')
      exportFile(`${name}.csv`, data)
    }
  }
}
</script>
