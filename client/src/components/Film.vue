<template>
  <v-hover v-if="film">
    <v-card slot-scope="{ hover }" class="mx-auto" color="grey lighten-4" max-width="750">
      <v-img @click="showFilm" :aspect-ratio="16/9" :src="path+'images/'+film.filmImage">
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text play"
            style="height: 100%;"
          >Play</div>
        </v-expand-transition>
      </v-img>
      <v-card-text class="pt-4" style="position: relative;">
        <v-dialog v-model="dialog" max-height="900">
          <v-btn slot="activator" absolute color="orange" class="white--text" fab large right top>
            <v-icon>present_to_all</v-icon>
          </v-btn>
          <v-card>
            <v-layout row justify-center>
              <video  controls :src="path+'videos/'+film.filmVideo" type="video/mp4" >
              </video>

              <!-- <video-player
                class="vjs-custom-skin"
                ref="videoPlayer"
                :options="playerOptions"
                :playsinline="true"
                @play="onPlayerPlay($event)"
                @pause="onPlayerPause($event)"
                @ended="onPlayerEnded($event)"
                @loadeddata="onPlayerLoadeddata($event)"
                @waiting="onPlayerWaiting($event)"
                @playing="onPlayerPlaying($event)"
                @timeupdate="onPlayerTimeupdate($event)"
                @canplay="onPlayerCanplay($event)"
                @canplaythrough="onPlayerCanplaythrough($event)"
                @ready="playerReadied"
                @statechanged="playerStateChanged($event)"
              ></video-player> -->

            </v-layout>
          </v-card>
        </v-dialog>
        <div class="font-weight-light grey--text title mb-2">
          <template v-for=" cat in film.categories">{{cat.name}}</template>
        </div>
        <h3 class="display-1 font-weight-light orange--text mb-2">{{film.name}}</h3>
        <div class="font-weight-light title mb-2">{{film.description}}</div>
        
        <v-flex xs12 sm3 v-if="fv && loggedIn">
                      <v-btn fab dark small color="pink">
                        <v-icon v-on:click="deleteFav(film._id)">favorite</v-icon>
                      </v-btn>
                  </v-flex>

        <v-flex xs12 sm3 v-else v-show="loggedIn">
            <v-btn fab dark small color="#808080">
              <v-icon v-on:click="favoris">favorite</v-icon>
            </v-btn>
        </v-flex>

        

        
        
          <v-card-text>


              <v-dialog v-model="dialogs"  max-height="100%" >
                  <v-btn slot="activator" absolute
                         color="blue"
                         class="white--text"
                         fab
                         large
                         right
                  ><v-icon>chat</v-icon></v-btn>
                  <v-btn slot="activator" absolute
                         color="blue"
                         class="white--text"
                         fab
                         large
                         right
                  ><v-icon>chat</v-icon></v-btn>
                  <v-card height="600px" >
                      <v-toolbar color="" dark>

                          <v-icon>chat</v-icon>
                          <v-toolbar-title>Chat</v-toolbar-title>

                          <v-spacer></v-spacer>
                          <v-btn icon dark @click="dialogs = false">
                              <v-icon>close</v-icon>
                          </v-btn>
                      </v-toolbar>


                      <v-container
                              class="container"
                      >

                          <v-flex>

                              <div id="res" v-if="posts" >

                                  <div  v-for="post in posts" :key="post._id" class="post">

                                      <hr/>

                                      <div class="post">
                                          <img  :src="'https://api.adorable.io/avatars/20/' + post.user.email + '.png'" alt="">


                                          <span  class="fullname"> <b>{{ post.user.name }}</b></span>


                                          <span  class="time" >{{ toMins(post.date) }} min</span>
                                          <div>
                                                                <span class="message" >

                                                            {{ post.message }}
                                                                </span>
                                          </div>
                                      </div>

                                  </div>
                              </div>
                          </v-flex>


                      </v-container>

                      <v-container
                              id="grid"
                              fluid
                              grid-list-sm
                              tag="section"
                      >
                          <v-layout row wrap>
                              <v-flex d-flex xs12 order-xs5>
                                  <v-layout column>
                                  </v-layout>
                              </v-flex>
                          </v-layout>


                          <v-layout row wrap
                          >
                              <v-flex xs12>
                                  <v-text-field
                                          @keyup.enter.native="newPost"
                                          v-model="message"
                                          outline
                                          clearable
                                          label="Message"
                                          placeholder="Ecrire un message"
                                          type="text"
                                  >

                                  </v-text-field>
                              </v-flex>

                          </v-layout>
                      </v-container>
                  </v-card>
              </v-dialog>
          </v-card-text>
          
          <v-flex xs12 sm3>
              <v-btn fab dark small color="#808080">
                  <v-icon v-on:click="favoris">favorite</v-icon>
              </v-btn>
          </v-flex>
      </v-card-text>

    </v-card>
  </v-hover>
</template>

<script>
import FilmService from "../services/FilmService";
import io from 'socket.io-client';

export default {
  name: "Film",
  mounted: function() {
    this.getFilmLocal();
  },
  data: () => ({
    a: true,
    socket : io('localhost:3000'),
    error: "",
      message:'',
      dialog: false,
      dialogs:false,
    path: "http://localhost:3000/uploads/",
    playerOptions: {
      height: "360",
      autoplay: false,
      muted: false,
      language: "en",
      playbackRates: [0.7, 1.0, 1.5, 2.0],
      sources: [
        {
          type: "video/mp4",
          // mp4
          src: "http://vjs.zencdn.net/v/oceans.mp4"
          // webm
          // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        }
      ],
      poster:
        "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg"
    }
  }),
  created() {
    this.retrieveFilm({
      id: this.$route.params.id
    });
    this.retrieveFavoris();

      this.retrievePosts({
          id: this.$route.params.id
      })

  },
  computed: {
    film() {
      let f = this.$store.state.film.film;
      this.playerOptions.sources[0].src =
        "http://localhost:3000/api/films/" + f._id + "/stream";
      this.playerOptions.poster = this.path + "images/" + f.filmImage;
      return this.$store.state.film.film;
    },
    loggedIn() {
      return this.connected();
    },
    fv() {
      let check = false;
      let fav = this.$store.state.favoris;
      fav.forEach(f => {
          if (f._id == this.$route.params.id)
          check = true;
      })
      return check;   
    },
    player() {
      return this.$refs.videoPlayer.player;
    },
      posts(){
          return this.$store.state.posts;
      }
  },

  methods: {
    favoris() {
        this.createFavoris({
        favoris: this.$route.params.id
      })
        .then(response => {
            console.log('ok')
            this.$router.push({ name: 'favoriteVideos' })
        })
      },
      deleteFav(id) {
        this.deleteFavoris({
        favoris: id
      })
        .then(response => {
          alert('Remove movie from favorites')
          this.retrieveFavoris();
        })
      },
    exist() {
      this.retrieveFavoris();
    },
    showFilm() {  
      this.dialog = true;
    },
    getFilmLocal: function() {
      window.requestFileSystem =
        window.requestFileSystem || window.webkitRequestFileSystem;

      window.requestFileSystem(
        window.TEMPORARY,
        10368709120,
        this.onInitFs,
        this.errorHandler
      );
      if (this.isOnline) {
        console.log("offline"); 
        let f = this.$store.state.film.film;
        const formData = new FormData();
        formData.append("file", "http://localhost:3000/api/films/" + f._id + "/stream");
        // make network request that returns 'film' object
        this.appData = this.$store.state.film.film;
        this.$offlineStorage.set("film", formData );
      } else {
        this.appData = this.$offlineStorage.get("film");
      }
    },
    // listen event
    onPlayerPlay(player) {
      this.createVus({
        vus: this.$route.params.id
      })
        .then(response => {
           console.log('ok');
        })
    },
    errorHandler(e) {
      var msg = "";

      switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
          msg = "QUOTA_EXCEEDED_ERR";
          break;
        case FileError.NOT_FOUND_ERR:
          msg = "NOT_FOUND_ERR";
          break;
        case FileError.SECURITY_ERR:
          msg = "SECURITY_ERR";
          break;
        case FileError.INVALID_MODIFICATION_ERR:
          msg = "INVALID_MODIFICATION_ERR";
          break;
        case FileError.INVALID_STATE_ERR:
          msg = "INVALID_STATE_ERR";
          break;
        default:
          msg = "Unknown Error";
          break;
      }

      console.log("Error: " + msg);
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    onPlayerEnded(player) {
      // console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      // console.log('player Playing!', player)
    },
    onInitFs(fs) {
      let f = this.$store.state.film.film;
      // console.log(f)
      fs.root.getFile(
        "http://localhost:3000/api/films/" + f._id + "/stream",
        { create: true, exclusive: true },
        function(fileEntry) {
          fileEntry.isFile === true
          fileEntry.name == f.name
          fileEntry.fullPath == '/film1.mp4'
        },
        // this.errorHandler
        console.log('error')
      );
      
    },
    onPlayerTimeupdate(player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied(player) {
      // seek to 10s
      console.log("example player 1 readied", player);
      player.currentTime(10);
      // console.log('example 01: the player is readied', player)
    },
      newPost(){
          this.createPost({
              message: this.message,
              user: this.$store.state.user._id,
              id: this.$route.params.id
          })
              .then(res => {
                  this.retrievePosts({
                      id: this.$route.params.id
                  })
                  this.message='';
                  this.socket.emit('save-post', {
                    post: "saved"
                });
              })
              setTimeout(function(){ 
                let objDiv = document.getElementById("res");
                objDiv.scrollTop = objDiv.scrollHeight;
               }, 800);
              
      },
      toMins(time){
        let currentdate = new Date(); 
                let mydate = new Date(time);
                let minutes = 1000 * 60;
                let mins = Math.round(
                                    currentdate.getTime() / minutes) -
                                     Math.round(mydate.getTime() / minutes);

              return mins;
      }
  },
  mounted() {
   this.socket.on('new-post', (data) => {
            this.retrievePosts({
                id: this.$route.params.id
            })
        });  
  }
}

</script>

<style>
#res{
    overflow-y: scroll;
    height:350px;
}

img{
    border-radius:15px ;
}
    .post{
        max-width:100%;
        max-height:100%;
    }
    .v-card--reveal {
        align-items: center;
        bottom: 0;
        justify-content: center;
        opacity: 0.5;
        position: absolute;
        width: 100%;
    }

    .play:hover {
        cursor: pointer;
    }

    .message {
        font-size: 1.2em;
        margin-left: 60px;
    }
    .fullname {
        font-size: 1em;
        margin-left: 10px;
    }

    .time {
      margin-left: 10px;
    }


</style>