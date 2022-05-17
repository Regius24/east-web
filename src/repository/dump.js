import { axios } from 'boot/axios'

const resource = 'api/dump/'

export default {
  MedalliaPldt: () => axios.get(`${resource}MedalliaPldt`),
  MedalliaSmart: () => axios.get(`${resource}MedalliaSmart`)
}
