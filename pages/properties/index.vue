<template lang="html">
  <div class="subpage">
    <div class="container">
      <div class="row">
        <div class="col">
          <h2 class="text-center">Cassandra's Listings</h2>
          <hr class="divider">
          <b-card-group columns>
            <propertyPreview 
              v-for="property in properties"
              v-if="!property.sold && property.houseNumber || !property.id"
              :property="property"
              :lazy="false"
              :key="property.id"
              ></propertyPreview>
          </b-card-group>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h2 class="text-center">Cassandra's Solds</h2>
          <hr class="divider">
          <b-card-group columns>
            <propertyPreview 
              v-for="property in properties"
              v-if="property.sold || !property.id"
              :property="property"
              :lazy="false"
              :key="property.id"
              ></propertyPreview>
          </b-card-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import propertyPreview from '~/components/Properties/_propertyPreview.vue'
  export default {
    computed: {
      properties() {
        return this.$store.state.pages.properties.data
      }
    },
    beforeCreate() {
      let propertiesData = this.$store.state.pages.properties.data
      if (!propertiesData[0].id) {
        this.$storyapi.get(
          'cdn/stories', {
            version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
            starts_with: 'properties/',
            is_startpage: 0,
            sort_by: 'content.listing_date:desc',
          }
        ).then( res => {
          this.$store.state.pages.properties.data = res.data.stories.map(story => {
            return {
              id: story.slug,
              unitNumber: story.content.unit_number,
              houseNumber: story.content.house_number,
              streetDirection: story.content.street_direction,
              streetName: story.content.street_name,
              streetType: story.content.street_type,
              city: story.content.city,
              sold: story.content.sold,
              image: story.content.property_images.length > 0 ? story.content.property_images[0].image : '',
              imageAltTags: story.content.property_images.length > 0 ? story.content.property_images[0].caption : '',
              price: story.content.price,
              bedrooms: story.content.total_bedrooms,
              baths: story.content.total_baths,
            }
          })
        })
      }
    },
    components: {
      propertyPreview,
    }
  }
</script>
<style lang="scss">
</style>