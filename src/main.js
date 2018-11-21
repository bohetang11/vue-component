
import Vue from 'vue'
import App from './App'
//设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

//引入mui
import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"

//按需导入组件
import { Header, Swipe, SwipeItem,Button } from 'mint-ui'
//注册组件
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)

//引入router
import router from './router/'

//引入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

// 配置vue-resource的请求根域名
Vue.http.options.root = 'http://www.lovegf.cn:8899/'

//引入公共样式
import './css/common.css'
import { isMoment } from 'moment';

//定义全局时间过滤器
import moment from 'moment'
Vue.filter('dateFormat',function(data){
  return moment(data).format('YYYY-MM-DD HH:mm:ss')
})




new Vue({
  el: '#app',
  router,
  render:c=>c(App)
})
