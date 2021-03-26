import { axios } from 'boot/axios'

const resource = 'api/get/'

export default {
  ValidateUser: (USERNAME, PASSWORD) => axios.get(`${resource}ValidateUser?username=${USERNAME}&password=${PASSWORD}`),
  UserProfile: (USERNAME) => axios.get(`${resource}UserProfile?username=${USERNAME}`),
  UamDataRaw: (BRAND, VENDOR) => axios.get(`${resource}UamDataRaw?brand=${BRAND}&vendor=${VENDOR}`),
  UamDataSummary: (BRAND) => axios.get(`${resource}UamDataSummary?brand=${BRAND}`),
  UamDataSummary2: (BRAND, VENDOR) => axios.get(`${resource}UamDataSummary2?brand=${BRAND}&vendor=${VENDOR}`),
  UamDataAgents: (BRAND, VENDOR) => axios.get(`${resource}UamDataAgents?brand=${BRAND}&vendor=${VENDOR}`),
  UamDataAgentsDetailed: ({ brand, lob, vendor, table }) => axios.get(`${resource}UamDataAgentsDetailed?brand=${brand}&lob=${lob}&vendor=${vendor}&table=${table}`),
  IrabData: () => axios.get(`${resource}IrabData`),
  IrabDataSummary: (MONTH) => axios.get(`${resource}IrabDataSummary?month=${MONTH}`)
}
