<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin q-pa-sm"
      style="min-width: 80%; min-height: 50%;"
    >
      <q-card-section>
        <div class="row q-col-gutter-md justify-center">
          <div
            v-for="(el, i) in dataList"
            :key="i"
            class="col"
          >
            <div class="text-h6">{{ el.Stage || 'NA' }}:</div>

            <q-list
              bordered
              separator
              class="rounded-borders"
            >
              <q-expansion-item
                v-for="(data, i2) in el.Data"
                :key="i2"
                expand-separator
                :label="data.Number"
                caption=""
              >
                <q-card>
                  <q-card-section>
                    <div class="q-pb-xs">
                      <q-icon
                        name="mdi-account"
                        size="md"
                      />
                      Agent: {{ data.First }} {{ data.Last }}
                    </div>
                    <div class="q-pb-xs">
                      <q-icon
                        name="mdi-calendar"
                        size="md"
                      />
                      Start Date: {{ data['Start Date'] }}
                    </div>
                    <div>
                      <q-icon
                        name="mdi-timer"
                        size="md"
                      />
                      Live Date: {{ data['Live Date'] }}
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import jsonata from 'jsonata'
import { isArray } from 'lodash'

export default {
  props: ['agentData'],

  data () {
    return {
      dataList: []
    }
  },

  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    onOKClick () {
      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      this.hide()
    },

    evaluateData () {
      const expression = jsonata(`
         $ { Stage: $ } ~> $each(function($v1, $k1) {
              {
                  'Stage': $k1,
                  'Count': $count($v1),
                  'Data': [$v1]
              }
          })
        `)
      let data = expression.evaluate(this.agentData)
      data = isArray(data) ? data : [data]

      console.log(data)

      this.dataList = data
    }
  },

  beforeMount () {
    this.evaluateData()
  }
}
</script>
