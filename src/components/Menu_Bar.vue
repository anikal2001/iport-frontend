<template>
  <div id="menuBar">
<!----------------------------------------------Toolbar--------------------------------------------------->
      <v-toolbar color="#D8D8D8" app min-height="60rem">
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.6.0/css/all.css"
          integrity="sha384-aOkxzJ5uQz7WBObEZcHvV5JvRW3TUc2rNPA7pe3AwnsUohiw1Vj2Rgx2KSOkF5+h"
          crossorigin="anonymous"
        >
        <img src="../assets/logo.jpg" height="78%" width="6%" style="margin-left:10px">
        <v-spacer style="width:75%"></v-spacer>


        <v-menu top :offset-y="true" >
        <template v-slot:activator="{on}">
        <v-btn v-on="on" style="height:unset;padding:0px;">
        <v-list dark  class="mr--4 ml-8 tile">
        <v-list-tile >
        <v-icon class="mr-4"> fas fa-user</v-icon>
        <v-list-tile-title>John Leider</v-list-tile-title>
        <v-icon class="ml-4">fas fa-chevron-down</v-icon>
        </v-list-tile>
        </v-list>

        </v-btn>
        </template>
      <v-list style="margin-top:60px;">
        <v-list-tile>
          <v-icon class="mr-4"> fas fa-sign-out-alt</v-icon>
          <router-link style="color:black;" to='/'><v-list-tile-title >Logout</v-list-tile-title></router-link>
        </v-list-tile>
        </v-list>
        </v-menu>
      </v-toolbar>
  </div>
</template>
<script>
export default {
  name: "MenuBar",
  props: {
  },
  data() {
    return{
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      offset: true
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#menuBar {
  background-color: #a2a9b5;
  margin: 0px;
  min-height: 3rem;
}
.menuicons {
  padding-right: 15px;
}
.tiles {
  margin: 0px;
}
.LoginButton {
  float: right;
  color: white;
}
a {  
  text-decoration: none;
}
.tile{
  background: #D0021B
}
</style>