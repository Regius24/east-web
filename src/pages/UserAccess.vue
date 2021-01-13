<template>
  <q-page padding>

    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        fab
        icon="mdi-file-upload"
        color="primary"
        @click="$q.dark.toggle()"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
