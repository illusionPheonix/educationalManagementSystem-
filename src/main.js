import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入样式重置表
import "./assets/css/reset.css";
// 引入字体图标
import "./assets/css/iconfont/iconfont.css";

// 注册element ui
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')