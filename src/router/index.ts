import { createRouter, createWebHistory, type RouteRecordRaw, type Router } from 'vue-router'
import NProgress from 'nprogress'
import { useUserStore } from '@/stores/user'
import { staticRoutes, fetchDynamicRoutes } from './routes'
import 'nprogress/nprogress.css'

const views = import.meta.glob('../views/**/*.vue')

/**
 * 白名单
 */
const whiteRouteNameList = ['login', 'register']

const useRouterHooks = (router: Router) => {
  router.beforeEach((to, from, next) => {
    NProgress.start()

    const userStore = useUserStore()
    // 1.看一下是不是登录了，登录了就直接跳转
    if (userStore.user) {
      // next({ name: '403' })
      if (to.name === 'login') {
        next({ name: 'home' })
      } else {
        next()
      }
      return
    }
    // 2.没在白名单里，没有登录就去登录页面
    if (!whiteRouteNameList.includes(to.name as string)) {
      next({ name: 'login' })
    }
    // 3.在登录页面
    else {
      next()
    }
  })

  router.afterEach(() => {
    NProgress.done()
  })
}

export const setRouter = async () => {
  let router
  try {
    const dynamicRoutesData = await fetchDynamicRoutes()
    const dynamicRoutes: Array<RouteRecordRaw> = dynamicRoutesData.map((x) => {
      const url = `../${x.componentUrl}`
      return {
        path: x.url,
        name: x.name,
        component: views[url]
      }
    })
    staticRoutes[0].children = staticRoutes[0].children?.concat(dynamicRoutes)
    const routes = staticRoutes
    router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes
    })
  } catch (error) {
    router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes: staticRoutes
    })
    console.error('获取动态路由时出错:', error)
  }
  useRouterHooks(router)
  return router
}
