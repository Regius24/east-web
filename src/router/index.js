import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

import GetRepo from 'src/repository/get'
import { LocalStorage } from 'quasar'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({ store } /* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach(async (to, from, next) => {
    if (to.meta.allow) {
      if (store.state.data.allow) {
        const { data } = await GetRepo.UserProfile(LocalStorage.getItem('userAccnt'))
        const { useraccess, useraccessaudit, useraccesstools, useraccesshistory, irab, password, onehub } = data[0]

        if (to.name === 'user-access' && useraccess) next()
        else if (to.name === 'user-access-tools' && useraccesstools) next()
        else if (to.name === 'user-access-history' && useraccesshistory) next()
        else if (to.name === 'user-access-audit' && useraccessaudit) next()
        else if (to.name === 'report-irab' && irab) next()
        else if (to.name === 'report-password' && password) next()
        else if (to.name === 'report-onehub' && onehub) next()
        else next({ name: 'error401' })
      } else next({ name: 'error401' })
    }

    next()
  })

  return Router
}
