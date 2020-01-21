<template>
  <v-container>
    
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout v-if="favoris" row wrap>
        <v-flex xs12 sm6 md4 lg3 
         v-for="film in favoris" :key="film._id">
             
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
                        <span>{{ value }}</span>
                        <span>({{ reviews }})</span>
                      </div>
                    </div>
                  </div>
                  <v-flex xs12 sm3>
                      <v-btn fab dark small color="pink">
                        <v-icon v-on:click="deleteFav(film._id)">favorite</v-icon>
                      </v-btn>
                  </v-flex>
      </v-card-title>
    </v-card>
    
  </v-hover>
        </v-flex>
      </v-layout>
      </v-container>
  </v-container>
</template>


<script>

  export default {
    name: 'FavoriteVideos',
    data: () => ({
      error: '',
      reviews: 413,
      value: 4.5,
      toPath: '/film/',
      path: 'http://localhost:3000/uploads/',
    }),
    created() {
      this.retrieveFavoris();
    },
    methods: {

      deleteFav(id) {
        this.deleteFavoris({
        favoris: id
      })
        .then(response => {
          alert('Remove movie from favorites')
          this.retrieveFavoris();
        })
      },
      
    },
    computed: {
      favoris() {
          return this.$store.state.favoris
      }
  },
  mounted() {
  
    }
  }
</script>

<style>

a {
  text-decoration: none;
}

</style>