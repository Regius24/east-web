<template>
  <div class="window-height">
    <div class="fit page_bg">
      <!-- LOGIN FORM -->
      <div class="flex flex-center fit">
        <div
          id="particles-js"
          class="fit"
        />

        <transition
          appear
          enter-active-class="animated fadeIn"
        >
          <q-card
            flat
            class="q-pa-md text-center card_bg absolute"
            style="width: 40%;"
          >
            <!-- LOGO -->
            <q-card-section>
              <q-img
                v-if="$q.dark.isActive"
                src="~assets/logo/east_light.png"
                width="300px"
              />
              <q-img
                v-else
                src="~assets/logo/east_dark.png"
                width="300px"
              />
            </q-card-section>

            <!-- INPUTS -->
            <q-form @submit.prevent="signMeIn">
              <q-card-section class="q-gutter-sm">
                <q-input
                  filled
                  color="grey"
                  label="Username"
                  v-model="domain"
                  key="username"
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
                  key="password"
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
              <q-card-actions>
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
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import 'particles.js'
import GetRepo from 'src/repository/get'
import { mapActions } from 'vuex'
import { notify } from 'boot/notifier'

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
      // if (val.domain.length > 3 && val.password.length > 3) {
      if (val.domain.length > 3) {
        this.disable = false
      }
    }
  },

  methods: {
    ...mapActions('data', ['SET_ALLOW']),

    initParticleJs () {
      const config = {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#ffffff'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            },
            polygon: {
              nb_sides: 5
            },
            image: {
              src: 'img/github.svg',
              width: 100,
              height: 100
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'bubble'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 5,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      }

      window.particlesJS('particles-js', config, function () {
        console.log('paricle loaded')
      })
    },

    async signMeIn () {
      this.$q.loading.show()

      try {
        const { data } = await GetRepo.ValidateUser(this.domain, encodeURIComponent(this.password))

        this.$q.localStorage.set('userAccnt', data)

        this.SET_ALLOW(true)

        setTimeout(() => {
          this.$q.loading.hide()
          this.$router.push({ name: 'user-access-lob' })
        }, 2500)
      } catch (err) {
        console.log(err)

        setTimeout(() => {
          this.$q.loading.hide()
          notify('Something went wrong', '', 'mdi-alert', 'red')
        }, 2500)
      }
    },

    async fetchBannerMessage () {
      const { data } = await GetRepo.BannerMessage()
      const { show } = data

      if (show) {
        this.$q.dialog({
          component: () => import('components/misc/banner'),
          parent: this
        })
      }
    }
  },

  beforeMount () {
    this.fetchBannerMessage()
  },

  mounted () {
    sessionStorage.clear()
    localStorage.removeItem('userAccnt')

    this.initParticleJs()
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
