<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin overflow-hidden">
      <q-card-section>
        <div class="text-weight-medium text-body2 text-justify text-deep-orange q-mb-sm">
          *You may refer to the export file for a template;
          Please remove the following columns before uploading: <span class="text-weight-bold text-italic">Date</span> and <span class="text-weight-bold text-italic">Tenure</span>.
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
import moment from 'moment'
import { Dialog } from 'quasar'
import {
  // positive,
  negative
} from 'boot/notifier'
// import PostRepo from 'src/repository/post'

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
            COSMOEntitlements,
            SALESFORCE,
            AgentStatus,
            JobLevel,
            HiredDate,
            TrainingDate,
            LiveDate,
            EndDate
          } = data

          const abortMe = (field, value) => {
            parser.abort()

            Dialog.create({
              html: true,
              title: `Invalid Value for Employee: <span class="text-amber">${EENumber}</span>`,
              message: `<strong class="text-red">${field}</strong> is <strong class="text-red">${value}</strong> but is a required field and must have a valid value.`,
              style: 'width: 40vw;',
              persistent: true
            })
          }

          const abortMeDate = () => {
            parser.abort()

            Dialog.create({
              html: true,
              title: `Invalid Value for Employee: <span class="text-amber">${EENumber}</span> (${AgentStatus})`,
              message:
              `
                The following dates should not be equal and is sequential: <br />
                <code>Hired Date < Training Date < Live Date</code> <br /><br />
                Hired Date: <strong class="text-red">${HiredDate}</strong> <br />
                Training Date: <strong class="text-red">${TrainingDate}</strong> <br />
                Live Date: <strong class="text-red">${LiveDate}</strong> <br /><br />
              `,
              style: 'width: 40vw;',
              persistent: true
            })
          }

          const abortMeEndDate = () => {
            parser.abort()

            Dialog.create({
              html: true,
              title: `Invalid Value for Employee: <span class="text-amber">${EENumber}</span> (${AgentStatus})`,
              message:
              `
                Unless the Agent Status is <strong>RESIGNED</strong> the End Date should have a value;  <br />
                Otherwise else use <strong>NA</strong> instead: <br /><br />
                End Date: <strong class="text-red">${EndDate}</strong> <br />
              `,
              style: 'width: 40vw;',
              persistent: true
            })
          }

          const fieldCheck = (field) => field === 'NA' || field === ''
          const agentStatusCheck = AgentStatus.trim() !== 'TRAINEES' && AgentStatus.trim() !== 'INACTIVE' && AgentStatus.trim() !== 'RESIGNED'
          const jobLevelCheck = JobLevel.trim() === 'AGENT' && JobLevel.trim() === 'Ops Support'
          const datesCheck = moment(new Date(HiredDate)).isBefore(new Date(TrainingDate)) && moment(new Date(TrainingDate)).isBefore(new Date(LiveDate))

          if (fieldCheck(Last) && agentStatusCheck && jobLevelCheck) abortMe('Last', Last)
          else if (fieldCheck(First) && agentStatusCheck && jobLevelCheck) abortMe('First', First)
          else if (fieldCheck(CompanyName) && agentStatusCheck && jobLevelCheck) abortMe('CompanyName', CompanyName)
          else if (fieldCheck(Subgroup1) && agentStatusCheck && jobLevelCheck) abortMe('Subgroup1', Subgroup1)
          else if (fieldCheck(Subgroup2) && agentStatusCheck && jobLevelCheck) abortMe('Subgroup2', Subgroup2)
          else if (fieldCheck(Subgroup3) && agentStatusCheck && jobLevelCheck) abortMe('Subgroup3', Subgroup3)
          else if (fieldCheck(Site) && agentStatusCheck && jobLevelCheck) abortMe('Site', Site)
          else if (fieldCheck(TeamName) && agentStatusCheck && jobLevelCheck) abortMe('TeamName', TeamName)
          else if (fieldCheck(TLName) && agentStatusCheck && jobLevelCheck) abortMe('TLName', TLName)
          else if (fieldCheck(TLCosmo) && agentStatusCheck && jobLevelCheck) abortMe('TLCosmo', TLCosmo)
          else if (fieldCheck(TLEmail) && agentStatusCheck && jobLevelCheck) abortMe('TLEmail', TLEmail)
          else if (fieldCheck(TLCosmoID) && agentStatusCheck && jobLevelCheck) abortMe('TLCosmoID', TLCosmoID)
          else if (fieldCheck(OMName) && agentStatusCheck && jobLevelCheck) abortMe('OMName', OMName)
          else if (fieldCheck(OMCosmo) && agentStatusCheck && jobLevelCheck) abortMe('OMCosmo', OMCosmo)
          else if (fieldCheck(OMCosmoID) && agentStatusCheck && jobLevelCheck) abortMe('OMCosmoID', OMCosmoID)
          else if (fieldCheck(OMEmail) && agentStatusCheck && jobLevelCheck) abortMe('OMEmail', OMEmail)
          else if (fieldCheck(AgentCosmoID) && agentStatusCheck && jobLevelCheck) abortMe('AgentCosmoID', AgentCosmoID)
          else if (fieldCheck(SalesforceID) && agentStatusCheck && jobLevelCheck) abortMe('SalesforceID', SalesforceID)
          else if (fieldCheck(HiredDate) && agentStatusCheck && jobLevelCheck) abortMe('HiredDate', HiredDate)
          else if (fieldCheck(COSMOEntitlements) && agentStatusCheck && jobLevelCheck) abortMe('COSMOEntitlements', COSMOEntitlements)
          else if (fieldCheck(SALESFORCE) && agentStatusCheck && jobLevelCheck) abortMe('SALESFORCE', SALESFORCE)
          else if (!datesCheck) abortMeDate()
          else if (AgentStatus === 'RESIGNED' ? moment.isDate(new Date(EndDate)) : false) abortMeEndDate()
          else if (AgentStatus !== 'RESIGNED' ? !(EndDate === 'NA') : true) abortMeEndDate()
          else parser.resume()
        },
        complete: async (parsed, file) => {
          try {
            // if (file) {
            //   const formData = new FormData()
            //   formData.append('file', file)

            //   await PostRepo.UploadUamDataRaw(formData)
            //   positive('Success', 'data has been uploaded')

            //   setTimeout(() => {
            //     this.$router.go()
            //   }, 1200)
            // }

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
