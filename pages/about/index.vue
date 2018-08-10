<template lang="html">
  <div class="subpage">
    <!-- <div class="container" v-editable="about.blok"> -->
    <div class="container">
      <div class="row">
        <div class="col">
          <h2 class="text-center">About Cassandra</h2>
          <hr class="divider">
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 col-lg-3">
          <Portrait :portrait="about.portrait"></Portrait>
        </div>
        <div class="col-md-7 col-lg-9">
          <!-- <div v-if="about.body" v-html="marked(about.body)"></div> -->
          <p>
            Real estate is my passion and I am so fortunate to build a career on what I love most. My goal is to share with you my extensive knowledge in real estate so you can make the best informed decision when it’s time to sell or buy your new home.
          </p>
          <p>
            At a young age, I realized my path towards real estate. While majoring in Urban Land Economics with a Bachelor of Commerce from the University of British Columbia, I immediately pursued a career in commercial real estate and asset management at a Vancouver based property investment firm. Later, I started my own family and finally found the right fit selling homes in mainly Vancouver and Richmond.
          </p>
          <p>
            I currently live in the beautiful neighbourhood of Steveston and share my life with my family of 3 children and a Wheaten Terrier named Timo. Follow my life stories on Instagram: @yvr_homes
          </p>
          <p>
            My education, knowledge and over 20 years of experience in real estate will allow you to become the best informed client who will succeed in selling or finding the right space (home or investment). Allow my experience to work for you.
          </p>
        </div>
    </div>
    </div>
  </div>

</template>
<script>
  import Portrait from '~/components/About/Portrait.vue'
  export default {
    computed: {
      about() {
        return {
          portrait: "//a.storyblok.com/f/46035/2000x3000/715284c973/cassandra-bio.jpg"
        }
        // return this.$store.state.pages.about.data
      }
    },
    // beforeCreate() {
    //   let aboutData = this.$store.state.pages.about.data
    //   if (!aboutData.length) {
    //     this.$storyapi.get(
    //       'cdn/stories/about', {
    //         version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
    //       }
    //     ).then( res => {
    //       this.$store.state.pages.about.data = {
    //         blok: res.data.story.content,
    //         portrait: res.data.story.content.portrait,
    //         body: res.data.story.content.body,
    //       }
    //     })
    //   }
    // },
    mounted() {
      this.$storyblok.init()
      this.$storyblok.on('change', function () {
        window.location.reload()
      })
    },
    components: {
      Portrait
    }
  }
</script>
<style lang="scss">
</style>