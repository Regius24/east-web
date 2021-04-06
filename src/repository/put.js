import { axios } from 'boot/axios'

const resource = 'api/put/'

export default {
  IrabDataRaw: (PAYLOAD) => axios.put(resource + 'IrabDataRaw', PAYLOAD)
}
