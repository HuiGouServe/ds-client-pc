import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'
// import Home from '@/views/home.vue'
import Vuex from '@/views/vuex.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue') // 懒加载组件
  },
  {
    path: '/shopRegiest',
    name: 'shopRegiest',
    component: () => import('@/views/shopRegiest/index.vue') //注册店铺
  },
  {
    path: '/indentityAuthentication',
    name: 'indentityAuthentication',
    component: () => import('@/views/indentityAuthentication/index.vue') //认证
  }, {
    path: '/details',
    name: 'details',
    component: () => import('@/views/details/index.vue') // 详情
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/index.vue') // 注册
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue') // 登录
  },
  {
    path: '/release',
    name: 'release',
    component: () => import('@/views/release/index.vue') // 发布
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/index.vue') //查询
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test.vue') // 测试
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router