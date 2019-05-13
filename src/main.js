// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css' // 使用 CSS
import axios from 'axios'//使用axios做请求

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

Vue.use(iView)

Vue.config.productionTip = false

Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  components: { App },
  template: '<App/>'
})
