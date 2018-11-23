import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import homeComponent from '../pages/home/'
import memberComponent from '../pages/member/'
import shopcarComponent from '../pages/shopcar/'
import searchComponent from '../pages/search/'
import newListComponent from '../pages/newList/'
import newInfoComponent from '../pages/newInfo/'
import photoShareComponent from '../pages/photoshare/'
import photoInfoComponent from '../pages/photoInfo/'

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
    {path:'/home/newList/newInfo/:id',component: newInfoComponent},
    {path:'/home/newList/photoshare',component: photoShareComponent},
    {path:'/home/newList/photoshare/photoinfo/:id',component: photoInfoComponent}
  ],
  linkActiveClass: 'mui-active'
})


