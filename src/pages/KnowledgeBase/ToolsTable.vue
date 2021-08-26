<template>
  <q-page
    padding
    class="row justify-center q-col-gutter-md"
  >
    <!-- PLDT -->
    <div
      class="col-12 col-md-6"
      v-show="brandCheck('pldt')"
    >
      <q-card>
        <q-card-section class="text-center text-weight-medium text-primary text-h5">PLDT TOOLS TABLE</q-card-section>

        <q-card-section
          style="height: 70vh;"
          class="overflow-auto q-py-none cursor-pointer"
          @click="showDesc('pldt')"
        >
          <q-scroll-area class="fit">
            <q-img src="~assets/others/tools table/pldt desc.jpg" />
          </q-scroll-area>
        </q-card-section>

        <q-card-actions vertical>
          <q-btn
            outline
            label="View Matrix"
            @click="showMatrix('pldt')"
          />
        </q-card-actions>
      </q-card>
    </div>

    <!-- SMART -->
    <div
      class="col-12 col-md-6"
      v-show="brandCheck('smart')"
    >
      <q-card>
        <q-card-section class="text-center text-weight-medium text-secondary text-h5">SMART TOOLS TABLE</q-card-section>

        <q-card-section
          style="height: 70vh;"
          class="overflow-auto q-py-none cursor-pointer"
          @click="showDesc('smart')"
        >
          <q-scroll-area class="fit">
            <q-img src="~assets/others/tools table/smart desc.jpg" />
          </q-scroll-area>
        </q-card-section>

        <q-card-actions vertical>
          <q-btn
            outline
            label="View Matrix"
            @click="showMatrix('pldt')"
          />
        </q-card-actions>
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

    showDesc (brand) {
      const imageList = []

      if (brand === 'pldt') imageList.push(require('../../assets/others/tools table/pldt desc.jpg'))
      if (brand === 'smart') imageList.push(require('../../assets/others/tools table/smart desc.jpg'))

      viewerApi({
        options: {
          zIndex: 10000,
          navbar: false
        },
        images: imageList
      })
    },

    showMatrix (brand) {
      const imageList = []

      if (brand === 'pldt') imageList.push(require('../../assets/others/tools table/pldt matrix.jpg'))
      if (brand === 'smart') imageList.push(require('../../assets/others/tools table/smart matrix.jpg'))

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

  mounted () { notify('Fetching Data', 'Please wait while data loads', 'mdi-timer-sand', 'orange') }
}
</script>
