<template>
  <q-toolbar class="bg-blue-grey-3">
    <q-btn
      flat
      dense
      round
      color="grey-8"
      icon="menu"
      aria-label="Menu"
      @click="triggerDrawer"
    />

    <q-toolbar-title class="text-grey-8">
      <div v-if="$q.platform.is.mobile">CCARE COMM APP</div>
      <div v-else>CONSUMER CARE COMMUNITY APP</div>
    </q-toolbar-title>

    <q-img
      src="~assets/logo/pldtsmart.png"
      style="width: 15%;"
    />
  </q-toolbar>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState('data', ['openDrawer']),

  methods: {
    ...mapActions('data', ['SET_OPENDRAWER']),
    triggerDrawer () {
      this.SET_OPENDRAWER(!this.openDrawer)
    }
  }
}
</script>
