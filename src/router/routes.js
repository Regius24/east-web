
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('pages/Index.vue')
  },
  {
    path: '/page/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/Dashboard.vue') }
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
