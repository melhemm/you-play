<template>
  <div class="container col-4 mt-5 mx-auto" id="custom-style-form">
    <h1 class="text-center">Create Product</h1>
    <form @submit.prevent="submit">
      <div class="field mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" name="title" id="title" v-model="title" class="form-control">
      </div>
      <div class="field mb-3">
        <label for="description">description</label>
        <textarea class="form-control" type="text" name="description" id="description" v-model="description"></textarea>
      </div>

      <div class="field mb-3">
        <label for="image">Image</label>
        <input class="form-control" type="text" name="image" id="image" v-model="image">
      </div>

      <select v-model="genre" multiple class="form-select" >
        <option v-for=" genre in genres" :key="genre._id" :value="genre._id">{{ genre.title }}</option>
      </select>

      <div class="field mb-3">
        <label for="price">Price</label>
        <input class="form-control" type="number" name="price" id="price" v-model="price">
      </div>
      <button class="btn btn-primary px-4" type="submit">Create</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'CreateProduct',
    data() {
      return {
        title: '',
        description: '',
        image: '',
        genre: this.$store.state.genres,
        price: ''
      }
    },

    methods: {
      submit() {
        const product = {
          title: this.title,
          description: this.description,
          image: this.image,
          genre: this.genre,
          price: this.price
        }
        this.$store.dispatch('createProduct', product)
        .then(() => {
          this.$router.push({
            name: 'Home'
          })
        })
      }
    },

    computed: {
      genres() {
        return this.$store.getters.fetchGenre
      },
    },

    created() {
      this.$store.dispatch("getAllGener")
    },
  }
</script>