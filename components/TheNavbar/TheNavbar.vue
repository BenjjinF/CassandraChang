<template lang="html">
  <transition name="fade"  key="navbar">
    <b-navbar v-show="display" toggleable="md" type="dark" variant="primary" fixed="top">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">
        <img src="~static/cassandra_chang_logo_white.svg" alt="Cassandra Chang">
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/properties">Properties</b-nav-item>
          <b-nav-item to="/blog">Blog</b-nav-item>
          <b-nav-item to="/advice">Advice</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item to="/contact">Contact</b-nav-item>
        </b-navbar-nav> 
      </b-collapse>
    </b-navbar>
  </transition>
</template>
<script>
  export default {
    data() {
      return {
        isMounted: false
      }
    },
    computed: {
      display() {
        if (process.browser && this.isMounted ) {
          let home = this.$route.fullPath == '/'
          if (home) {
            let scroll = this.$store.state.scroll
            if (scroll > 50) {
              return true
            } else {
              return false
            }
          } else {
            return true
          }
        }
      },
    },
    mounted() {
      this.isMounted = true
    },
  }
</script>
<style lang="scss">
  .navbar {
    font-size: $font-size-base *1.2;
    padding: $spacer/2 $spacer;
    
    button.navbar-toggler {
      padding: 0;
      border: none;
    }

    .navbar-brand {
      margin-right: $spacer * .8;
      @include media-breakpoint-down(sm) {
        margin-right: 0;
      }
      img {
        height: 2em;
        width: 2em;
      }
    }
    .nav-link {
      transition: 1s;
    }
  }
</style>