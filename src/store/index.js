import Vue from 'vue';
import Vuex from 'vuex';
import cuttingStock from './modules/cuttingStock';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { cuttingStock },
});
