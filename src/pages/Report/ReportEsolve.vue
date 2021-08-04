<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12">
        <TABLE :data="raw" />
      </div>
    </div>
  </q-page>
</template>

<script>
import GET from 'src/repository/get'
import { first } from 'lodash'
import { notify } from 'boot/notifier'

export default {
  name: 'ReportESolve',

  components: {
    TABLE: () => import('components/report/esolve/table')
  },

  data () {
    return {
      showUploader: false,
      fabPos: [18, 18],
      draggingFab: false,

      raw: []
    }
  },

  async beforeMount () {
    try {
      const { data: user } = await GET.UserProfile(this.$q.localStorage.getItem('userAccnt'))
      const { data: raw } = await GET.EsolveReportData()

      const { upload } = first(user)

      this.showUploader = upload
      this.raw = raw
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
