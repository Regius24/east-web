<template>
  <q-card>
    <q-card-section>
      <q-table
        dense
        flat
        bordered
        hide-bottom
        virtual-scroll
        separator="cell"
        color="accent"
        :title="title"
        :title-class="titleClass"
        row-key="name"
        :data="data"
        :columns="columns"
        :filter="filter"
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        :loading="data.length > 0 ? false : true"
        class="table-style"
      >
        <template v-slot:top-right>
          <!-- BUTTONS -->
          <q-btn-group class="q-mr-sm">
            <q-btn
              outline
              color="accent"
              label="CSV"
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

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              key="LOB"
              :props="props"
            >
              {{ props.row.LOB }}
            </q-td>

            <q-td
              key="AGENTS"
              :props="props"
            >
              {{ props.row.AGENTS }}
            </q-td>

            <q-td
              key="AGENT TOOLS"
              :props="props"
            >
              {{ props.row['AGENT TOOLS'] }}
            </q-td>

            <q-td
              key="AGENT ACCESSES"
              :props="props"
              :class="props.row['AGENT CHECK'] === 'true' ? 'text-red' : ''"
            >
              {{ props.row['AGENT ACCESSES'] }}
            </q-td>

            <q-td
              key="TLs"
              :props="props"
            >
              {{ props.row.TLs }}
            </q-td>

            <q-td
              key="TL TOOLS"
              :props="props"
            >
              {{ props.row['TL TOOLS'] }}
            </q-td>

            <q-td
              key="TL ACCESSES"
              :props="props"
              :class="props.row['TL CHECK'] === 'true' ? 'text-red' : ''"
            >
              {{ props.row['TL ACCESSES'] }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import { exportFile } from 'quasar'
import { unparse } from 'papaparse'
import { notify } from 'boot/notifier'

export default {
  props: ['title', 'titleClass', 'data'],

  data () {
    return {
      columns: [
        { name: 'LOB', field: 'LOB', label: 'LOB', align: 'left', style: 'width: 170px;', headerClasses: 'text-weight-bolder', headerStyle: 'text-align: left;' },
        { name: 'AGENTS', field: 'AGENTS', label: 'AGENTS', align: 'center', style: 'width: 90px;', headerClasses: 'text-weight-bolder', headerStyle: 'text-align: center;' },
        { name: 'AGENT TOOLS', field: 'AGENT TOOLS', label: 'AGENT TOOLS', align: 'center', style: 'width: 90px;', headerClasses: 'text-weight-bolder', headerStyle: 'text-align: center;' },
        { name: 'AGENT ACCESSES', field: 'AGENT ACCESSES', label: 'AGENT ACCESSES', align: 'center', style: 'width: 90px;', headerClasses: 'text-weight-bolder', headerStyle: 'text-align: center;' },
        { name: 'TLs', field: 'TLs', label: 'TLs', align: 'center', style: 'width: 90px;', headerClasses: 'text-weight-bolder', headerStyle: 'text-align: center;' },
        { name: 'TL TOOLS', field: 'TL TOOLS', label: 'TL TOOLS', align: 'center', style: 'width: 90px;', headerClasses: 'text-weight-bolder', headerStyle: 'text-align: center;' },
        { name: 'TL ACCESSES', field: 'TL ACCESSES', label: 'TL ACCESSES', align: 'center', style: 'width: 90px;', headerClasses: 'text-weight-bolder', headerStyle: 'text-align: center;' }
      ],
      filter: '',
      pagination: {
        rowsPerPage: 0
      }
    }
  },

  methods: {
    exportData () {
      const title = `Summarized Data for ${this.title}`
      this.export(title, unparse(this.data))
    },

    export (name, data) {
      notify('Downloading Data', 'Please wait', 'mdi-download', 'blue')
      exportFile(`${name}.csv`, data)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-style {
  max-height: 60vh;
}
</style>
