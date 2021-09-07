<template>
  <q-card class="bg-white overflow-hidden">
    <div id="app">
      <vue-pivottable-ui
        :data="data"
        aggregatorName='Integer Sum'
        rendererName='Table'
        :rows="['Subgroup']"
        :cols="['Vendor', 'Site']"
        :vals="['Agents']"
      >
      </vue-pivottable-ui>
    </div>
  </q-card>
</template>

<script>
import 'vue-pivottable/dist/vue-pivottable.css'
import { VuePivottableUi } from 'vue-pivottable'

export default {
  name: 'table2',

  props: ['data'],

  components: { VuePivottableUi },

  data () {
    return {
      processedData: []
    }
  },

  watch: {
    data (val) {
    }
  },

  methods: {
  }
}
</script>
