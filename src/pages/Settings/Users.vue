<template>
  <q-page padding>
    <div class="row justify-center q-col-gutter-md">
      <!-- USER LIST -->
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <q-table
              flat
              bordered
              title="USER LIST"
              separator="vertical"
              color="accent"
              :columns="columns"
              :data="users"
              :loading="users.length > 0 ? false : true"
              :filter="filter"
              :pagination="initialPagination"
            >
              <!-- HEADER OPTIONS -->
              <template v-slot:top-right>
                <!-- BUTTONS -->
                <q-btn-group
                  flat
                  class="q-mr-sm"
                >
                  <q-btn
                    outline
                    color="accent"
                    label="ADD"
                    @click="userDialog = true"
                  />
                </q-btn-group>

                <!-- SEARCH -->
                <q-input
                  dense
                  standout
                  debounce="300"
                  v-model="filter"
                  placeholder="Search"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>

              <!-- BODY -->
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td
                    key="delete"
                    :props="props"
                  >
                    <q-btn
                      round
                      dense
                      flat
                      unelevated
                      color="primary"
                      icon="mdi-delete"
                      @click="deleteUser(props.row)"
                    />
                  </q-td>

                  <q-td
                    key="domain"
                    :props="props"
                  >
                    {{ props.row.domain }}
                  </q-td>

                  <q-td
                    key="profile"
                    :props="props"
                  >
                    {{ props.row.profile }}
                    <q-popup-edit
                      v-model="props.row.profile"
                      title="Update Profile"
                      buttons
                      @save="updateProfile(props.row)"
                    >
                      <q-select
                        v-model="props.row.profile"
                        :options="profiles.map(m => m.label)"
                      />
                    </q-popup-edit>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- ADD USER DIALOG -->
    <q-dialog
      persistent
      v-model="userDialog"
    >
      <q-card style="width: 30%;">
        <q-card-section>
          <div class="text-h6">Add a new User</div>
        </q-card-section>

        <q-card-section class="row q-col-gutter-md">
          <div class="col-12">
            <q-input
              standout
              v-model="userForm.domain"
              label="DOMAIN"
            />
          </div>

          <div class="col-12">
            <q-select
              standout
              label="PROFILE"
              v-model="userForm.profileId"
              :options="profiles"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            v-close-popup
          />

          <q-btn
            unelevated
            label="Submit"
            color="green"
            @click="addUser"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import GET from 'src/repository/get'
import POST from 'src/repository/post'
import PUT from 'src/repository/put'
import DELETE from 'src/repository/delete'
import { info, positive, negative } from 'boot/notifier'
import { sortBy } from 'lodash'

export default {
  name: 'UsersSettingsPage',

  data () {
    return {
      filter: '',
      columns: [
        { name: 'delete', field: '', label: '', align: 'center', style: 'width: 50px;' },
        { name: 'domain', field: 'domain', label: 'DOMAIN', align: 'left' },
        { name: 'profile', field: 'profile', label: 'PROFILE', align: 'left' }
      ],
      initialPagination: {
        rowsPerPage: 7
      },

      users: [],
      profiles: [],

      userDialog: false,
      userForm: {
        domain: '',
        profileId: null
      }
    }
  },

  watch: {
    userDialog () {
      this.userForm.domain = ''
      this.userForm.profileId = null
    }
  },

  methods: {
    async fetchData () {
      try {
        const { data: users } = await GET.UserList()
        const { data: profiles } = await GET.ProfileList()

        this.users = sortBy(users, 'domain')
        this.profiles = sortBy(profiles.map(m => { return { value: m.id, label: m.profile } }), 'label')
      } catch (err) {
        negative('Something went wrong', '')
      }
    },

    async addUser () {
      try {
        const { domain: user } = this.$q.localStorage.getItem('userData')
        const domain = this.userForm.domain.toLowerCase()
        const profileId = this.userForm.profileId.value

        await POST.InsertUserz(user, domain, profileId)

        positive('User has been added', '')

        this.userDialog = false
        this.fetchData()
      } catch (err) {
        negative('Something went wrong', '')
      }
    },

    async updateProfile ({ domain, profile }) {
      try {
        const { domain: user } = this.$q.localStorage.getItem('userData')
        const { value } = this.profiles.find(f => f.label === profile)

        await PUT.UpdateUserz(user, domain, value)

        positive('User profile has been updated', '')
      } catch (err) {
        negative('Something went wrong', '')
      }
    },

    deleteUser ({ domain }) {
      this.$q.dialog({
        title: 'Are you sure?',
        message: `do you wish to remove ${domain}?`,
        cancel: true,
        persistent: true
      })
        .onOk(async () => {
          try {
            const { domain: user } = this.$q.localStorage.getItem('userData')
            await DELETE.Userz(user, domain)

            positive('User has been removed', '')

            this.fetchData()
          } catch (err) {
            negative('Something went wrong', '')
          }
        })
    }
  },

  beforeMount () {
    this.fetchData()
  },

  mounted () {
    info('Fetching Data', 'Please wait while data loads')
  }
}
</script>
