<template>
  <q-page padding>
    <div class="row">
      <!-- SUMMARY REPORT -->
      <q-card class="col-12 overflow-auto">
        <q-card-section>
          <SUMMARY :data="uamDataSummary" />
        </q-card-section>
      </q-card>
    </div>

    <!-- UPLOAD BUTTON -->
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        fab
        icon="mdi-file-upload"
        color="primary"
        @click="openUploader"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import GetRepo from 'src/repository/get'
import UPLOADER from 'components/user-access/uploader'

export default {
  name: 'UserAccess',

  components: {
    SUMMARY: () => import('components/user-access/report-summary')
  },

  data () {
    return {
      uamDataSummary: []
    }
  },

  methods: {
    openUploader () {
      this.$q.dialog({
        component: UPLOADER,
        parent: this
      })
    },

    async FetchUamDataRaw () {
      const { status, statusText, data } = await GetRepo.UamDataSummary('smart')

      if (status === 200) {
        this.uamDataSummary = data
      } else console.log(statusText)
    }
  },

  mounted () {
    this.FetchUamDataRaw()
  }
}
</script>
