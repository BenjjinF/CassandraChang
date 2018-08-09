<template lang="html">
  <div class="subpage">
    <div class="container">
      <div class="row">
        <div class="col">
          <h2 class="text-center">Free Home Evaluation</h2>
          <hr class="divider">
          <p class="mb-4" v-if="!$store.state.pages.homeEvaluation.formSubmitted">To find out what your home is worth, please fill in the form below and I will send you a complete report of similar homes which have sold within the past few months. It's fast and easy!</p>
          <b-card>
            <Form></Form>
          </b-card>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import Form from '~/components/HomeEvaluation/Form.vue'
  export default {
    components: {
      Form
    }
  }
</script>
<style lang="scss">
</style>