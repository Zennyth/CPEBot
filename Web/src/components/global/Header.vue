<template>
  <b-navbar toggleable="lg" type="dark" variant="info" fixed="bottom" :sticky="true" :class="headerLessPages.includes(route) ? 'nav-hide' : ''">
    <router-link class="navbar-item" :class="route == 'Settings' ? 'active' : ''" to="settings">
      <b-icon icon="gear" aria-hidden="true"></b-icon>
      <span>Settings</span>
    </router-link>
    <router-link class="navbar-item" to="account" :class="route == 'Account' ? 'active' : ''">
      <b-icon icon="person" aria-hidden="true"></b-icon>
      <span>Account</span>
    </router-link>
    <router-link class="navbar-item" to="/" :class="route == 'Home' ? 'active' : ''">
      <b-icon icon="house" aria-hidden="true"></b-icon>
      <span>Home</span>
    </router-link>
    <router-link class="navbar-item" to="grades" :class="route == 'Grades' ? 'active' : ''">
      <b-icon icon="check-square" aria-hidden="true"></b-icon>
      <span>Grades</span>
    </router-link>
  </b-navbar>
</template>

<script>
export default {
  name: 'Header',
  data: () => {
    return {
      headerLessPages: ['Login', 'Register']
    }
  },
  mounted: function() {
  },
  computed: {
    route: function() {
      return this.$route.name;
    }
  }
}

</script>