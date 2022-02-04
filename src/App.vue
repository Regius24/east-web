<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { version } from '../package.json'

export default {
  name: 'App',

  mounted () {
    const loadedAppVer = this.$q.localStorage.getItem('appVer')

    if (loadedAppVer === null) {
      this.$q.localStorage.set('appVer', version)
    }

    if (loadedAppVer !== version) {
      this.$q.notify({
        timeout: 8000,
        color: 'pink',
        position: 'top',
        icon: 'mdi-alert',
        message: 'New Version Available',
        caption: 'kindly refresh the page',
        actions: [
          {
            label: 'update',
            color: 'white',
            handler: () => {
              this.$q.localStorage.set('appVer', version)

              window.location.reload()
            }
          }
        ]
      })
    }
  }
}
</script>
