<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-md">
      <div class="col-12">
        <SUMMARY
          :data="summary"
          :months="months"
          @monthChange="monthChange"
        />
      </div>

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
import { first, flatten, uniq } from 'lodash'
import { notify } from 'boot/notifier'

export default {
  name: 'ReportPassword',

  components: {
    SUMMARY: () => import('components/report/password/summary'),
    TABLE: () => import('components/report/password/table')
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
      const { data: summary } = await GET.PasswordDataSummary(first(val))
      this.summary = summary
    }
  },

  methods: {
    async monthChange (val) {
      const { data: summary } = await GET.PasswordDataSummary(val)
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
        component: () => import('components/report/password/uploader'),
        parent: this
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    }
  },

  async beforeMount () {
    try {
      const { data: user } = await GET.UserProfile(this.$q.localStorage.getItem('userAccnt'))
      const { data: raw } = await GET.PasswordData()

      this.raw = raw
      this.months = uniq(flatten(raw.map(m => m.MONTH)))
      this.months.unshift('')
      this.showUploader = first(user).upload
    } catch (err) {
      console.log(err)
      notify('Something went wrong', '', 'mdi-alert', 'red')
    }
  },

  mounted () {
    notify('Fetching Data', 'Please wait while data loads', 'mdi-timer-sand', 'orange')
  }
}
</script>
