<template>
<div >
  <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
    <div class="card card0 border-0">
      <div class="row d-flex">
          <iframe width="500" height="400" :src="singleMovie.trailerLink">
</iframe>
            </div>
            <!-- end of row 1 -->
        <div class="row d-flex">
            <div class="col-lg-6">
               
                    <div class="row px-3 justify-content-center mt-4 mb-5 border-line"> <img :src="imageSrc" class="image"> </div>
               
            </div>
            
            <div class="col-lg-6">
              <div class="card2 card border-0 px-4 py-5">
                <div class="row px-3 justify-content-center mt-4 mb-5 border-line">
                  <h3 >{{singleMovie.original_title}}</h3>
                  <p class="lead">{{this.text ? this.text : this.overview}}</p>
                  <a @click.prevent="translate" href="" class="translate_icon"><i class="fa fa-language" aria-hidden="true"></i><small>translate to Bahasa Indonesia</small></a>
                </div>
              </div>
            </div>
        </div> 
        <!-- end of row 2 -->
        
    </div>
    <!-- end of card -->
    <hr>
    <!-- Comment Card -->
    <div v-if="reviews.length > 0">
    <comment-card  v-for="review in reviews" :key="review.id" :review="review" v-on:edit="edit"></comment-card>

    </div>
    <!-- Comment Form -->
    <comment-form v-if="isLogin" :review="review"></comment-form>
</div>
<!-- end of container -->
  </div>
</template>

<script>
import CommentCard from "@/components/CommentCard.vue"
import CommentForm from "@/components/CommentForm.vue"
export default {
  name: `DetailPage`,
  components: {
    CommentCard,
    CommentForm
  },
  data(){
    return {
      id: 0,
      review: null
    }
  },
  methods: {
    translate(){
      let payload = this.overview
      this.$store.dispatch(`translate`, payload)
      
      
    },
    edit(review){
      this.review = review
    }
  },
  computed: {
    singleMovie(){
      return this.$store.state.singleMovie
    },
     imageSrc(){
      let link = this.singleMovie.poster_path
      return `https://image.tmdb.org/t/p/w300${link}`
    },
    overview(){
      return this.$store.state.singleMovie.overview
    },
    reviews(){
      return this.$store.state.reviews
    },
    isLogin(){
      return this.$store.state.isLogin
    },
    text(){
      return this.$store.state.translatedText
    }
  },
  created(){
    
    this.id = this.$route.params.MovieId
    this.$store.dispatch(`findSingleMovie`, this.id)
    this.$store.dispatch(`fetchReviews`, this.id)
  },
  destroyed(){
    this.$store.commit(`CLEAR_TRANSLATE`)
  }
}
</script>

<style scoped>
.card0 {
    box-shadow: 0px 4px 8px 0px #757575;
    border-radius: 4px
    
}

.card2 {
    margin: 0px 40px
}

.image {
    width: 300px;
    height: 400px;
    border-radius: 4px
}

p {
  font-family: 'Frank Ruhl Libre', serif;
  text-align: justify;
  text-justify: inter-word;
}

.border-line {
    border-right: 1px solid #EEEEEE
}

.translate_icon {
  background: white;
  color: #353b48;
  size: 45px;
}
</style>