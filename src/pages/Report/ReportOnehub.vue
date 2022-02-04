<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12">
        <TABLE :data="raw" />
      </div>
    </div>

    <!-- UPLOAD BUTTON -->
    <q-page-sticky
      position="bottom-right"
      :offset="fabPos"
    >
      <q-btn
        fab
        icon="mdi-file-upload"
        color="accent"
        :disable="draggingFab"
        :style="showUploader ? '' : 'display: none;'"
        v-touch-pan.prevent.mouse="moveFab"
        @click="openUploader"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import GET from 'src/repository/get'
import { first } from 'lodash'
import { info, negative } from 'boot/notifier'

export default {
  name: 'ReportOnehub',

  components: {
    TABLE: () => import('components/report/onehub/table')
  },

  data () {
    return {
      showUploader: false,
      fabPos: [18, 18],
      draggingFab: false,

      raw: []
    }
  },

  methods: {
    moveFab (ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    },
    openUploader () {
      this.$q.dialog({
        component: () => import('components/report/onehub/uploader2'),
        parent: this
      })
    }
  },

  async beforeMount () {
    try {
      const { data: user } = await GET.UserProfile(this.$q.localStorage.getItem('userAccnt'))
      const { data: raw } = await GET.OnehubData()

      const { uOnehub } = first(user)

      this.showUploader = uOnehub
      this.raw = raw
    } catch (err) {
      negative('Something went wrong', '')
    }
  },

  mounted () {
    info('Fetching Data', 'Please wait while data loads')
  }
}
</script>
