
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
      { path: 'user-access', name: 'user-access', component: () => import('pages/UserAccess.vue') },
      { path: 'workforce-management', name: 'workforce-management', component: () => import('pages/WorkforceManagement.vue') },
      { path: 'access-manager', name: 'access-manager', component: () => import('pages/AccessManager.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
