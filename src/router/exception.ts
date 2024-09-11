/**
 * @file 错误页面路由
 * 
 * @date 2024/05/14
 */
import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404'
    },
    component: () => import('@/views/exception/NotFindView.vue')
  },
  {
    path: '/403',
    name: '403',
    meta: {
      title: '403'
    },
    component: () => import('@/views/exception/NoPermissionView.vue')
  },
  {
    path: '/500',
    name: '500',
    meta: {
      title: '500'
    },
    component: () => import('@/views/exception/ServerErrorView.vue')
  }
] as Array<RouteRecordRaw>
