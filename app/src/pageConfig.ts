export default [
  {
    path: '/',
    component: () => import('./pages/indexPage'),
    models: [import('./models/indexPage')],
  },
  {
    path: '/test',
    component: () => import('./pages/testPage'),
    models: [import('./models/indexPage')],
  },
  // 404页面
  {
    component: () => import('./pages/404'),
  },
];
