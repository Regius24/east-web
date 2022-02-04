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
          label="Upload data for Blacklist (.csv)"
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
            const { data } = await PostRepo.IrabDataBlacklist(parsed.data)

            this.showBlacklistCard(data)

            positive('Success', 'data has been uploaded')

            this.loading = false
            this.hide()
          } catch (err) {
            console.log(err)

            negative('Error encountered', 'data not uploaded')

            this.loading = false
          }
        }
      })
    },

    showBlacklistCard (data) {
      this.$q.dialog({
        component: () => import('components/report/irab/blacklist'),
        parent: this,
        data: data
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

  // mounted () {
  //   this.showBlacklistCard()
  // }
}
</script>
