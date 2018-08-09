<template lang="html">
  <div class="row pb-2 pb-sm-3 pb-md-4 pb-lg-5">
    <testimonial
      v-for="(testimonial, index) in testimonials"
      v-if="testimonial"
      :key="index"
      :even="index % 2"
      :testimonial="testimonial">
    </testimonial>
  </div>
</template>
<script>
  import testimonial from '~/components/Home/Testimonials/_testimonial.vue'
  export default {
    props: ['testimonials'],
    components: {
      testimonial
    }
  }
</script>
<style lang="scss">
</style>