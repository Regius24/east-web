<template>
  <q-page padding>
    <div class="row">
      <q-card class="col-12">
        <q-card-section>
          <div class="text-h5">REPORT HERE</div>
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
import UPLOADER from 'components/dashboard/uploader'

export default {
  name: 'UserAccess',

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
