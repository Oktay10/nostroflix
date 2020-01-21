<template>
  <v-container>
    
    <v-select
            v-model="val"
            :items="items"
            attach
            @input="sort"
            chips
            label="Categories"
            multiple
          ></v-select>
    
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout v-if="films" row wrap>
          
        <v-flex xs12 sm6 md4 lg3 
         v-for="film in films" :key="film._id">
              <v-hover>
                
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                
                 <router-link tag="a" :to="toPath+film._id">
                  <v-img :to="toPath+film._id"
                  :src="path+'images/' + film.filmImage"
                  height="300px"
                >

                <!-- <v-img :to="toPath+film._id"
                  :src="require('@/assets/' + film.filmImage)"
                  height="300px"
                > -->
               
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="film.name"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
                </router-link>
               <v-card-title>
                  <div>
                    <div class="d-flex">
                      <v-rating
                        :value="value"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                      ></v-rating>
                      <div class="ml-2 grey--text text--darken-2">
                        <span>{{ film.note }}</span>
                        <span>({{ film.reviews }})</span>
                      </div>
                    </div>
                  </div>
      </v-card-title>
      <v-card-actions v-if="connected()  && $store.state.user.level == '0'">
              <v-switch v-model="table[film._id]" @change="update_film(table[film._id], film)" :label="''"></v-switch>
              <v-btn color="red myBtn2" @click="delete_film(film._id)" dark>Delete
                <v-icon dark right>block</v-icon>
              </v-btn>
            </v-card-actions>
    </v-card>
    
  </v-hover>
        </v-flex>
      </v-layout>
      </v-container>
  </v-container>
</template>

<script>
import io from 'socket.io-client';

  export default {
    name: 'Films',
    data: () => ({
      error: '',
      reviews: 413,
      table : [],
      value: 4.5,
      toPath: '/film/',
      path: 'http://localhost:3000/uploads/',
      socket : io('localhost:3000'),
      val: []
    }),
    created() {
      if(this.$store.state.user.level == '0')
      this.retrieveFilms();
      else {
        this.retrieveDisponibleFilms()
      }
      this.retrieveCategories();
    },
    methods: {
      sort(){
        console.log(this.val)
        if(this.val.length == 0)
          this.$store.commit('retrieveSort', false)
        else{
          this.$store.commit('retrieveSort', this.val)
        }
      },
      update_film(bool, film){
         if(bool == true)
          film.disponible = true;
          else {
            film.disponible = false
          }
          console.log(film)
          this.updateFilm({
            film: film
            })
          .then(res => {
            this.socket.emit('save-film', {
                    film: "saved"
              });
          })
          .catch(err => {
            
          })
    },
    delete_film(id){
       var result = confirm("Confirm delete !");
          if (result) {
                this.deleteFilm({
                    id: id
                  }).then(res => {
                    this.socket.emit('save-film', {
                          film: "saved"
                    });
                  }).catch(err => {
                      console.log(err)
                  })
          }
        
    }
    },
    computed: {
      films() {
        if(this.$store.state.sort == false){
          this.$store.state.films.films.forEach(element => {
              if(element.disponible == false)
                this.table[element._id] = false;

              if(element.disponible == true)
                this.table[element._id] = true;

               
            });
            return this.$store.state.films.films
        }
        else {
          this.$store.getters.getfilmsByCategories(this.val).forEach(element => {
              if(element.disponible == false)
                this.table[element._id] = false;

              if(element.disponible == true)
                this.table[element._id] = true;

            });
          return this.$store.getters.getfilmsByCategories(this.val)
        }
      },
      items() {
         let cats = [];
         this.$store.state.categories.categories.forEach(categorie => {
            cats.push(categorie.name);
         });
        return cats;
      },
    categories() {
        return this.$store.state.categories.categories
      }
  },
  mounted() {
    this.socket.on('new-film', (data) => {
            if(this.$store.state.user.level == '0')
              this.retrieveFilms();
              else {
                this.retrieveDisponibleFilms()
              }
              this.retrieveCategories();
        }); 
    }
  }
</script>

<style>

a {
  text-decoration: none;
}

</style>