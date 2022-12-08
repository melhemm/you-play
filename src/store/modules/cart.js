export const namespaced = true

export const state = {
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
}

export const mutations = {
  ADD_TO_CART(state, {
    product,
    quantity
  }) {
    let productInCart = state.cart.find(item => {
      return item.product._id === product._id
    })

    if (productInCart) {
      productInCart.quantity += quantity
      return
    }
    state.cart.push({
      product,
      quantity
    })
  },

  SET_CART(state, cartItems) {
    state.cart = cartItems
  },

  SAVE_CART(state) {
    window.localStorage.setItem('cart', JSON.stringify(state.cart));
  },

  REMOVE_PRODUCT_FROM_CART(state, index) {
    state.cart.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },

  CLEAR_CART() {
    localStorage.removeItem('cart')
  },

  increment(state, index) {
    state.cart[index].quantity++
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },

  decrement(state, index) {
    if (state.cart[index].quantity > 1) {
      state.cart[index].quantity--
    }
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
}

export const actions = {
  addCartItemToCart({commit, dispatch}, { product, quantity }) {
    commit('ADD_TO_CART', { product, quantity })
    commit('SAVE_CART')
    const notification = {
      type: 'success',
      message: 'Added to cart'
    }
    dispatch('notification/add', notification, {root: true})
  },

  removeProductFromCart({commit, dispatch}, product) {
    commit('REMOVE_PRODUCT_FROM_CART', product)
    const notification = {
      type: 'success',
      message: 'Removed from cart'
    }
    dispatch('notification/add', notification, {root: true})
  },

  clearCartItem({commit, dispatch}) {
    commit('CLEAR_CART')
    location.reload()
    const notification = {
      type: 'success',
      message: 'Cart empty'
    }
    dispatch('notification/add', notification, {root: true})
  },

  incrementCartItem({
    commit, dispatch
  }, index) {
    commit('increment', index)
    const notification = {
      type: 'success',
      message: 'Quantity increased'
    }
    dispatch('notification/add', notification, {root: true})
  },

  decrementCartItem({commit, dispatch}, index) {
    commit('decrement', index)
    const notification = {
      type: 'success',
      message: 'Quantity decreased'
    }
    dispatch('notification/add', notification, {root: true})
  },
}

export const getters = {
  cartItemsCount(state) {
    return state.cart.length;
  },

  cartTotalPrice(state) {
    let total = 0;
    state.cart.forEach(item => {
      total += item.product.price * item.quantity
    })
    return total
  },

}