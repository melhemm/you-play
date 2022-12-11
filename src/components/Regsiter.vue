<template>
  <div class="container col-8 mt-5 mx-auto" id="custom-style-form">
    <h4 class="text-center">Register</h4>
    <form @submit.prevent="submit">
      <div>
        <label class="form-label">Name</label>
        <input type="text" name="name" class="form-control" placeholder="Name" v-model="form.name"><br>
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" name="email" placeholder="email" v-model="form.email">
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" class="form-control" name="password" placeholder="Password" v-model="form.password"><br>
      </div>
      <button class="btn btn-dark" type="submit" :disabled="!formValid">{{loading ? "Loading ..." : "Submit"}}</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      return {
        loading: false,
        form: {
          name: '',
          email: '',
          password: ''
        }
      }
    },
    computed: {
      nameIsValid() {
        return !!this.form.name && this.form.name.length > 4 && this.form.name.length < 30
      },
      passwordIsValid() {
        return !!this.form.password && this.form.password.length > 6 && this.form.password.length < 14
      },
      emailIsValid() {
        return !!this.form.email
      },
      formValid() {
        return this.nameIsValid && this.passwordIsValid && this.emailIsValid
      }
    },
    methods: {
      submit() {
        this.loading = true;
        this.$store.dispatch("register", this.form)
          .then(() => {
            this.$router.replace({
              name: 'Signin-page'
            })
          })
      }
    }
  }
</script>