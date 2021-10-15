import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import routes from './routes'
import store from '@/store'

const _createRouter = () => {
  return createRouter({
    history: createWebHashHistory(),
    routes: routes.map(item => item)
  })  
}

const router = _createRouter()

export function resetRouter () {
  const newRouter = _createRouter()
  router.options.routes = newRouter.options.routes
}

export default router
