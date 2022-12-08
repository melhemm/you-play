<template>
  <div v-if="loadingStatus">
    <Spinner />
  </div>
  <div class="container" v-else>
    <div class="input-group w-50 mt-3 px-2">
      <form @submit.prevent="submit">
        <input type="text" class="form-control" v-model="searchQuery" placeholder="Search" aria-label="Search"
          aria-describedby="search-addon" />
        <button type="submit" class="btn btn-dark mt-2">Search</button>
      </form>
    </div>
    <div class="mx-auto row row-cols-1 row-cols-md-3 g-4 mt-4 m-4">
      <div class="col mb-0" v-for="product in products" :key="product._id">
        <div class="card h-100 mb-0">
          <img :src="product.image" class="card-img-top image-product p-2">
          <div class="card-body m-0">
            <h6 class="card-title mb-0">{{product.title}}</h6>
            <p class="card-text">Genre: {{product.genre.title}}</p>
            <div class="d-flex justify-content-between align-items-center">
              <button class="btn btn-primary" disabled>
                &#8381; {{product.price}}
              </button>
              <router-link :to="`/products/${product._id}`" class="btn btn-dark">Details</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <router-link v-if="page != 1" tag="button" class="btn btn-primary mb-4"
        :to="{ name: 'Home', query: { page: page - 1 } }" rel="prev"> Previews</router-link>
      <router-link v-if="hasNextPage" tag="button" class="btn btn-primary mb-4 mx-2"
        :to="{ name: 'Home', query: { page: page + 1 } }" rel="next">Next Page</router-link>
    </div>
  </div>
</template>

<script>
  import Spinner from './Spinner.vue';
  export default {
    data() {
      return {
        searchQuery: null,
      }
    },
    props: {
      product: Object,
    },
    components: {
      Spinner,
    },
    computed: {
      products() {
        return this.$store.getters.fetchProducts;
      },
      genre() {
        return this.$store.getters.fetchGenre
      },
      loadingStatus() {
        return this.$store.getters.loadingStatus
      },
      page() {
        return parseInt(this.$route.query.page) || 1
      },
      hasNextPage() {
        return this.$store.getters.totalProductsValue > this.$store.getters.pageNumberValue * this.$store.getters.perPageValue
      }
    },
    mounted() { 
      this.$store.dispatch("fetchProducts", {
        page: this.page
      });
    },
    created() {
      this.$store.dispatch("getAllGener")
    },

    methods: {
      submit() {
        this.$store.dispatch("fetchSearchProducts", 
        {searchQuery: this.searchQuery})
        window.history.replaceState(null, this.searchQuery ,`?searchKeyword=${this.searchQuery}`);
        this.searchQuery = ''
      }
    }
  }
</script>

<style scoped>
  .container-fluid {
    max-width: 1400px;
  }

  div img.image-product {
    width: 200px;
    height: 200px;
    object-fit: contain;
    margin: 0 auto;
  }

  div input:focus {
    outline: none;
  }

  *:focus {
    outline: none;
  }
</style>