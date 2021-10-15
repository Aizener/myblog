import { RouteRecordRaw } from 'vue-router'

export default (menus: Array<RouteRecordRaw>) => {
  return menus.map((menu: RouteRecordRaw) => {
    const children = menu.children ? menu.children : []
    return {
      path: menu.path,
      meta: menu.meta,
      component: () => import('@/layout/index.vue'),
      children: children.map((item: RouteRecordRaw) => {
        return {
          path: item.path,
          meta: item.meta,
          component: () => import('@/views/' + item.component)
        }
      })
    }
  })
}