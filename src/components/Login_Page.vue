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
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <router-link to='/Upload'><v-btn
          style="color: white; font-size: 1.2rem;"
          large
          color="#D0021B"
          class="LoginButton"
        >Login</v-btn></router-link>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
export default {
  name:'Login_Page'
  
}
</script>
<style scoped>
a {  text-decoration: none;}

</style>

