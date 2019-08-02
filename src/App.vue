<template>
<v-app>
   <loginpage></loginpage>
</v-app>
</template>

<script>
import uploadvideo from './components/Upload_Video.vue'
import loginpage from './components/Login_Page.vue'

export default {
  name: 'app',
  components: {
    uploadvideo,
    loginpage
  }
}
</script>

<style >
</style>
