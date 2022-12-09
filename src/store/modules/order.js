import axios from "axios"
export const namespaced = true
import NProgress from 'nprogress'
import router from '@/router'

export const state = {
  allOrders: [],
  orders: [],
  fullname: "",
  address: "",
  phoneNumber: "",
}

export const mutations = {
  fullname(state, fullname) {
    state.fullname = fullname
  },

  address(state, address) {
    state.address = address
  },

  phoneNumber(state, phoneNumber) {
    state.phoneNumber = phoneNumber
  },

  SET_ALL_ORDERS_ADMIN(state, allOrders) {
    state.allOrders = allOrders
  },

  SET_ALL_USERS_ADMIN(state, allUsersAdmin) {
    state.fetchAllUsersAdmin = allUsersAdmin
  },

  SET_USER_ORDER_DETAILS(state, payload) {
    state.orders = payload
  },
}

export const actions = {
  async createOrder({state, dispatch, rootState}) {
    let userOrder = {
      address: state.address,
      fullname: state.fullname,
      phoneNumber: state.phoneNumber,
      userId: state.userId,
      cart: rootState.cart.cart
    }
    await axios.post('https://you-play.onrender.com/api/orders', userOrder)
    .then(() => {
      NProgress.start()
      localStorage.removeItem('cart')
      router.push({
        name: 'Orders'
      })
      const notification = {
        type: 'success',
        message: 'Ваш заказ обрабатывается оператором. Ожидайте звонка или смс на телефон'
      }
      dispatch('notification/add', notification, {root: true})
      NProgress.done()
    }).catch((err) => {
      NProgress.done()
      const notification = {
        type: 'error',
        message: 'There was a problem make order ' + err.message
      }
      dispatch('notification/add', notification, {root: true})
    })
  },

  async getOrders({commit, dispatch}) {
    commit('LOADING_STATUS', true, { root: true })
    await axios.get('https://you-play.onrender.com/api/orders/myorders')
    .then((response) => {
      commit("SET_USER_ORDER_DETAILS", response.data)
      console.log(response.data)
      commit('LOADING_STATUS', false, { root: true })
    }).catch((err) => {
      const notification = {
        type: 'error',
        message: 'There was a problem get orders' + err.message
      }
      dispatch('notification/add', notification, {root: true})
    })
  },

  async getAllOrders({commit, dispatch}) {
    commit('LOADING_STATUS', true, {root: true})
    await axios.get('https://you-play.onrender.com/api/orders')
    .then((response) => {
      commit("SET_ALL_ORDERS_ADMIN", response.data)
      commit('LOADING_STATUS', false, {root: true})
    }).catch((err) => {
      const notification = {
        type: 'error',
        message: 'There was a problem get orders' + err.message
      }
      dispatch('notification/add', notification, {root: true})
    })
  },
}

export const getters = {
  fetchUserOrders: state => state.orders,

  fetchAllOrdersAdmin: state => state.allOrders,
}