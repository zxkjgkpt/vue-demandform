import Vue from 'vue'
import Router from 'vue-router'
import XQD_INDEX from '../components/xqd_index'


Vue.use(Router)

export default new Router({
  routes: [
    {path: '/imp', component:XQD_INDEX},
  ],
  mode:'history'
})
