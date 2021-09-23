import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";
import swal from 'sweetalert';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: `http://localhost:3000`,
    movies: [],
    singleMovie: [],
    isLogin: localStorage.getItem(`access_token`) ? true : false,
    reviews: [],
    translatedText: "",
  },
  mutations: {
    GET_MOVIES(state, payload){
      payload.forEach(el => {
        state.movies.push(el)
      })
    },
    FIND_MOVIE(state, payload){
      state.movies = payload
    },
    SINGLE_MOVIE(state, payload){
      state.singleMovie = payload
    },
    CLEAR_MOVIES(state){
      state.movies = []
    },
    CHANGE_IS_LOGIN(state, payload){
      state.isLogin = payload
    },
    GET_REVIEWS(state, payload){
      state.reviews = payload
    },
    TRANSLATE_TEXT(state, payload){
      state.translatedText = payload
    },
    CLEAR_TRANSLATE(state){
      state.translatedText = ""
    },
    SELECTED_COMMENT(state, payload){
      console.log(payload);
      state.selected.editedTitle = payload.title;
      state.selected.editedContent = payload.content
    }
  },
  actions: {
    // MOVIE RELATED //
    fetchMovies(context, query){

      axios({
        method: `GET`,
        url: `${this.state.baseUrl}/movies?page=${query}`
      })
      .then(({data}) => {
        context.commit(`GET_MOVIES`, data.results)
      })
      .catch(err => {
        console.log(err);
      })
    },
    searchMovie(context, query){

      axios({
        method: `GET`,
        url: `${this.state.baseUrl}/movies/search?query=${query.title}&page=${query.page}`
      })
      .then(({data}) => {
        if(query.page === 1){
          context.commit(`FIND_MOVIE`, data.results)
        } else {
          context.commit(`GET_MOVIES`, data.results)
        }
      })
      .catch(err => {
        console.log(err);
      })
    },

    findSingleMovie(context, id){
      console.log(`${this.state.baseUrl}/movies/${id}`);
      axios({
        method: `GET`,
        url: `${this.state.baseUrl}/movies/${id}`
      })
      .then(({data}) => {
        console.log(data);
        context.commit(`SINGLE_MOVIE`, data)
      })
      .catch(err => {
        console.log(`hayooooo`);
        console.log(err.errors);
      })
    },
    
    // REVIEW RELATED //
    fetchReviews(context, payload){

      axios({
        method: `GET`,
        url: `${this.state.baseUrl}/reviews/${payload}`,
      })
      .then(({data}) => {
        context.commit(`GET_REVIEWS`, data)
      })
      .catch(err => {
        console.log(err);
      })
    },

    postReview(context, payload){
      // console.log(id);
      axios({
        method: `POST`,
        url: `${this.state.baseUrl}/reviews/${payload.id}`,
        headers: {
          access_token: localStorage.getItem(`access_token`)
        },
        data: {
          title: payload.title,
          content: payload.content,
          rating: payload.rating
        }
      })
      .then(({data}) => {
        swal("Review Posted!", "Your review has been posted!", "success");
        context.dispatch(`fetchReviews`, payload.id)
        console.log(data);
      })
      .catch(err => {
        swal(err.response.data.message)
      })
    },

    deleteReview(context, payload){

      axios({
        method: `DELETE`,
        url: `${this.state.baseUrl}/reviews/review/${payload.id}`,
        headers: {
          access_token: localStorage.getItem(`access_token`)
        }
      })
      .then(({data}) => {
        swal("Review Deleted!", data.message, "success");
        context.dispatch(`fetchReviews`, payload.MovieId)
      })
      .catch(err => {
        swal(err.response.data.message)
      })
    },

    editReview(context, payload){

      axios({
        method: `PUT`,
        url:`${this.state.baseUrl}/reviews/review/${payload.id}`,
        headers: {
          access_token: localStorage.getItem(`access_token`)
        },
        data: payload
      })
      .then(({data}) => {
        swal("Review Updated!", "You're successfully updated your review", "success");
        context.dispatch(`fetchReviews`, data.MovieId)
      })
      .catch(err => {
        swal(err.response.data.message)
      })
    },

    // TRANSLATE //
    translate(context, payload){
      
      axios({
        method: `POST`,
        url: `${this.state.baseUrl}/translate`,
        data: {
          text: payload.text,
          tl: payload.tl,
          sl: payload.sl
        }
      })
      .then(({data}) => {
        context.commit(`TRANSLATE_TEXT`, data)
      })
      .catch(err => {
        console.log(err);
      })
    },

    // USER RELATED //
    userLogin(context, payload){

      axios({
        method: `POST`,
        url: `${this.state.baseUrl}/users/login`,
        data: payload
      })
      .then(({data}) => {
        localStorage.setItem("access_token", data.access_token)
        context.commit(`CHANGE_IS_LOGIN`, true)
        router.push(`/`)
      })
      .catch(err => {
        swal(err.response.data.message)
      })
    },

    register(context, payload){
      axios({
        method: `POST`,
        url: `${this.state.baseUrl}/users/register`,
        data: payload
      })
      .then(({data}) => {
        swal("Register Success!", "You're one step away from greatness!", "success");
        router.push(`/login`)
        console.log(data); // bingung mau di kemanain
      })
      .catch(err => {
        swal(err.response.data.message)
      })
    },

    googleLogin(context, payload){

      axios({
        method: `POST`,
        url: `${this.state.baseUrl}/users/authGoogle`,
        data: {
          idToken: payload
        }
      })
      .then(data => {
        
        localStorage.setItem("access_token", data.data.access_token)
        context.commit(`CHANGE_IS_LOGIN`, true)
        router.push(`/`)
        
      })
      .catch(err => {
        console.log(err);
        // swal(err.response.data.message)
      })
    },
  },
  modules: {},
});
