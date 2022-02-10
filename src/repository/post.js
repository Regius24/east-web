import { axios } from 'boot/axios'

const resource = 'api/post/'

export default {
  UamDataRaw: (USER, BRAND, PAYLOAD) => axios.post(resource + `UamDataRaw?user=${USER}&brand=${BRAND}`, PAYLOAD),
  UamAuditDataRaw: (USER, PAYLOAD) => axios.post(resource + `UamAuditDataRaw?user=${USER}`, PAYLOAD),
  IrabDataRaw: (USER, PAYLOAD) => axios.post(resource + `IrabDataRaw?user=${USER}`, PAYLOAD),
  IrabDataBlacklist: (USER, PAYLOAD) => axios.post(resource + `IrabDataBlacklist?user=${USER}`, PAYLOAD),
  PasswordDataRaw: (USER, PAYLOAD) => axios.post(resource + `PasswordDataRaw?user=${USER}`, PAYLOAD),
  OnehubData: (USER, PAYLOAD) => axios.post(resource + `OnehubDataRaw?user=${USER}`, PAYLOAD),

  UploadOnehubFile: (USER, PAYLOAD) => axios.post(resource + `UploadToOnehub?user=${USER}`, PAYLOAD, { headers: { 'Content-Type': 'multipart/form-data' } }),
  UploadLeaverDailyFile: (USER, BRAND, PAYLOAD) => axios.post(resource + `UploadToLeaversDaily?user=${USER}&brand=${BRAND}`, PAYLOAD, { headers: { 'Content-Type': 'multipart/form-data' } }),
  UploadLeaverMonthlyPldtFile: (USER, PAYLOAD) => axios.post(resource + `UploadToLeaversMonthlyPldt?user=${USER}`, PAYLOAD, { headers: { 'Content-Type': 'multipart/form-data' } }),
  UploadLeaverMonthlySmartFile: (USER, PAYLOAD) => axios.post(resource + `UploadToLeaversMonthlySmart?user=${USER}`, PAYLOAD, { headers: { 'Content-Type': 'multipart/form-data' } }),
  UploadPasswordResettingFile: (USER, PAYLOAD) => axios.post(resource + `UploadToPasswordResetting?user=${USER}`, PAYLOAD, { headers: { 'Content-Type': 'multipart/form-data' } }),

  InsertUserz: (USER, DOMAIN, PROFILEID) => axios.post(resource + `Userz?user=${USER}&domain=${DOMAIN}&id=${PROFILEID}`)
}
