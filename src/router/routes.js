
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
      { path: 'workforce-management', name: 'workforce-management', component: () => import('pages/WorkforceManagement.vue'), meta: { allow: true } },
      { path: 'access-manager', name: 'access-manager', component: () => import('pages/AccessManager.vue'), meta: { allow: true } }
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
