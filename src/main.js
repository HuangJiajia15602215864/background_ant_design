import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue' // Vue全家桶
import App from './App.vue'
import router from './router'
import store from './store/'

import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'// 全局组件
import bootstrap from './core/bootstrap'
import './core/lazy_use'// 组件按需加载

import i18n from './locales'// 国际化
import { VueAxios } from './utils/request'// HTTP请求
import './mock'
import './permission' // 权限控制
import './utils/filter' // 过滤器
import './global.less'// 全局样式

Vue.config.productionTip = false
Vue.use(VueAxios)
Vue.component('pro-layout', ProLayout)
Vue.component('page-header-wrapper', PageHeaderWrapper)

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
