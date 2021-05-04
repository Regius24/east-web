<template>
  <q-card>
    <!-- TABLE -->
    <q-card-section>
      <q-table
        flat
        bordered
        color="accent"
        separator="vertical"
        title="IRAB List"
        :data="data"
        :columns="columns"
        row-key="name"
        :filter="filter"
        :loading="data.length > 0 ? false : true"
      >
        <!-- FILTERS -->
        <template v-slot:top-right>
          <!-- BUTTONS -->
          <q-btn-group
            outline
            class="q-mr-sm"
          >
            <q-btn
              outline
              color="accent"
              label="CSV"
              @click="exportData"
            />
          </q-btn-group>

          <!-- SEARCH -->
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <!-- ROWS -->
        <template v-slot:body="props">
          <q-tr :props="props">

            <q-td
              key="YEAR"
              :props="props"
            >{{ props.row.YEAR }}</q-td>
            <q-td
              key="MONTH"
              :props="props"
            >{{ props.row.MONTH }}</q-td>
            <q-td
              key="COSMO_ID"
              :props="props"
            >{{ props.row.COSMO_ID }}</q-td>
            <q-td
              key="NAME"
              :props="props"
            >{{ props.row.NAME }}</q-td>
            <q-td
              key="VENDOR"
              :props="props"
            >{{ props.row.VENDOR }}</q-td>
            <q-td
              key="BRAND"
              :props="props"
            >{{ props.row.BRAND }}</q-td>
            <q-td
              key="PROGRAM"
              :props="props"
            >{{ props.row.PROGRAM }}</q-td>
            <q-td
              key="QH"
              :props="props"
            >{{ props.row.QH }}</q-td>
            <q-td
              key="QW"
              :props="props"
            >{{ props.row.QW }}</q-td>
            <q-td
              key="VH"
              :props="props"
            >{{ props.row.VH }}</q-td>
            <q-td
              key="XFERS"
              :props="props"
            >{{ props.row.XFERS }}</q-td>
            <q-td
              key="CORDER_CRITICAL"
              :props="props"
            >{{ props.row.CORDER_CRITICAL }}</q-td>
            <q-td
              key="CORDER_NON_CRITICAL"
              :props="props"
            >{{ props.row.CORDER_NON_CRITICAL }}</q-td>
            <q-td
              key="TOTAL"
              :props="props"
            >{{ props.row.TOTAL }}</q-td>
            <q-td
              key="STATUS"
              :props="props"
            >{{ props.row.STATUS }}</q-td>

            <q-td
              key="ACTION"
              :props="props"
            >
              {{ props.row.ACTION }}
              <q-popup-edit
                v-model="props.row.ACTION"
                title="Update ACTION"
                buttons
                @save="updateData(props.row, 'ACTION')"
                :disable="!disable"
              >
                <q-select
                  v-model="props.row.ACTION"
                  :options="['TERMINATED', 'SUSPENDED', 'COUNSELLED', 'OTHER']"
                />
              </q-popup-edit>
            </q-td>

            <q-td
              key="ACTION"
              :props="props"
            >
              {{ props.row.OTHER_ACTION }}
              <q-popup-edit
                v-model="props.row.OTHER_ACTION"
                title="Update OTHER_ACTION"
                buttons
                @save="updateData(props.row, 'OTHER_ACTION')"
                :disable="disable && props.row.ACTION === 'OTHER' ? false : true"
              >
                <q-input
                  dense
                  counter
                  autofocus
                  maxlength="100"
                  v-model="props.row.OTHER_ACTION"
                />
              </q-popup-edit>
            </q-td>

            <q-td
              key="QH_REMARKS"
              :props="props"
            >
              {{ props.row.QH_REMARKS }}
              <q-popup-edit
                v-model="props.row.QH_REMARKS"
                title="Update QH_REMARKS"
                buttons
                @save="updateData(props.row, 'QH_REMARKS')"
                :disable="!disable"
              >
                <q-input
                  dense
                  counter
                  autofocus
                  maxlength="100"
                  v-model="props.row.QH_REMARKS"
                />
              </q-popup-edit>
            </q-td>

            <q-td
              key="QW_REMARKS"
              :props="props"
            >
              {{ props.row.QW_REMARKS }}
              <q-popup-edit
                v-model="props.row.QW_REMARKS"
                title="Update QW_REMARKS"
                buttons
                @save="updateData(props.row, 'QW_REMARKS')"
                :disable="!disable"
              >
                <q-input
                  dense
                  counter
                  autofocus
                  maxlength="100"
                  v-model="props.row.QW_REMARKS"
                />
              </q-popup-edit>
            </q-td>

            <q-td
              key="VH_REMARKS"
              :props="props"
            >
              {{ props.row.VH_REMARKS }}
              <q-popup-edit
                v-model="props.row.VH_REMARKS"
                title="Update VH_REMARKS"
                buttons
                @save="updateData(props.row, 'VH_REMARKS')"
                :disable="!disable"
              >
                <q-input
                  dense
                  counter
                  autofocus
                  maxlength="100"
                  v-model="props.row.VH_REMARKS"
                />
              </q-popup-edit>
            </q-td>

            <q-td
              key="XFERS_REMARKS"
              :props="props"
            >
              {{ props.row.XFERS_REMARKS }}
              <q-popup-edit
                v-model="props.row.XFERS_REMARKS"
                title="Update XFERS_REMARKS"
                buttons
                @save="updateData(props.row, 'XFERS_REMARKS')"
                :disable="!disable"
              >
                <q-input
                  dense
                  counter
                  autofocus
                  maxlength="100"
                  v-model="props.row.XFERS_REMARKS"
                />
              </q-popup-edit>
            </q-td>

            <q-td
              key="CORDER_CRITICAL_REMARKS"
              :props="props"
            >
              {{ props.row.CORDER_CRITICAL_REMARKS }}
              <q-popup-edit
                v-model="props.row.CORDER_CRITICAL_REMARKS"
                title="Update CORDER_CRITICAL_REMARKS"
                buttons
                @save="updateData(props.row, 'CORDER_CRITICAL_REMARKS')"
                :disable="!disable"
              >
                <q-input
                  dense
                  counter
                  autofocus
                  maxlength="100"
                  v-model="props.row.CORDER_CRITICAL_REMARKS"
                />
              </q-popup-edit>
            </q-td>

            <q-td
              key="CORDER_NON_CRITICAL_REMARKS"
              :props="props"
            >
              {{ props.row.CORDER_NON_CRITICAL_REMARKS }}
              <q-popup-edit
                v-model="props.row.CORDER_NON_CRITICAL_REMARKS"
                title="Update CORDER_NON_CRITICAL_REMARKS"
                buttons
                @save="updateData(props.row, 'CORDER_NON_CRITICAL_REMARKS')"
                :disable="!disable"
              >
                <q-input
                  dense
                  counter
                  autofocus
                  maxlength="100"
                  v-model="props.row.CORDER_NON_CRITICAL_REMARKS"
                />
              </q-popup-edit>
            </q-td>

          </q-tr>
        </template>

      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import { first } from 'lodash'
import { exportFile } from 'quasar'
import { unparse } from 'papaparse'
import { notify } from 'boot/notifier'
import GetRepo from 'src/repository/get'
import PutRepo from 'src/repository/put'

export default {
  name: 'Table',

  props: ['data'],

  data () {
    return {
      filter: '',
      columns: [],
      disable: true
    }
  },

  watch: {
    data (val) {
      const cols = Object
        .keys(first(val))
        .map(col => {
          return {
            name: col,
            field: col,
            label: col
          }
        })

      this.columns = cols
    }
  },

  methods: {
    exportData () {
      const title = 'IRAB List'
      const filtered = this.data.filter(f => f.STATUS === 'DEACTIVATED')

      this.export(title, unparse(filtered))
    },

    export (name, data) {
      notify('Downloading Data', 'Please wait', 'mdi-download', 'blue')
      exportFile(`${name}.csv`, data)
    },

    async updateData (data, field) {
      try {
        const { COSMO_ID, [field]: val } = data
        const PAYLOAD = {
          COSMOID: COSMO_ID,
          FIELD: field,
          VALUE: val
        }

        const { data: result } = await PutRepo.IrabDataRaw(PAYLOAD)
        console.log(result)
      } catch (err) {
        console.log(err)
        notify('Something went wrong', '', 'mdi-alert', 'red')
      }
    }
  },

  async beforeMount () {
    const { data } = await GetRepo.UserProfile(this.$q.localStorage.getItem('userAccnt'))
    this.disable = first(data).irabedit
  }
}
</script>
