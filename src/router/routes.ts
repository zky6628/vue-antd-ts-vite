import GlobalLayout from '@/components/layout/GlobalLayout.vue'
import LoginView from '@/views/login/LoginView.vue'
import HomeView from '@/views/home/HomeView.vue'
import exception from './exception'
import type { IRouteRecordRaw } from './types/routes.types'
import type { RouteRecordRaw } from 'vue-router'

export const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'globalLayout',
    component: GlobalLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "RegisterView" */ '../views/register/RegisterView.vue')
  },
  ...exception,
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

export const fetchDynamicRoutes = (): Promise<Array<IRouteRecordRaw>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          url: '/user',
          name: 'user',
          componentUrl: 'views/system/user/UserView.vue'
        },
        {
          url: '/role',
          name: 'role',
          componentUrl: 'views/system/role/RoleView.vue'
        },
        {
          url: '/menu',
          name: 'menu',
          componentUrl: 'views/system/menu/MenuView.vue'
        },
        {
          url: '/dict',
          name: 'dict',
          componentUrl: 'views/system/dict/DictView.vue'
        }
      ])
    }, 1000)
  })
}
