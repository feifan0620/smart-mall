import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import Login from '@/views/login'
import MyOrder from '@/views/myorder'
import Pay from '@/views/pay'
import ProDetail from '@/views/prodetail'
import Search from '@/views/search'
import SearchList from '@/views/search/list'

import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/login', component: Login },
    { path: '/myOrder', component: MyOrder },
    { path: '/pay', component: Pay },
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }
  ]
})

// 需要权限（登录）才能访问的页面
const authUrl = ['/myorder', '/pay']

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = store.getters.token
  if (token && to.path === '/login') {
    next('/')
  }
  // 如果访问的页面不包含在权限页面内，直接放行
  if (!authUrl.includes(to.path)) {
    next()
    return
  }

  // 否则判断是否登录
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
