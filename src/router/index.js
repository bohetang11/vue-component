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
import goodsListComponent from '../pages/goodsList/'
import goodsInfoComponent from '../pages/goodsInfo/'
import goodsDescComponent from '../pages/goodsDesc/'
import goodsCommentComponent from '../pages/goodsComment/'

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
    {path:'/home/photoshare',component: photoShareComponent},
    {path:'/home/photoshare/photoinfo/:id',component: photoInfoComponent},
    {path:'/home/goodsList',component: goodsListComponent},
    {path:'/home/goodsList/goodsInfo/:id',component: goodsInfoComponent,name:'goodsinfo'},
    {path:'/home/goodsList/goodsInfo/goodsdesc/:id',component: goodsDescComponent,name:'goodsdesc'},
    {path:'/home/goodsList/goodsInfo/goodscomment/:id',component: goodsCommentComponent,name:'goodscomment'}
  ],
  linkActiveClass: 'mui-active'
})


