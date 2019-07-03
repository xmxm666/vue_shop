// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import app from './App'
import router from './router'
import store from './store'
import {Toast, Switch, MessageBox} from 'mint-ui'
import "./common/css/iconfont.css"

import './mock/mockServer' // 加载mockServer即可
import './filter'

Vue.component(Toast.name, Toast);
Vue.component(MessageBox.name, MessageBox );
Vue.component(Switch.name, Switch);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { app },
  template: '<app/>',
  router,
  store
})
