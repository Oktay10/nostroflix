<template>

  <v-card>
      <v-container
        fluid
        grid-list-lg
      >
          <CategorieForm />
      </v-container>

      <v-container
        fluid
        grid-list-lg
      >
        <Categories />
      </v-container>
  </v-card>

  

</template>

<script>
  import CategorieForm from '../components/CategorieForm'
  import Categories from '../components/Categories'

  export default {
    components: {
      CategorieForm,
      Categories
    },
     data () {
      return {
          
      }
    },
  mounted() {
    if(!this.connected()){
				this.$router.push('/login');
			}
  }
  }
</script>