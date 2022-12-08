<template>
  <nav class="navbar navbar-expand-lg bg-dark-dark p-4">
    <!-- Container wrapper -->
    <div class="container">
      <!-- Navbar brand -->
      <a class="navbar-brand me-2" href="/">
        <img src="../../public/images/logo-light.png" height="25" alt="MDB Logo" loading="lazy"
          style="margin-top: -1px;" />
      </a>
      <a class="btn btn-dark px-3 ml-2" href="https://github.com/mdbootstrap/mdb-ui-kit" role="button"><i
          class="fab fa-github"></i>
      </a>
      <!-- Toggle button -->
      <button class="navbar-toggler icon-light-icon" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible wrapper -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Left links -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a href='/' class="nav-link mt-1" active-class="active" exact>
              Home
            </a>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Cart'}" class="nav-link mt-1" active-class="active" exact>
              {{cartItemCount}} Cart
            </router-link>
          </li>
        </ul>
        <!-- Left links -->
        <template class="d-flex align-items-center mr-2" v-if="isAdmin && !!auth">
          <div class="dropdown">
            <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1"
              data-bs-toggle="dropdown" aria-expanded="false">
              Admin
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <router-link v-if="isAdmin" :to="{ name: 'AllOrders'}" class="dropdown-item text-dark"
                  active-class="active" exact>
                  All-Orders
                </router-link>
              </li>
              <li>
                <router-link v-if="isAdmin" :to="{ name: 'Admin'}" class="dropdown-item text-dark" active-class="active"
                  exact>
                  Product Manager
                </router-link>
              </li>
              <li>
                <a class="dropdown-item text-dark" @click.prevent="logout" >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </template>

        <div class="d-flex align-items-center mr-2" v-if="auth && !isAdmin">
          <div class="dropdown">
            <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1"
              data-bs-toggle="dropdown" aria-expanded="false">
              {{auth.name}}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <router-link v-if="auth" :to="{ name: 'Orders'}" class="dropdown-item text-dark" active-class="active" exact>
                  Orders
                </router-link>
              </li>
              <li>
                <a class="dropdown-item text-dark" @click.prevent="logout" >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="d-flex align-items-center" v-if="!isAdmin && !auth">
          <router-link :to="{ name: 'Register-page'}" class="btn btn-dark me-3" active-class="active" exact>
            Sign-up for free
          </router-link>

          <router-link :to="{ name: 'Signin-page'}" class="btn btn-dark px-3 me-2 text-light" active-class="active"
            exact>
            Login
          </router-link>
        </div>

      </div>
      <!-- Collapsible wrapper -->
    </div>
    <!-- Container wrapper -->
  </nav>
</template>

<script>
  export default {
    computed: {
      auth() {
        return this.$store.getters.user
      },
      cartItemCount() {
        return this.$store.getters['cart/cartItemsCount']
      },
      isAdmin() {
        return this.$store.getters.isAdmin
      }
    },
    methods: {
      logout() {
        return this.$store.dispatch('siginOut').then(() => {
          this.$router.replace({
            name: 'Home'
          })
        })
      }
    },
  }
</script>

<style scoped>
  .navbar.bg-dark-dark {
    background-color: #151515;
    color: #ffffff;
  }

  .navbar.bg-dark-dark a {
    color: #ffffff;
    text-decoration: none;
  }

  button.icon-light-icon {
    background: #ffffff;
  }
</style>