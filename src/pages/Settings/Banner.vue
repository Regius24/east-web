<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 col-md-5">
        <q-card>
          <q-card-section class="q-mb-md">
            <q-toggle
              v-model="show"
              label="show banner?"
              color="green"
              class="q-mb-md"
            />

            <q-input
              standout
              v-model="width"
              type="number"
              label="Banner Width"
              hint="width of the popup banner in pixels (px)"
              class="q-mb-md"
            />

            <q-input
              standout
              v-model="title"
              label="Banner Title"
              hint="shown in popup's toolbar"
              class="q-mb-md"
            />

            <q-editor
              v-model="text"
              min-height="5rem"
              :toolbar="[
                ['bold', 'italic', 'underline'],
                ['left', 'center', 'right', 'justify'],
                ['unordered', 'ordered', 'quote', 'indent', 'outdent'],
              ]"
            />
          </q-card-section>

          <q-card-actions vertical>
            <q-btn
              outline
              color="blue"
              label="save"
              @click="updateBannerMessage"
            />
            <q-btn
              outline
              color="grey"
              label="preview"
              @click="openBanner"
              class="q-mb-sm"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import GET from 'src/repository/get'
import PUT from 'src/repository/put'
import { notify } from 'boot/notifier'

export default {
  name: 'BannerSettingsPage',

  data () {
    return {
      show: null,
      width: '',
      title: '',
      text: ''
    }
  },

  methods: {
    openBanner () {
      this.$q.dialog({
        component: () => import('components/misc/banner'),
        parent: this
      })
    },

    async fetchBannerMessage () {
      try {
        const { data } = await GET.BannerMessage()
        const { show, width, title, text } = data

        this.show = show
        this.width = width
        this.title = title
        this.text = text
      } catch (err) {
        notify('Something went wrong', '', 'mdi-alert', 'red')
      }
    },

    async updateBannerMessage () {
      try {
        const bannerDetails = {
          show: this.show,
          width: this.width,
          title: this.title,
          text: this.text,
          icon: ''
        }

        await PUT.updateBannerMessage(bannerDetails)

        notify('Banner Details has been updated', '', 'mdi-check', 'green')
      } catch (err) {
        notify('Something went wrong', '', 'mdi-alert', 'red')
      }
    }
  },

  beforeMount () {
    this.fetchBannerMessage()
  }
}
</script>
