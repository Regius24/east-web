<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <TOOLBAR />
    </q-header>

    <q-drawer
      v-model="openDrawer"
      bordered
    >
      <NAVIGATION />
    </q-drawer>

    <q-page-container>
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  components: {
    NAVIGATION: () => import('components/layout/navigation'),
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
