<template lang="html">
  <div class="subpage">
      <div class="container" v-editable="blok">
        <div class="row">
          <div class="col">
            <h1 class="text-center">{{address}}</h1>
            <hr class="divider">
              <div class="cc-meta">
                <span v-if="price">
                  <b-badge v-if="sold" pill variant="secondary">Sold</b-badge><i class="fa fa-dollar" aria-hidden="true"></i>{{this.numberWithCommas(price)}}
                </span>
                <span v-if="totalBedrooms">
                  <i class="fa fa-bed" aria-hidden="true"></i>{{ totalBedrooms }}  
                </span>
                <span v-if="totalBaths">
                  <i class="fa fa-bath" aria-hidden="true"></i>{{ totalBaths }}  
                </span>
              </div>
              <Gallery :images="propertyImages" :address="address"></Gallery>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h1 class="text-center pt-2 pt-sm-3 pt-md-4 pt-lg-5" v-if="propertyImages.length > 0">Description</h1>
            <hr class="divider" v-if="propertyImages.length > 0">
            <div v-if="publicRemarks" v-html="marked(publicRemarks)"></div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h1 class="text-center pt-2 pt-sm-3 pt-md-4 pt-lg-5">Details</h1>
            <hr class="divider">
            <div class="row">
              <div class="col-lg-6">
                <b-list-group class="cc-listing-info">
                  <b-list-group-item v-if="mlsNumber"><strong>MLS #</strong><span>{{mlsNumber}}</span></b-list-group-item>
                  <b-list-group-item v-if="listingBrokerage"><strong>Listing Brokerage</strong><span>{{listingBrokerage}}</span></b-list-group-item>
                  <b-list-group-item v-if="listingAgent"><strong>Listing Agent</strong><span>{{listingAgent}}</span></b-list-group-item>
                  <b-list-group-item v-if="colisting"><strong>Colisting</strong><span>{{colisting}}</span></b-list-group-item>
                  <b-list-group-item v-if="community"><strong>Community</strong><span>{{community}}</span></b-list-group-item>
                  <b-list-group-item v-if="propertyType"><strong>Property Type</strong><span>{{propertyType}}</span></b-list-group-item>
                  <b-list-group-item v-if="styleOfHome"><strong>Style of Home</strong><span>{{styleOfHome}}</span></b-list-group-item>
                  <b-list-group-item v-if="typeOfDelling"><strong>Type of Dwelling</strong><span>{{typeOfDelling}}</span></b-list-group-item>
                  <b-list-group-item v-if="totalBedrooms > 0"><strong>Bedrooms</strong><span>{{totalBedrooms}}</span></b-list-group-item>
                  <b-list-group-item v-if="fullBaths > 0"><strong>Full Baths</strong><span>{{fullBaths}}</span></b-list-group-item>
                  <b-list-group-item v-if="halfBaths > 0"><strong>Half Baths</strong><span>{{halfBaths}}</span></b-list-group-item>
                  <b-list-group-item v-if="fireplaces > 0"><strong>Fireplaces</strong><span>{{fireplaces}}</span></b-list-group-item>
                  <b-list-group-item v-if="approxYearBuilt"><strong>Approx Year Built</strong><span>{{approxYearBuilt}}</span></b-list-group-item>
                  <b-list-group-item v-if="grossTaxes"><strong>Gross Taxes</strong><span>{{grossTaxes}} ({{forTaxYear}})</span></b-list-group-item>
                  <b-list-group-item v-if="strataMaintenanceFee"><strong>Strata Maintenance Fee</strong><span>{{strataMaintenanceFee}}</span></b-list-group-item>
                  <b-list-group-item v-if="lotSize"><strong>Lot Size</strong><span>{{lotSize}} sqft</span></b-list-group-item>
                  <b-list-group-item v-if="lotAcerage"><strong>Lot Size</strong><span>{{lotAcerage}} acres</span></b-list-group-item>
                  <b-list-group-item v-if="floorSpace"><strong>Floor Space</strong><span>{{floorSpace}} sqft</span></b-list-group-item>
                  <b-list-group-item v-if="siteInfluences"><strong>Site Influences</strong><span>{{siteInfluences}}</span></b-list-group-item>
                </b-list-group>
              </div>
              <div class="col-lg-6">
                <Map :address="address + ' ' + province + ' ' + country"></Map>
                <b-button v-if="virtualTourUrl.length > 0" :href="virtualTourUrl" target="_blank" block size="lg" rel="noreferrer" class="cc-virtual-tour">Virtual Tour</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import Gallery from '~/components/Properties/Gallery/Gallery.vue'
  import Map from '~/components/Maps/Map.vue'
  export default {
    async asyncData(context) {
      const { data } = await context.app.$storyapi.get(
        'cdn/stories/properties/' + context.params.propertyId, {
          version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
        }
      )
      return {
        blok: data.story.content,
        sold: data.story.content.sold,
        propertyImages: data.story.content.property_images,
        mlsNumber: data.story.content.mls_number,
        listingDate: data.story.content.listing_date,
        listingBrokerage: data.story.content.listing_brokerage,
        listingAgent: data.story.content.listing_agent,
        colisting: data.story.content.colisting,
        unitNumber: data.story.content.unit_number,
        houseNumber: data.story.content.house_number,
        streetDirection: data.story.content.street_direction,
        streetName: data.story.content.street_name,
        streetType: data.story.content.street_type,
        city: data.story.content.city,
        community: data.story.content.community,
        province: data.story.content.province,
        country: data.story.content.country,
        postalCold: data.story.content.postal_code,
        price: data.story.content.price,
        propertyType: data.story.content.property_type,
        styleOfHome: data.story.content.style_of_home,
        typeOfDelling: data.story.content.type_of_dwelling,
        totalBedrooms: data.story.content.total_bedrooms,
        fullBaths: data.story.content.full_baths,
        halfBaths: data.story.content.half_baths,
        totalBaths: data.story.content.total_baths,
        fireplaces: data.story.content.fireplaces,
        numberOfLevels: data.story.content.number_of_levels,
        approxYearBuilt: data.story.content.approx_year_built,
        grossTaxes: data.story.content.gross_taxes,
        forTaxYear: data.story.content.for_tax_year,
        strataMaintenanceFee: data.story.content.strata_maintenance_fee,
        lotSize: data.story.content.lot_size,
        lotAcerage: data.story.content.lot_acerage,
        floorSpace: data.story.content.floor_space,
        siteInfluences: data.story.content.site_influences,
        publicRemarks: data.story.content.public_remarks,
        virtualTourUrl: data.story.content.virtual_tour_url
      }
    },
    computed: {
      address() {
        const { unitNumber, houseNumber, streetDirection, streetName, streetType, city } = this
        let address = ''
        unitNumber ? address += `${unitNumber} - `: ''
        houseNumber ? address += houseNumber : ''
        streetDirection ? address += ` ${streetDirection}` : ''
        streetName ? address += ` ${streetName}` : ''
        streetType ? address += ` ${streetType}` : ''
        city ? address += `, ${city}` : ''
        return address
      }
    },
    mounted() {
      this.$storyblok.init()
      this.$storyblok.on(['published', 'change'], function () {
        location.reload(true)
      })
    },
    components: {
      Gallery,
      Map
    }
  }
</script>
<style scoped lang="scss">
.cc-listing-info.list-group {
  margin-bottom: $spacer;
  @include media-breakpoint-up(lg) {
    margin-bottom: 0;
  }
  .list-group-item {
    display: flex;
    justify-content: space-between;
    span {
      text-align: right;
    }
  }
}

.cc-virtual-tour {
  margin-top: $spacer;
}
</style>