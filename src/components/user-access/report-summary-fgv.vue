<template>
  <FancyGridVue :config="gridConfig" />
</template>

<script>
import FancyGridVue from 'fancy-grid-vue'

export default {
  components: {
    FancyGridVue
  },
  props: ['title', 'data'],
  data () {
    return {
      gridConfig: {
        title: this.title || 'Report Table',
        theme: 'dark',
        height: 300,
        width: '100%',
        selModel: 'row',
        trackOver: true,
        exporter: true,
        modal: true,
        tbar: [{
          text: 'Export to Excel',
          handler: function () {
            this.exportToExcel({
              all: true,
              header: true,
              ignoreRender: true
            })
          }
        }],
        data: this.data,
        grouping: {
          by: 'Table', collapsed: true
        },
        columns: [
          {
            title: 'Name',
            index: 'Name'
          },
          {
            title: 'Agents',
            index: 'Agents'
          },
          {
            title: 'Complete',
            index: 'Complete'
          },
          {
            title: '%',
            index: 'Percent'
          }
        ]
      }
    }
  }
}
</script>
