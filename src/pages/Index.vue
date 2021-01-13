<template>
  <div class="window-height page_bg">
    <div class="flex flex-center fit">
      <q-card
        class="q-pa-md text-center card_bg"
        style="width: 40%;"
      >
        <!-- LOGO -->
        <q-card-section>
          <q-img
            v-if="$q.dark.isActive"
            src="~assets/logo/west_white.png"
            width="300px"
          />
          <q-img
            v-else
            src="~assets/logo/west_black.png"
            width="300px"
          />
        </q-card-section>

        <!-- FORM -->
        <q-form @submit="signMeIn">
          <q-card-section class="q-gutter-sm">
            <q-input
              filled
              color="grey"
              label="Username"
              v-model="domain"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-account" />
              </template>
            </q-input>

            <q-input
              filled
              color="grey"
              label="Password"
              :type="isPwd ? 'password' : 'text'"
              v-model="password"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-lock" />
              </template>

              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </q-card-section>

          <!-- BUTTON -->
          <q-card-actions class="">
            <q-btn
              type="submit"
              label="sign in"
              color="red"
              class="full-width"
              :disable="disable"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',

  data () {
    return {
      domain: '',
      password: '',
      isPwd: true,
      loading: false,
      disable: true
    }
  },

  computed: {
    creds () {
      return {
        domain: this.domain,
        password: this.password
      }
    }
  },

  watch: {
    creds (val) {
      if (val.domain.length > 3 && val.password.length > 3) {
        this.disable = false
      }
    }
  },

  methods: {
    signMeIn () {
      console.log('LOG ME IN!')

      this.$q.loading.show()

      setTimeout(() => {
        this.$q.loading.hide()
        this.$router.push({ name: 'user-access' })
      }, 2500)
    }
  }
}
</script>

<style lang="scss" scoped>
.page_bg {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url("../assets/bg/photo-1543946602-a0fce8117697.jpg");
  background-size: cover;
}
</style>
