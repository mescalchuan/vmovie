 import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
const Home = () => import('@/components/Home')
const MovieList = () => import('@/components/MovieList')

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/list/:type',
      name: 'list',
      component: MovieList
    }
  ]
})
