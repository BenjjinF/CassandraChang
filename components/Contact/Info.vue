<template lang="html">
<div class="card">
  <div class="card-img-top">
    <Map v-if="contact.brokerageAddress" :address="contact.brokerageAddress"></Map>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">
      <i class="fa fa-user pr-4 fa-fw" aria-hidden="true"></i>{{ contact.name }}
    </li>
    <li class="list-group-item" v-if="contact.mobileNumber">
      <i class="fa fa-mobile pr-4 fa-fw" aria-hidden="true"></i>{{ contact.mobileNumber }}
    </li>
    <li class="list-group-item">
      <i class="fa fa-building pr-4 fa-fw" aria-hidden="true"></i>{{ contact.brokerageName }}
    </li>
    <li class="list-group-item">
      <i class="fa fa-map-marker pr-4 fa-fw" aria-hidden="true"></i>{{ contact.brokerageAddress }}
    </li>
    <li class="list-group-item">
      <i class="fa fa-phone pr-4 fa-fw" aria-hidden="true"></i>{{ contact.brokerageNumber }}
    </li>
  </ul>
</div>
</template>
<script>
  import Map from '~/components/Maps/Map.vue'
  export default {
    props: ['contact'],
    components: {
      Map
    }
  }
</script>
<style scoped lang="scss">
  .card-img-top, .vue-map-container {
    min-height: 400px;
    background-color: $green;
  }

  i {
    color: $link-color;
  }
</style>