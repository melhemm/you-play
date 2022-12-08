<template>
  <div v-if="loadingStatus">
    <Spinner />
  </div>
  <div class="container py-5 h-100" v-else>
    <div class="row d-flex justify-content-center align-items-center h-100 mb-2" v-for="order in orders"
      :key="order.id">
      <div class="col-lg-8 col-xl-6" >
        <div class="card border-top border-bottom border-3">
          <div class="card-body p-5">
            <p class="lead fw-bold mb-5">Purchase Reciept</p>
            <div class="row">
              <div class="col mb-3">
                <p class="small text-muted mb-1">Date</p>
                <p>{{formatDate(order.createdAt)}}</p>
              </div>
              <div class="col mb-3">
                <p class="small text-muted mb-1">Order No.</p>
                <p> {{order._id.slice(-5)}}</p>
              </div>

              <div class="col md-3">
                <p class="small text-muted mb-1">
                  Order Address
                </p>
                <p>{{order.address}}</p>
              </div>
            </div>

            <div class="m-5 px-5">
              <div class="row" v-for="cart in order.cart" :key="cart._id">
                <div class="col-md-8 col-lg-9">
                  <p>{{cart.product.title}}</p>
                </div>
                <div class="col-md-4 col-lg-3">
                  <p>&#8381;{{cart.product.price}} X{{cart.quantity}} =
                    <strong>
                      &#8381;{{cart.quantity * cart.product.price}}
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
    <div v-if="orders.length === 0">
      No orders to show
    </div>
  </div>
</template>

<script>
  import Spinner from '../components/Spinner.vue';
  export default {
    name: 'Orders',
    props: {
      order: Object
    },
    computed: {
      orders() {
        return this.$store.getters['orders/fetchUserOrders'];
      },
      loadingStatus() {
        return this.$store.getters.loadingStatus
      }
    },
    components: {
      Spinner
    },
    mounted() {
      this.$store.dispatch("orders/getOrders");
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
