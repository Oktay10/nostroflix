<template>
  <v-container>
    <div>
      <v-flex class="mt-5 center ">
        <v-avatar size="200" class="slide-fwd-center">
          <img
            class="text-lg-center"
            :src="'https://api.adorable.io/avatars/285/mouad@mail.com.png'"
          >
        </v-avatar>
      </v-flex>
      <router-link to="editProfile">
        <v-icon id="icon_edit">edit</v-icon                                                                               >
      </router-link>
    <v-flex class="center">{{this.$store.state.user.name}}</v-flex>
    <v-flex class="center" xs12 sm6 md4 lg3 v-for="badge in this.$store.state.badges.badges" :key="badge._id">                                                                                                                                       
      <v-img  v-if="parseInt($store.state.user.nbfilmW) > parseInt(badge.nbfilm)" :src="require('@/assets/badges/' + badge.uribadge)" id="badge"></v-img>
      <!-- <span class="headlinet">{{badge.uribadge}}</span> -->
    </v-flex>
    </div>
  </v-container>
</template>

<script>                                                                            
export default {
  name: "profil",
  data() {
    return {
      email: "",
      password: "",
      badge: "",
      nb_filmW : null
    };
  },
  methods: {
    update() {
      this.retrieveToken({
        email: this.email,
        password: this.password,
        nb_filmW: this.nb_filmW
      }).then(response => {
        this.$router.push({ name: "home" });
      });
    },
    getUserBadge() {
      nb_filmW = this.$store.state.user.nbfilmW;
    }
  }
};
</script>


<style lang="scss">
#icon_edit {
  margin-top: -50%;
  margin-left: 55%;
}
#badge{
    height : 40%;
    width: 40%;
    float: left;
    margin-left: 2%;
}

.slide-fwd-center {
	-webkit-animation: slide-fwd-center 0.45s cubic-bezier(0.075, 0.820, 0.165, 1.000) both;
	        animation: slide-fwd-center 0.45s cubic-bezier(0.075, 0.820, 0.165, 1.000) both;
}

@-webkit-keyframes slide-fwd-center {
  0% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
  }
  100% {
    -webkit-transform: translateZ(1620px);
            transform: translateZ(1600px);
  }
}
@keyframes slide-fwd-center {
  0% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
  }
  100% {
    -webkit-transform: translateZ(1600px);
            transform: translateZ(1620px);
  }
}
</style>