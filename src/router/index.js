import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import SignIn from '../views/SignIn.vue'
import About from '../views/AboutView.vue'
import ProductProfile from '../views/ProductProfile.vue'
import CreateProduct from '../views/CreateProduct.vue'
import Admin from '../views/Admin.vue'
import EditProduct from '../views/EditProduct.vue'
import Cart from '../views/Cart.vue'
import store from '@/store'
import Order from '../views/Order.vue'
import Orders from '../views/Orders.vue'
import Register from '../views/Register.vue'
import AllOrders from '../views/AllOrdersAdmin'
import UsersAdmin from '../views/UsersAdmin'
import NotFound from '../views/NotFound.vue'
import NetworkIssue from '../components/NetworkIssue.vue'

const routes = [
  {
    path: '/404',
    name: '404',
    component: NotFound
  },
  {
    path: "/:pathMatch(.*)",
    redirect: {name: '404'}
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products/:id',
    name: 'ProductProfile',
    component: ProductProfile
  },
  {
    path: '/signin',
    name: 'Signin-page',
    component: SignIn,
    beforeEnter: (to, from, next) => {
      if(store.getters['authenticated'] || store.getters['isAdmin']) {
        return next({
          name: 'Home'
        })
      }
      next()
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    beforeEnter: (to, from, next) => {
      if(!store.getters['authenticated']) {
        return next({
          name: 'Home'
        })
      }
      next()
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    beforeEnter: (to, from, next) => {
      if(!store.getters['authenticated']) {
        return next({
          name: 'Signin-page'
        })
      }
      next()
    }
  },
  {
    path: '/register',
    name: 'Register-page',
    component: Register,
    beforeEnter: (to, from, next) => {
      if(store.getters['authenticated'] || store.getters['isAdmin']) {
        return next({
          name: 'Home'
        })
      }
      next()
    }
  },
  {
    path: '/admin/orders-all',
    name: 'AllOrders',
    component: AllOrders,
    beforeEnter: (to, from, next) => {
      if(!store.getters['isAdmin']) {
        return next({
          name: 'Signin-page'
        })
      }
      next()
    }
  },
  {
    path: '/admin/users-all',
    name: 'UsersAdmin',
    component: UsersAdmin
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      if(!store.getters['isAdmin']) {
        return next({
          name: 'Signin-page'
        })
      }
      next()
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/admin/create',
    name: 'CreateProduct',
    component: CreateProduct,
    beforeEnter: (to, from, next) => {
      if(!store.getters['isAdmin']) {
        return next({
          name: 'Signin-page'
        })
      }
      next()
    }
  },
  {
    path: '/admin/edit/:id',
    name: 'EditProduct',
    component: EditProduct,
    beforeEnter: (to, from, next) => {
      if(!store.getters['isAdmin']) {
        return next({
          name: 'Signin-page'
        })
      }
      next()
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
