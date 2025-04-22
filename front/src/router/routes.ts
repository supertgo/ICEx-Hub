import type { RouteRecordRaw } from 'vue-router';
import { Routes } from 'src/enums/Routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/signup',
    component: () => import('pages/SignupPage.vue'),
    name: Routes.SIGNUP,
  },
  {
    path: '/signIn',
    name: Routes.SIGN_IN,
    component: () => import('pages/SignInPage.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: false },
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: Routes.HOME,
      },
      {
        path: '/updatePassword',
        component: () => import('pages/UpdatePasswordPage.vue'),
        name: Routes.UPDATE_PASSWORD,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/updateName',
        component: () => import('pages/UpdateNamePage.vue'),
        name: Routes.UPDATE_NAME,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
