<template>
  <nav>
    <v-toolbar flat app>
      <v-toolbar-side-icon @click="drawer = !drawer" class="grey--text"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Nostro</span>
        <span>flix</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="!loggedIn" flat color="grey" to="/signup">
        <span>Signup</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>

      <v-btn v-if="!loggedIn" flat color="grey" to="/login">
        <span>Login</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>

      <v-btn v-if="loggedIn" flat color="grey" to="/logout">
        <span>Logout</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img
              v-if="loggedIn"
              class="text-lg-center"
              :src="'https://api.adorable.io/avatars/285/mouad@mail.com.png'"
            >
          </v-avatar>
        </v-flex>
        <v-flex class="mt-4 mb-3">
          <v-list>
        <v-list-tile router to="/profil" v-if="this.connected()">
          <v-list-tile-action>
            <v-icon class="white--text">person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">Profil</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile router to="/" >
          <v-list-tile-action>
            <v-icon class="white--text">dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">Accueil</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile router to="/createFilm" v-if="this.connected()  && this.$store.state.user.level == '0'">
          <v-list-tile-action>
            <v-icon class="white--text">folder</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">Create Film</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile router to="/createCategorie" v-if="this.connected()  && this.$store.state.user.level == '0'">
          <v-list-tile-action>
            <v-icon class="white--text">folder</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">Create Categorie</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile router to="/admin" v-if="this.connected()  && this.$store.state.user.level == '0'">
          <v-list-tile-action>
            <v-icon class="white--text">folder</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">Edit users</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile router to="/favoriteVideos" v-if="this.connected() && this.$store.state.user.level == '1'">
          <v-list-tile-action>
            <v-icon class="white--text">person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">Favorite videos</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile router to="/watchedVideos" v-if="this.connected() && this.$store.state.user.level == '1'">
          <v-list-tile-action>
            <v-icon class="white--text">person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">Watched videos</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
  </nav>
</template>

<script>
  export default {
    data: () => ({
        drawer: false,
        links: [
        { icon: 'person', text: 'Profil', route: '/profil' },
        { icon: 'dashboard', text: 'Acceuil', route: '/' },
        { icon: 'folder', text: 'createFilm', route: '/createFilm' },
        { icon: 'folder', text: 'createCategorie', route: '/createCategorie' },
        { icon: 'folder', text: 'favoriteVideos', route: '/favoriteVideos' }
      ],
        snackbar: false
    }),
    computed: {

  },
  computed: {
    loggedIn() {
      return this.connected();
    }
  }
};
</script>

