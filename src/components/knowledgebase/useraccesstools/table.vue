<template>
  <q-card>
    <!-- TABLE -->
    <q-card-section>
      <q-table
        dense
        flat
        bordered
        title="User Access Tools Mapping"
        row-key="name"
        separator="cell"
        color="accent"
        virtual-scroll
        style="max-height: 80vh;"
        :data="data"
        :columns="columns"
        :filter="filter"
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        :loading="data.length > 0 ? false : true"
      >
        <template v-slot:top-right>
          <!-- BUTTONS -->
          <!-- <q-btn-group class="q-mr-sm">
            <q-btn
              outline
              color="accent"
              label="CSV"
              @click="exportData"
            />
          </q-btn-group> -->

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

  props: ['data'],

  data () {
    return {
      filter: '',
      columns: [
        { name: 'Position', field: 'Position', label: 'POSITION', align: 'left', headerStyle: 'text-align: left;', sortable: true },
        { name: 'Subgroup1', field: 'Subgroup1', label: 'SUBGROUP1', align: 'left', headerStyle: 'text-align: left;', sortable: true },
        { name: 'Subgroup2', field: 'Subgroup2', label: 'SUBGROUP2', align: 'left', headerStyle: 'text-align: left;', sortable: true },
        { name: 'Subgroup3', field: 'Subgroup3', label: 'SUBGROUP3', align: 'left', headerStyle: 'text-align: left;', sortable: true },
        { name: 'Subgroup4', field: 'Subgroup4', label: 'SUBGROUP4', align: 'left', headerStyle: 'text-align: left;', sortable: true },
        { name: 'Subgroup5', field: 'Subgroup5', label: 'SUBGROUP5', align: 'left', headerStyle: 'text-align: left;', sortable: true },
        { name: 'Primary', field: 'Primary', label: 'PRIMARY', align: 'left', headerStyle: 'text-align: left;' }
      ],
      pagination: {
        rowsPerPage: 0
      }
    }
  },

  methods: {
    exportData () {
      const title = 'Onehub List'
      this.export(title, unparse(this.data))
    },

    export (name, data) {
      notify('Downloading Data', 'Please wait', 'mdi-download', 'blue')
      exportFile(`${name}.csv`, data)
    }
  }
}
</script>
