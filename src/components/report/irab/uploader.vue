<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin overflow-hidden">
      <q-card-section>
        <div class="text-weight-medium text-caption text-justify text-deep-orange q-mb-sm">
          *Be advised that the uploader is <span class="text-weight-bold">case</span>, <span class="text-weight-bold">spelling</span> and <span class="text-weight-bold">column</span> sensitive.
          You may refer to the export file for reference.
        </div>
        <q-file
          outlined
          counter
          accept=".csv"
          label="Upload data for IRAB (.csv)"
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
      const { domain } = this.$q.localStorage.getItem('userData')

      Papa.parse(this.file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: col => col.split(' ').join('').trim(),
        complete: async (parsed, file) => {
          try {
            const { data } = await PostRepo.IrabDataRaw(domain, parsed.data)

            console.log(data, parsed.data)

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
