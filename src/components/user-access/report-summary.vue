<template>
  <div>
    <q-file
      outlined
      counter
      accept=".csv"
      label="Upload a file (.csv)"
      v-model="file"
      @input="initXLSX"
    >
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>

    <div ref="table"></div>
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  data () {
    return {
      file: null
    }
  },

  methods: {
    initXLSX () {
      const reader = new FileReader()
      reader.readAsArrayBuffer(this.file)

      reader.onload = () => {
        const data = new Uint8Array(reader.result)
        const wb = XLSX.read(data, { type: 'array' })

        const htmlstr = XLSX.write(wb, { sheet: '', type: 'binary', bookType: 'html' })
        this.$refs.table.innerHTML += htmlstr
      }
    }
  }
}
</script>
