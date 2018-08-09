<template lang="html">
  <footer>
    <p class="cc-social-media">
      <i class="fa fa-facebook-square" href="https://www.facebook.com/CassandraChangRealEstate/" target="_blank" rel="noreferrer"></i>
      <i class="fa fa-instagram" href="https://www.instagram.com/yvr_homes/" target="_blank" rel="noreferrer"></i>
      <i class="fa fa-linkedin-square" href="https://www.linkedin.com/in/cassandra-chang-3188b937/" target="_blank" rel="noreferrer"></i>
    </p>
    <p class="cc-copyright">
      <span>© 2018 Cassandra Chang</span><span class="cc-copyright-delimiter "> | </span><span>Developed by <a href="https://btfrost.com" target="_blank" rel="noreferrer">Benjamin Frost</a></span>
    </p>
  </footer>
</template>
<script>
  export default {
  }
</script>
<style lang="scss">
  footer {
    background-color: $green;
    padding: $spacer/4 $spacer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    @include media-breakpoint-down(md) {
      flex-direction: column;
      .cc-copyright {
        text-align: center;
        flex-direction: column;
        .cc-copyright-delimiter {
          display: none;
        }
      }
    }
    * {
      transition: 0.75s;
    }

    p {
      margin: 0;
      span {
        white-space: pre-wrap;
      }
    }

    a, i {
      color: white;
      &:hover {
        color: $yellow;
      }
    }
    .cc-social-media {
      font-size: 2.25rem;
      i {
        cursor: pointer;
        &:not(:last-child) {
          margin-right: $spacer/4;
        }
      }
    }
    .cc-copyright {
      font-size: 1rem;
      display: flex;
    }
    
  }
</style>