import { axios } from 'boot/axios'

const resource = 'api/put/'

export default {
  IrabDataRaw: (PAYLOAD) => axios.put(resource + 'IrabDataRaw', PAYLOAD),
  UpdateUserz: (USER, DOMAIN, PROFILEID) => axios.put(resource + `Userz?user=${USER}&domain=${DOMAIN}&profile=${PROFILEID}`),
  updateBannerMessage: (PAYLOAD) => axios.put(resource + 'BannerMessage', PAYLOAD)
}
