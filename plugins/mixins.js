import Vue from 'vue'
import marked from 'marked'


Vue.mixin({
  methods: {
    marked: input => {
      return marked(input)
    },
    resizeImage: (image, option) => {
      if (image) {
        var imageService = '//img2.storyblok.com/'
        var path = image.replace('//a.storyblok.com', '')
        return imageService + option + path
      }
    },
    numberWithCommas: (value) => {
      var parts = value.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".")
    }
  }
})
