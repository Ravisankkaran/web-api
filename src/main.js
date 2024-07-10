import Vue from 'vue'
import App from './App.vue'
import router from './router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/assets/sass/style.scss';

import store from './store';
Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
