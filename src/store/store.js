import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    setDefaultAuthHeader (state) {
      axios({
        method: 'get',
        url: '/api/setheader'
      })
        .then(function (response) {
          window.sessionStorage.setItem('token', response.data.token)
          state.token = response.data.token
          axios.defaults.headers.common.Authorization = state.token
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  actions: {
    setDefaultAuthHeader ({ commit }) {
      commit('setDefaultAuthHeader')
    }
  }
})

export default store
