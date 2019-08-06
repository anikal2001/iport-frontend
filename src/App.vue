<template>
<v-app>
  {{isAuthenticated()}}
<menubar v-if="navbar"></menubar>
<router-view />
</v-app>
</template>

<script>
import uploadvideo from './components/Upload_Video.vue'
import loginpage from './components/Login_Page.vue'
import menubar from './components/Menu_Bar.vue'

export default {
  name: 'app',
  components: {
    uploadvideo,
    loginpage,
    menubar
  },
  data() {
    return{
      navbar: false
    }
  },
  methods:{
  isAuthenticated () {
      if (this.$route.path === '/Upload') {
        this.navbar = true
      }
      else {
        this.navbar = false
      }  
    }
  }
  
}
</script>

<style >
</style>
