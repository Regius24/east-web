<template>
  <q-list>
    <q-item
      v-for="link in links"
      :key="link.pathName"
      clickable
      v-ripple
      exact
      :to="{ name: link.pathName }"
      active-class="text-green"
    >
      <q-item-section avatar>
        <q-icon
          class="exact-active-class"
          :name="link.icon"
        />
      </q-item-section>

      <q-item-section>{{ link.label }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script>

export default {
  data () {
    return {
      links: [
        { pathName: 'settings-users', label: 'Users', icon: 'mdi-account-group' },
        { pathName: 'settings-usersaccess', label: 'Users Access', icon: 'mdi-account-key' },
        { pathName: 'settings-usersprofile', label: 'Users Profile', icon: 'mdi-account-edit' }
      ]
    }
  }
}
</script>
