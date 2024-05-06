import { createRouter, createWebHistory } from 'vue-router'
import { useProductStore } from '@/stores/product';
import { useLoadingStore } from '@/stores/loading';

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
          meta: {
            globalLoading: true,
          },
          beforeEnter: async (to, from, next) => {
            const productId = to.params.productId as string;

            if (!productId) {
              next('products');
            } else {
              const { loadProduct } = useProductStore();

              const foundedProduct = await loadProduct(productId);

              if (foundedProduct) {
                next();
              } else {
                next('not-found');
              }
            }
          },
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

router.beforeEach((to) => {
  if (to.meta.globalLoading) {
    const { setLoading } = useLoadingStore();
    setLoading(true);
  }
})

router.afterEach(() => {
  const { setLoading } = useLoadingStore();
  setLoading(false);
})

export default router
