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
          label="Upload data for Onehub (.csv)"
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
import { positive, negative } from 'boot/notifier'
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
            const { data } = await PostRepo.OnehubData(parsed.data)

            console.log(data)

            positive('Success', 'data has been uploaded')

            this.loading = false
            this.hide()

            setTimeout(() => {
              this.$router.go()
            }, 1200)
          } catch (err) {
            console.log(err)

            negative('Error encountered', 'data not uploaded')

            this.loading = false
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
