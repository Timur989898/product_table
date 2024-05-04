import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: () => ({
        name: 'products',
      }),
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
    {
      path: '/products',
      children: [
        {
          path: '',
          name: 'products',
          component: () => import('../views/ProductsView.vue'),
        },
        {
          path: ':productId',
          name: 'product',
          component: () => import('../views/ProductView.vue'),
          props: true,
        }
      ]
    },
    {
      path: '/:fallback',
      name: 'fallback',
      redirect: () => ({
        name: 'home',
      }),
    },
  ]
})

export default router
