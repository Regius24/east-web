import { axios } from 'boot/axios'

const resource = 'api/delete/'

export default {
  Userz: (USER, DOMAIN) => axios.delete(resource + `Userz?user=${USER}&domain=${DOMAIN}`)
}
