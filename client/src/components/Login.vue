<template>
    <v-container>
        <h3 class="display-3" >Connection</h3>
  <v-form @submit.prevent="login"
    ref="form"
  >
    <v-text-field
      v-model="email"
      label="Email"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="password"
      type="password"
      required
    ></v-text-field>



    <v-btn
      color="success"
      type="submit"
    >
      Connection
    </v-btn>

    
  </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  created() {
    
  },
  methods: {
    login() {
      
      this.retrieveToken({
        email: this.email,
        password: this.password 
      })
        .then(response => {
          this.getAllBadges()
          this.$router.push({ name: 'home' })
        })
    }
  }
}
</script>