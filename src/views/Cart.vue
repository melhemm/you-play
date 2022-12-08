<template>
  <div class="container mt-4" v-if="cart.length > 0">
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Items count</th>
          <th colspan="3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart" :key="index" @increment="increment(index)" @decrement="decrement(index)">
          <th scope="row">{{item.product.title}}</th>
          <td>&#8381; {{item.product.price}}</td>
          <td>{{item.quantity}}X</td>
          <td><button @click="increment(index)" class="btn btn-primary px-4">+</button></td>
          <td><button @click="decrement(index)" class="btn btn-primary px-4">-</button></td>
          <td><button @click="removeFromCart(index)" class="btn btn-danger px-4">Remove</button></td>
        </tr>
      </tbody>
      <tfoot class="table-info">
        <tr>
          <td>Total to pay:</td>
          <td>&#8381;{{cartTotalPrice}}</td>
          <td colspan="2" v-if="auth"><router-link to="/order" class="btn btn-primary px-5">Order</router-link></td>
          <td colspan="2" v-else><router-link to="/Signin" class="btn btn-primary px-5">You need to login for order</router-link></td>
          <td colspan="2"><button class="btn btn-danger px-3" @click="clearCart"> Clear cart </button></td>          
        </tr>
      </tfoot>
    </table>
  </div>

  <div v-else class="container d-flex">
    <h2 class="text-center-empty">Your cart empty!</h2>
    <img src="../../public/images/empty-cart.gif" >
  </div>
</template>

<script>
  export default {
    name: 'Cart',
    computed: {
      cart() {
        return this.$store.state.cart.cart
      },
      cartTotalPrice() {
        return this.$store.getters['cart/cartTotalPrice']
      },
      auth() {
        return this.$store.getters.user
      }
    },

    methods: {
      removeFromCart(product) {
        this.$store.dispatch('cart/removeProductFromCart', product)
      },

      increment(index) {
        this.$store.dispatch('cart/incrementCartItem', index)
      },

      decrement(index) {
        this.$store.dispatch('cart/decrementCartItem', index)
      },

      clearCart() {
        this.$store.dispatch('cart/clearCartItem')
      },

      submit() {
        this.$store.dispatch('cart/createOrder')
      }
    },

  }
</script>
