<template>
  <div class="container">
    <router-link :to="{name: 'CreateProduct'}" class="px-4 btn btn-secondary m-2">
      Add Product
    </router-link>
    <table class="table table-dark table-striped mt-2">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">ID</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product._id">
          <td>{{product.title}}</td>
          <td>{{product._id}}</td>
          <td colspan="3">
            <router-link :to="`/products/${product._id}`" class="px-4 btn btn-primary m-2">
              Show
            </router-link>
            <router-link :to="{name: 'EditProduct', params: {id: product._id}}" class="px-4 btn btn-secondary m-2">
              Edit
            </router-link>
            <button @click="DeleteProduct(product)" class="px-4 btn btn-danger m-2">
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center">
      <router-link v-if="page != 1" tag="button" class="btn btn-primary mb-4"
        :to="{ name: 'Admin', query: { page: page - 1 } }" rel="prev"> Previews</router-link>
      <router-link v-if="hasNextPage" tag="button" class="btn btn-primary mb-4 mx-2"
        :to="{ name: 'Admin', query: { page: page + 1 } }" rel="next">Next Page</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Admin',
  props: {
    product: Object
  },
  computed: {
    products() {
      return this.$store.getters.fetchProducts;
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
  methods: {
    DeleteProduct(product) {
      let response = confirm(`Are you sure you want to delete ${product.title.toUpperCase()}`)
      if(response) {
        this.$store.dispatch('deleteProduct', product);
        location.reload()
      }
    }
  },
}
</script>


