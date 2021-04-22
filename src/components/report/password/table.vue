<template>
  <q-card>
    <q-card-section>
      <!-- TABLE -->
      <q-table
        flat
        dense
        bordered
        title="Password Cases List"
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
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import { first } from 'lodash'
import { exportFile } from 'quasar'
import { unparse } from 'papaparse'
import { notify } from 'boot/notifier'

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
      const cols = Object
        .keys(first(val))
        .map(col => {
          return {
            name: col,
            field: col,
            label: col
          }
        })

      this.columns = cols
    }
  },

  methods: {
    exportData () {
      const title = 'Password Case List'
      this.export(title, unparse(this.data))
    },

    export (name, data) {
      notify('Downloading Data', 'Please wait', 'mdi-download', 'blue')
      exportFile(`${name}.csv`, data)
    }
  }
}
</script>
