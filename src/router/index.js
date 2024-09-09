import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import Login from '@/views/login'
import MyOrder from '@/views/myorder'
import Pay from '@/views/pay'
import ProDetail from '@/views/prodetail'
import Search from '@/views/search'
import SearchList from '@/views/search/list'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Layout },
    { path: '/login', component: Login },
    { path: '/myOrder', component: MyOrder },
    { path: '/pay', component: Pay },
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }
  ]
})

export default router
