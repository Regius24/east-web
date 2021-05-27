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
            style: 'max-width: 300px;',
            classes: 'ellipsis',
            headerClasses: 'text-weight-bolder'
          }
        })

      this.columns = cols
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
  max-height: 50vh;
}
</style>
