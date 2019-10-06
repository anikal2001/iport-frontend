<template>
  <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="#D0021B">
                <v-toolbar-title>iPort Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>

                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form v-on:submit.prevent="onSubmit">
                  <v-text-field prepend-icon="person" name="login" label="Email" type="text" v-model="email"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <router-link to='/Upload'><v-btn
          style="color: white; font-size: 1.2rem;"
          large
          color="#D0021B"
          @click="Submit"
          >Login</v-btn></router-link>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import {onSubmit} from '../services/Submit.service.js'

export default {
  name:'Login_Page',
  data(){
    return{
      email: "",
      password:"",
      snackbar: false
    }
  },
  methods:{
    Submit(){
      if(this.email)
       onSubmit(this.email, this.password);
    }
  }
}
</script>
<style scoped>
a {  text-decoration: none;}

</style>

