import router from '@/router/index'
import store from '@/store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = sessionStorage.getItem('token')
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (store.state.user.userInfo) {
        next()
      } else {
        store.dispatch('user/getUserInfo', token).then(() => {
          next({ ...to, replace: true })
        })
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})