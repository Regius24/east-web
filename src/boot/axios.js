import Vue from 'vue'
import axios from 'axios'

// const DEV = "http://localhost:64575/";
const PROD = location.origin + process.env.PROD ? '/east/' : ''
// const PROD = '10.122.9.115:24/east/'

if (process.env.PROD) axios.defaults.baseURL = PROD
// axios.defaults.withCredentials = true

// const axiosInstance = axios.create({
//   withCredentials: true,
//   baseURL: process.env.DEV ? DEV : PROD
// });

Vue.prototype.$axios = axios

export { axios }
