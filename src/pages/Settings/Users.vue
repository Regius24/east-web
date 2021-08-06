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
import { notify } from 'boot/notifier'
import { sortBy } from 'lodash'

export default {
  name: 'UsersPage',

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

        console.log(this.profiles)
      } catch (err) {
        console.log(err)
        notify('Something went wrong', '', 'mdi-alert', 'red')
      }
    },

    async addUser () {
      try {
        const domain = this.userForm.domain
        const profileId = this.userForm.profileId.value
        const res = await POST.InsertUserz(domain, profileId)

        console.log(res)
        notify('User has been added', '', 'mdi-check', 'green')

        this.userDialog = false
        this.fetchData()
      } catch (err) {
        console.log(err)
        notify('Something went wrong', '', 'mdi-alert', 'red')
      }
    },

    async updateProfile ({ domain, profile }) {
      try {
        const { value } = this.profiles.find(f => f.label === profile)
        const res = await PUT.UpdateUserz(domain, value)

        console.log(res)
        notify('User profile has been updated', '', 'mdi-check', 'green')
      } catch (err) {
        console.log(err)
        notify('Something went wrong', '', 'mdi-alert', 'red')
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
            const res = await DELETE.Userz(domain)

            console.log(res)
            notify('User has been removed', '', 'mdi-check', 'green')

            this.fetchData()
          } catch (err) {
            console.log(err)
            notify('Something went wrong', '', 'mdi-alert', 'red')
          }
        })
    }
  },

  beforeMount () {
    this.fetchData()
  },

  mounted () {
    notify('Fetching Data', 'Please wait while data loads', 'mdi-timer-sand', 'orange')
  }
}
</script>
