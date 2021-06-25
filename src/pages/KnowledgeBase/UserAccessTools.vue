<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12">
        <TABLE
          :title="'User Access Tools Mapping'"
          :data="raw"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import GET from 'src/repository/get'
import { notify } from 'boot/notifier'

export default {
  name: 'UserAccessTools',

  components: {
    TABLE: () => import('components/knowledgebase/useraccesstools/table.vue')
  },

  data () {
    return {
      raw: []
    }
  },

  async beforeMount () {
    try {
      const { data: raw } = await GET.KBUserAccessTools()

      console.log(raw)

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
