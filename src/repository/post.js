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
  UploadLeaverDailyFile: (PAYLOAD) => axios.post(resource + 'UploadToLeaversDaily', PAYLOAD, { headers: { 'Content-Type': 'multipart/form-data' } })
}
