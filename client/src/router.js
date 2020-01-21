import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import CreateFilm from './views/CreateFilm'
import CreateCategorie from './views/CreateCategorie'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import Signup from './views/Signup.vue'
import Film from './views/Film.vue'
import Profil from './views/Profil.vue'
import EditProfile from './views/EditProfile.vue'
import FavoriteVideos from './views/FavoriteVideos.vue'
import WatchedVideos from './views/WatchedVideos.vue'
import Admin from './views/Admin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/createFilm',
      name: 'createFilm',
      component: CreateFilm
    },
    {
      path: '/createCategorie',
      name: 'createCategorie',
      component: CreateCategorie
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/profil',
      name: 'profil',
      component: Profil
    },
    {
      path: '/film/:id',
      name: 'film',
      component: Film
    },
    {
      path: '/editProfile',
      name : 'editProfile',
      component : EditProfile
    },
    {
      path: '/favoriteVideos',
      name : 'favoriteVideos',
      component : FavoriteVideos
    },
    {
      path: '/watchedVideos',
      name : 'watchedVideos',
      component : WatchedVideos
    }, 
    {
    path : '/admin',
    name : 'admin',
    component : Admin
    }
  ]
})