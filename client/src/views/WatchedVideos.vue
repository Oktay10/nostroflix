<template>

  <v-card>
      <v-container
        fluid
        grid-list-lg
      >
          <watchedVideos />
      </v-container>
  </v-card>

  

</template>

<script>
  import watchedVideos from '../components/WatchedVideos'

  export default {
    components: {
      watchedVideos
    }
  }
</script>