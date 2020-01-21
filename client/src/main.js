import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import {Utils} from './mixins/utils.js'
import axios from 'axios'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import VueOffline from 'vue-offline'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

Vue.use(VueOffline)

Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)

Vue.config.productionTip = false



Vue.mixin(Utils)

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

window.axios = axios.create({
  baseURL: 'http://localhost:3000/api',
  params : { token : false }
});

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    this.$store.commit('initialiseStore');
  }
}).$mount('#app')
