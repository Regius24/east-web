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
        outline
        class="q-mr-sm"
      >
        <!-- <q-btn
          outline
          color="accent"
          label="SUPPORT"
          :loading="downloading"
          :disable="loading || downloading"
          @click="getSupportAgents"
        >
          <q-tooltip> Check for Agents with <b>Support</b> Position </q-tooltip>
        </q-btn> -->

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
import XLSX from 'xlsx'

export default {
  props: ['brand', 'vendor', 'data', 'loading'],

  data () {
    return {
      downloading: false,
      filter: '',
      columns: []
    }
  },

  watch: {
    data (val) {
      this.columns = []
      const columns = Object.keys(val[0])

      for (let i = 0; i < columns.length; i++) {
        this.columns.push({
          name: columns[i],
          field: columns[i],
          label: columns[i].toUpperCase(),
          align: 'left',
          headerStyle: 'text-align: left;'
        })
      }
    }
  },

  methods: {
    async getSupportAgents () {
      const { data } = await GET.UamSupportAgents(this.brand, this.vendor)

      this.$q.dialog({
        component: () => import('./agent-support-tbl.vue'),
        parent: this,
        data: data
      })
    },

    async exportData () {
      this.downloading = true

      try {
        const { data } = await GET.UamDataAgents(this.brand, 'all', this.vendor)
        const title = `${this.brand} Agent List`

        info('Downloading Data', 'Please wait')
        exportFile(`${title}.csv`, unparse(data))

        this.downloading = false
      } catch (err) {
        console.log(err)
        negative('Something went wrong', '')

        this.downloading = false
      }
    },

    async exportData2 () {
      info('Downloading Data', 'Please wait')
      this.downloading = true

      try {
        const { data } = await GET.UamDataAgents(
          this.brand,
          'all',
          this.vendor
        )
        const title = `${this.brand} Agent List`

        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(data)

        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
        XLSX.writeFile(wb, `${title}.xlsx`)
        this.downloading = false
      } catch (err) {
        console.log(err)
        negative('Something went wrong', 'Unable to export data')

        this.downloading = false
      }
    }
  }
}
</script>
