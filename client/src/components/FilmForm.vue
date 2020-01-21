<template>
  <v-container>
        <!-- <h6 class="display-3" >Create film</h6> -->
  <v-form @submit.prevent="create_Film"
    ref="form"
    v-if="categories"
  >
          
          <v-text-field
            v-model="name"
            label="Name"
            required
            ></v-text-field>

            <v-text-field
            v-model="description"
            label="Description"
            required
            ></v-text-field>

            <v-select
            v-model="value"
            :items="items"
            attach
            chips
            label="Categories"
            multiple
          ></v-select>

            <v-text-field
            v-model="acteurs"
            label="Robert De Niro - Al Pacino - ..."
            required
            ></v-text-field>

            <v-text-field
              v-model="annee"
              class="mt-0"
              hide-details
              single-line
              type="number"
            ></v-text-field>

            <v-switch
              :label="`Disponible: ${disponible.toString()}`"
              v-model="disponible"
            ></v-switch>

        
          <!--  <v-btn
      color="success"
      type="submit"
    >
      create
    </v-btn> -->

    
  </v-form>
  </v-container>
</template>


<script>
import axios from 'axios';

  export default {
    name: "FilmForm",
    props: ['e1'],
    data: () => ({
        name: '',
        description: '',
        acteurs: '',
        annee: 2019,
        disponible: true,
        //items: [],
        value: []
    }),
    methods: {
      create_Film() {
        return new Promise((resolve, reject) => {
        let myCats = [];
          this.$store.state.categories.categories.forEach(cat => {
            this.value.forEach(val => {
              if(val == cat.name){
                  myCats.push({ _id: cat._id, name: cat.name, description: cat.description});
              }
            })
        });
     
        console.log(myCats);

        this.createFilm({
        name: this.name,
        description: this.description,
        categories: myCats,
        acteurs: this.acteurs,
        annee: this.annee.toString(),
        disponible: this.disponible
      }).then(response => {
            console.log(this.$store.state.createdFilm)
            this.$store.commit('retrieveStep', 2);
            resolve(resolve)
        }).catch(err => {
          resolve(reject)
        }); 

      })
      }
    },
     created() {
       this.retrieveCategories();
    },
    computed: {
       items() {
         let cats = [];
         this.$store.state.categories.categories.forEach(categorie => {
            cats.push(categorie.name);
         });
        return cats;
      },
    categories() {
        return this.$store.state.categories
      }
    }
  }
</script>
