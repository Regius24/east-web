<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 col-md-6">
        <SUMMARY />
      </div>
    </div>
  </q-page>
</template>

<script>
// import { date } from 'quasar'
// import { mapActions } from 'vuex'
// import { flatten, concat, sortBy, indexOf } from 'lodash'
// import jsonata from 'jsonata'
// import GetRepo from 'src/repository/get'
import { notify } from 'boot/notifier'

export default {
  name: 'UserAccessHistory',

  components: {
    SUMMARY: () => import('components/user-access-history/summary')
  },

  mounted () {
    notify('Fetching Data', 'Please wait while data loads', 'mdi-timer-sand', 'orange')
  }
}
</script>
