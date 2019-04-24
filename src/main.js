// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
axios.defaults.withCredentials = true // 允许跨域申请携带cookie
Vue.config.productionTip = false
Vue.prototype.axios = axios/* eslint-disable no-new */
Vue.use(ElementUI) // 引入ElementUI
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
