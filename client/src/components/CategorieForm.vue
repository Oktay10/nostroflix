<template>
  <v-container>
        <h6 class="display-3" >Create Categorie</h6>
  <v-form @submit.prevent="create_Categorie"
    ref="form"
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

            


           <v-btn
      color="success"
      type="submit"
    >
      create
    </v-btn>

    
  </v-form>
  </v-container>
</template>


<script>
import axios from 'axios';

  export default {
    name: "CategorieForm",
    data: () => ({
        name: '',
        description: ''
    }),
    methods: {
      create_Categorie() {
      this.createCategorie({
        name: this.name,
        description: this.description
      })
        .then(response => {
           this.retrieveCategories()
           this.name = '';
           this.description = '';
        })
    }
    }
  }
</script>
