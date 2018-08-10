<template lang="html">
  <b-card :img-src="image"
    :img-alt="property.imageAltTags"
    img-top
    :title="address"
    class="cc-preview"
    @click="push"
    :footer="footer"
    :class="{placeholder: !property.id}"
    >
    <p class="card-text" v-if="property.sold">
      <b-badge pill variant="secondary">Sold</b-badge>
    </p>
    <p class="card-text text-muted" v-else>
      {{property.city}}
    </p>
  </b-card>
</template>
<script>
  export default {
    props: ['property', 'lazy'],
    data() {
      return {
        imageLoaded: false,
      }
    },
    methods: {
      loaded() {
        this.imageLoaded = true
      },
      push() {
        this.property.id ? this.$router.push('properties/' + this.property.id) : ''
      }
    },
    computed: {
      image() {
        if (this.property.id) {
          let img = this.property.image ? this.property.image : "//a.storyblok.com/f/46035/4168x4168/499870a5c3/propertydefault.png"
          if (this.imageLoaded || !this.lazy) {
            return this.resizeImage(img, '355x275')
          } else {
            if (this.$store.state.scroll > 100) {
              this.loaded()
              return this.resizeImage(img, '355x275')
            }
          }
        } else {
          return 'blank.svg'
        }

      },
      address() {
        if (this.property.id) {
          const { unitNumber, houseNumber, streetDirection, streetName, streetType } = this.property
          let address = ''
          unitNumber ? address += `${unitNumber} - `: ''
          houseNumber ? address += houseNumber : ''
          streetDirection ? address += ` ${streetDirection}` : ''
          streetName ? address += ` ${streetName}` : ''
          streetType ? address += ` ${streetType}` : ''
          return address
        } else {
          return "..."
        }
      },
      footer() {
        if (this.property.id) {
          const { price, bedrooms, baths } = this.property
          let footer = ''
          price ? footer += `<i class="fa fa-dollar" aria-hidden="true"></i>${this.numberWithCommas(price)}` : ''
          bedrooms ? footer += `<i class="fa fa-bed" aria-hidden="true"></i>${bedrooms}` : ''
          baths ? footer += `<i class="fa fa-bath" aria-hidden="true"></i>${baths}` : ''
          return footer
        } else {
          return `<i class="fa fa-spin fa-spinner" aria-hidden="true"></i>`
        }
        
      }
    }
  }
</script>
<style lang="scss">

</style>