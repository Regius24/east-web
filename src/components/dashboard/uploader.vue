<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin overflow-hidden">
      <q-card-section>
        <q-file
          outlined
          counter
          accept=".csv"
          label="Upload a file (.csv)"
          v-model="file"
          :disable="loading"
          :loading="loading"
          @input="parseFile"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import Papa from 'papaparse'

export default {
  data () {
    return {
      file: null,
      loading: false
    }
  },

  methods: {
    parseFile () {
      this.loading = true

      Papa.parse(this.file, {
        header: true,
        complete: (parsed, file) => {
          console.log(parsed.data)

          this.$axios
            .post('api/post/useraccessdata', { payload: parsed.data })
            .then((result) => {
              console.log(result)
            }).catch((err) => {
              console.log(err)
            })
        }
      })
    },

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
