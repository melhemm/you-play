import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'nprogress/nprogress.css'
require('@/store/subscriber')

axios.defaults.baseURL = process.env.VUE_BASE_URL

store.dispatch('attempt', localStorage.getItem('token')).then(() => {
  createApp(App).use(store).use(router).mount('#app')
})
