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
          :loading="downloading"
          :disable="loading || downloading"
          @click="exportData"
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
</template>

<script>
import GET from 'src/repository/get'
import { exportFile } from 'quasar'
import { unparse } from 'papaparse'
import { info, negative } from 'boot/notifier'

export default {
  props: ['brand', 'vendor', 'data', 'loading'],

  data () {
    return {
      downloading: false,
      filter: '',
      columns: [
        { name: 'Subgroup3', field: 'Subgroup3', label: 'SUBGROUP3', align: 'left', headerStyle: 'text-align: left;' },
        { name: 'First', field: 'First', label: 'First Name', align: 'left', headerStyle: 'text-align: left;' },
        { name: 'Last', field: 'Last', label: 'Last Name', align: 'left', headerStyle: 'text-align: left;' },
        { name: 'Company', field: 'Company Name', label: 'Company', align: 'left', headerStyle: 'text-align: left;' },
        { name: 'Site', field: 'Site', label: 'SITE', align: 'left', headerStyle: 'text-align: left;' },
        { name: 'Agent Status', field: 'Agent Status', label: 'AGENT STATUS', align: 'left', headerStyle: 'text-align: left;' },
        { name: 'Batch Name', field: 'Batch Name', label: 'BATCH NAME', align: 'left', headerStyle: 'text-align: left;' },
        { name: 'Hired Date', field: 'Hired Date', label: 'HIRED DATE', align: 'left', headerStyle: 'text-align: left;' },
        { name: 'End Date', field: 'End Date', label: 'END DATE', align: 'left', headerStyle: 'text-align: left;' },
        { name: 'Job Level', field: 'Job Level', label: 'JOB LEVEL', align: 'left', headerStyle: 'text-align: left;' }
      ]
    }
  },

  methods: {
    async exportData () {
      this.downloading = true
      try {
        const { data } = await GET.UamDataAgents(this.brand, 'all', this.vendor)
        const title = `${this.brand} Agent List`

        this.export(title, unparse(data))
      } catch (err) {
        console.log(err)
        negative('Something went wrong', '')

        this.downloading = false
      }
    },

    export (name, data) {
      info('Downloading Data', 'Please wait')
      exportFile(`${name}.csv`, data)
      this.downloading = false
    }
  }
}
</script>
