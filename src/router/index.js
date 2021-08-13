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
        const {
          settings,
          pUALob,
          pUATools,
          pUASummary,
          pUAHistory,
          pUAAudit,
          pLeavers,
          pMedallia,
          pIrab,
          pPassword,
          pEsolve,
          pOnehub,
          pKB,
          pNonUsage
        } = data[0]

        if (to.name.split('-')[0] === 'settings' && settings) next()
        else if (to.name === 'user-access-lob' && pUALob) next()
        else if (to.name === 'user-access-tools' && pUATools) next()
        else if (to.name === 'user-access-summary' && pUASummary) next()
        else if (to.name === 'user-access-history-weekly' && pUAHistory) next()
        else if (to.name === 'user-access-history-monthly' && pUAHistory) next()
        else if (to.name === 'user-access-audit' && pUAAudit) next()
        else if (to.name === 'report-leavers-daily' && pLeavers) next()
        else if (to.name === 'report-leavers-monthly' && pLeavers) next()
        else if (to.name === 'report-medallia' && pMedallia) next()
        else if (to.name === 'report-irab' && pIrab) next()
        else if (to.name === 'report-password' && pPassword) next()
        else if (to.name === 'report-esolve' && pEsolve) next()
        else if (to.name === 'report-onehub' && pOnehub) next()
        else if (to.name === 'report-non-usage' && pNonUsage) next()
        else if (to.name === 'kb-user-access-tools' && pKB) next()
        else if (to.name === 'kb-username-password-guidelines' && pKB) next()
        else next({ name: 'error401' })
      } else next({ name: 'error401' })
    }

    next()
  })

  return Router
}
