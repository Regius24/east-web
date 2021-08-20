<template>
  <q-page
    padding
    class="row justify-center content-center items-center q-col-gutter-md"
  >
    <div class="col-4">
      <q-card
        v-ripple
        class="cursor-pointer"
        @click="showViewer('pldt')"
      >
        <q-card-section class="text-center text-weight-medium text-primary text-h5">PLDT TOOLS TABLE</q-card-section>
        <q-img
          ref="pldtImage"
          src="~assets/others/tools description and matrix pldt.jpg"
          :ratio="16/9"
        />
      </q-card>
    </div>

    <div class="col-4">
      <q-card
        v-ripple
        class="cursor-pointer"
        @click="showViewer('smart')"
      >
        <q-card-section class="text-center text-weight-medium text-secondary text-h5">SMART TOOLS TABLE</q-card-section>
        <q-img
          ref="smartImage"
          src="~assets/others/tools description and matrix smart.jpg"
          :ratio="16/9"
        />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import GET from 'src/repository/get'
import { notify } from 'boot/notifier'
import { first } from 'lodash'
import { openURL } from 'quasar'
import { api as viewerApi } from 'v-viewer'

import 'viewerjs/dist/viewer.min.css'

export default {
  name: 'ToolsTablePage',

  data () {
    return {
      brandList: []
    }
  },

  methods: {
    brandCheck (brand) { return this.brandList.indexOf(brand) > -1 },

    showLightbox (brand) {
      const image = this.$refs[`${brand}Image`]

      openURL(image.currentSrc)
    },

    showViewer (brand) {
      const imageList = []
      imageList.push(this.$refs[`${brand}Image`].currentSrc)

      viewerApi({
        options: {
          zIndex: 10000,
          navbar: false
        },
        images: imageList
      })
    }
  },

  async beforeMount () {
    try {
      const { data: user } = await GET.UserProfile(this.$q.localStorage.getItem('userAccnt'))
      const { brand } = first(user)

      this.brandList = brand.split(',')
    } catch (err) {
      notify('Something went wrong', '', 'mdi-alert', 'red')
    }
  },

  mounted () {
    notify('Fetching Data', 'Please wait while data loads', 'mdi-timer-sand', 'orange')
  }
}
</script>
