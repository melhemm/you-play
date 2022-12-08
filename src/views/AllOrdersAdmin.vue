<template>
  <div class="container">
    <div v-if="loadingStatus">
      <Spinner />
    </div>
    <div class="row d-flex justify-content-center align-items-center h-100 mb-2 mt-2"  v-for="order in allOrders" :key="order._id">
      <div class="col-lg-8 col-xl-6">
        <div class="card border-top border-bottom border-3">
          <div class="card-body p-5">
            <p class="lead fw-bold mb-5">Order Reciept</p>
            <div class="row">
              <div class="col mb-3">
                <p class="small text-muted mb-1">Date</p>
                <p>{{formatDate(order.createdAt)}}</p>
              </div>
              <div class="col mb-3">
                <p class="small text-muted mb-1">Order No.</p>
                <p>{{order._id.slice(-5)}}</p>
              </div>

              <div class="col md-3">
                <p class="small text-muted mb-1">
                  Order Address
                </p>
                <p>{{order.address}}</p>
              </div>

              <div class="col md-3">
                <p class="small text-muted mb-1">Client Name</p>
                <p>{{order.fullname}}</p>
              </div>
            </div>

            <div class="py-4" v-for="cart in order.cart" :key="cart._id">
              <div class="row">
                <div class="col-md-8 col-lg-9">
                  <p>{{cart.product.title}}</p>
                </div>
                <div class="col-md-4 col-lg-3">
                  <p>
                    <strong>
                      quantity: {{cart.quantity}}
                    </strong>
                  </p>
                </div>
                <hr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="allOrders.length === 0">
      No orders
    </div>
  </div>
</template>

<script>
  import Spinner from '../components/Spinner.vue';
  export default {
    name: 'AllOrders',
    computed: {
      allOrders() {
        return this.$store.getters['orders/fetchAllOrdersAdmin'];
      },
      loadingStatus() {
        return this.$store.getters.loadingStatus
      }
    },
    mounted() {
      this.$store.dispatch("orders/getAllOrders");
    },
    components: {
      Spinner
    },
    methods: {
      formatDate(date) {
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }
        return new Date(date).toLocaleDateString('en', options)
      },
    }
  }
</script>