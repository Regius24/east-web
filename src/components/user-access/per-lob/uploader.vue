<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin overflow-hidden">
      <q-card-section>
        <div class="text-weight-medium text-caption text-justify text-deep-orange q-mb-sm">
          *Be advised that the uploader is <span class="text-weight-bold">case</span>, <span class="text-weight-bold">spelling</span> and <span class="text-weight-bold">column</span> sensitive.
          You may refer to the export file for reference (1st column of the file is only for tracking remove it when uploading).
        </div>
        <q-file
          outlined
          counter
          accept=".csv"
          label="Upload a file (.csv)"
          v-model="file"
          :disable="loading"
          :loading="loading"
          @input="parseFile"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import Excel from 'exceljs'
import Papa from 'papaparse'
import { positive, negative } from 'boot/notifier'
import { Dialog } from 'quasar'
import PostRepo from 'src/repository/post'

export default {
  data () {
    return {
      file: null,
      loading: false
    }
  },

  methods: {
    parseFile () {
      this.loading = true

      Papa.parse(this.file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: col => col.split(' ').join('').trim(),
        step: ({ data }, parser) => {
          const {
            EENumber,
            Last,
            First,
            CompanyName,
            Subgroup1,
            Subgroup2,
            Subgroup3,
            Site,
            TeamName,
            TLName,
            TLCosmo,
            TLEmail,
            TLCosmoID,
            OMName,
            OMCosmo,
            OMCosmoID,
            OMEmail,
            AgentCosmoID,
            SalesforceID,
            HiredDate,
            COSMOEntitlements,
            SALESFORCE
          } = data

          const abortMe = (field, value) => {
            parser.abort()

            Dialog.create({
              html: true,
              title: `Invalid Value for Employee: <span class="text-amber">${EENumber}</span>`,
              message: `<strong class="text-red">${field}</strong> is <strong class="text-red">${value}</strong> but is a required field and must have a valid value`,
              style: 'width: 40vw;'
            })
          }

          if (Last === 'NA') abortMe('Last', Last)
          else if (First === 'NA') abortMe('First', First)
          else if (CompanyName === 'NA') abortMe('CompanyName', CompanyName)
          else if (Subgroup1 === 'NA') abortMe('Subgroup1', Subgroup1)
          else if (Subgroup2 === 'NA') abortMe('Subgroup2', Subgroup2)
          else if (Subgroup3 === 'NA') abortMe('Subgroup3', Subgroup3)
          else if (Site === 'NA') abortMe('Site', Site)
          else if (TeamName === 'NA') abortMe('TeamName', TeamName)
          else if (TLName === 'NA') abortMe('TLName', TLName)
          else if (TLCosmo === 'NA') abortMe('TLCosmo', TLCosmo)
          else if (TLEmail === 'NA') abortMe('TLEmail', TLEmail)
          else if (TLCosmoID === 'NA') abortMe('TLCosmoID', TLCosmoID)
          else if (OMName === 'NA') abortMe('OMName', OMName)
          else if (OMCosmo === 'NA') abortMe('OMCosmo', OMCosmo)
          else if (OMCosmoID === 'NA') abortMe('OMCosmoID', OMCosmoID)
          else if (OMEmail === 'NA') abortMe('OMEmail', OMEmail)
          else if (AgentCosmoID === 'NA') abortMe('AgentCosmoID', AgentCosmoID)
          else if (SalesforceID === 'NA') abortMe('SalesforceID', SalesforceID)
          else if (HiredDate === 'NA') abortMe('HiredDate', HiredDate)
          else if (COSMOEntitlements === 'NA') abortMe('COSMOEntitlements', COSMOEntitlements)
          else if (SALESFORCE === 'NA') abortMe('SALESFORCE', SALESFORCE)
          else parser.resume()
        },
        complete: async (parsed, file) => {
          try {
            if (file) {
              const formData = new FormData()
              formData.append('file', file)

              await PostRepo.UploadUamDataRaw(formData)
              positive('Success', 'data has been uploaded')

              setTimeout(() => {
                this.$router.go()
              }, 1200)
            }

            this.loading = false
            this.hide()
          } catch (err) {
            console.log(err)
            this.loading = false
            negative('Error encountered', 'data was not uploaded')
          }
        }
      })
    },

    parseFile2 () {
      this.loading = true

      // READ AN EXCEL TO READ THROUGH
      // THIS IS TO CHECK FOR INVALID VALUES
      const workbook = new Excel.Workbook()
      const reader = new FileReader()
      // const errorList = []

      reader.readAsArrayBuffer(this.file)
      reader.onload = () => {
        const buffer = reader.result

        workbook.xlsx.load(buffer).then(workbook => {
          workbook.eachSheet((sheet, id) => {
            const columns = sheet.getRow(1).values
            const requiredCols = [
              'Last',
              'First',
              'CompanyName',
              'Subgroup1',
              'Subgroup2',
              'Subgroup3',
              'Site',
              'TeamName',
              'TLName',
              'TLCosmo',
              'TLEmail',
              'TLCosmoID',
              'OMName',
              'OMCosmo',
              'OMCosmoID',
              'OMEmail',
              'AgentCosmoID',
              'SalesforceID',
              'HiredDate',
              'COSMOEntitlements',
              'SALESFORCE'
            ]

            sheet.eachRow((row, rowIndex) => {
              for (let i = 0; i < requiredCols.length; i++) {
                const columnNum = columns.indexOf(requiredCols[i])
                if (columnNum > -1) {
                  const cellVal = row.getCell(columnNum).value

                  if (cellVal === 'NA') {
                    console.log(`column: ${columns[columnNum]} = ${cellVal}`)
                  }
                }
              }
            })
          })
        })
      }
    },

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
    }
  }
}
</script>
