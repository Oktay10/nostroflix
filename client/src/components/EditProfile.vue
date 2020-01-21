<template>
    <v-container>
        <h3 class="display-3" >Modifier vos informations</h3>
  <v-form @submit.prevent="UpdateProfile"
    ref="form"
  >
    <v-text-field
      v-model="name"
      :label="this.$store.state.user.name"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :label="this.$store.state.user.email"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="Mot de passe"
      required
    ></v-text-field>



    <v-btn
      color="success"
      type="submit"
    >
      Modifier
    </v-btn>

    
  </v-form>
  </v-container>
</template>
<script>
export default {
  name : 'EditProfile',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
      UpdateProfile(){
        
        this.updateUser({name : this.name, email: this.email,
        password: this.password} )
      }
  }
}
</script>