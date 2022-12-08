<template>
  <div v-if="loadingStatus">
    <Spinner />
  </div>
  <div class="container w-75" v-else>
    <div class="card">
      <div class="row my-4">
        <aside class="col-sm-5 border-right">
          <article class="gallery-wrap">
            <div class="img-big-wrap">
              <div> <a href="#">
              <img class="img-fluid" :src="product.image"></a></div>
            </div> 
          </article> 
        </aside>
        <aside class="col-sm-7">
          <article class="card-body p-0">
            <h3 class="title mb-3">{{product.title}}</h3>
            <div class="d-flex justify-content-between">
              <button class="btn btn-secondary px-5" v-on:click="addToCart()">Buy</button>
              <button class="btn btn-secondary mx-4" disabled>
                &#8381; {{product.price}}
              </button>
            </div>
            <hr>
            <dl class="item-property">
              <dt class="title ml-2">Description</dt>
              <dd>
                <p class="mt-2">{{product.description}}</p>
              </dd>
            </dl>
          </article>
        </aside> 
      </div> 
    </div> 
  </div>
</template>

<script>
  import Spinner from '../components/Spinner.vue';
  export default {
    name: 'ProductProfile',
    computed: {
      product() {
        return this.$store.getters.fetchProduct;
      },
      loadingStatus() {
        return this.$store.getters.loadingStatus
      }
    },
    components: {
      Spinner
    },
    mounted() {
      this.$store.dispatch('fetchProduct', this.$route.params.id)
    },
    methods: {
      addToCart() {
        this.$store.dispatch('cart/addCartItemToCart', {
          product: this.product,
          quantity: 1,
        })
      }
    }
  }
</script>

<style scoped>
  .card {
    margin-top: 3rem;
  }

  .gallery-wrap .img-big-wrap img {
    height: 450px;
    width: auto;
    display: inline-block;
    cursor: zoom-in;
    object-fit: contain;
  }

  .gallery-wrap .img-small-wrap .item-gallery {
    width: 60px;
    height: 60px;
    border: 1px solid #ddd;
    margin: 7px 2px;
    display: inline-block;
    overflow: hidden;
  }

  .gallery-wrap .img-small-wrap {
    text-align: center;
  }

  .gallery-wrap .img-small-wrap img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    border-radius: 4px;
    cursor: zoom-in;
  }

  @media only screen and (max-device-width : 600px) {
    .gallery-wrap .img-small-wrap {
      margin: 0 auto;
    }
  }
</style>