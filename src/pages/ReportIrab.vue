<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-sm">
      <!-- SUMMARY -->
      <div class="col-10">
        <SUMMARY
          :data="summary"
          :months="months"
          @monthChange="monthChange"
        />
      </div>

      <!-- TABLE -->
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
import { first, flatten, uniq } from 'lodash'

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

  watch: {
    async months (val) {
      const { data: summary } = await GET.IrabDataSummary(first(val))
      this.summary = summary
    }
  },

  async beforeMount () {
    try {
      const { data: user } = await GET.UserProfile(this.$q.localStorage.getItem('userAccnt'))
      const { data: raw } = await GET.IrabData()

      this.raw = raw
      this.months = uniq(flatten(raw.map(m => m.MONTH)))
      this.months.unshift('')
      this.showUploader = first(user).upload
    } catch (err) {
      console.log(err)
      notify('Something went wrong', '', 'mdi-alert', 'red')
    }
  },

  methods: {
    async monthChange (val) {
      const { data: summary } = await GET.IrabDataSummary(val)
      this.summary = summary
    },

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
