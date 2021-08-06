import { axios } from 'boot/axios'

const resource = 'api/put/'

export default {
  IrabDataRaw: (PAYLOAD) => axios.put(resource + 'IrabDataRaw', PAYLOAD),
  UpdateUserz: (DOMAIN, PROFILEID) => axios.put(resource + `Userz?domain=${DOMAIN}&profile=${PROFILEID}`)
}
