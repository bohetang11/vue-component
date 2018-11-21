import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import homeComponent from '../pages/home/'
import memberComponent from '../pages/member/'
import shopcarComponent from '../pages/shopcar/'
import searchComponent from '../pages/search/'
import newListComponent from '../pages/newList/'
import newInfoComponent from '../pages/newInfo/'

export default new Router({
  routes: [
    {
     path:'/',redirect:'/home'
    },
    {path:'/home',component: homeComponent},
    {path:'/member',component: memberComponent},
    {path:'/shopcar',component: shopcarComponent},
    {path:'/search',component: searchComponent},
    {path:'/home/newList',component: newListComponent},
    {path:'/home/newList/newInfo/:id',component: newInfoComponent}
  ],
  linkActiveClass: 'mui-active'
})


