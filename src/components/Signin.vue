<template>
  <div class="container col-8 mt-5 mx-auto">
    <h1 class="text-center">Login</h1>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="form.email" required>
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" v-model="form.password" required>
      </div>
      <button type="submit" class="btn btn-dark" value="Submit">{{loading ? "Loading ..." : "Submit"}}</button>
    </form>
    <span>To login as admin: 
      email: admin@example.com
      password: 123456
    </span> <br>
    <span> To login as user: 
      email: exampleuser@example.com
      password: 1234567
    </span>
  </div>
</template>

<script>
  export default {
    name: 'Signin',
    data() {
      return {
        loading: false,
        form: {
          email: '',
          password: ''
        }
      }
    },

    methods: {
      submit() {
        this.loading = true;
        this.$store.dispatch("siginIn", this.form)
        .then(() => {
          this.loading = false;
          this.$router.replace({
            name: 'Home'
          })
          const notification = {
          type: 'success',
          message: 'Login success'
          }
          this.$store.dispatch('notification/add', notification, {root: true})
        }).catch((err) => {
          const notification = {
          type: 'error',
          message: 'Login failed check your password or email'
        }
          this.loading = false;
          this.$store.dispatch('notification/add', notification, {root: true})
        })
      }
    }
  }
</script>