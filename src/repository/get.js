import { axios } from 'boot/axios'

const resource = 'api/get/'

export default {
  UamDataRaw: (BRAND, VENDOR) => axios.get(`${resource}UamDataRaw?brand=${BRAND}&vendor=${VENDOR}`),
  UamDataSummary: (BRAND) => axios.get(`${resource}UamDataSummary?brand=${BRAND}`),
  UamDataSummary2: (BRAND, TABLE) => axios.get(`${resource}UamDataSummary2?brand=${BRAND}&table=${TABLE}`)
}
