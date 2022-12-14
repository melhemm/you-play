import axios from 'axios'
import router from '@/router'
import NProgress from 'nprogress'

const state = {
  products: [],
  product: {},
  searchQuery: '',
  pageNumber: 0,
  totalProducts: 0,
  perPage: 0,
  pages: 0,
  genres: []
}
const getters = {
  fetchProducts: state => state.products,

  fetchProduct: state => state.product,

  perPageValue: state => state.perPage,

  pageNumberValue: state => state.pageNumber,

  totalProductsValue: state => state.totalProducts,

  totalPages: state => state.pages,

  fetchGenre: state => state.genres,

  searchQuery: state => state.searchQuery
}

const mutations = {
  PRODUCTS(state, payload) {
    state.products = payload
  },
  SET_PRODUCT(state, product) {
    state.product = product
  },
  ADD_PRODUCT(state, product) {
    state.products.unshift(product)
  },
  EDIT_PRODUCT(state, product) {
    state.products.forEach(v => {
      if (v.id == product.id) {
        v = product
      }
    })
  },
  DELETE_PRODUCT(state, productId) {
    let products = state.products.filter(p => p.id !== productId)
    state.products = products
  },
  productId(state, product) {
    state.products.find(v => {
      if (v.id == product.id) {
        v = product
      }
    })
  },
  
  SET_TOTAL_PRODUCTS(state, totalProducts) {
    state.totalProducts = totalProducts
  },
  SET_PER_PAGE(state, perPage) {
    state.perPage = perPage
  },
  SET_PAGE_NUMBER(state, pageNumber) {
    state.pageNumber = pageNumber
  },

  SET_TOTAL_PAGES(state, totalPages) {
    state.pages = totalPages
  },

  SET_ALL_GENRE(state, genres) {
    state.genres = genres
  },

  SET_SEARCH_QUERY(state, searchQuery) {
    state.searchQuery = searchQuery
  },
}

const  actions = {
  // setSearchQuery({commit}, searchQuery = '') {
  //   commit('SET_SEARCH_QUERY', searchQuery);
  // },
  // Fetch product to Home page
  async fetchProducts({commit, dispatch}, { page , searchQuery=""}) {
    
    NProgress.start()
    commit('LOADING_STATUS', true, {root: true})
    await axios.get(`https://you-play.onrender.com/api/products?keyword=${searchQuery}&pageNumber=${page}`)
      .then((response) => {
        commit("PRODUCTS", response.data.products)
        commit('LOADING_STATUS', false, {root: true})
        commit('SET_TOTAL_PRODUCTS', response.data.count)
        commit('SET_PER_PAGE', response.data.pageSize)
        commit('SET_PAGE_NUMBER', response.data.page)
        commit('SET_TOTAL_PAGES', response.data.pages)
        NProgress.done()
      }).catch((err) => {
        NProgress.done()
        const notification = {
          type: 'error',
          message: 'There was a problem fetching products' + err.message
        }
        dispatch('notification/add', notification, {root: true})
      })
  },

  async fetchSearchProducts({commit, dispatch}, {searchQuery=""}) {
    NProgress.start()
    commit('LOADING_STATUS', true, {root: true})
    await axios.get(`https://you-play.onrender.com/api/products?keyword=${searchQuery}`)
      .then((response) => {
        commit("PRODUCTS", response.data.products)
        commit('LOADING_STATUS', false, {root: true})
        NProgress.done()
      }).catch((err) => {
        NProgress.done()
        const notification = {
          type: 'error',
          message: 'There was a problem fetching products ' + err.message
        }
        dispatch('notification/add', notification, {root: true})
      })
  },

  // Fetch Single Product by id
  async fetchProduct({
    commit
  }, id) {
    commit('LOADING_STATUS', true, {root: true})
    await axios.get(`https://you-play.onrender.com/api/products/${id}`)
    .then((response) => {
      commit('SET_PRODUCT', response.data)
      commit('LOADING_STATUS', false, {root: true})
    }).catch(() => {
      router.push({name: '404'})
      
    })
  },

  // Create product 
  async createProduct({commit, dispatch}, product) {
    await axios.post(`https://you-play.onrender.com/api/products`, product)
      .then(() => {
        commit('ADD_PRODUCT', product)
        const notification = {
          type: 'success',
          message: 'Product has been created!'
        }
        dispatch('notification/add', notification, {root: true})
      }).catch((err) => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating product' + err.message
        }
        dispatch('notification/add', notification, {root: true})
        throw err
      })
  },

  // Update product
  async updateProduct({
    commit, dispatch
  }, product) {
    let response = await axios.put(`https://you-play.onrender.com/api/products/${product._id}`, product)
    let newProduct = response.data
    commit('EDIT_PRODUCT', newProduct)
    const notification = {
      type: 'success',
      message: 'Product has been updated!'
    }
    dispatch('notification/add', notification, {root: true})
    return newProduct
  },

  // Delete product
  async deleteProduct({
    commit, dispatch
  }, product) {
    let response = await axios.delete(`https://you-play.onrender.com/api/products/${product._id}`)
    if (response.status == 200 || response.status == 204) {
      commit('DELETE_PRODUCT', product.id)
      const notification = {
        type: 'success',
        message: 'Product has been deleted!'
      }
      dispatch('notification/add', notification, {root: true})
    } else {
      const notification = {
        type: 'error',
        message: 'There was a problem deleting a product' + err.message
      }
      dispatch('notification/add', notification, {root: true})
      throw err
    }
  },

  async getAllGener({commit}) {
    await axios.get(`https://you-play.onrender.com/api/genre`)
    .then((response) => {
      commit("SET_ALL_GENRE", response.data)
    }).catch((err) => {
      console.log(err)
    })
  }
}

export default {
  actions,
  state,
  mutations,
  getters
}