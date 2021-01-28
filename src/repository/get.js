import { axios } from 'boot/axios'

const resource = 'api/get/'

export default {
  UserProfile: (USERNAME, PASSWORD) => axios.get(`${resource}UserProfile?username=${USERNAME}&password=${PASSWORD}`),
  UamDataRaw: (BRAND, VENDOR) => axios.get(`${resource}UamDataRaw?brand=${BRAND}&vendor=${VENDOR}`),
  UamDataSummary: (BRAND) => axios.get(`${resource}UamDataSummary?brand=${BRAND}`),
  UamDataSummary2: (BRAND) => axios.get(`${resource}UamDataSummary2?brand=${BRAND}`),
  UamDataAgents: (BRAND, VENDOR) => axios.get(`${resource}UamDataAgents?brand=${BRAND}&vendor=${VENDOR}`),
  UamDataAgentsDetailed: ({ brand, lob, vendor, table }) => axios.get(`${resource}UamDataAgentsDetailed?brand=${brand}&lob=${lob}&vendor=${vendor}&table=${table}`)
}
