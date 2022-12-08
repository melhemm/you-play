<template>
  <div class="container col-4 mt-5 mx-auto" id="custom-style-form">
    <h1 class="header">Edit Product</h1>

    <form @submit.prevent="submit" class="mx-auto">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input class="form-control" type="text" name="title" id="title" v-model="product.title" required>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <input class="form-control" type="text" name="description" id="description" v-model="product.description" required>
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">Image</label>
        <input class="form-control" type="text" name="image" id="image" v-model="product.image" required>
      </div>

      <select v-model="product.genre" class="form-select">
        <option v-for=" genre in genres" :key="genre._id" :value="genre._id">{{ genre.title }}</option>
      </select>

      <div class="mb-3">
        <label for="price" class="form-label">Price</label>
        <input class="form-control" type="number" name="price" id="price" v-model="product.price" required>
      </div>

      <button type="submit" class="btn btn-primary px-4">Update</button>

    </form>
  </div>
</template>

<script>
  export default {
    name: 'EditProduct',
    data() {
      return {
        title: '',
        description: '',
        image: '',
        genre: this.$store.state.genres,
        price: ''
      }
    },
    computed: {
      product() {
        return this.$store.getters.fetchProduct;
      },
      genres() {
        return this.$store.getters.fetchGenre
      },
    },
    mounted() {
      this.$store.dispatch('fetchProduct', this.$route.params.id)
      this.$store.dispatch("getAllGener")
    },
    methods: {
      async submit() {
        await this.$store.dispatch('updateProduct', this.product)
        this.$router.push({
          name: 'Admin'
        })
      }
    }
  }
</script>