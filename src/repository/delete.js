import { axios } from 'boot/axios'

const resource = 'api/delete/'

export default {
  Userz: (DOMAIN) => axios.delete(resource + `Userz?domain=${DOMAIN}`)
}
