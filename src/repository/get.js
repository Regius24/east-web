import { axios } from 'boot/axios'

const resource = 'api/get/'

export default {
  ValidateUser: (USERNAME, PASSWORD) => axios.get(`${resource}ValidateUser?username=${USERNAME}&password=${PASSWORD}`),
  UserProfile: (USERNAME) => axios.get(`${resource}UserProfile?username=${USERNAME}`),

  // USER ACCESS
  UamDataSummary: (BRAND, VENDOR, SITE) => axios.get(`${resource}UamDataSummary?brand=${BRAND}&vendor=${VENDOR}&site=${SITE}`),
  UamDataSummaryTools: (BRAND, VENDOR, SITE) => axios.get(`${resource}UamDataSummaryTools?brand=${BRAND}&vendor=${VENDOR}&site=${SITE}`),
  UamDataSummaryAll: (BRAND, VENDOR, SITE) => axios.get(`${resource}UamDataSummaryAll?brand=${BRAND}&vendor=${VENDOR}&site=${SITE}`),
  UamDataAgents: (BRAND, TYPE, VENDOR) => axios.get(`${resource}UamDataAgents?brand=${BRAND}&type=${TYPE}&vendor=${VENDOR}`),
  UamDataAgentsDetailed: (BRAND, LOB, VENDOR, TABLE) => axios.get(`${resource}UamDataAgentsDetailed?brand=${BRAND}&lob=${LOB}&vendor=${VENDOR}&table=${TABLE}`),

  UamDataSummaryHistory: (DATE, BRAND, VENDOR, SITE) => axios.get(`${resource}UamDataSummaryHistory?date=${DATE}&brand=${BRAND}&vendor=${VENDOR}&site=${SITE}`),
  UamDataAgentsDistinctCol: (BRAND, CATEGORY, VENDOR) => axios.get(`${resource}UamDataAgentsDistinctCol?brand=${BRAND}&category=${CATEGORY}&vendor=${VENDOR}`),
  UamDataAgentsHistoryDistinctCol: (DATE, BRAND, CATEGORY, VENDOR) => axios.get(`${resource}UamDataAgentsHistoryDistinctCol?date=${DATE}&brand=${BRAND}&category=${CATEGORY}&vendor=${VENDOR}`),
  UamDataAgentsHistory: (DATE, BRAND, VENDOR) => axios.get(`${resource}UamDataAgentsHistory?date=${DATE}&brand=${BRAND}&vendor=${VENDOR}`),
  UamDataHistoryDates: (BRAND, TYPE) => axios.get(`${resource}UamDataHistoryDates?brand=${BRAND}&type=${TYPE}`),

  UamDataAuditSummary: (BRAND, WEEK) => axios.get(`${resource}UamDataAuditSummary?brand=${BRAND}&week=${WEEK}`),
  UamDataAuditWeekly: () => axios.get(`${resource}UamDataAuditWeekly`),

  UamDataAgentsHistoryMonths: (BRAND) => axios.get(`${resource}UamDataAgentsHistoryMonths?brand=${BRAND}`),
  UamDataAgentsHistoryMonthlyDistinctCol: (MONTH, BRAND, CATEGORY, VENDOR) => axios.get(`${resource}UamDataAgentsHistoryMonthlyDistinctCol?month=${MONTH}&brand=${BRAND}&category=${CATEGORY}&vendor=${VENDOR}`),
  UamDataSummaryHistoryMonthly: (MONTH, BRAND, VENDOR, SITE) => axios.get(`${resource}UamDataSummaryHistoryMonthly?month=${MONTH}&brand=${BRAND}&vendor=${VENDOR}&site=${SITE}`),
  UamDataAgentsHistoryMonthly: (MONTH, BRAND, VENDOR) => axios.get(`${resource}UamDataAgentsHistoryMonthly?month=${MONTH}&brand=${BRAND}&vendor=${VENDOR}`),

  // REPORTS
  IrabData: (VENDOR) => axios.get(`${resource}IrabData?vendor=${VENDOR}`),
  IrabDataSummary: (MONTH, VENDOR) => axios.get(`${resource}IrabDataSummary?month=${MONTH}&vendor=${VENDOR}`),

  PasswordData: (BRAND, VENDOR) => axios.get(`${resource}PasswordData?brand=${BRAND}&vendor=${VENDOR}`),
  PasswordDataSummary: (MONTH, BRAND, VENDOR) => axios.get(`${resource}PasswordDataSummary?month=${MONTH}&brand=${BRAND}&vendor=${VENDOR}`),

  EsolveReportData: () => axios.get(`${resource}EsolveReportData`),

  OnehubData: () => axios.get(`${resource}OnehubData`),

  LeaversDaily: (BRAND, VENDOR) => axios.get(`${resource}LeaversDaily?brand=${BRAND}&vendor=${VENDOR}`),
  LeaversMonthly: (BRAND, VENDOR) => axios.get(`${resource}LeaversMonthly?brand=${BRAND}&vendor=${VENDOR}`),

  Medallia: (BRAND, VENDOR) => axios.get(`${resource}Medallia?brand=${BRAND}&vendor=${VENDOR}`),

  // KNOWLEDGE BASE
  KBUserAccessTools: (BRAND) => axios.get(`${resource}UamToolsData?brand=${BRAND}`),

  // SETTINGS
  UserList: () => axios.get(`${resource}UserList`),
  ProfileList: () => axios.get(`${resource}ProfileList`)
}
