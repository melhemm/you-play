<template>
  <Navbar />
  <router-view :key="$route.fullPath" />
  <NotificationContainerVue/>
</template>

<script>
  import Navbar from "./components/Navbar.vue";
  import Footer from "./components/Footer.vue";
  import NotificationContainerVue from "./components/NotificationContainer.vue";

  export default {
    components: {
      Navbar,
      Footer,
      NotificationContainerVue
    }
  }
</script>
