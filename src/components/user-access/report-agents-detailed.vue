<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin q-pa-sm"
      style="min-width: 75%;"
    >
      <!-- HAS DATA -->
      <div v-if="dataList.length > 0">
        <!-- HEADER -->
        <q-tabs
          v-model="stage"
          active-color="primary"
          class="fit text-secondary"
        >
          <q-tab
            v-for="(el, i) in stageList"
            :key="i"
            :name="el"
            :label="el"
            align="justify"
            narrow-indicator
          />
        </q-tabs>

        <q-separator />

        <!-- BODY -->
        <q-tab-panels
          animated
          v-model="stage"
        >
          <q-tab-panel
            v-for="(el, i) in stageList"
            :key="i"
            :name="el"
            class="q-pa-none"
          >
            <q-splitter v-model="splitterModel">
              <!-- TOOLS NAVIGATION -->
              <template v-slot:before>
                <q-tabs
                  vertical
                  active-color="primary"
                  class="text-secondary"
                  v-model="tool"
                >
                  <q-tab
                    v-for="(el, i) in toolCols(stage)"
                    :key="i"
                    :name="el"
                    :label="el"
                  />
                </q-tabs>
              </template>

              <!-- TOOLS DATA -->
              <template v-slot:after>
                <q-tab-panels
                  v-model="tool"
                  animated
                  swipeable
                  vertical
                  transition-prev="jump-up"
                  transition-next="jump-up"
                >
                  <q-tab-panel
                    v-for="(el, i) in toolCols(stage)"
                    :key="i"
                    :name="el"
                    class="overflow-auto"
                    style="max-height: 400px"
                  >
                    <q-list
                      separator
                      bordered
                    >
                      <!-- TICKETS -->
                      <q-expansion-item
                        expand-separator
                        :label="el2.Number"
                        :caption="`Count of Agents: ${el2.Count}`"
                        v-for="(el2, i2) in toolData(stage, el)"
                        :key="i2"
                      >
                        <q-card>
                          <q-card-section>
                            <!-- TICKET DATA -->
                            <q-list
                              bordered
                              separator
                            >
                              <q-item
                                v-for="(el3, i3) in el2.Data"
                                :key="i3"
                              >
                                <q-item-section>
                                  <q-item-label lines="1">{{ el3.First }} {{ el3.Last }}</q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-list>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                    </q-list>
                  </q-tab-panel>
                </q-tab-panels>
              </template>
            </q-splitter>
          </q-tab-panel>
        </q-tab-panels>
      </div>

      <!-- NO DATA -->
      <div
        v-else
        class="q-ma-auto"
      >

        <div class="q-ml-sm text-h5">
          <q-icon
            name="mdi-alert"
            size="lg"
            color="orange"
          />
          No data to show...
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import jsonata from 'jsonata'
import { isArray, first } from 'lodash'

export default {
  props: ['agentData'],

  data () {
    return {
      dataList: [],
      stage: '',
      stageList: [],
      tool: null,
      toolList: null,

      splitterModel: 20
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
      if (this.agentData.length > 0) {
        const expression = jsonata(`
          $ { Stage: $ } ~> $each(function($v1, $k1) {
              {
                  'Stage': $k1,
                  'Count': $count($v1),
                  'Tools': [$v1 { Tools: $ } ~> $each(function($v2, $k2) {
                      {
                          'Tool': $k2,
                          'Count': $count($v2),
                          'Tickets': [$v2 { Number: $ } ~> $each(function($v3, $k3) {
                              {
                                  'Number': $k3,
                                  'Count': $count($v3),
                                  'Data': [$v3]
                              }
                          })]
                      }
                  })]
              }
          })
        `)
        let data = expression.evaluate(this.agentData)
        data = isArray(data) ? data : [data]

        this.stageList = data.map(m => m.Stage)
        this.stage = first(this.stageList)
        this.dataList = data
      }
    },

    toolCols (stage) {
      const stageData = this.dataList.find(f => f.Stage === stage)
      const tools = stageData.Tools.map(m => m.Tool).sort()
      return tools
    },
    toolData (stage, tool) {
      const stageData = this.dataList.find(f => f.Stage === stage)
      const data = stageData.Tools.find(f => f.Tool === tool)

      return data.Tickets
    }
  },

  beforeMount () {
    this.evaluateData()
  }
}
</script>
