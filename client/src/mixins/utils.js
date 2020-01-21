export const Utils = {
  methods: {
    // check if member is connected
    connected() {
      if (this.$store.state.token === false) {
        return false;
      } else {
        return true;
      }
    },  
    updateUser(data){
      return new Promise((resolve, reject) => {
        window.axios.patch('/users/'+ data.user._id+ '/editProfile', {
          user : data.user
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    getAllBadges() {
      return new Promise((resolve, reject) => {
        window.axios.get('/badges')
          .then(response => {
            console.log(response)
            this.$store.commit('retrieveBadges', response.data)            
            resolve(response)

          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    register(data) {
      return new Promise((resolve, reject) => {
        window.axios.post('/users/signup', {
          name: data.name,
          email: data.email,
          password: data.password,
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroyToken() {
      this.$store.commit('destroyToken');
      this.$store.commit('destroyUser');
    },
    retrieveToken(credentials) {

      return new Promise((resolve, reject) => {
        window.axios.post('/users/login', {
          email: credentials.email,
          password: credentials.password,
        })
          .then(response => {
            const token = response.data.token
            console.log(response.data);
            this.$store.commit('retrieveToken', token)       
            this.$store.commit('retrieveUser', response.data.user)     
            resolve(response)

          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    createFilm(data) {
      return new Promise((resolve, reject) => {
        window.axios.post('/films', {
          name: data.name,
          description: data.description,
          acteurs: data.acteurs,
          annee: data.annee,
          disponible: data.disponible,
          categories: data.categories
        })
          .then(response => {
            const film_id = response.data.createdFilm._id
            this.$store.commit('createFilm', film_id)
            resolve(response)
            //console.log(response);
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    createCategorie(data) {
      return new Promise((resolve, reject) => {
        window.axios.post('/categories', {
          name: data.name,
          description: data.description
        })
          .then(response => {
            resolve(response)
            //console.log(response);
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    createFavoris(data) {
      return new Promise((resolve, reject) => {
        window.axios.patch('/users/' + this.$store.state.user._id + '/favoris', {
          film: data.favoris
        })
          .then(response => {
            resolve(response)
            //console.log(response);
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    createVus(data) {
      return new Promise((resolve, reject) => {
        window.axios.patch('/users/' + this.$store.state.user._id + '/vus', {
          film: data.vus
        })
          .then(response => {
            resolve(response)
            //console.log(response);
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    deleteFavoris(data) {
      return new Promise((resolve, reject) => {
        window.axios.delete('/users/' + this.$store.state.user._id + '/favoris/' + data.favoris)
          .then(response => {
            console.log(response);
            resolve(response)
            //console.log(response);
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    retrieveCategories() {
      //axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      window.axios.get('/categories')
        .then(response => {
          this.$store.commit('retrieveCategories', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    retrieveFilms() {
      //axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        window.axios.get('/films')
          .then(response => {
            this.$store.commit('retrieveFilms', response.data)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    retrieveDisponibleFilms() {
      //axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        window.axios.get('/films/disponible')
          .then(response => {
            this.$store.commit('retrieveFilms', response.data)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },

    retrievePosts(data) {
      //axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        window.axios.get('/posts/' + data.id )
            .then(response => {
              this.$store.commit('retrievePosts', response.data.posts)
              resolve(response)
            })
            .catch(error => {
              console.log(error)
              reject(error)
            })
      })
    },

    retrieveFilm(data) {
      //axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      window.axios.get('/films/' + data.id)
        .then(response => {
          this.$store.commit('retrieveFilm', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    createPost(data) {
      return new Promise((resolve, reject) => {
        window.axios.post('posts/'+ data.id ,{
          user:data.user,
          message:data.message
        })
            .then(response => {

              console.log(response);

              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
      })
    },
    retrieveFavoris() {
      //axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        window.axios.get('/users/' + this.$store.state.user._id + '/favoris')
          .then(response => {
            this.$store.commit('retrieveFavoris', response.data.favoris)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    retrieveVus() {
      //axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        window.axios.get('/users/' + this.$store.state.user._id + '/vus')
          .then(response => {
            this.$store.commit('retrieveVus', response.data.vus)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
        })
      },

    retrieveAllUsers(){
      return new Promise((resolve, reject) => {
        window.axios.get('/users')
          .then(response => {
            this.$store.commit('retrieveAllUsers', response.data)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },

    deleteUser(data){
      return new Promise((resolve, reject) => {
        window.axios.delete('/users/'+data.id)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    updateFilm(data){
      return new Promise((resolve, reject) => {
        window.axios.patch('/films/'+ data.film._id, {
          film : data.film
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    deleteFilm(data){
      return new Promise((resolve, reject) => {
        window.axios.delete('/films/'+data.id)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    }

  }
}
