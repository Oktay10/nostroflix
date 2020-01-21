import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: "",
    token: false,
    createdFilm: false,
    categories: false,
    films: false,
    film: false,
    step: 0,
    badges : false,
    user : false,
    posts: false,
    favoris : false,
    vus : false,
    users : false,
    endedMovie : false,
    sort: false

  },
  mutations: {
  	initialiseStore(state){
  		if(localStorage.getItem('store')) {
  			this.replaceState(
  				Object.assign(state,JSON.parse(localStorage.getItem('store')))
  				);
  		}
    },
    retrieveToken(state, token) {
      state.token = token
    },
    retrieveBadges(state, badges){
      state.badges = badges
    },
    retrieveUser(state, user){
      state.user = user
    },
    retrieveFavoris(state, favoris) {
      state.favoris = favoris
    },
    retrieveVus(state, vus) {
      state.vus = vus
    },
    destroyToken(state) {
      state.token = false
    },
    destroyUser(state) {
      state.user = false
    },
    createFilm(state, createdFilm) {
      state.createdFilm = createdFilm
    },
    retrieveCategories(state, categories) {
      state.categories = categories
    },
    retrieveFilms(state, films) {
      state.films = films
    },
    retrievePosts(state, posts) {
      state.posts = posts
    },
    retrieveFilm(state, film) {
      state.film = film
    },
    retrieveStep(state, step) {
      state.step = step
    },
    retrieveAllUsers(state, users){
      state.users = users},
    retrieveSort(state, sort) {
      state.sort = sort
    }
  },
  getters: {
    getfilmsByCategories: (state) => (data) => {
      return state.films.films.filter(film => {
        let res = false;
        film.categories.forEach(c => {
          //console.log(c.name)
          if(data.indexOf(c.name) > -1 )
            res = true;
        });

        return res;
      });
    }
  },
  actions: {
    
  }
})
