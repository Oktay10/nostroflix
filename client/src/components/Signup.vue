<template>
    <v-container>
        <h3 class="display-3" >Signup</h3>
  <v-form @submit.prevent="Register"
    ref="form"
  >
    <v-text-field
      v-model="name"
      label="Name"
      required
    ></v-text-field>

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

    <v-text-field
      v-model="password2"
      label="password"
      type="password"
      required
    ></v-text-field>

    <v-btn
      color="success"
      type="submit"
    >
      Signup
    </v-btn>

    
  </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password2: ''
    }
  },
  methods: {
    Register() {
      this.register({
        name: this.name,
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.$router.push({ name: 'login' })
        })
    }
  }
}
</script>