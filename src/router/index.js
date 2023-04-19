import Vue from 'vue'
import VueRouter from 'vue-router'
import Uploadpage from '../components/Uploadpage'
import GoogleMap from '../components/GoogleMap'
import NotAvailable from '../components/NotAvailable'

Vue.use(VueRouter)

const routes = [
  {
    path: '/uploadpage',
    name: 'Uploadpage',
    component: Uploadpage
  },
  {
    path: '/definelocation',
    name: 'GoogleMap',
    component: GoogleMap
  },
  {
    path: '*',
    name: 'NotAvailable',
    component: NotAvailable
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes,
  base: '/vue_uploadmedia/'
})

export default router
