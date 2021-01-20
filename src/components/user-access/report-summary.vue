<template>
  <div ref="table"></div>
</template>

<script>
import 'tabulator-tables/dist/css/tabulator_midnight.min.css'
import Tabulator from 'tabulator-tables'

export default {
  components: {
  },

  props: ['data'],

  data () {
    return {
      tabulator: null,
      tableData: [
        {
          name: 'Teste',
          age: 13
        },
        {
          name: 'Teste',
          age: 13
        }
      ]
    }
  },

  mounted () {
    this.tabulator = new Tabulator(this.$refs.table, {
      data: this.tableData, // link data to table
      reactiveData: true, // enable data reactivity
      columns: [
        {
          title: 'Name',
          field: 'name',
          sorter: 'string',
          width: 200,
          editor: true
        }
      ] // define table columns
    })
  }
}
</script>
