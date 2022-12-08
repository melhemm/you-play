import { createStore } from 'vuex'
import axios from 'axios'
import products from './modules/product'
import * as notification from './modules/notification.js'
import router from '@/router'
import NProgress from 'nprogress'
import * as cart from './modules/cart.js'
import * as orders from './modules/order.js'

export default createStore({
  namespaced: true,
  strict: true,
  state: {
    token: null,
    user: null,
    userId: null,
    role: null,
    loadingStatus: false,
  },
  getters: {
    authenticated (state) {
      return state.token && state.user
    },

    user(state) {
      return state.user
    },
    
    isAdmin(state) {
      return state.role === "admin"
    },
    
    loadingStatus(state) {
      return state.loadingStatus
    },
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USER(state, data) {
      state.user = data
    },
    SET_ROLE(state, data) {
      state.role = data
    },
    SET_USER_ID(state, data) {
      state.userId = data
    },

    LOADING_STATUS(state, newLoadingStatus) {
      state.loadingStatus = newLoadingStatus
    },
  },
  actions: {
    async siginIn({dispatch} , credentials) {
      let response = await axios.post("http://localhost:5000/api/users/login", credentials)
      return dispatch("attempt", response.data.token)
    },

    async attempt ({ commit} , token) {
      if(token) {
        commit('SET_TOKEN', token)
      }

      if(!this.state.token) {
        return
      }

      try {
        let response = await axios.get('http://localhost:5000/api/users/profile')
        commit('SET_USER', response.data)
        commit('SET_USER_ID', response.data._id)
        commit('SET_ROLE', response.data.role)
      } catch (error) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
        commit('SET_ROLE', null)
      }
    },

    async register({dispatch}, {name, email, password}) {
      await axios.post("http://localhost:5000/api/users", {
        name: name,
        email: email,
        password: password
      })
      .then(() => {
        NProgress.start()
        const notification = {
          type: 'success',
          message: 'Register success'
        }
        dispatch('notification/add', notification, {root: true})
        NProgress.done()
      }).catch((err) => {
        NProgress.done()
        const notification = {
          type: 'error',
          message: 'Failed to register try again ' + err.message 
        }
        dispatch('notification/add', notification, {root: true})
      })
    },

    siginOut ({ commit, dispatch }) {
      NProgress.start()
      return axios.get('http://localhost:5000/api/users/logout').then(() => {
        commit('SET_USER', null)
        commit('SET_ROLE', null)
        commit('SET_TOKEN', null)
        commit('SET_USER_ID', null)
        const notification = {
          type: 'success',
          message: 'Logout success'
        }
        dispatch('notification/add', notification, {root: true})
        NProgress.done()
      })
    },

    async getAllUsers({commit, dispatch}) {
      commit('LOADING_STATUS', true)
      await axios.get('http://localhost:5000/api/users')
      .then((response) => {
        commit('LOADING_STATUS', false)
      }).catch((err) => {
        const notification = {
          type: 'error',
          message: 'There was a problem get orders' + err.message
        }
        dispatch('notification/add', notification, {root: true})
      })
    },
  },

  modules: {
    products,
    notification,
    cart,
    orders
  }
})
