import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faLanguage,
  faAtom,
  faInfoCircle,
  faLaptopCode,
  faVial,
  faUser,
  faSpinner,
  faSignOutAlt,
  faPlus,
  faEdit,
  faUndo,
  faCheck,
  faSadTear,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { BootstrapVue } from 'bootstrap-vue';
import vSelect from 'vue-select';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-select/dist/vue-select.css';

library.add(
  faHome,
  faLanguage,
  faAtom,
  faInfoCircle,
  faLaptopCode,
  faVial,
  faUser,
  faSpinner,
  faSignOutAlt,
  faPlus,
  faEdit,
  faUndo,
  faCheck,
  faSadTear,
);
Vue.use(BootstrapVue);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('v-select', vSelect);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
