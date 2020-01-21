<template>
  <div>
    <h1 class="center">Gestion des utilisateurs</h1>
          <v-container
        fluid
        grid-list-lg
      >
        <v-layout v-if="users" row wrap>
        <v-flex xs12 sm6 md4 lg3 
         v-for="user in users" :key="user._id">
            
              <v-hover >
                
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                
                <v-img 
                  :src="'https://api.adorable.io/avatars/285/'+user.email+'.png'"
                  height="300px"
                >
               
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" v-text="user.name"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>

                <!-- <v-img</v-img> :to="toPath+film._id"
                  :src="require('@/assets/' + user.filmImage)"
                  height="300px"
                > -->
               
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout fill-height>
                      <v-flex xs12 align-end userflexbox>
                        <h2>{{user.name}}</h2>
                      </v-flex>
                    </v-layout>

                  </v-container>

                  <v-layout fill-height>
                      <v-flex xs12 align-end userflexbox>
                        <h3>{{user.email}}</h3>
                      </v-flex>
                    </v-layout>
                
               <v-card-title>
            <v-card-actions>
              <v-switch v-model="table[user._id]" @change="acceptUser(table[user._id], user)" :label="''"></v-switch>
              <v-btn color="red myBtn2" @click="delete_user(user._id)" dark>Delete
                <v-icon dark right>block</v-icon>
              </v-btn>
            </v-card-actions>
      </v-card-title>
    </v-card>
    
  </v-hover>
  
        </v-flex>
      </v-layout>
      </v-container>
  </div>
</template>

<script>
export default {
  name: "admin",
  data() {
    return {
      level: this.level,
      checkbox: true,
      radioGroup: 1,
      switch1: true,
      table : [],
      card_text:
        "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat."
    };
  },
   created() {
     this.retrieveAllUsers();
   },
  computed: {
    users() {
      let usrs = this.$store.state.users.users; 
      usrs.forEach(element => {
        if(element.level == '-1')
          this.table[element._id] = false;

        if(element.level == '1')
          this.table[element._id] = true;

        
      });
      return usrs.filter(u => {
        let res = false;
          if(u.level != '0')
            res = true;

        return res;
      });
    } 
  },
  methods:{
       acceptUser(bool, user){
         if(bool == true)
          user.level = '1';
          else {
            user.level = '-1'
          }
          console.log(user)
          this.updateUser({
            user: user
            })
          .then(res => {
            this.retrieveAllUsers();
          })
          .catch(err => {
            
          })
    },
    delete_user(id){
       var result = confirm("Confirm delete !");
          if (result) {
                this.deleteUser({
                    id: id
                  }).then(res => {
                    this.retrieveAllUsers();
                  }).catch(err => {
                      console.log(err)
                  })
          }
        
    }
  }
};
</script>

<style lang="scss">
.v-badge__badge {
  width: auto;
  border-radius: 12px;
  padding: 5px 10px;
}


</style>
