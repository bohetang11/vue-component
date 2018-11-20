
import Vue from 'vue'
import App from './App'
//设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

//引入mui
import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"

//按需导入组件
import { Header, Swipe, SwipeItem } from 'mint-ui'
//注册组件
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

//引入router
import router from './router/'

//引入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

//引入公共样式
import './css/common.css'





new Vue({
  el: '#app',
  router,
  render:c=>c(App)
})
