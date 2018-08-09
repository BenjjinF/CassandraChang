<template lang="html">
  <div class="subpage">
      <div class="container" v-editable="blok">
        <div class="row">
          <div class="col">
            <h1 class="text-center">{{title}}</h1>
            <hr class="divider">
            <section id="blog-post-content">
              <div class="cc-meta">
                <span>
                  <i class="fa fa-calendar" title="Date Published"></i>{{ date_published | moment('MMMM Do, YYYY') }}
                </span>
                <span>
                  <i class="fa fa-user" title="Author"></i>{{ author }}  
                </span>
              </div>
              <b-img v-if="image" :src="image" fluid :alt="imageAltTags" rounded />
              <div v-if="content" v-html="marked(content)"></div>
            </section>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  export default {
    async asyncData(context) {
      const { data } = await context.app.$storyapi.get(
        'cdn/stories/blog/' + context.params.blogId, {
          version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
        }
      )
      return {
        blok: data.story.content,
        date_published: data.story.content.date_published,
        author: data.story.content.author,
        title: data.story.name,
        image: data.story.content.image,
        imageAltTags: data.story.content.image_alt_tags,
        content: data.story.content.content
      }
    },
    mounted() {
      this.$storyblok.init()
      this.$storyblok.on('change', function () {
        window.location.reload()
      })
    }
  }
</script>
<style lang="scss">
#blog-post-content {
  img {
    margin-bottom: $spacer;
  }
  div {
    h1 {
      font-size: $h2-font-size;
      font-family: $headings-font-family !important;
    }
  }
}
</style>