<template>
    <v-container>
      
        <v-layout v-if="categories" row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="categorie in categories.categories" :key="categorie._id">

              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="white--text mx-auto"
                  color="blue-grey darken-2"
                >
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{ categorie.name }}</div>
                  <span>{{ categorie.description }}</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>Show films</v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>

  </v-container>
</template>

<script>

  export default {
    name: 'Categories',
    data: () => ({
      
    }),
     created() {
       this.retrieveCategories()
    },
    computed: {
       categories() {
        return this.$store.state.categories
      }
    }
  }
</script>

<style>

</style>