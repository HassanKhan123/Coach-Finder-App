import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// import CoachDetail from '@/pages/coaches/CoachDetail';
import CoachesList from '@/pages/coaches/CoachesList';
// import CoachRegistration from '@/pages/coaches/CoachRegistration';
// import ContactCoach from '@/pages/requests/ContactCoach';
// import RequestsReceived from '@/pages/requests/RequestsReceived';
import NotFound from './pages/NotFound.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index';

const CoachDetail = defineAsyncComponent(() =>
  import('@/pages/coaches/CoachDetail')
);
const CoachRegistration = defineAsyncComponent(() =>
  import('@/pages/coaches/CoachRegistration')
);
const ContactCoach = defineAsyncComponent(() =>
  import('@/pages/requests/ContactCoach')
);
const RequestsReceived = defineAsyncComponent(() =>
  import('@/pages/requests/RequestsReceived')
);
const UserAuth = defineAsyncComponent(() =>
  import('@/pages/auth/UserAuth.vue')
);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    {
      path: '/coaches',
      component: CoachesList
    },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        {
          path: 'contact',
          component: ContactCoach
        }
      ]
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: { requiresUnAuth: true }
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
