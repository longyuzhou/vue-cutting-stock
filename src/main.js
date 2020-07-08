import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';

import App from './App.vue';
import store from './store';
import i18n from './i18n';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

new Vue({
  i18n,
  store,
  render: (h) => h(App),
}).$mount('#app');
