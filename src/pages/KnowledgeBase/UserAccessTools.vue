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
import { first } from 'lodash'

export default {
  name: 'UserAccessTools',

  components: {
    TABLE: () => import('components/knowledgebase/useraccesstools/table.vue')
  },

  data () {
    return {
      brandList: [],

      raw: []
    }
  },

  methods: {
    async fetchData () {
      try {
        if (this.brandList.length > 1) {
          const { data: raw } = await GET.KBUserAccessTools('%')

          this.raw = raw
        } else {
          const { data: raw } = await GET.KBUserAccessTools(first(this.brandList))

          this.raw = raw
        }
      } catch (err) {
        notify('Something went wrong', '', 'mdi-alert', 'red')
      }
    }
  },

  async beforeMount () {
    try {
      const { data: user } = await GET.UserProfile(this.$q.localStorage.getItem('userAccnt'))
      const { brand } = first(user)

      this.brandList = brand.split(',')

      this.fetchData()
    } catch (err) {
      notify('Something went wrong', '', 'mdi-alert', 'red')
    }
  },

  mounted () {
    notify('Fetching Data', 'Please wait while data loads', 'mdi-timer-sand', 'orange')
  }
}
</script>
