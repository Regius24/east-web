<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-sm">
      <div class="col-10">
        <SUMMARY :data="summary" />
      </div>

      <div class="col-10">
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
import { notify } from 'boot/notifier'
import { first } from 'lodash'

export default {
  name: 'ReportIrab',

  components: {
    SUMMARY: () => import('components/report/irab/summary'),
    TABLE: () => import('components/report/irab/table')
  },

  data () {
    return {
      months: [],
      summary: [],
      raw: [],

      showUploader: false,
      fabPos: [18, 18],
      draggingFab: false
    }
  },

  async beforeMount () {
    try {
      const { data: user } = await GET.UserProfile(this.$q.localStorage.getItem('userAccnt'))
      const { data: summary } = await GET.IrabDataSummary()
      const { data: raw } = await GET.IrabData()

      this.summary = summary
      this.raw = raw
      this.showUploader = first(user).upload
    } catch (err) {
      console.log(err)
      notify('Something went wrong', '', 'mdi-alert', 'red')
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
        component: () => import('components/report/irab/uploader'),
        parent: this
      })
    }
  },

  mounted () {
    notify('Fetching Data', 'Please wait while data loads', 'mdi-timer-sand', 'orange')
  }
}
</script>
