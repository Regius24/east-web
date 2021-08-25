<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
    persistent
  >
    <q-card
      class="bg-orange"
      :style="'width: ' + banner.width + 'px'"
      style="border-radius: 20px;"
    >
      <q-toolbar class="bg-orange-7">
        <q-avatar>
          <q-icon
            name="mdi-alert-circle-outline"
            size="lg"
          />
        </q-avatar>

        <q-toolbar-title><span class="text-weight-light text-h5">{{ banner.title }}</span></q-toolbar-title>

        <q-btn
          flat
          round
          dense
          icon="close"
          v-close-popup
        />
      </q-toolbar>

      <q-card-section
        class="q-my-sm text-weight-light"
        v-html="banner.text"
      />
    </q-card>
  </q-dialog>
</template>

<script>
import GET from 'src/repository/get'

export default {
  data () {
    return {
      banner: {
        show: true,
        title: '',
        text: '',
        width: '400'
      }
    }
  },

  methods: {
    async fetchBannerMessage () {
      const { data } = await GET.BannerMessage()
      const { show, title, text, width } = data

      this.banner.title = title
      this.banner.text = text
      this.banner.width = width
      this.banner.show = show
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
  },

  beforeMount () {
    this.fetchBannerMessage()
  }
}
</script>
