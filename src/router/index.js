import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/components/Main'
const Home = () => import('@/components/Home')
const MovieList = () => import('@/components/MovieList')
const WordMouthList = () => import('@/components/WordMouthList')
const NAList = () => import('@/components/NAList')
const MovieDetail  = () => import('@/components/MovieDetail')
const SearchResult = () => import('@/components/SearchResult')

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: 'home',
      component: Main,
      children: [/*{
        path: '',
        name: 'home',
        component: Home
      },*/ {
        path: 'home',
        name: 'home',
        component: Home,
        meta: {
          keepAlive: true
        }
      },{
        path: 'list/:type',
        name: 'list',
        component: MovieList
      },
      {
        path: 'wordmouth',
        name: 'wordmouth',
        component: WordMouthList
      },
      {
        path: 'na',
        name: 'na',
        component: NAList
      }]
    },
    {
      path: '/moviedetail/:id',
      name: 'moviedetail',
      component: MovieDetail
    },
    {
      path: '/search_result',
      name: 'search_result',
      component: SearchResult
    }
  ]
})
