<template lang="html">
  <transition name="fade" mode="out-in">
    <b-form v-if="!$store.state.pages.homeEvaluation.formSubmitted" novalidate :validated="validated">
      <b-form-group label="Property Type" label-for="propertyType">
          <b-form-select
            id="propertyType"
            :options="form.propertyType.options"
            required
            v-model="homeEvaluation.propertyType"
            :class="{'is-invalid': homeEvaluationErrors.propertyType}">
          </b-form-select>
          <b-form-invalid-feedback>Please provide a property type.</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Street Address" label-for="streetAddress">
          <b-form-input 
            id="streetAddress"
            type="text"
            v-model="homeEvaluation.streetAddress"
            required
            :class="{'is-invalid': homeEvaluationErrors.streetAddress}">
          </b-form-input>
          <b-form-invalid-feedback>Please provide a street address.</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="City" label-for="city">
          <b-form-input 
            id="city"
            type="text"
            v-model="homeEvaluation.city"
            required
            :class="{'is-invalid': homeEvaluationErrors.city}">
          </b-form-input>
          <b-form-invalid-feedback>Please provide a street address.</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Bedrooms" label-for="bedrooms">
          <b-form-input 
            id="bedrooms"
            type="text"
            v-model="homeEvaluation.bedrooms"
            :class="{'is-invalid': homeEvaluationErrors.bedrooms}">
          </b-form-input>
      </b-form-group>
      <b-form-group label="Bathrooms" label-for="bathrooms">
          <b-form-input 
            id="bathrooms"
            type="text"
            v-model="homeEvaluation.bathrooms"
            :class="{'is-invalid': homeEvaluationErrors.bathrooms}">
          </b-form-input>
      </b-form-group>
      <b-form-group label="Lot Size" label-for="lotSize">
          <b-form-input 
            id="lotSize"
            type="text"
            v-model="homeEvaluation.lotSize"
            :class="{'is-invalid': homeEvaluationErrors.lotSize}">
          </b-form-input>
      </b-form-group>
      <b-form-group label="Floor Area" label-for="floorArea">
          <b-form-input 
            id="floorArea"
            type="text"
            v-model="homeEvaluation.floorArea"
            required
            :class="{'is-invalid': homeEvaluationErrors.floorArea}">
          </b-form-input>
          <b-form-invalid-feedback>Please provide the floor area.</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Year Built" label-for="yearBuilt">
          <b-form-input 
            id="yearBuilt"
            type="text"
            v-model="homeEvaluation.yearBuilt"
            :class="{'is-invalid': homeEvaluationErrors.yearBuilt}">
          </b-form-input>
      </b-form-group>
      <b-form-group label="Building Condition" label-for="buildingCondition">
          <b-form-select
            id="buildingCondition"
            :options="form.buildingCondition.options"
            required
            v-model="homeEvaluation.buildingCondition"
            :class="{'is-invalid': homeEvaluationErrors.buildingCondition}">
          </b-form-select>
          <b-form-invalid-feedback>Please provide the building's condition.</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Basement" label-for="basement">
          <b-form-select
            id="basement"
            :options="form.basement.options"
            required
            v-model="homeEvaluation.basement"
            :class="{'is-invalid': homeEvaluationErrors.basement}">
          </b-form-select>
          <b-form-invalid-feedback>Please provide information about the basement.</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Timeline" label-for="timeline" description="What does your timeline for moving/selling look like?">
          <b-form-input 
            id="timeline"
            type="text"
            v-model="homeEvaluation.timeline"
            required
            :class="{'is-invalid': homeEvaluationErrors.timeline}">
          </b-form-input>
          <b-form-invalid-feedback>Please provide your expected timeline.</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Appliances Included" label-for="appliancesIncluded">
          <b-form-input 
            id="appliancesIncluded"
            type="text"
            v-model="homeEvaluation.appliancesIncluded"
            :class="{'is-invalid': homeEvaluationErrors.appliancesIncluded}">
          </b-form-input>
      </b-form-group>
      <b-form-group label="Name" label-for="name">
          <b-form-input 
            id="name"
            type="text"
            v-model="homeEvaluation.name"
            required
            :class="{'is-invalid': homeEvaluationErrors.name}">
          </b-form-input>
          <b-form-invalid-feedback>Please provide your name.</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Email" label-for="email">
          <b-form-input 
            id="email"
            type="email"
            v-model="homeEvaluation.email"
            required
            :class="{'is-invalid': homeEvaluationErrors.email}">
          </b-form-input>
          <b-form-invalid-feedback>Please provide a valid email address.</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Phone" label-for="phone">
          <b-form-input 
            id="phone"
            type="text"
            v-model="homeEvaluation.phone"
            required
            :class="{'is-invalid': homeEvaluationErrors.phone}">
          </b-form-input>
          <b-form-invalid-feedback>Please provide your phone number.</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Questions Or Comments" label-for="questionsOrComments">
        <b-form-textarea id="questionsOrComments" :rows="5" :max-rows="10" v-model="homeEvaluation.questionsOrComments"></b-form-textarea>
      </b-form-group>
      <b-button @click="submit" variation="secondary" size="lg" block>Submit</b-button>
    </b-form>
    <p id="cc-home-evaluation-thank-you" v-else>I'll get back to you as soon as possible ~</p>
  </transition>
</template>
<script>
  import { firestore } from '~/plugins/firebase'
  export default {
    data() {
      return {
        form: {
          propertyType: {
            options: [
              {text: 'Detached', value: 'detached'},
              {text: 'Multiplex', value: 'multiplex'},
              {text: 'Townhouse', value: 'townhouse'},
              {text: 'Condo', value: 'condo'},
            ]
          },
          buildingCondition: {
            options: [
              {text: 'Below Average', value: 'below_average'},
              {text: 'Average', value: 'average'},
              {text: 'Above Average', value: 'above_average'},
            ]
          },
          basement: {
            options: [
              {text: 'No Basement', value: 'no_basement'},
              {text: 'Unfinished', value: 'unfinished'},
              {text: 'Finished', value: 'afinished'},
            ]
          }
        },
        required: [
          'propertyType',
          'streetAddress',
          'city',
          'floorArea',
          'buildingCondition',
          'timeline',
          'name',
          'email',
          'phone'
        ],
        homeEvaluationErrors: {},
        validated: false,
        homeEvaluation: {
          timestamp: new Date(),
          propertyType: '',
          streetAddress: '',
          city: '',
          bedrooms: '',
          bathrooms: '',
          lotSize: '',
          floorArea: '',
          yearBuilt: '',
          buildingCondition: '',
          basement: '',
          timeline: '',
          appliancesIncluded: '',
          name: '',
          email: '',
          phone: '',
          questionsOrComments: ''
        }
      }
    },
    methods: {
      validate() {
        let errors = false
        this.homeEvaluationErrors = {}

        for (const [key, value] of Object.entries(this.homeEvaluation)) {
          if (this.required.includes(key)) {
            value.length == 0 ? this.homeEvaluationErrors[key] = errors = true : ''
          }
        }
 
        // Email Regex
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let valid_email = re.test(String(this.homeEvaluation.email).toLowerCase())

        if (!valid_email) {
          this.homeEvaluationErrors['email'] = true
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
          firestore.collection('homeEvaluation').add(this.homeEvaluation).then(function (response) {
            vm.submitting = false
            vm.$store.state.pages.homeEvaluation.formSubmitted = true
          }).catch(function (error) {
            console.log(error)
          })
        } else {
          console.log(this.homeEvaluationErrors)
        }
      }
    }
  }
</script>
<style lang="scss">
#cc-home-evaluation-thank-you {
  margin: 0;
  text-align: center;
}
</style>