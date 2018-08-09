<template lang="html">
  <div class="subpage">
    <!-- <div v-if="contact" class="container" v-editable="contact.blok"> -->
    <div v-if="contact" class="container">
      <div class="row">
        <div class="col">
          <h2 class="text-center">Contact Cassandra</h2>
          <hr class="divider">
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <Form></Form>
        </div>
        <div class="col-md-6">
          <Info :contact="contact" ></Info>
        </div>
    </div>
    </div>
  </div>

</template>
<script>
  import Form from '~/components/Contact/Form.vue'
  import Info from '~/components/Contact/Info.vue'
  export default {
    computed: {
      contact() {
        return {
          brokerageAddress: "203-5188 Westminster Hwy, Richmond BC",
          name: "Cassandra Chang",
          mobileNumber: "(604) 562-0900",
          brokerageName: "Macdonald Realty Westmar",
          brokerageNumber: "(604) 279-9822"
        }
        // return this.$store.state.pages.contact.data
      }
    },
    // beforeCreate() {
    //   let contactData = this.$store.state.pages.contact.data
    //   if (!contactData.length) {
    //     this.$storyapi.get(
    //       'cdn/stories/contact', {
    //         version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
    //       }
    //     ).then(res => {
    //       this.$store.state.pages.contact.data = {
    //       blok: res.data.story.content,
    //       name: res.data.story.content.name,
    //       mobileNumber: res.data.story.content.mobile_number,
    //       brokerageName: res.data.story.content.brokerage_name,
    //       brokerageAddress: res.data.story.content.brokerage_address,
    //       brokerageNumber: res.data.story.content.brokerage_number,
    //     }
    //     })
    //   }
    // },
    // mounted() {
    //   this.$storyblok.init()
    //   this.$storyblok.on('change', function () {
    //     window.location.reload()
    //   })
    // },
    components: {
      Info,
      Form
    }
  }
</script>
<style lang="scss">
</style>