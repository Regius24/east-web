<template>
  <q-toolbar :class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-5'">
    <!-- DRAWER BTN -->
    <q-btn
      flat
      dense
      round
      :color="$q.dark.isActive ? 'grey-5' : 'grey-8'"
      icon="menu"
      aria-label="Menu"
      @click="triggerDrawer"
    />

    <!-- TITLE / LOGO -->
    <q-toolbar-title>
      <div>
        <q-img
          v-if="$q.dark.isActive"
          src="~assets/logo/west_white.png"
          style="width: 10%;"
        />
        <q-img
          v-else
          src="~assets/logo/west_black.png"
          style="width: 10%;"
        />
      </div>
    </q-toolbar-title>

    <!-- DROPDOWN TOOLS -->
    <q-btn-dropdown
      stretch
      flat
      label="misc"
    >
      <q-list>
        <!-- FULLSCREEN -->
        <q-item
          clickable
          v-close-popup
          @click="$q.fullscreen.toggle()"
        >
          <q-item-section avatar>
            <q-avatar
              :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
              color="accent"
              text-color="white"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label v-if="$q.fullscreen.isActive">Unfocus</q-item-label>
            <q-item-label v-else>Focus</q-item-label>
          </q-item-section>
        </q-item>

        <!-- INVERT COLOR -->
        <q-item
          clickable
          v-close-popup
          @click="$q.dark.toggle()"
        >
          <q-item-section avatar>
            <q-avatar
              icon="mdi-invert-colors"
              color="accent"
              text-color="white"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label v-if="$q.dark.isActive">Light Mode</q-item-label>
            <q-item-label v-else>Dark Mode</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

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
