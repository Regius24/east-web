<template>
  <q-dialog
    persistent
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin"
      style="min-width: 75%;"
    >
      <!-- TOOLBAR -->
      <q-bar>
        <q-space />

        <q-btn
          dense
          flat
          icon="close"
          v-close-popup
        >
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <!-- HAS DATA -->
      <div v-if="data.length > 0">
        <q-table
          flat
          dense
          separator="vertical"
          :data="data"
          :columns="columns"
          :filter="filter"
        >
          <template v-slot:top-right>
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
      </div>

      <!-- NO DATA -->
      <div
        v-else
        class="q-ma-auto q-pa-md"
      >

        <div class="q-ml-sm text-h5">
          <q-icon
            name="mdi-alert"
            size="lg"
            color="orange"
          />
          No data to show...
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  props: ['data'],

  data () {
    return {
      filter: '',
      columns: [
        { name: 'EE Number', field: 'EE Number', label: 'EE Number', align: 'left', headerStyle: 'text-align: left;', style: 'width: 150px;' },
        { name: 'First', field: 'First', label: 'First Name', align: 'left', headerStyle: 'text-align: left;', style: 'width: 150px;' },
        { name: 'Middle', field: 'Middle', label: 'Middle Name', align: 'left', headerStyle: 'text-align: left;', style: 'width: 150px;' },
        { name: 'Last', field: 'Last', label: 'Last Name', align: 'left', headerStyle: 'text-align: left;', style: 'width: 150px;' },
        { name: 'Company Name', field: 'Company Name', label: 'Company Name', align: 'left', headerStyle: 'text-align: left;', style: 'width: 150px;' },
        { name: 'Position', field: 'Position', label: 'Position', align: 'left', headerStyle: 'text-align: left;', style: 'width: 150px;' },
        { name: 'Job Level', field: 'Job Level', label: 'Job Level', align: 'left', headerStyle: 'text-align: left;', style: 'width: 150px;' }
      ]
    }
  },

  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    onOKClick () {
      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      this.hide()
    }
  }
}
</script>
