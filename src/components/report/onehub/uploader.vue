<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin overflow-hidden">
      <q-card-section>
        <q-uploader
          class="fit"
          :url=uploader.path
          :accept=uploader.types
          color="teal"
          ref="daUploader"
          auto-upload
          flat
          @uploaded=hasuploaded
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
// import { notify } from 'boot/notifier'
// import PostRepo from 'src/repository/post'

export default {
  data () {
    return {
      file: null,
      loading: false,
      uploader: {
        model: false,
        path: this.$axios.defaults.baseURL + 'api/post/rawdata',
        types: '.csv'
      }
    }
  },

  methods: {
    hasuploaded () { },

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
