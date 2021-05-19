
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
      { path: 'user-access', name: 'user-access', component: () => import('pages/UserAccess.vue'), meta: { allow: true } },
      { path: 'user-access-tools', name: 'user-access-tools', component: () => import('pages/UserAccessTools.vue'), meta: { allow: true } },
      { path: 'user-access-history', name: 'user-access-history', component: () => import('pages/UserAccessHistory.vue'), meta: { allow: true } },
      { path: 'user-access-audit', name: 'user-access-audit', component: () => import('pages/UserAccessAudit.vue'), meta: { allow: true } },
      { path: 'workforce-management', name: 'workforce-management', component: () => import('pages/WorkforceManagement.vue'), meta: { allow: true } },
      { path: 'access-manager', name: 'access-manager', component: () => import('pages/AccessManager.vue'), meta: { allow: true } },
      { path: 'report-irab', name: 'report-irab', component: () => import('pages/ReportIrab.vue'), meta: { allow: true } },
      { path: 'report-password', name: 'report-password', component: () => import('pages/ReportPassword.vue'), meta: { allow: true } },
      { path: 'report-onehub', name: 'report-onehub', component: () => import('pages/ReportOnehub.vue'), meta: { allow: true } }
    ]
  },

  {
    path: '/Unauthorized',
    name: 'error401',
    component: () => import('pages/Error401.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
