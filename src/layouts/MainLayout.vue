<template>
  <q-layout view="hHh Lpr lff">
    <q-scroll-area style="height: 100vh;">
      <!-- HEADER -->
      <q-header elevated>
        <TOOLBAR />
      </q-header>

      <!-- DRAWER -->
      <q-drawer
        elevated
        mini-to-overlay
        v-model="openDrawer"
        :mini="miniDrawer"
        @mouseover="miniDrawer = false"
        @mouseout="miniDrawer = true"
      >
        <NAVIGATION />
      </q-drawer>

      <!-- PAGES -->
      <q-page-container :class="$q.dark.isActive ? '' : 'bg-grey-3'">
        <transition
          name="fade"
          mode="out-in"
        >
          <router-view />
        </transition>
      </q-page-container>
    </q-scroll-area>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  components: {
    NAVIGATION: () => import('components/layout/navigation2'),
    TOOLBAR: () => import('components/layout/toolbar')
  },

  computed: {
    openDrawer: {
      get: function () {
        return this.$store.state.data.openDrawer
      },
      set: function (val) {
        this.$store.commit('data/SET_OPENDRAWER', val)
      }
    },
    miniDrawer: {
      get: function () {
        return this.$store.state.data.miniDrawer
      },
      set: function (val) {
        this.$store.commit('data/SET_MINIDRAWER', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
