<template>
  <div class="container col-4 mt-5 mx-auto">
    <h2 class="text-center mb-4">Checkout</h2>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="fullname" class="form-label">Full name</label>
        <input class="form-control" type="text" name="fullname" placeholder="ФИО" @input="fullname" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Address</label>
        <input class="form-control" type="text" name="address" placeholder="Address"  @input="address" required>
      </div>

      <div class="mb-3">
        <label class="form-label">Phone number</label>
        <input class="form-control" type="text" name="phone" placeholder="Phone"  @input="phoneNumber" required>
      </div>
      <button class="btn btn-dark px-5" type="submit">Send</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'OrderForm',
    computed: {
      message() {
        return this.$store.state.orders.fullname
      }
    },

    methods: {
      submit() {
        return this.$store.dispatch('orders/createOrder')
      },

      fullname(e) {
        this.$store.commit('orders/fullname', e.target.value)
      },

      address(e) {
        this.$store.commit('orders/address', e.target.value)
      },

      phoneNumber(e) {
        this.$store.commit('orders/phoneNumber', e.target.value)
      }
    },
  }
</script>
