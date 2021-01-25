<template>
  <q-table
    dense
    flat
    bordered
    title="Agent List"
    :data="data"
    :columns="columns"
    row-key="name"
    separator="vertical"
    :filter="filter"
  >
    <template v-slot:top-right>
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
  </q-table>
</template>

<script>
export default {
  props: ['data'],

  data () {
    return {
      filter: '',
      columns: [
        { name: 'Agent Name', field: 'Agent Name', label: 'Agent Name' },
        { name: 'Company Name', field: 'Company Name', label: 'Company Name' },
        { name: 'Site', field: 'Site', label: 'Site' },
        { name: 'Domain', field: 'Domain', label: 'Domain' },
        { name: 'Employee ID', field: 'Employee ID', label: 'Employee ID' },
        { name: 'Agent Status', field: 'Agent Status', label: 'Agent Status' },
        { name: 'Batch Name', field: 'Batch Name', label: 'Batch Name' },
        { name: 'Hired Date', field: 'Hired Date', label: 'Hired Date' },
        { name: 'End Date', field: 'End Date', label: 'End Date' },
        { name: 'Job Level', field: 'Job Level', label: 'Job Level' }
      ]
    }
  }
}
</script>
