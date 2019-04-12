import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element ui
import ElementUI from 'element-ui';
// 引入request
import request from "./utils/request/request"
// 将request挂载在vue的原型方法上
Vue.prototype.request = request;

// css的引入
import 'element-ui/lib/theme-chalk/index.css';
// 引入样式重置表
import "./assets/css/reset.css";
// 引入字体图标
import "./assets/css/iconfont/iconfont.css";

// 

// 注册element ui
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
