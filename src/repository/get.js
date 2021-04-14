import { axios } from 'boot/axios'

const resource = 'api/get/'

export default {
  ValidateUser: (USERNAME, PASSWORD) => axios.get(`${resource}ValidateUser?username=${USERNAME}&password=${PASSWORD}`),
  UserProfile: (USERNAME) => axios.get(`${resource}UserProfile?username=${USERNAME}`),
  UamDataRaw: (BRAND, VENDOR) => axios.get(`${resource}UamDataRaw?brand=${BRAND}&vendor=${VENDOR}`),
  UamDataSummary: (BRAND, VENDOR, SITE) => axios.get(`${resource}UamDataSummary?brand=${BRAND}&vendor=${VENDOR}&site=${SITE}`),
  UamDataAgents: (BRAND, VENDOR) => axios.get(`${resource}UamDataAgents?brand=${BRAND}&vendor=${VENDOR}`),
  UamDataAgentsDetailed: ({ BRAND, LOB, VENDOR, TABLE }) => axios.get(`${resource}UamDataAgentsDetailed?brand=${BRAND}&lob=${LOB}&vendor=${VENDOR}&table=${TABLE}`),
  UamDataAgentsDistinctCol: (BRAND, CATEGORY) => axios.get(`${resource}UamDataAgentsDistinctCol?brand=${BRAND}&category=${CATEGORY}`),
  IrabData: (VENDOR) => axios.get(`${resource}IrabData?vendor=${VENDOR}`),
  IrabDataSummary: (MONTH, VENDOR) => axios.get(`${resource}IrabDataSummary?month=${MONTH}&vendor=${VENDOR}`),
  PasswordData: () => axios.get(`${resource}PasswordData`),
  PasswordDataSummary: (MONTH) => axios.get(`${resource}PasswordDataSummary?month=${MONTH}`),
  OnehubData: () => axios.get(`${resource}OnehubData`)
}
