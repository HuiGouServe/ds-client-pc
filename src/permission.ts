import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from './utils/cookie'
import router from './router/index'


NProgress.configure({ showSpinner: false })
const whiteList = ['/login', '/404', '/home', '/register', '/search', 'test', '/'] // 白名单
router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条
  if (!getToken() && whiteList.indexOf(to.path) == -1) {
    next(`/login?redirect=${to.path}`)
    window.localStorage.setItem('path', to.path)
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done()
})



