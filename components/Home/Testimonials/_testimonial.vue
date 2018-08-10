<template lang="html">
  <div class="testimonial col-sm-6 my-3">
    <div class="speech-bubble" :class="direction">
        <p>{{ testimonial.quote }}</p>
        <p class="text-muted"><em class="text-muted" v-html="name"></em></p>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['testimonial', 'even'],
    computed: {
      direction() {
        if (this.even) {
          return 'right'
        } else {
          return 'left'
        }
			},
			name() {
				if (this.testimonial._uid) {
					return '~ ' + this.testimonial.name
				} else {
					return `<i class="fa fa-spin fa-spinner" aria-hidden="true"></i>`
				}
			}
    }
  }
</script>
<style scoped lang="scss">

.speech-bubble {
	position: relative;
	background: $gray-100;
	border-radius: $border-radius;
	padding: $spacer;
	width: 95%;
	&:after {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		top: 50%;
		border: 20px solid transparent;
		margin-top: -10px;
	}
	&.right {
		margin-right: 5%;
		&:after {
			right: 0;
			border-left-color: $gray-100;
			border-right: 0;
			margin-right: -20px;
		}
	}
	&.left {
		margin-left: 5%;
		&:after {
			left: 0;
			border-right-color: $gray-100;
			border-left: 0;
			margin-left: -20px;
		}
	}
}
</style>