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
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
// import { groupBy } from 'lodash'

export default {
  props: ['agentData'],

  data () {
    return {
      dataList: []
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
  },

  beforeMount () {
    console.log(this.agentData)
  }
}
</script>
