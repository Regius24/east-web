import { axios } from 'boot/axios'

const resource = 'api/post/'

export default {
  UamDataRaw: (BRAND, PAYLOAD) => axios.post(resource + 'UamDataRaw?brand=' + BRAND, PAYLOAD),
  UamAuditDataRaw: (PAYLOAD) => axios.post(resource + 'UamAuditDataRaw', PAYLOAD),
  IrabDataRaw: (PAYLOAD) => axios.post(resource + 'IrabDataRaw', PAYLOAD),
  IrabDataBlacklist: (PAYLOAD) => axios.post(resource + 'IrabDataBlacklist', PAYLOAD),
  PasswordDataRaw: (PAYLOAD) => axios.post(resource + 'PasswordDataRaw', PAYLOAD),
  OnehubData: (PAYLOAD) => axios.post(resource + 'OnehubDataRaw', PAYLOAD),
  UploadOnehubFile: (PAYLOAD) => axios.post(resource + 'UploadToOnehub', PAYLOAD, { headers: { 'Content-Type': 'multipart/form-data' } }),
  UploadLeaverDailyFile: (BRAND, PAYLOAD) => axios.post(resource + `UploadToLeaversDaily?brand=${BRAND}`, PAYLOAD, { headers: { 'Content-Type': 'multipart/form-data' } }),
  UploadLeaverMonthlyPldtFile: (PAYLOAD) => axios.post(resource + 'UploadToLeaversMonthlyPldt', PAYLOAD, { headers: { 'Content-Type': 'multipart/form-data' } }),
  UploadLeaverMonthlySmartFile: (PAYLOAD) => axios.post(resource + 'UploadToLeaversMonthlySmart', PAYLOAD, { headers: { 'Content-Type': 'multipart/form-data' } }),

  Userz: (DOMAIN, PROFILEID) => axios.post(resource + `Userz?domain=${DOMAIN}&id=${PROFILEID}`)
}
