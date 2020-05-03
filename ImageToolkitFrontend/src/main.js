import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import header from './components/header'
import drawer from './components/drawer'
import axios from 'axios'
import ElementUI from 'element-ui'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import './theme/index.css'

library.add(fas)
library.add(far)
library.add(fab)
dom.watch()

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('pf-header', header)
Vue.component('pf-drawer', drawer)
Vue.use(ElementUI)
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
