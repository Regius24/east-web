<template>
  <q-scroll-area style="height: 100%;">
    <q-list>
      <q-item-label
        header
        :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'"
        class="text-weight-bold text-uppercase"
      >
        Navigation Links
      </q-item-label>
      <q-item
        v-for="item in links"
        :key="item.pathName"
        clickable
        v-ripple
        exact
        :to="{ name: item.pathName }"
        active-class="text-green"
      >
        <q-item-section avatar>
          <q-icon
            class="exact-active-class"
            :name="item.icon"
          />
        </q-item-section>

        <q-item-section>{{ item.label }}</q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script>
export default {
  data () {
    return {
      links: [
        { pathName: 'kb-user-access-tools', label: 'User Access Tools', icon: 'mdi-hammer-screwdriver' }
      ]
    }
  }
}
</script>
