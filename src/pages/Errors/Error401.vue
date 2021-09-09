<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">401</div>

      <div
        class="text-h2"
        style="opacity:.4"
      >
        Oops. It seems you are not authorized...
      </div>

      <q-btn
        no-caps
        unelevated
        label="Return to Login"
        color="white"
        text-color="blue"
        class="q-mt-xl"
        :to="{ name: 'login' }"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
