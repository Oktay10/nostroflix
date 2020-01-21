<template>

  <v-card>
      <v-container
        fluid
        grid-list-lg
      >
          <favoriteVideos />
      </v-container>
  </v-card>

  

</template>

<script>
  import favoriteVideos from '../components/FavoriteVideos'

  export default {
    components: {
      favoriteVideos
    }
  }
</script>