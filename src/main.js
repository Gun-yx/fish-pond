import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = 'http://101.34.216.21:8889/api/private/v1/'
//拦截器
axios.interceptors.request.use(config =>{
  //在最后必须return config
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
