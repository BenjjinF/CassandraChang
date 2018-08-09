<template lang="html">
  <div class="subpage">
    <div class="container">
      <div class="row">
        <div class="col">
          <h2 class="text-center">Cassandra's Blog</h2>
          <hr class="divider">
          <blogPreviews :blogs="blogs" :lazy="false"></blogPreviews>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import blogPreviews from '~/components/Blog/BlogPreviews.vue'
  export default {
    computed: {
      blogs() {
        return this.$store.state.pages.blog.data
      }
    },
    beforeCreate() {
      let blogData = this.$store.state.pages.blog.data
      if (!blogData.length) {
        this.$storyapi.get(
          'cdn/stories', {
            version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
            starts_with: 'blog/',
            is_startpage: 0,
            sort_by: 'content.date_published:desc'
          }
        ).then( res => {
          this.$store.state.pages.blog.data = res.data.stories.map(story => {
            return {
              id: story.slug,
              title: story.name,
              previewText: story.content.preview_text,
              image: story.content.image,
              imageAltTags: story.content.image_alt_tags,
            }
          })
        })
      }
    },
    components: {
      blogPreviews,
    }
  }
</script>
<style lang="scss">
</style>