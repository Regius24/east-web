import { axios } from 'boot/axios'

const resource = 'api/post/'

export default {
  postUserAccessData: (BRAND, PAYLOAD) => axios.post(resource + 'useraccessdata?brand=' + BRAND, PAYLOAD)
}
