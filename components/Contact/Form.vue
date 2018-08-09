<template lang="html">
  <b-card id="cc-contact-form" :header="header" header-bg-variant="secondary" header-text-variant="white" header-tag="header">
    <b-card-body>
      <transition name="fade" mode="out-in">
        <b-form v-if="!$store.state.pages.contact.formSubmitted" novalidate :validated="validated">
          <b-form-group id="nameGroup" label="Name" label-for="name">
            <b-form-input :class="{'is-invalid': contactErrors.name}" id="name" type="text" v-model="contact.name" required></b-form-input>
            <b-form-invalid-feedback>Please provide a name.</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="emailGroup" label="Email" label-for="email">
            <b-form-input :class="{'is-invalid': contactErrors.email}" id="email" type="email" v-model="contact.email" required></b-form-input>
            <b-form-invalid-feedback>Please provide a valid email.</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="phoneGroup" label="Phone" label-for="phone">
            <b-form-input :class="{'is-invalid': contactErrors.phone}" id="phone" type="text" v-model="contact.phone" required></b-form-input>
            <b-form-invalid-feedback>Please provide a valid phone number.</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="commentsGroup" label="Comments" label-for="comments">
            <b-form-textarea id="comments" :rows="5" :max-rows="10" v-model="contact.comments"></b-form-textarea>
          </b-form-group>

          <b-button variant="secondary" size="lg" block @click="submit">
            <i class="fa fa-spinner fa-pulse" v-if="submitting"></i>
            <span v-else>Send</span>
          </b-button>
        </b-form>
        <p id="cc-contact-thank-you" v-else>I'll get back to you as soon as possible ~</p>
      </transition>
    </b-card-body>
  </b-card>

</template>
<script>
  import { firestore } from '~/plugins/firebase'
  export default {
    data() {
      return {
        submitting: false,
        contact: {
          timestamp: new Date(),
          name: '',
          email: '',
          phone: '',
          comments: ''
        },
        validated: false,
        contactErrors: {}
      }
    },
    methods: {
      validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
      },
      validate() {
        let errors = false
        this.contactErrors = {}
        if (this.contact.name.length == 0) {
          this.contactErrors['name'] = true
          errors = true
        }
        // Email Regex
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let valid_email = re.test(String(this.contact.email).toLowerCase())

        if (valid_email == false) {
          this.contactErrors['email'] = true
          errors = true
        }
        if (this.contact.phone.length == 0) {
          this.contactErrors['phone'] = true
          errors = true
        }
        this.validated = true
        return errors
      },
      submit() {
        let errors = this.validate()
        let vm = this
        if (!errors) {
          this.submitting = true
          firestore.collection('contact').add(this.contact).then(function (response) {
            vm.submitting = false
            vm.$store.state.pages.contact.formSubmitted = true
          }).catch(function (error) {
            console.log(error)
          })
        }
      }
    },
    computed: {
      header() {
        if (this.$store.state.pages.contact.formSubmitted) {
          return 'Thank you!'
        } else {
          return 'Message me...'
        }
      }
    }
  }
</script>
<style scoped lang="scss">

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .card-header {
    div {
      text-align: center;
      font-size: 1.6rem;
      font-family: $headings-font-family;
    }
  }
  #cc-contact-form {
    margin-bottom: $spacer;
  }
  #cc-contact-thank-you {
    margin: 0;
    text-align: center;
  }
</style>