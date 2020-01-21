<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1" class="step" @click="s1">Film informations</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2" @click="s2" class="step">Upload video</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3" @click="s3" class="step">Upload cover</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-5"
          color="grey lighten-1"
          height="430px"
        >
          <FilmForm ref="form" />

        </v-card>

    

        <!-- <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn> -->

      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-5"
          color="grey lighten-1"
          height="430px"
        >

          <UploadFilm ref="video"/>

        </v-card>

    <!--     <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn> -->

      </v-stepper-content>

      <v-stepper-content step="3" class="step_content">
        <v-card
          class="mb-5"
          color="grey lighten-1"
          height="430px"
        >
          <UploadImage ref="cover" />
        </v-card>

    <!--     <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn> -->

      </v-stepper-content>
      <v-btn id="create"
          color="primary"
          @click="createFilm"
        >
          Create film 
        </v-btn>

        <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    </v-stepper-items>
    
        

  </v-stepper>

</template>

<script>
  import UploadFilm from '../components/UploadFilm'
  import UploadImage from '../components/UploadImage'
  import FilmForm from '../components/FilmForm'
  import io from 'socket.io-client';

  export default {
    components: {
      UploadFilm,
      FilmForm,
      UploadImage
    },
     data () {
      return {
        socket : io('localhost:3000'),
        snackbar: false,
        y: 'top',
        x: null,
        mode: '',
        timeout: 3400,
        text: 'Film Added to the database'
      }
    },
    computed: {
      e1: {
        get(){
          return this.$store.state.step;
        },
        set(value){
          this.$store.commit('retrieveStep',value);
        }
      }
    },
  mounted() {
    if(!this.connected()){
				this.$router.push('/login');
			}
  },
  methods: {
    s1(){
      this.$store.commit('retrieveStep',1);
    },
    s2(){
      this.$store.commit('retrieveStep',2);
    },
    s3(){
      this.$store.commit('retrieveStep',3);
    },
    createFilm(){
        this.$refs.form.create_Film()
        .then(res => {
          this.$refs.cover.sendFile();
          this.$refs.video.sendFile()
            .then(res => {
              this.socket.emit('save-film', {
                    film: "saved"
              });

              this.snackbar = true;
              let that = this;
              setTimeout(function(){ 
                that.$router.push('/');
               }, 800);

          });
        });
        
    }
  },
  created() {
    this.$store.commit('retrieveStep',1);
    this.$store.commit('createFilm', false) 
  }
  }
</script>

<style>
.step {
  cursor: pointer;
}

#create {
  float: right;
}

</style>
