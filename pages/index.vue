<template>
  <div >
    <!-- <Hero :heroImage="home.heroImage" :slogan="home.slogan"></Hero> -->
    <Hero></Hero>
    <div class="container">
      <div class="row pt-2 pt-sm-3 pt-md-4 pt-lg-5">
        <div class="col-md-6 col-lg-4">
          <Portrait :portrait="home.portrait"></Portrait>
        </div>
        <div class="col-md-6 col-lg-8">
          <Quote :quote="home.quote"></Quote>
          <HomeEvaluationButton></HomeEvaluationButton>
        </div>
      </div>
      <div class="row pt-2 pt-sm-3 pt-md-4 pt-lg-5">
        <div class="col-12">
          <h2 class="text-center">Properties</h2>
          <hr class="divider">
          <b-card-group columns>
            <propertyPreview
              v-for="property in properties"
              v-if="property"
              :property="property"
              :lazy="true"
              :key="property.id">
            </propertyPreview>
          </b-card-group>
        </div>
      </div>
      <div class="row pt-2 pt-sm-3 pt-md-4 pt-lg-5">
        <div class="col">
          <h2 class="text-center">Blog</h2>
          <hr class="divider">
          <blogPreviews :blogs="blogs" :lazy="true" :max="3"></blogPreviews>
        </div>
      </div>
      <div class="row pt-2 pt-sm-3 pt-md-4 pt-lg-5">
        <div class="col-12">
          <h2 class="text-center">What my client's say about me...</h2>
          <hr class="divider">
        </div>
      </div>
      <Testimonials :testimonials="home.testimonials"></Testimonials>
    </div>
    <Affiliations :logos="home.affiliationLogos"></Affiliations>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import Hero from '~/components/Home/Hero.vue'
import Portrait from '~/components/Home/Portrait.vue'
import Quote from '~/components/Home/Quote.vue'
import HomeEvaluationButton from '~/components/HomeEvaluation/Button.vue'
import blogPreviews from '~/components/Blog/BlogPreviews.vue'
import propertyPreview from '~/components/Properties/_propertyPreview.vue'
import Testimonials from '~/components/Home/Testimonials/Testimonials.vue'
import Affiliations from '~/components/Home/Affiliations.vue'

export default {
  computed: {
    home() {
      return this.$store.state.pages.home.data
    },
    properties() {
      return this.$store.state.pages.properties.data.slice(0,3)
    },
    blogs() {
      return this.$store.state.pages.blog.data.slice(0,3)
    }
  },
  methods: {
    async getHomeData() {
      const {data}  = await this.$storyapi.get(
        'cdn/stories/home', {
          version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
        }
      )
      return {
        blok: data.story.content,
        // heroImage: data.story.content.hero_image,
        // slogan: data.story.content.slogan,
        portrait: data.story.content.portrait,
        quote: data.story.content.quote,
        testimonials: data.story.content.testimonials,
        affiliationLogos: data.story.content.affiliation_logos
      }
    },
    async getPropertiesData() {
      const {data} = await this.$storyapi.get(
        'cdn/stories', {
          version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
          starts_with: 'properties/',
          is_startpage: 0,
          sort_by: 'content.listing_date:desc',
        }
      )

      return data.stories.map(story => {
        return {
          id: story.slug,
          unitNumber: story.content.unit_number,
          houseNumber: story.content.house_number,
          streetDirection: story.content.street_direction,
          streetName: story.content.street_name,
          streetType: story.content.street_type,
          city: story.content.city,
          sold: story.content.sold,
          image: story.content.property_images ? story.content.property_images[0].image : '',
          imageAltTags: story.content.property_images ? story.content.property_images[0].caption : '',
          price: story.content.price,
          bedrooms: story.content.total_bedrooms,
          baths: story.content.total_baths,
        }
      })
    },
    async getBlogData() {
      const { data } = await this.$storyapi.get(
        'cdn/stories', {
          version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
          starts_with: 'blog/',
          is_startpage: 0,
          sort_by: 'content.date_published:desc',
        }
      )
      return data.stories.map(story => {
        return {
          id: story.slug,
          title: story.name,
          previewText: story.content.preview_text,
          image: story.content.image,
          imageAltTags: story.content.image_alt_tags,
        }
      })
    }
  },
  async created() {
    this.$store.state.pages.home.data = await this.getHomeData()
    this.$store.state.pages.properties.data = await this.getPropertiesData()
    this.$store.state.pages.blog.data = await this.getBlogData()
  },
  components: {
    Hero,
    Portrait,
    Quote,
    HomeEvaluationButton,
    blogPreviews,
    propertyPreview,
    Testimonials,
    Affiliations
  }
}
</script>

<style lang="scss">
</style>
