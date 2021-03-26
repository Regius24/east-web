import { axios } from 'boot/axios'

const resource = 'api/post/'

export default {
  UamDataRaw: (BRAND, PAYLOAD) => axios.post(resource + 'UamDataRaw?brand=' + BRAND, PAYLOAD),
  IrabDataRaw: (PAYLOAD) => axios.post(resource + 'IrabDataRaw', PAYLOAD)
}
