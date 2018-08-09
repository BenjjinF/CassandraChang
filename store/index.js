import Vuex from 'vuex'

async function getHomeData(app) {
  const {data}  = await app.$storyapi.get(
    'cdn/stories/home', {
      version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
    }
  )
  return {
    blok: data.story.content,
    heroImage: data.story.content.hero_image,
    slogan: data.story.content.slogan,
    portrait: data.story.content.portrait,
    quote: data.story.content.quote,
    testimonials: data.story.content.testimonials,
    affiliationLogos: data.story.content.affiliation_logos
  }
}

async function getPropertiesData(app) {
  const {data} = await app.$storyapi.get(
    'cdn/stories', {
      version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
      starts_with: 'properties/',
      is_startpage: 0,
      sort_by: 'content.listing_date:desc',
    }
  )

  return data.stories.map(story => {
    return {
      id: story.slug,
      unitNumber: story.content.unit_number,
      houseNumber: story.content.house_number,
      streetDirection: story.content.street_direction,
      streetName: story.content.street_name,
      streetType: story.content.street_type,
      city: story.content.city,
      sold: story.content.sold,
      image: story.content.property_images ? story.content.property_images[0].image : '',
      imageAltTags: story.content.property_images ? story.content.property_images[0].caption : '',
      price: story.content.price,
      bedrooms: story.content.total_bedrooms,
      baths: story.content.total_baths,
    }
  })
}

async function getBlogData(app) {
  const { data } = await app.$storyapi.get(
    'cdn/stories', {
      version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
      starts_with: 'blog/',
      is_startpage: 0,
      sort_by: 'content.date_published:desc',
    }
  )
  return data.stories.map(story => {
    return {
      id: story.slug,
      title: story.name,
      previewText: story.content.preview_text,
      image: story.content.image,
      imageAltTags: story.content.image_alt_tags,
    }
  })
}


const createStore = () => {
  return new Vuex.Store({
    state: {
      scroll: 0,
      loading: false,
      fromInDomain: false,
      // contactFormSubmitted: false,
      // homeEvaluationFormSubmitted: false,
      pages: {
        home: {
          data: {
            blok: ""
          }
        },
        properties: {
          data: {}
        },
        blog: {
          data: {}
        },
        advice: {
          data: {}
        },
        about: {
          data: {
            blok: ""
          }
        },
        contact: {
          formSubmitted: false,
          data: {
            blok: ""
          }
        },
        homeEvaluation: {
          formSubmitted: false
        }
      }
    },
    mutations: {
      setHomeData(state, homeData) {
        state.pages.home.data = homeData
      },
      setPropertiesData(state, propertiesData) {
        state.pages.properties.data = propertiesData
      },
      setBlogData(state, blogData) {
        state.pages.blog.data = blogData
      },
    },
    actions: {
      async nuxtServerInit ({ commit }, { app }) {
        const homeData = await getHomeData(app)
        commit('setHomeData', homeData)

        const propertiesData = await getPropertiesData(app)
        commit('setPropertiesData', propertiesData)
        
        const blogData = await getBlogData(app)
        commit('setBlogData', blogData)
      }
    }
  })
}

export default createStore
