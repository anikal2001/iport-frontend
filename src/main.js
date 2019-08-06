import Vue from 'vue'
import App from './App.vue'
import './plugins/vuetify'
import Vuetify from 'vuetify';
import VueRouter from 'vue-router'

import routes from './routes.js'

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.use(Vuetify);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
