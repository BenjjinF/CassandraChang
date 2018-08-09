<template lang="html">
  <div class="cc-previews">
    <b-card-group columns>
      <blogPreview
        v-for="blog in blogs"
        v-if="blog"
        :key="blog.id"
        :blog="blog"
        :lazy="lazy"
        ></blogPreview>
    </b-card-group>
  </div>

</template>
<script>
  import blogPreview from '~/components/Blog/_blogPreview.vue'
  export default {
    props: ['blogs', 'max', 'lazy'],
    components: {
      blogPreview
    }
  }
</script>
<style lang="scss">
</style>