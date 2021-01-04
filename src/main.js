import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'
import store from './store/store'
import LoadScript from 'vue-plugin-load-script'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: '',
    libraries: '' // necessary for places input
  }
})

Vue.use(LoadScript)

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
