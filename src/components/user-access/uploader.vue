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
import { QSpinnerGears } from 'quasar'
import PostRepository from 'src/repository/post'

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

      notify('Processing', 'parsing file', QSpinnerGears, 'accent')

      Papa.parse(this.file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: col => col.split(' ').join('').trim(),
        complete: async (parsed, file) => {
          const result = await PostRepository.postUserAccessData(parsed.data[0].Subgroup1, parsed.data)

          console.log(result)
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
