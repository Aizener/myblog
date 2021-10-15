import { getUserInfo } from '@/utils/api/user'
import router from '@/router'

interface StateType {
  token: string,
  userInfo: any
}

export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: null
  },
  mutations: {
    LOGIN(state: StateType, value: any) {
      state.token = value.token
      sessionStorage.setItem('token', state.token)
    },
    SAVE_USER_INFO(state: StateType, value: any) {
      state.userInfo = value
    }
  },
  actions: {
    login({ state, commit, dispatch }: any, value: any) {
      commit('LOGIN', value)
      dispatch('getUserInfo', state.token)
      router.push({ path: '/' })
    },
    async getUserInfo({ commit, dispatch }: any, value: any) {
      const res: any = await getUserInfo({ token: value })
      if (res.code === 200) {
        commit('SAVE_USER_INFO', res.data)
        dispatch('app/addRoutes', res.data.menus, { root: true })
      } else {
        router.push({ path: '/login' })
      }
    }
  },
}