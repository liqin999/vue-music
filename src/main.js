// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'

import store from "./store/index"


import axios from 'axios'

Vue.prototype.$http = axios

import 'mint-ui/lib/style.css'; 
Vue.use(Mint)

//引入element-ui
import Element from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)



import 'vue-tree-halower/dist/halower-tree.min.css' // you can customize the style of the tree
import VTree from 'vue-tree-halower'

Vue.use(VTree)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
