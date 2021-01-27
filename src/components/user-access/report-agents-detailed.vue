<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin"
      style="min-width: 80%;"
    >
      <q-card-section>
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
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { exportFile } from 'quasar'
import { unparse } from 'papaparse'

export default {
  props: ['title', 'data'],

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
      const title = `${this.title} Agent List`
      this.export(title, unparse(this.data))
    },

    export (name, data) {
      exportFile(`${name}.csv`, data)
    },

    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },
    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },
    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>
