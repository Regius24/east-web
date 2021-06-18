import { axios } from 'boot/axios'

const resource = 'api/get/'

export default {
  ValidateUser: (USERNAME, PASSWORD) => axios.get(`${resource}ValidateUser?username=${USERNAME}&password=${PASSWORD}`),
  UserProfile: (USERNAME) => axios.get(`${resource}UserProfile?username=${USERNAME}`),

  // USER ACCESS
  UamDataSummary: (BRAND, VENDOR, SITE) => axios.get(`${resource}UamDataSummary?brand=${BRAND}&vendor=${VENDOR}&site=${SITE}`),
  UamDataSummaryTools: (BRAND, VENDOR, SITE) => axios.get(`${resource}UamDataSummaryTools?brand=${BRAND}&vendor=${VENDOR}&site=${SITE}`),
  UamDataSummaryAll: (BRAND, VENDOR, SITE) => axios.get(`${resource}UamDataSummaryAll?brand=${BRAND}&vendor=${VENDOR}&site=${SITE}`),
  UamDataAgents: (BRAND, VENDOR) => axios.get(`${resource}UamDataAgents?brand=${BRAND}&vendor=${VENDOR}`),
  UamDataAgentsDetailed: (BRAND, LOB, VENDOR, TABLE) => axios.get(`${resource}UamDataAgentsDetailed?brand=${BRAND}&lob=${LOB}&vendor=${VENDOR}&table=${TABLE}`),

  UamDataSummaryHistory: (DATE, BRAND, VENDOR, SITE) => axios.get(`${resource}UamDataSummaryHistory?date=${DATE}&brand=${BRAND}&vendor=${VENDOR}&site=${SITE}`),
  UamDataAgentsDistinctCol: (BRAND, CATEGORY) => axios.get(`${resource}UamDataAgentsDistinctCol?brand=${BRAND}&category=${CATEGORY}`),
  UamDataAgentsHistoryDistinctCol: (DATE, BRAND, CATEGORY) => axios.get(`${resource}UamDataAgentsHistoryDistinctCol?date=${DATE}&brand=${BRAND}&category=${CATEGORY}`),
  UamDataAgentsHistory: (DATE, BRAND, VENDOR) => axios.get(`${resource}UamDataAgentsHistory?date=${DATE}&brand=${BRAND}&vendor=${VENDOR}`),
  UamDataHistoryDates: (BRAND, TYPE) => axios.get(`${resource}UamDataHistoryDates?brand=${BRAND}&type=${TYPE}`),

  UamDataAuditSummary: () => axios.get(`${resource}UamDataAuditSummary`),

  UamDataAgentsHistoryMonths: (BRAND) => axios.get(`${resource}UamDataAgentsHistoryMonths?brand=${BRAND}`),
  UamDataAgentsHistoryMonthlyDistinctCol: (MONTH, BRAND, CATEGORY) => axios.get(`${resource}UamDataAgentsHistoryMonthlyDistinctCol?month=${MONTH}&brand=${BRAND}&category=${CATEGORY}`),
  UamDataSummaryHistoryMonthly: (MONTH, BRAND, VENDOR, SITE) => axios.get(`${resource}UamDataSummaryHistoryMonthly?month=${MONTH}&brand=${BRAND}&vendor=${VENDOR}&site=${SITE}`),
  UamDataAgentsHistoryMonthly: (MONTH, BRAND, VENDOR) => axios.get(`${resource}UamDataAgentsHistoryMonthly?month=${MONTH}&brand=${BRAND}&vendor=${VENDOR}`),

  // REPORTS
  IrabData: (VENDOR) => axios.get(`${resource}IrabData?vendor=${VENDOR}`),
  IrabDataSummary: (MONTH, VENDOR) => axios.get(`${resource}IrabDataSummary?month=${MONTH}&vendor=${VENDOR}`),

  PasswordData: () => axios.get(`${resource}PasswordData`),
  PasswordDataSummary: (MONTH) => axios.get(`${resource}PasswordDataSummary?month=${MONTH}`),

  EsolveReportData: () => axios.get(`${resource}EsolveReportData`),

  OnehubData: () => axios.get(`${resource}OnehubData`),

  LeaversDaily: (BRAND) => axios.get(`${resource}LeaversDaily?brand=${BRAND}`),
  LeaversMonthly: (BRAND) => axios.get(`${resource}LeaversMonthly?brand=${BRAND}`),

  // KNOWLEDGE BASE
  KBUserAccessTools: (BRAND) => axios.get(`${resource}UamToolsData`),

  // SETTINGS
  UserList: () => axios.get(`${resource}UserList`)
}
