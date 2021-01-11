<template>
  <q-toolbar :class="$q.dark.isActive ? 'bg-grey-10' : ''">
    <q-btn
      flat
      dense
      round
      :color="$q.dark.isActive ? 'grey-5' : 'grey-8'"
      icon="menu"
      aria-label="Menu"
      @click="triggerDrawer"
    />

    <q-toolbar-title :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'">
      <div>WEST</div>
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
