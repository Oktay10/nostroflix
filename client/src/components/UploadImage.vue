<template>
  <v-form @submit.prevent="sendFile" enctype="multipart/form-data">
    <v-container>
      <v-layout>

        <v-flex
          xs12
          md12
        >

        <div>

          <h1 class="center">Upload the image of the film</h1>

        </div>

        <v-progress-linear class="prog" v-model="progress"></v-progress-linear>
          
          <input type="file"
            @change="selectFile"
            ref="file"
           />

           

            <!-- <div class="btn">
                <v-btn type="submit" depressed color="primary">Upload image</v-btn>
            </div> -->
                
        </v-flex>
        
      </v-layout>
    </v-container>
  </v-form>
</template>


<script>

  export default {
    name: "UploadImage",
    data: () => ({
        file: "",
        progress: 0
    }),
    methods: {
      
        selectFile(){
            this.file = this.$refs.file.files[0];
        },

        async sendFile(){
            const formData = new FormData();
            formData.append("file", this.file);

            try{
                await window.axios.post('/films/upload/image/'+this.$store.state.createdFilm, formData, {
                  onUploadProgress: e => this.progress = Math.round(e.loaded * 100 / e.total)
                });
                this.$store.commit('retrieveStep', 1);

                

                //this.$router.push('/');
            }catch(err){
                console.log(err);
            }

        }

    },
    computed: {
    createdFilm() {
      return this.$store.state.createdFilm
    }
  }
  }
</script>

<style>
.center {
  text-align: center;
  font-size: 3em;
  margin: 30px;
}

.prog , .btn {
  margin: 50px;
}
</style>

