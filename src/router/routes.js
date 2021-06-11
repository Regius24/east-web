
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('pages/Index.vue')
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'user-access', name: 'user-access', component: () => import('src/pages/UserAccess/UserAccess.vue'), meta: { allow: true } },
      { path: 'user-access-tools', name: 'user-access-tools', component: () => import('src/pages/UserAccess/UserAccessTools.vue'), meta: { allow: true } },
      { path: 'user-access-summary', name: 'user-access-summary', component: () => import('src/pages/UserAccess/UserAccessSummary.vue'), meta: { allow: true } },
      { path: 'user-access-history', name: 'user-access-history', component: () => import('src/pages/UserAccess/UserAccessHistory.vue'), meta: { allow: true } },
      { path: 'user-access-audit', name: 'user-access-audit', component: () => import('src/pages/UserAccess/UserAccessAudit.vue'), meta: { allow: true } },
      { path: 'report-irab', name: 'report-irab', component: () => import('src/pages/Report/ReportIrab.vue'), meta: { allow: true } },
      { path: 'report-password', name: 'report-password', component: () => import('src/pages/Report/ReportPassword.vue'), meta: { allow: true } },
      { path: 'report-esolve', name: 'report-esolve', component: () => import('src/pages/Report/ReportEsolve.vue'), meta: { allow: true } },
      { path: 'report-onehub', name: 'report-onehub', component: () => import('src/pages/Report/ReportOnehub.vue'), meta: { allow: true } },
      { path: 'report-leavers-daily', name: 'report-leavers-daily', component: () => import('src/pages/Report/LeaversDaily.vue'), meta: { allow: true } }
    ]
  },

  {
    path: '/settings/',
    component: () => import('layouts/SettingsLayout.vue'),
    name: 'settings',
    children: [
      { path: 'users', name: 'settings-users', component: () => import('src/pages/Settings/SettingsUsers.vue'), meta: { allow: true } },
      { path: 'users-access', name: 'settings-usersaccess', component: () => import('src/pages/Settings/SettingsUsers.vue'), meta: { allow: true } },
      { path: 'users-profile', name: 'settings-usersprofile', component: () => import('src/pages/Settings/SettingsUsers.vue'), meta: { allow: true } }
    ],
    meta: { allow: true },
    redirect: { name: 'settings-users' }
  },

  {
    path: '/Unauthorized',
    name: 'error401',
    component: () => import('src/pages/Errors/Error401.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('src/pages/Errors/Error404.vue')
  }
]

export default routes
