import { RouteRecordRaw } from 'vue-router'
import router, { resetRouter } from '@/router/index'
import generateRoutes from '@/utils/generateRoutes'
import { nextTick } from 'vue'

interface menuType {
  [propName: string]: Array<RouteRecordRaw>
}

interface StateType {
  isCollapse: boolean,
  navbarTitle: string,
  localeLang: string,
  routes: Array<RouteRecordRaw>,
  menus: menuType,
  theme: string
}

export default {
  namespaced: true,
  state: {
    isCollapse: false,
    navbarTitle: '',
    localeLang: 'zh-cn',
    routes: router.options.routes,
    menus: {},
    theme: 'default'
  },
  mutations: {
    TOGGLE_SLIDEBAR(state: StateType, value: boolean) {
      state.isCollapse = value
    },
    SET_NAVBAR_TITLE(state: StateType, value: string) {
      state.navbarTitle = value
    },
    SET_LOCALE_LANG(state: StateType, value: string) {
      state.localeLang = value
    },
    ADD_ROUTES(state: StateType, value: Array<RouteRecordRaw>) {
      value.forEach((route: RouteRecordRaw) => {
        router.addRoute(route)
        state.routes.push(route)
      })
    },
    RESET_ROUTER(state: StateType) {
      resetRouter()
      state.routes = router.options.routes
    },
    UPDATE_THEME(state: StateType, value: string) {
      state.theme = value
    }
  },
  actions: {
    toggleSlideBar({ commit }: any, value: boolean) {
      commit('TOGGLE_SLIDEBAR', value)
    },
    setNavbarTitle({ commit }: any, value: string) {
      commit('SET_NAVBAR_TITLE', value)
    },
    setLocaleLang({ commit }: any, value: string) {
      commit('SET_LOCALE_LANG', value)
    },
    addRoutes({ commit, dispatch }: any, value: Array<RouteRecordRaw>) {
      dispatch('resetRouter')
      commit('ADD_ROUTES', generateRoutes(value))
    },
    resetRouter({ commit }: any) {
      commit('RESET_ROUTER')
    },
    updateTheme({ commit }: any, value: string) {
      commit('UPDATE_THEME', value)
    }
  }
}