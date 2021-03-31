<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin overflow-auto"
      style="min-width: 80%;"
    >
      <q-card-section>
        <q-table
          dense
          flat
          bordered
          title="Blacklisted Agents' List"
          :data="data"
          :columns="columns"
          row-key="name"
          separator="vertical"
          :filter="filter"
          color="accent"
        >
          <template v-slot:top-right>
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
import { first } from 'lodash'

export default {
  props: ['data'],

  data () {
    return {
      filter: ''
      // columns: []
    }
  },

  computed: {
    columns () {
      const cols = Object
        .keys(first(this.data))
        .map(col => {
          return {
            name: col,
            field: col,
            label: col
          }
        })

      return cols
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
