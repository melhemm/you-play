import axios from 'axios'

export default {
  getProduct(id) {
    return axios.get('http://localhost:5000/items/' + id)
  },
}