// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import app from './App'
import router from './router'
import store from './store'
import {Toast} from 'mint-ui'
import "./common/css/iconfont.css"

Vue.component(Toast.name, Toast);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { app },
  template: '<app/>',
  router,
  store
})
