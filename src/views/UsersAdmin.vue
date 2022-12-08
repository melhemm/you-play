<template>
  <div>
    Users
  </div>
</template>

<script>
export default {
  name: 'UsersAdmin',
  computed: {
    users() {
      return this.$store.getters.fetchAllUsersAdmin;
    }
  },
  mounted() {
    this.$store.dispatch('getAllUsers')
  },
}
</script>