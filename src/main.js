import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import './uni.promisify.adaptor'
import AppComponents from '@/components/index'


Vue.config.productionTip = false
Vue.use(uView)
Vue.use(AppComponents)

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
