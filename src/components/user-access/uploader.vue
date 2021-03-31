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
import { notify } from 'boot/notifier'
import PostRepo from 'src/repository/post'

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
        skipEmptyLines: true,
        transformHeader: col => col.split(' ').join('').trim(),
        complete: async (parsed, file) => {
          try {
            const { data } = await PostRepo.UamDataRaw(parsed.data[0].Subgroup1, parsed.data)

            console.log(data)

            this.loading = false
            this.hide()

            notify('Success', 'data has been uploaded', 'mdi-check', 'green')

            setTimeout(() => {
              this.$router.go()
            }, 1200)
          } catch (err) {
            console.log(err)
            this.loading = false
            notify('Error encountered', 'data not uploaded', 'mdi-alert', 'red')
          }
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
