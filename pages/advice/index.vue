<template lang="html">
  <div class="subpage">
    <div class="container">
      <div class="row">
        <div class="col">
          <h2 class="text-center">Advice</h2>
          <hr class="divider">
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-4">
          <b-btn :variant="filter == 'buying' ? 'secondary' : 'outline-secondary'" @click="filter = 'buying'" block size="lg">Buying</b-btn>
        </div>
        <div class="col-md-6  mb-4">
          <b-btn :variant="filter == 'selling' ? 'secondary' : 'outline-secondary'" @click="filter = 'selling'" block size="lg">Selling</b-btn>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <b-card-group columns>
              <advicePreview
                v-for="advice in advices"
                v-if="!advice.id || advice.category.includes(filter)"
                :key="advice.id"
                :advice="advice"
                :lazy="false">
              </advicePreview>            
          </b-card-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import advicePreview from '~/components/Advice/_advicePreview.vue'
  export default {
    data() {
      return {
        filter: ''
      }
    },
    computed: {
      advices() {
        return this.$store.state.pages.advice.data
      }
    },
    beforeCreate() {
      let adviceData = this.$store.state.pages.advice.data

      if (!adviceData[0].id) {
        this.$storyapi.get(
          'cdn/stories', {
            version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
            starts_with: 'advice/',
            is_startpage: 0,
            sort_by: 'content.date_published:desc'
          }
        ).then( res => {

          let homeEvaluation = {
            id: 'cc-home-evaluation-card',
            title: 'Free Home Evaluation',
            category: 'selling',
            previewText: 'Click here for a free home evaluation from Cassandra.'
          }

          let advices = res.data.stories.map(story => {
            return {
              id: story.slug,
              title: story.name,
              previewText: story.content.preview_text,
              image: story.content.image,
              imageAltTags: story.content.image_alt_tags,
              category: story.content.category
            }
          })

          advices.splice(1, 0, homeEvaluation)
          this.$store.state.pages.advice.data = advices

        })
      }
    },
    components: {
      advicePreview,
    }
  }
</script>
<style lang="scss">

#cc-home-evaluation-card {
  background-color: $orange;
  border: 1px solid $orange;
  * {
    color: white !important;
  }
  p {
    margin: 0;
  }
  span.badge {
    display: none;
  }
  &:hover {
    background-color: $red;
    border: 1px solid $red;
  }
  
}

</style>