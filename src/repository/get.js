import { axios } from 'boot/axios'

const resource = 'api/get/'

export default {
  UserProfile: (USERNAME, PASSWORD) => axios.get(`${resource}UserProfile?username=${USERNAME}&password=${PASSWORD}`),
  UamDataRaw: (BRAND, VENDOR) => axios.get(`${resource}UamDataRaw?brand=${BRAND}&vendor=${VENDOR}`),
  UamDataSummary: (BRAND) => axios.get(`${resource}UamDataSummary?brand=${BRAND}`),
  UamDataSummary2: (BRAND, TABLE) => axios.get(`${resource}UamDataSummary2?brand=${BRAND}&table=${TABLE}`),
  UamDataAgents: (BRAND, VENDOR) => axios.get(`${resource}UamDataAgents?brand=${BRAND}&vendor=${VENDOR}`)
}
