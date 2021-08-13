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
import { notify } from 'boot/notifier'

export default {
  name: 'ReportESolve',

  components: {
    TABLE: () => import('components/report/esolve/table')
  },

  data () {
    return {
      raw: []
    }
  },

  async beforeMount () {
    try {
      const { data: raw } = await GET.EsolveReportData()

      this.raw = raw
    } catch (err) {
      notify('Something went wrong', '', 'mdi-alert', 'red')
    }
  },

  mounted () {
    notify('Fetching Data', 'Please wait while data loads', 'mdi-timer-sand', 'orange')
  }
}
</script>
