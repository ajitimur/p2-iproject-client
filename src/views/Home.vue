<template>
<div>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
  <div class="container">
    <div class="justify-content-center">
      <img src="../assets/CompanyLogo.png" alt="">
    </div>
  </div>
  <!-- SEARCH BAR -->
<div class="container h-100">
      <div class="d-flex justify-content-center h-100">
        <div class="searchbar">
          <input v-model="search" class="search_input" type="text" name="" placeholder="Search...">
          <a @click.prevent="searchMovie" href="" class="search_icon"><i class="fas fa-search"></i></a>
        </div>
      </div>
    </div>

  <br>
  <div class="container">
	<div class="row">
    <!-- Content Card -->
    
    <home-card v-for="movie in movies" :key="movie.id" :movie="movie"></home-card>
    </div>
  </div>
  </div>
 <HFooter></HFooter>

  </div>
</template>

<script>
// @ is an alias to /src

import HomeCard from "@/components/HomeCard.vue";
import HFooter from 'vue-hacktiv8-footer'

export default {
  name: "Home",
  data(){
    return {
      data: [],
      busy: false,
      count: 0,
      page: 1,
      search: ""
    }
  },
  components: {
    HomeCard,
    HFooter
  },

  methods: {
    loadMore: function() {
      this.busy = true;
 
      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({ name: this.count++ });
        }
        this.busy = false;
      }, 5000);
      
      
      // console.log(this.page);
      if(this.page != 1 && !this.search){
        
        this.$store.dispatch(`fetchMovies`, this.page)
      }
      if(this.search){
        let payload = {
        title: this.search,
        page: this.page
      }
      this.$store.dispatch(`searchMovie`, payload)
      }
      this.page++
    },
    searchMovie(){
      if(this.search){
        let payload = {
          title: this.search,
          page: 1
        }
        this.$store.dispatch(`searchMovie`, payload)
        this.page = 1
      } else {
        this.page = 1
        this.$store.commit(`CLEAR_MOVIES`)
        this.$store.dispatch(`fetchMovies`, this.page)
      }
    }


  },
  computed: {
    movies(){
      return this.$store.state.movies
    }
  },
  created(){
    let query = ''
    this.page = 1
    this.$store.dispatch(`fetchMovies`, query)
  },
  destroyed(){
    
    this.$store.commit(`CLEAR_MOVIES`)
  }
};
</script>

<style scoped>
.searchbar{
    margin-bottom: auto;
    margin-top: auto;
    height: 60px;
    background-color: #353b48;
    border-radius: 30px;
    padding: 10px;
    }

    .search_input{
    color: white;
    border: 0;
    outline: 0;
    background: none;
    width: 0;
    caret-color:transparent;
    line-height: 40px;
    transition: width 0.4s linear;
    }

    .searchbar > .search_input{
    padding: 0 10px;
    width: 450px;
    caret-color:white;
    transition: width 0.4s linear;
    }

    .searchbar > .search_icon{
    background: white;
    color: #353b48;
    }

    .search_icon{
    height: 40px;
    width: 40px;
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color:white;
    text-decoration:none;
    }

.page-link {
  background-color: #353b48;
  color: white;
}
</style>