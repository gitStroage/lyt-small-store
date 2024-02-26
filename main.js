
// #ifndef VUE3
import Vue from 'vue'
import store from './store'
import App from './App'
import i18n from './i18n/i18n'
import http from './utils/http'

Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.prototype._i18n = i18n
Vue.prototype.request = http

App.mpType = 'app'

const app = new Vue({
	store,
	i18n,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif