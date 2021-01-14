<template>
  <q-page padding>
    <div class="row">
      <q-card class="col-12 overflow-auto">
        <q-card-section>
          <SUMMARY />
        </q-card-section>
      </q-card>
    </div>

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
import UPLOADER from 'components/user-access/uploader'

export default {
  name: 'UserAccess',

  components: {
    SUMMARY: () => import('components/user-access/report-summary')
  },

  methods: {
    openUploader () {
      this.$q.dialog({
        component: UPLOADER,
        parent: this
      })
    }
  }
}
</script>
