<template>
  <div>
    <ProductsList/>
  </div>
</template>

<script>
  import ProductsList from '../components/ProductsList';
  export default {
    name: 'Home',
    components: {
      ProductsList,
    },
  }
</script>
