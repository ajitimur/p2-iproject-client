<template>


		<div class="col-md-4">
    
    <div class="profile-card-2">
      <router-link :to="{name : `DetailPage`, params: {MovieId: movie.id}}">
        <img :src="this.imageSrc" class="img img-responsive" >
        </router-link>
       
    </div>
    <h6>{{movie.original_title}}</h6>
    <small>{{this.year}}</small>
</div>




</template>

<script>
export default {
  name: `HomeCard`,
  props: [`movie`],
  methods: {
   
  },
  computed: {
    year(){
      let getYear = new Date(this.movie.release_date).getFullYear();
      return getYear
    },
    imageSrc(){
      let link = this.movie.poster_path
      return `https://image.tmdb.org/t/p/w300${link}`
    }
  }
}
</script>

<style scoped>
.container-fluid,
.container {
    max-width: 1200px;
}

.card-container {
    padding: 100px 0px;
    -webkit-perspective: 1000;
    perspective: 1000;
}
.profile-card-2 {
    max-width: 300px;
    background-color: #FFF;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.1);
    background-position: center;
    overflow: hidden;
    position: relative;
    margin: 10px auto;
    cursor: pointer;
    border-radius: 10px;
}

.profile-card-2 img {
    transition: all linear 0.25s;
}

.profile-card-2 .profile-name {
    position: absolute;
    left: 30px;
    bottom: 70px;
    font-size: 30px;
    color: #FFF;
    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
    font-weight: bold;
    transition: all linear 0.25s;
}

.profile-card-2 .profile-icons {
    position: absolute;
    bottom: 30px;
    right: 30px;
    color: #FFF;
    transition: all linear 0.25s;
}

.profile-card-2 .profile-username {
    position: absolute;
    bottom: 50px;
    left: 30px;
    color: #FFF;
    font-size: 13px;
    transition: all linear 0.25s;
}

.profile-card-2 .profile-icons .fa {
    margin: 5px;
}

.profile-card-2:hover img {
    filter: grayscale(100%);
}

.profile-card-2:hover .profile-name {
    bottom: 80px;
}

.profile-card-2:hover .profile-username {
    bottom: 60px;
}

.profile-card-2:hover .profile-icons {
    right: 40px;
}


</style>